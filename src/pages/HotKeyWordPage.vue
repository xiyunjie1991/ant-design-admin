<template>
  <div>
    <p class="form-title">热门关键词热度排序</p>
    <span>
      天数：
      <a-select v-model="selectedDay" style="width: 70px">
        <a-select-option v-for="i in days" :key="i">{{i}}</a-select-option>
      </a-select>显示限制：
      <a-select v-model="selectedLimit" style="width: 70px">
        <a-select-option v-for="i in limit" :key="i">{{i}}</a-select-option>
      </a-select>

      <a-button
        @click="onSearch"
        style="margin-bottom: 10px; margin-left: 10px;"
        type="primary"
        :loading="loading"
      >搜索</a-button>
    </span>
    <p class="form-title">资讯热门搜索关键字</p>
    <div class="list-group-item" v-for="(item,index) in nowHotWord" :key="index">
      <a-icon type="drag" class="fa fa-align-justify handle"></a-icon>
      <span style="margin-left: 20px;">{{ item }}</span>
    </div>
    <p class="form-title">资讯热门搜索关键字</p>
    <draggable
      class="list-group"
      tag="div"
      handle=".handle"
      :list="hotList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="update"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="list-group-item" v-for="(item,index) in hotList" :key="item">
          <a-icon type="drag" class="fa fa-align-justify handle"></a-icon>
          <div style="max-width:150;" @click="updateHotKeyWord(item,index)">
            <span>{{ item }}</span>
          </div>
          <a-icon type="delete" class="fa fa-align-justify handle" @click="deleteItem(index)"></a-icon>
        </div>
      </transition-group>
    </draggable>
    <div class="list-group-item add" @click="addHotKeyWord">
      <a-icon type="plus"></a-icon>
    </div>
    <EditHotKeyWord ref="EditHotKeyWord" @ensure="ensure"></EditHotKeyWord>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import EditHotKeyWord from "@/components/EditHotKeyWord";
import {
  FindArticleSearchHotKeywords,
  FindFeaturedArticleHotKeywords,
  UpdateFeaturedArticleHotKeywords
} from "@/api/articles";
export default {
  display: "Transitions",
  order: 7,
  components: {
    draggable,
    EditHotKeyWord
  },
  created() {
    this.init();
  },
  data() {
    return {
      drag: false,
      editing: -1,
      isDragging: false,
      selectedDay: 1,
      editable: true,
      loading: false,
      days: [1, 5, 10, 15, 30],
      limit: [10, 15, 20, 25],
      nowHotWord: [],
      hotList: [],
      selectedLimit: 20,
      items: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8"
      ]
    };
  },
  methods: {
    async init() {
      this.loading = true;
      this.search = this.query;
      try {
        const r = await FindArticleSearchHotKeywords(
          this.selectedDay,
          this.selectedLimit
        );
        if (r.status !== 0) {
          this.$message.warn("未知错误 status=" + r.status);
        } else {
          this.nowHotWord = r.data;
        }

        const r2 = await FindFeaturedArticleHotKeywords(
          this.selectedDay,
          this.selectedLimit
        );
        if (r2.status !== 0) {
          this.$message.warn("未知错误 status=" + r.status);
        } else {
          this.hotList = r2.data;
        }
      } catch (e) {
        this.$message.error(e);
      } finally {
        this.loading = false;
      }
    },
    ensure(name) {
      if (this.editing === -1) {
        this.hotList.push(name);
      } else {
        this.$set(this.hotList, this.editing, name);
        this.editing = -1;
      }
      this.update();
    },
    update() {
      UpdateFeaturedArticleHotKeywords(this.hotList);
    },
    deleteItem(index) {
      this.hotList.splice(index, 1);
      this.update();
    },
    onSearch() {
      this.init();
    },
    updateHotKeyWord(name, index) {
      this.editing = index;
      this.$refs.EditHotKeyWord.show(name);
    },
    addHotKeyWord() {
      this.editing = -1;
      this.$refs.EditHotKeyWord.show("");
    },
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 1;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  border: 1px gray solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
  margin: 2px;
  padding: 10px;
  cursor: move;
}
.add {
  justify-content: center;
  font-size: 20px;
}

.list-group-item i {
  cursor: pointer;
}
.handle {
  float: left;
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>