<template>
  <div>
    <div style="margin-bottom: 10px;">
      <a-button-group>
        <a-button @click="CreateGroup">添加分组</a-button>
        <a-button type="primary" @click="saveGroupSort" :loading="loading">更新</a-button>
      </a-button-group>
    </div>
    <SlickList lockAxis="y" v-model="items">
      <SlickItem v-for="(item, index) in items" :index="index" :key="item.id">
        <PediaItem
        style="width:400px;"
          :id="item.id"
          :game_id="item.game_id"
          v-model= "item.name"
          :index="index"
          :length="length"
          @move="(num)=>{move(index+num,index)}"
          @deleteGroup="deleteGroup"
        ></PediaItem>
      </SlickItem>
    </SlickList>
    <CreatePediaGroup ref="CreatePediaGroup" @createSuccess="init"></CreatePediaGroup>
       
  </div>
</template>
<script>
import { SlickList, SlickItem  } from "vue-slicksort";

import CreatePediaGroup from "@/components/game/pedia/CreatePediaGroup";
import draggable from "vuedraggable";
import PediaItem from "@/components/game/pedia/PediaItem";
import {
  FindGamePediaGroups,
  DeleteGamePediaGroup,
  UpdateGamePediaGroups
} from "@/api/game";
export default {
  components: { PediaItem, CreatePediaGroup, draggable, SlickList, SlickItem },
  data() {
    return {
      id: 0,
      items: [],
      drag: false,
      loading:false,
      length: 0,
    };
  },
  methods: {
    async init() {
      const r = await FindGamePediaGroups(this.id);
      this.items = r.data;
      this.length = r.data.length;
    },
    CreateGroup() {
      this.$refs.CreatePediaGroup.show(this.id);
    },
    async saveGroupSort() {
      this.loading = true
      const r = await UpdateGamePediaGroups(this.id, this.items);
      if (r.status === 0) {
        this.loading = false
        this.$message.info("更新成功");
      }
    },
    move(i, j) {
      const t = this.items[i];
      this.items.splice(i, 1);
      this.items.splice(j, 0, t);
    },
    async deleteGroup(id, game_id) {
      const r = await DeleteGamePediaGroup(id, game_id);
      this.init();
    },
    updatGroup(item, group_id) {}
  },
  created() {
    this.id = Number(this.$route.params.id);
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sortTable{
  max-height: 200px;
  overflow: auto;
}
</style>