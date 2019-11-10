<template>
  <div class="root">
    <a-input-search
      placeholder="请输入游戏名"
      style="width: 200px;margin-bottom:10px;"
      @search="onSearch"
      size="small"
      v-model="query"
    />
    <a-table
      :columns="columns"
      :loading="loading"
      :dataSource="data"
      :rowKey="r => r.id"
      :pagination="{total:total,pageSize:pageSize,current:page,showSizeChanger:true,
                 showTotal:total => `总供 ${total} 条`,size:'small',}"
      @change="changePage"
    ></a-table>
  </div>
</template>
<script>
import { findGames } from "@/api/game";
import { getFileUrl } from "@/api/file";

export default {
  name: "GameListPage",
  data() {
    return {
      loading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      query: "",
      data: [],
      columns: [
        {
          dataIndex: "id",
          key: "id",
          title: "#"
        },
        {
          dataIndex: "name",
          key: "name",
          title: "游戏名"
        },

        {
          dataIndex: "avatar",
          key: "avatar",
          title: "图标",
          customRender: (text, row, index) => {
            return <a-avatar src={getFileUrl(row.picture, 50)} icon="user" />;
          }
        },
        {
          dataIndex: "ename",
          key: "ename",
          title: "英文名称"
        },
        {
          dataIndex: "developer",
          key: "developer",
          title: "制作商"
        },
        {
          dataIndex: "publisher",
          key: "publisher",
          title: "发行商"
        },
        {
          dataIndex: "score",
          key: "score",
          title: "评分"
        },
        {
          title: "更多操作",
          dataIndex: "id",
          key: "action",
          customRender: (text, row, index) => {
            return (
              <a-dropdown>
                <a>
                  <a-icon type="dash" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <router-Link to={/game/ + row.id}>
                      <a>游戏详情</a>
                    </router-Link>
                  </a-menu-item>
                  <a-menu-item>
                    <router-Link to={"/game/pedia/" + row.id}>
                      <a>百科管理</a>
                    </router-Link>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            );
          }
        }
      ]
    };
  },
  watch: {
    page() {
      history.replaceState(null, "", "/game/list?page=" + this.page);
    }
  },
  methods: {
    getFileUrl(avarar, size) {
      getFileUrl(avarar, size);
    },
    changePage(pagination) {
      this.page = pagination.current;
      this.pageSize = pagination.pageSize;
      this.init();
    },
    gameUpdate(e) {
    },
    onSearch() {
      this.init();
    },
    async init() {
      this.loading = true;
      try {
        const r = await findGames(this.page, this.pageSize, this.query);
        if (r.status !== 0) {
          this.$message.warn("未知错误 status=" + r.status);
        } else {
          this.data = r.data.games;
          this.page = r.data.page;
          this.pageSize = r.data.page_size;
          this.total = r.data.total;
        }
      } catch (e) {
        this.$message.error(e);
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
    this.init();
  }
};
</script>


<style lang="scss" scoped>
div.root {
}
</style>
