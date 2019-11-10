<template>
  <div class="root">
    <div class="form">
      <a-row class="input-row">
        <a-col :span="10">
          <a-input addonBefore="游戏名" v-model="game.name" placeholder="输入游戏名称" type="text"></a-input>
        </a-col>
        <a-col :span="10" :offset="2">
          <a-input addonBefore="英文名" v-model="game.ename" placeholder="输入英文名" type="text"></a-input>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <a-input addonBefore="发行商" v-model="game.publisher" placeholder="输入发行商" type="text"></a-input>
        </a-col>
        <a-col :span="10" :offset="2">
          <a-input addonBefore="开发商" v-model="game.developer" placeholder="输入开发商" type="text"></a-input>
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
          <picture-uploader
            :width="Number(90)"
            :height="Number(90)"
            class="avatar-uploader"
            :fileid="game.avatar"
            :fileType="Number(0)"
            @onchange="updateAvatar"
          ></picture-uploader>
        </a-col>
        <a-col :span="10" :offset="2">
          <picture-uploader
            :width="Number(800)"
            :height="Number(450)"
            class="picture-uploader"
            :fileid="game.picture"
            :fileType="Number(0)"
            @onchange="updatePicture"
          ></picture-uploader>
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
          <span class="form-title">简介</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="20">
          <a-textarea v-model="game.intro" :rows="4"></a-textarea>
        </a-col>
      </a-row>

      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">评分</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="6">
          <a-input
            v-model.number="game.score"
            max="10"
            min="0"
            type="number"
            step="0.1"
            auto-complete="on"
            placeholder="游戏评分"
          ></a-input>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-rate v-model="game.score" :count="10" disabled/>
        </a-col>
      </a-row>

      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">游戏类型</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="24">
          <tags-select ref="modes" :defaultValue="game.modes" :apiFunc="FindGameModes"></tags-select>
        </a-col>
      </a-row>

      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">游戏模式</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="24">
          <tags-select ref="types" :defaultValue="game.types" :apiFunc="FindGameTypes"></tags-select>
        </a-col>
      </a-row>

      <a-row class="input-row" style="margin-top:20px;">
        <a-col :span="10">
          <a-button type="primary" :loading="loading" @click="ensure">{{id === 0?'新建':'更新'}}</a-button>
        </a-col>
      </a-row>
    </div>

    <a-divider orientation="left">游戏平台</a-divider>

    <GamePlatforms :platformList="game.platforms" :game_id="game.id"></GamePlatforms>
  </div>
</template>

<script>
import {
  GetGameInfo,
  UpdateGame,
  FindGameModes,
  FindGameTypes,
  FindGamePlatforms
} from "@/api/game";
import { getFileUrl } from "@/api/file";
import TypedPictureList from "@/components/typePicture/TypedPictureList";
import PictureUploader from "@/components/typePicture/PictureUploader";
import TagsSelect from "@/components/game/TagsSelect";
import GamePlatforms from "@/components/game/platform/GamePlatforms";
import validator from "@/util/validator";

export default {
  components: { TypedPictureList, PictureUploader, TagsSelect, GamePlatforms },
  data() {
    return {
      game: {},
      id: 0,
      getFileUrl: getFileUrl,
      picturesList: [],
      gameModes: [],
      gameTypes: [],
      loading: false
    };
  },
  watch:{
    picturesList(){
    }
  },
  computed: {},
  methods: {
    FindGameModes,
    FindGameTypes,
    ensure() {
      if (!validator.validatorStr(this.game.name, 30)) {
        this.$message.error("游戏名称不能为空且长度不能大于30个字符");
        return;
      } else if (!validator.validatorStr(this.game.ename, 30)) {
        this.$message.error("英文名不能为空且长度不能大于30个字符");
        return;
      } else if (!validator.validatorStr(this.game.publisher, 30)) {
        this.$message.error("发行商不能为空且长度不能大于30个字符");
        return;
      } else if (!validator.validatorStr(this.game.developer, 30)) {
        this.$message.error("开发商不能为空且长度不能大于30个字符");
        return;
      } else if (!validator.validatorStr(this.game.developer, 200)) {
        this.$message.error("游戏简介不能为空且长度不能大于200个字符");
        return;
      } else if (this.game.score < 0 || this.game.score > 10) {
        this.$message.error("请输入0~10之间的评分");
        return;
      }else if (this.game.avatar === "") {
        this.$message.error("必须上传游戏图标");
        return;
      } else if (this.game.picture === "") {
        this.$message.error("必须上传游戏背景图");
        return;
      } else {
        this.submit();
      }
    },
    async submit() {
      const game = Object.assign({}, this.game);
      game.modes = this.$refs.modes.getData();
      game.types = this.$refs.types.getData();
      this.loading = true;
      try {
        const r = await UpdateGame(JSON.stringify(game));
        if (r.status === 0) {
          this.$message.info("更新成功");
        } else {
          this.$message.warn("更新失败");
        }
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },
    updateAvatar(fileid) {
      this.game.avatar = fileid;
    },
    updatePicture(fileid) {
      this.game.picture = fileid;
    },
    change() {},

    async init() {
      const r = await GetGameInfo(this.id);

      this.game = r.data;
      this.gameModes = this.game.modes;
      this.gameTypes = this.game.types;
      this.picturesList = this.game.pictures;
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
    max-width: 80%;
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
