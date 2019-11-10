<template>
  <div>
    <a-select
      showSearch
      v-model="id"
      style="width:150px;"
      @search="remoteMethods"
      :showArrow="false"
      :filterOption="false"
      :defaultActiveFirstOption="false"
      :notFoundContent="null"
      placeholder="请输入猩球"
    >
      <a-select-option v-for="item in orbs" :key="item.id">{{item.name}}</a-select-option>
    </a-select>
    <a-button-group style="margin-left:10px;">
      <a-button @click="add">添加</a-button>
      <a-button type="primary" @click="save">保存</a-button>
    </a-button-group>
  </div>
</template>

<script>
import { FindOrbs } from "@/api/orb";
export default {
  components: {},
  watch: {},
  data() {
    return {
      query: "",
      orbs: [],
      id: null
    };
  },
  created() {
    this.remoteMethods("");
  },
  methods: {
    save() {
      this.$emit("save");
    },
    add() {
      this.$emit(
        "add",
        this.orbs.find(v => {
          return v.id === this.id;
        })
      );
    },
    remoteMethods(query) {
      FindOrbs(1, 20, query).then(v => {
        if (v.status === 0) {
          this.orbs = v.data.orbs;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>