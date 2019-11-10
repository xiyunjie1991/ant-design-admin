<template>
  <div class="root">
    <a-button-group>
      <a-select
        class="select"
        showSearch
        v-model="id"
        @search="remoteMethods"
        :showArrow="false"
        @change="change"
        :filterOption="false"
        :defaultActiveFirstOption="true"
        :notFoundContent="null"
      >
        <a-select-option v-for="item in data" :key="item.id">{{item.name}}</a-select-option>
      </a-select>
      <a-button v-if="searchType !== 'orb'" @click="add">添加</a-button>
      <a-button v-if="searchType !== 'orb'" type="primary" @click="save">保存</a-button>
    </a-button-group>
  </div>
</template>

<script>
export default {
  props: {
    searchFunction: {
      type: Function,
      default: () => {
        return "";
      }
    },
    searchType: {
      type: String,
      default: "game"
    },
    game_id: {
      type: Number,
      default: null
    }
  },
  components: {},
  watch: {
    game_id(newV) {
      if (newV === 0) {
        this.id = null;
      } else {
        this.id = newV;
      }
    }
  },
  data() {
    return {
      query: "",
      data: [],
      id: null,
      defValue: ""
    };
  },
  created() {
    this.id = this.game_id;
    this.remoteMethods("");
  },
  methods: {
    change(obj) {
      this.$emit("change", obj);
    },
    save() {
      this.$emit("save");
    },
    add() {
      this.$emit(
        "add",
        this.data.find(v => {
          return v.id === this.id;
        })
      );
    },
    remoteMethods(query) {
      if (this.searchType === "game") {
        this.searchFunction(1, 20, query).then(v => {
          if (v.status === 0) {
            this.data = v.data.orbs;
          }
        });
      } else if (this.searchType === "orb") {
        this.searchFunction(1, 20, query).then(v => {
          if (v.status === 0) {
            this.data = v.data.games;
          }
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
div.root {
  .select {
    width: 200px;
    /deep/ div.ant-select-selection.ant-select-selection--single {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-right-width: 0px;
    }
  }
}
</style>