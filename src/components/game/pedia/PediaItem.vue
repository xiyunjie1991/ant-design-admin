<template>
  <div class="root">
    <a-collapse>
      <a-collapse-panel :key="id">
        <template slot="header">
          <div>
            <a-row type="flex" justify="start" class="input-row">
                <a-col :span="3">
                    <span>
                      分组名
                    </span>
                  </a-col>
              <a-col :span="5" :offset="1">
                <span>
                  <a-input size="small" v-model="name" @click.stop></a-input>
                </span>
              </a-col>
              <a-col :span="5" :offset="1">
                  <span>
                    <a-button type="primary" size="small" @click.stop="updateSort">保存排序</a-button>
                  </span>
                </a-col>
              <a-col :span="1" :offset="1">

                  <a-tooltip placement="top" >
                      <template slot="title">
                        <span>创建词条</span>
                      </template>
                      <a-icon type="plus" @click.stop="edit(null,-1)"></a-icon>
                    </a-tooltip>
              </a-col>
              <a-col :span="1" :offset="1">
                  <a-tooltip placement="top" >
                      <template slot="title">
                        <span>上移</span>
                      </template>
                      <a-icon v-if="(index !== 0)" type="up" @click.stop="move(-1)"></a-icon>
                    </a-tooltip>
              </a-col>
              <a-col :span="1" :offset="1">
                  <a-tooltip placement="top" >
                      <template slot="title">
                        <span>下移</span>
                      </template>
                      <a-icon v-if="(index !== length-1)" type="down" @click.stop="move(+1)"></a-icon>
                    </a-tooltip>
              </a-col>
              <a-col :span="1" :offset="1">
                <a-popconfirm title="删除分组时  组内的词条也将被删除" @confirm="deleteGroup()" okText="Yes" cancelText="No">
                  
                  <a-tooltip placement="top" >
                      <template slot="title">
                        <span>删除</span>
                      </template>
                      <a-icon type="delete" @click.stop="()=>{}"></a-icon>
                    </a-tooltip>
                </a-popconfirm>
              </a-col>
            </a-row>
          </div>
        </template>
          <SlickList lockAxis="y" v-model="items" class="group">
            <SlickItem v-for="(item, index) in items" :index="index" :key="item.id">
              <a-tag class="tagItem" color="green" style="margin: 4px" :index="index" :key="item.id" :item="item" closable
                @click="edit(item,index)" @close.stop="close(item.id)">{{item.name}}</a-tag>
            </SlickItem>
          </SlickList>
          <!-- <draggable v-model="items" group="people" @start="drag=true" @end="drag=false" @change="sortChange">
                        <a-tag v-for="(item, index) in items" color="green" style="margin: 4px" :index="index"
                            :key="index" :item="item" closable @click="edit(item,index)" @close="close(index)">
                            {{item.name}} </a-tag>
          </draggable>-->
      </a-collapse-panel>
    </a-collapse>
    <CreatePediaItem ref="CreatePediaItem" @createItemSuccess="createItemSuccess"></CreatePediaItem>
  </div>
</template>

<script>
  import { SlickList, SlickItem } from "vue-slicksort";
  import draggable from "vuedraggable";
  import CreatePediaItem from "@/components/game/pedia/CreatePediaItem";
  import {
    FindGamePediaItems,
    UpdateGamePediaItems,
    UpdateGamePediaGroups,
    DeleteGamePediaItem
  } from "@/api/game";
  export default {
    components: { draggable, CreatePediaItem, SlickList, SlickItem },
    props: {
      value: {
        type: String,
        default: ""
      },

      id: {
        type: Number,
        default: 0
      },
      game_id: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        default: 0
      },
      length: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        items: [],
        drag: false,
        name: this.value
      };
    },
    watch: {
      value(newVal) { this.name = newVal },
      name(newVal) { this.$emit('input', newVal) }
    },
    methods: {
      async init() {
        const r = await FindGamePediaItems(this.id);
        this.items = r.data;
      },
      createItemSuccess(item, index) {
        if (index === -1) {
          this.items.push(item);
        } else {
          this.$set(this.items, index, item);
          UpdateGamePediaItems(this.id, this.items).then(v => {
            if (v.status === 0) {
            }
          });
        }
      },
      edit(item, index) {
        if (index === -1) {
          item = {};
        }
        item.group_id = this.id;
        this.$refs.CreatePediaItem.show(item, index);
      },
      updateSort() {
        if(this.items === undefined){
          this.items = []
        }
        UpdateGamePediaItems(this.id, this.items);
      },
      move(num) {
        this.$emit("move", num);
      },
      deleteGroup() {
        this.$emit("deleteGroup", this.id, this.game_id);
      },
      close(id) {
        DeleteGamePediaItem(id,this.id).then(v=>{
          this.init()
        })
      }
    },
    created() {
      this.init();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .root {
    border-radius: 4px;
    display: inline-block;
    position: relative;

    i {
      font-size: 16px;
      cursor: pointer;
    }
    .group {
      max-height: 400px;
    overflow: auto;
    }
  }
  .tagItem{
   padding: 5px;
   height: 30px;
   font-size: 14px;
  }
</style>