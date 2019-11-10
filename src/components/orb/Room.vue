<template>
  <div>
    <a-button style="margin-left: 40px; margin-bottom: 10px;" type="primary" @click="editGroupName(null,-1)">添加分组
    </a-button>
    <draggable class="list-group" tag="ul" v-model="groups" v-bind="dragOptions" @start="drag = true"
      @end="drag = false" @input="updateSort">
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <a-collapse v-for="(item,index) in groups" :key="item.id">
          <a-collapse-panel :key="item.id">
            <template slot="header">
              <span @click.stop="editGroupName(item,index)">{{item.name}}</span>
            </template>
            <RoomGroupItem style="width:300px;" v-model="item.name" :group_id="item.id"></RoomGroupItem>
          </a-collapse-panel>
        </a-collapse>
      </transition-group>
    </draggable>
    <CreateGroup ref="CreateGroup" @createSuccess="createSuccess"></CreateGroup>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import { FindOrbRoomGroups, FindOrbRoomGroupRooms, UpdateOrbRoomGroups } from "@/api/orb"
  import RoomGroupItem from "@/components/orb/RoomGroupItem"
  import CreateGroup from "@/components/orb/CreateGroup"
  export default {
    components: { RoomGroupItem, draggable, CreateGroup },
    computed: {
      dragOptions() {
        return {
          animation: 200,

          group: "description",
          disabled: false,
          ghostClass: "ghost",

        };
      }
    },
    props: {
      id: {
        type: Number,
        default: 0
      },
    },
    watch: {
      id() {
        this.init()
      }
    },
    data() {
      return {
        groups: [],
        drag: false,
        editing: -1,
      }
    },
    methods: {
      updateSort() {
        UpdateOrbRoomGroups(this.id, this.groups).then(v => {
          if (v.status === 0) {
            this.$message.info('排序成功')
          }
        })
      },
      async init() {
        const r = await FindOrbRoomGroups(this.id)
        this.groups = r.data
      },
      editGroupName(item, index) {
        if (index !== -1) {
          this.editing = index
          item.orb_id = this.id

        } else {
          item = {
            id: 0,
            name: '',
            orb_id: this.id
          }
        }
        this.$refs.CreateGroup.show(item)
      },
      createSuccess(item) {
        if (this.editing === -1) {

          this.init()
        } else {
          this.$set(this.groups, this.editing, item)
          this.editing = -1
        }
      }

    },
  }
</script>
<style>
  .list-group-item {
    border: 1px gray solid;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    padding: 10px;
    cursor: move;
  }

  .add {
    justify-content: center;
    font-size: 20px;
  }
</style>