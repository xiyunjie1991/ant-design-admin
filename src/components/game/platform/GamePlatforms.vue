<template>
  <div class="root">
    <a-row :gutter="16">
      <a-col :span="4">
        <a-select v-model="selectedItem" style="width: 100%" placeholder="请选择游戏平台">
          <a-select-option v-for="item in list" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-button @click="createGroup(null,-1)">添加</a-button>
      </a-col>
    </a-row>
    <div class="platform-list">
      <a-card hoverable class="platfrom-item" v-for="(item,index) in platformList_" :key="item.id">
        <a-row :gutter="1">
          <a-col :span="10">
            <span>平台信息</span>
          </a-col>
          <a-col>
            <span class="form-title">{{item.platform_name}}</span>
          </a-col>
        </a-row>
        <a-row :gutter="1">
          <a-col :span="10">
            <span>游戏售价</span>
          </a-col>
          <a-col>
            <span class="form-title">￥{{item.price}}</span>
          </a-col>
        </a-row>
        <a-row :gutter="1">
          <a-col :span="10">
            <span>发售时间</span>
          </a-col>
          <a-col>
            <span class="form-title">{{dateFormat(item.release_time)}}</span>
          </a-col>
        </a-row>
        <a-row :gutter="1">
          <a-col :span="10">
            <span>支持中文</span>
          </a-col>
          <a-col>
            <span class="form-title" v-if="item.official_chs">是</span>
            <span class="form-title" v-if="!item.official_chs">否</span>
          </a-col>
        </a-row>
        <a-row :gutter="1" type="flex" justify="space-around" style="margin-top:5px;">
          <a-button-group>
            <a-button size="small" icon="edit" @click="edit(item,index)"/>
            <a-popconfirm
              placement="bottomRight"
              okText="确认"
              cancelText="取消"
              @confirm="deletePlatform(index)"
            >
              <template slot="title">确认删除游戏平台 {{item.platform_name}}</template>
              <a-button size="small" type="danger" icon="delete"></a-button>
            </a-popconfirm>
          </a-button-group>
        </a-row>
      </a-card>
    </div>
    <EditPlatform ref="EditPlatForm" @update="update"></EditPlatform>
  </div>
</template>

<script>
import { dateFormat } from "@/api/auth";
import { FindGamePlatforms, DeleteGamePlatformInfo } from "@/api/game";
import EditPlatform from "@/components/game/platform/EditPlatform";
export default {
  components: { EditPlatform },
  props: {
    platformList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    game_id: {
      tyep: Number,
      default: 0
    }
  },
  watch: {
    platformList() {
      this.platformList_ = this.platformList;
    }
  },
  data() {
    return {
      platformList_: [],
      selectedItem: 1,
      list: [],
      editing: -1
    };
  },
  methods: {
    dateFormat,
    async init() {
      this.platformList_ = this.platformList;
      const r = await FindGamePlatforms();
      this.list = r.data;
    },
    edit(item, index) {
      if (index === -1) {
        const same = this.platformList_.find(v => {
          return v.platform_id === this.selectedItem;
        });

        if (same) {
          this.$message.warning("选择的平台重复");
        } else {
          const pfi = this.list.find(v => {
            return v.id === this.selectedItem;
          });

          const item = {
            game_id: this.game_id,
            platform_id: this.selectedItem,
            platform_name: pfi.name,
            price: 0,
            official_chs: false,
            release_time: new Date()
          };
          this.$refs.EditPlatForm.show(item);
        }
      } else {
        //update
        this.$refs.EditPlatForm.show(item);
        this.editing = index;
      }
    },
    deletePlatform(i) {
      DeleteGamePlatformInfo(
        this.platformList_[i].game_id,
        this.platformList_[i].platform_id
      );
      this.platformList_.splice(i, 1);
    },
    update(item) {
      if (this.editing < 0) {
        this.platformList_.push(item);
      } else {
        this.$set(this.platformList_, this.editing, item);
        this.editing = -1;
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.root {
  width: 100%;
  min-height: 200px;

  .platform-list {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    .platfrom-item {
      width: 200px;
      margin-right: 6px;
      border-radius: 5px;

      /deep/ .ant-card-body {
        padding: 10px;
      }
      /deep/ .ant-row {
        margin: 3px;
      }
    }
  }
}
</style>