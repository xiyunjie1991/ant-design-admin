<template>
  <div class="root">
    <div class="form">
      <a-row class="input-row">
          <a-col :span="3">
              <span class="form-title">选择游戏</span>
            </a-col>
        <a-col :span="9">
          <ObjSearch :searchFunction="findGames" :searchType="'orb'" :game_id="orb.game_id" @change="updateGame" placeholder="输入游戏名称" type="text"></ObjSearch>
        </a-col>
        <a-col :span="4">
            <span class="form-title">是否是官方猩球</span>
          </a-col>
        <a-col :span="8">
          <a-switch v-model="orb.is_official" :disable="true"></a-switch>
        </a-col>
      </a-row>

      <a-row class="input-row">
        <a-col :span="10">
          <a-input addonBefore="猩球名称" v-model="orb.name" placeholder="输入游戏名称" type="text"></a-input>
        </a-col>
        <a-col :span="10" :offset="2">
          <a-input addonBefore="猩球昵称" v-model="orb.nickname" placeholder="输入英文名" type="text"></a-input>
        </a-col>
      </a-row>

      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">图标</span>
        </a-col>
        <a-col :span="10" :offset="2">
          <span class="form-title">背景图</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <picture-uploader :width="Number(90)" :height="Number(90)" class="avatar-uploader" :fileid="orb.avatar"
            :fileType="Number(0)" @onchange="updateAvatar"></picture-uploader>
        </a-col>
        <a-col :span="10" :offset="2">
          <picture-uploader :width="Number(800)" :height="Number(450)" class="picture-uploader" :fileid="orb.picture"
            :fileType="Number(0)" @onchange="updatePicture"></picture-uploader>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">图片</span>
        </a-col>
      </a-row>

      <a-row class="input-row">
        <a-col>
          <typed-picture-list v-model="picturesList" ref="picList"></typed-picture-list>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">介绍</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="20">
          <a-textarea v-model="orb.intro" :rows="4"></a-textarea>
        </a-col>
      </a-row>
      <a-row class="input-row" style="margin-top:20px;">
        <a-col :span="10">
          <a-button type="primary" :loading="loading" @click="ensure">{{id === 0?'新建':'更新'}}</a-button>
        </a-col>
      </a-row>
    </div>
    <a-divider orientation="left">猩球频道</a-divider>
    <Room style="width:380px;" :id="orb.id"></Room>
  </div>
</template>

<script>
  import {
    findGames,GetGameInfo
  } from "@/api/game";
  import {
    GetOrbInfo,UpdateOrb
  } from "@/api/orb";



  import { getFileUrl } from "@/api/file";
  import TypedPictureList from "@/components/typePicture/TypedPictureList";
  import PictureUploader from "@/components/typePicture/PictureUploader";
  import TagsSelect from "@/components/game/TagsSelect";
  import ObjSearch from '@/components/ObjSearch'
  import validator from "@/util/validator";
  import Room from "@/components/orb/Room";

  export default {
    components: { TypedPictureList, PictureUploader, TagsSelect, ObjSearch,Room },
    data() {
      return {
        orb: {},
        id: 0,
        getFileUrl: getFileUrl,
        picturesList: [],
        loading: false
      };
    },
    watch: {
      picturesList() {
      }
    },
    computed: {},
    methods: {
      ensure() {
        if (!validator.validatorStr(this.orb.name, 30)) {
          this.$message.error("猩球名称不能为空且长度不能大于30个字符");
          return;
        } else if (!validator.validatorStr(this.orb.nickname, 30)) {
          this.$message.error("昵称不能为空且长度不能大于30个字符");
          return;
        } else if (this.orb.avatar === "") {
          this.$message.error("必须上传图标");
          return;
        } else if (this.orb.picture === "") {
          this.$message.error("必须上传背景图");
          return;
        } else {
          this.submit();
        }
      },
      findGames,
      async submit() {
     
        this.loading = true;
        try {
          const r =await  UpdateOrb(this.orb.id,this.orb.name,this.orb.nickname,
      this.orb.avatar,this.orb.intro,this.orb.pictures,this.orb.game_id,this.orb.picture,this.orb.is_official)
          if (r.status === 0) {
            this.$message.info("更新成功");
          } else {
            this.$message.warn("更新失败");
          }
        } catch (e) {
        } finally {
          this.loading = false;
        }


        // const game = Object.assign({}, this.game);
        // this.loading = true;
        // try {
        //   const r = await UpdateGame(JSON.stringify(game));
        //   if (r.status === 0) {
        //     this.$message.info("更新成功");
        //   } else {
        //     this.$message.warn("更新失败");
        //   }
        // } catch (e) {
        // } finally {
        //   this.loading = false;
        // }
      },
      updateAvatar(fileid) {
        this.orb.avatar = fileid;
      },
      updatePicture(fileid) {
        this.orb.picture = fileid;
      },
      updateGame(obj) {
        GetGameInfo(Number(obj)).then(v => {
        if (v.status === 0) {
          const obj = v.data
          this.orb.avatar = obj.avatar
        this.orb.pictures = obj.pictures
        this.picturesList = obj.pictures
        this.orb.nickname = obj.ename
        this.orb.name = obj.name
        this.orb.picture = obj.picture
        this.orb.intro = obj.intro
        this.orb.game_id = obj.id
        }
      })
        
      },
      change() { },

      async init() {
        const r = await GetOrbInfo(this.id);
        this.orb = r.data;
        this.picturesList = this.orb.pictures;
      }
    },
    created() {
      this.id = Number(this.$route.params.id);
      this.init();
    }
  };
</script>
<style lang="scss" scoped>
  div.root {
    div.form {
      min-width: 700px;
      max-width: 700px;
      .uploadInput {
        -web-kit-appearance: none;
        -moz-appearance: none;
      }

      .avatar-uploader {
        width: 80px;
        height: 80px;
      }

      .picture-uploader {
        width: 192px;
        height: 108px;
      }
    }
  }
</style>