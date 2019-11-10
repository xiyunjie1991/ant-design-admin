<template>
  <div>
    <a-modal
      v-model="visible"
      title="编辑平台信息"
      onOk="handleOk"
      :maskClosable="false"
      :centered="true"
      :cancel="cancel"
    >
      <template slot="footer">
        <a-button key="back" @click="cancel">取消</a-button>
        <a-button @click="ensure" type="primary">确认</a-button>
      </template>
      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">平台名称</span>
        </a-col>
        <a-col :span="10" :offset="2">
          <span class="form-title">{{item.platform_name}}</span>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">价格</span>
        </a-col>
        <a-col :span="10" :offset="2">
          <a-input
            v-model="item.price"
            style="width: 200px;"
            placeholder="售价"
            type="number"
            auto-complete="on"
          />
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">发售日期</span>
        </a-col>
        <a-col :span="10" :offset="2">
          <a-date-picker v-model="moment"/>
        </a-col>
      </a-row>
      <a-row class="input-row">
        <a-col :span="10">
          <span class="form-title">中文支持</span>
        </a-col>
        <a-col :span="10" :offset="2">
          <a-switch v-model="item.official_chs"/>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment"; //导入文件
import { UpdateGamePlatformInfo } from "@/api/game";
export default {
  components: {},
  watch: {},
  data() {
    return {
      item: {},
      visible: false,
      moment: null
    };
  },
  methods: {
    async ensure() {
      // this.$emit('update', item)
      this.item.release_time = this.moment.unix();
      const r = await UpdateGamePlatformInfo(
        this.item.game_id,
        this.item.platform_id,
        Number(this.item.price),
        this.item.official_chs,
        this.item.release_time
      );
      if (r.status === 0) {
        const newItem = r.data;
        this.$emit("update", newItem);
        this.visible = false;
        this.item = {};
      }
    },
    cancel() {
      this.item = {};
      this.visible = false;
    },
    show(item) {
      this.moment = moment(new Date(item.release_time * 1000));
      this.item = item;
      this.visible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>