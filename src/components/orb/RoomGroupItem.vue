<template>
  <div class="root">
    <draggable class="list-group" tag="div" v-model="rooms" v-bind="dragOptions" @start="drag = true"
      @end="drag = false" handle=".handle" @input="updateSort">
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="list-group-item" v-for="(item,index) in rooms" :key="item.id">
          <a-icon type="drag" style="flex:2" class="fa fa-align-justify handle"></a-icon>
          <div style="max-width:150; flex:5"><span>
              {{ item.name }}</span></div>
          <a-tooltip placement="top">
            <template slot="title">
              <span>内容频道</span>
            </template>
            <div>
              <a-icon v-if="item.type === 1" type="edit" style="color:#409EFF;"></a-icon>
            </div>
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>聊天频道</span>
            </template>
            <div>
              <a-icon v-if="item.type === 0" type="phone" style="color:#67C23A ;"></a-icon>
            </div>
          </a-tooltip>
          <div class="iconGroup">
            <a-row>
              <a-col :span="2" :offset="10">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>修改频道名称</span>
                  </template>
                  <div>
                    <a-icon type="setting" @click.stop="editgroupRoom(item,index)"></a-icon>
                  </div>
                </a-tooltip>
              </a-col>
              <a-col :span="6" :offset="6">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>编辑频道内文章</span>
                  </template>
                  <div>
                    <router-Link :to="'/orb/roomarticlelist/' + item.id">
                      <a-icon v-if="item.type === 1" type="form"></a-icon>
                    </router-Link>
                  </div>
                </a-tooltip>
              </a-col>
            </a-row>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div class="list-group-item add">
      <a-icon type="plus" @click.stop="editgroupRoom(null,-1)"></a-icon>
    </div>
    <CreateGroupRoom ref="CreateGroupRoom" @createSuccess="createSuccess"></CreateGroupRoom>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import CreateGroupRoom from "@/components/orb/CreateGroupRoom";
  import { FindOrbRoomGroupRooms, UpdateOrbRooms } from "@/api/orb"
  import {
    FindGamePediaItems,
    UpdateGamePediaItems,
    UpdateGamePediaGroups,
    DeleteGamePediaItem
  } from "@/api/game";
  export default {
    components: { CreateGroupRoom, draggable },
    props: {
      value: {
        type: String,
        default: ""
      },

      id: {
        type: String,
        default: ""
      },
      group_id: {
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
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    data() {
      return {
        rooms: [],
        drag: false,
        name: this.value,
        editing: -1
      };
    },
    watch: {
      value(newVal) { this.name = newVal },
      name(newVal) { this.$emit('input', newVal) }
    },
    methods: {
      deleteItem(e) {
      },
      async init() {

        const r = await FindOrbRoomGroupRooms(this.group_id);
        this.rooms = r.data;
      },
      createSuccess(item) {
        this.init()
        // console.info(item)
        // if (this.editing === -1) {
        //     this.init()
        //     } else {
        //     this.$set(this.items, index, item);
        // }
      },
      editgroupRoom(item, index) {
        if (index === -1) {
          item = {
            id: 0,
            group_id: this.group_id,
            name: '',
            type: 0
          };
        } else {
          this.editing = index
        }
        this.$refs.CreateGroupRoom.show(item, index);
      },
      updateSort() {
        UpdateOrbRooms(this.group_id, this.rooms).then(v => {
          if (v.status === 0) {
            this.$message.info('排序成功')
          }
        })
      },
      move(num) {
        this.$emit("move", num);
      },
      deleteGroup() {
        this.$emit("deleteGroup", this.id, this.game_id);
      },
      close(id) {
        DeleteGamePediaItem(id, this.id).then(v => {
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
    border-radius: 10px;
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

    .iconDiv {
      height: 16px;
      width: 16px;
    }
  }


  .tagItem {
    padding: 5px;
    height: 30px;
    font-size: 14px;
  }

  .iconGroup {
    flex: 6
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    border: 1px gray solid;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    margin: 2px;
    padding: 10px;
    cursor: pointer;
  }

  .add {
    justify-content: center;
    font-size: 24px;

  }

  .list-group-item div {
    cursor: pointer;
  }

  .list-group-item .handle {
    float: left;
    font-size: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: move;
  }
</style>