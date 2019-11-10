<template>
  <div class="root">
    <ObjSearch :searchFunction="FindOrbs" @save="update" @add="add"></ObjSearch>

    <table class="table">
      <thead>
        <tr>
          <th>猩球ID</th>
          <th>猩球名</th>
          <th>是否为官方猩球</th>
          <th>默认选中</th>
          <th>强制加入</th>
          <th>操作</th>
        </tr>
      </thead>
      <transition-group name="item" tag="tbody">
        <tr v-for="(row, index) in data" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.orb.name }}</td>
          <td>
            <a-icon v-show="row.orb.is_official" type="check-circle" theme="twoTone"/>
          </td>
          <td>
            <a-switch size="small" v-model="row.selected"></a-switch>
          </td>
          <td>
            <a-switch size="small" v-model="row.mandatory"></a-switch>
          </td>
          <td class="edit">
            <a-icon class="move" :class="{active:index!==0}" type="up" @click="move(index,-1)"></a-icon>
            <a-icon
              class="move"
              :class="{active:index !== data.length-1}"
              type="down"
              @click="move(index,1)"
            ></a-icon>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="确定要删除当前的精选猩球吗"
              @confirm="deleteGroup(index)"
              okText="Yes"
              cancelText="No"
            >
              <a-tooltip placement="top">
                <template slot="title">
                  <span>删除</span>
                </template>
                <a-icon type="delete"></a-icon>
              </a-tooltip>
            </a-popconfirm>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>
<script>
import { FindFeaturedOrbs, FindOrbs, UpdateFeaturedOrbs } from "@/api/orb";
import { getFileUrl } from "@/api/file";
import ObjSearch from "@/components/ObjSearch";
export default {
  components: { ObjSearch },
  data() {
    return {
      swit: false,
      loading: false,
      query: "",
      data: []
    };
  },
  methods: {
    FindOrbs,
    add(orb) {
      const orbSelected = this.data.find(v => {
        return v.orb_id === orb.id;
      });
      if (orbSelected) {
        this.$message.warn("选择的猩球已经存在");
        return;
      } else {
        const newOrb = {
          orb_id: orb.id,
          mandatory: false,
          orb: orb,
          id: 0
        };
        this.data.push(newOrb);
        this.$message.info("添加成功");
      }
    },
    update() {
      UpdateFeaturedOrbs(this.data).then(v => {
        if (v.status === 0) {
          this.$message.info("更新成功");
        }
      });
    },
    move(i, j) {
      if (i + j < 0 || i + j >= this.data.length) {
        return;
      }
      const t = this.data[i];
      this.data.splice(i, 1);
      this.data.splice(j + i, 0, t);
    },
    deleteGroup(index) {
      this.data.splice(index, 1);
      this.update();
    },
    switchClick(index) {
    },
    show() {
    },
    async init() {
      this.loading = true;
      try {
        const r = await FindFeaturedOrbs({});
        if (r.status !== 0) {
          this.$message.warn("未知错误 status=" + r.status);
        } else {
          this.data = r.data;
        }
      } catch (e) {
        this.$message.error(e);
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.init();
  }
};
</script>


<style lang="scss" scoped>
div.root {
  table.table {
    width: 100%;
    thead {
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.65);
      list-style: none;
      tr {
        background: #fafafa;
        th {
          padding: 12px;
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 12px;
        }

        &.item-enter-active,
        &.item-move,
        &.item-leave-active {
          transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        }

        &.item-enter {
          opacity: 0;
          -webkit-transform: scale(0);
          transform: scale(0);
        }

        &.item-leave-active {
          opacity: 0;
          position: absolute;
          -webkit-transform: scale(0);
          transform: scale(0);
        }

        &:not(:last-child) {
          border-bottom-width: 0.5px;
          border-bottom-style: solid;
          border-bottom-color: rgba(158, 156, 156, 0.5);
        }
      }
    }
    .edit {
      i {
        font-size: 16px;
        margin: 4px;
      }
      .move {
        cursor: pointer;

        &:not(.active) {
          color: #eeeeee;
          cursor: default;
        }
      }
    }
  }
}
</style>