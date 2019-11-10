<template>
  <div class="root">
    <!-- <OrbSearch @save="update" @add="add"></OrbSearch> -->
    <a-input placeholder="输入文章名称" v-model="query" style="width:150px;"/>
    <a-button @click="onSearch" style="margin-bottom: 10px;" :disabled="query===search">搜索</a-button>
    <router-Link :to="'/article/0'">
      <a-button>新建</a-button>
    </router-Link>

    <a-table
      :columns="columns"
      :loading="loading"
      :dataSource="data"
      :rowKey="r => r.id"
      :pagination="{total:total,pageSize:page_size,current:page,showSizeChanger:true,
        showTotal:total => `总供 ${total} 条`,size:'small',}"
      @change="changePage"
    >
      <span slot="name" slot-scope="text, record, index">{{ record.name }}</span>
      <span class="edit" slot="action" slot-scope="text, record, index">
        <a-dropdown>
          <a>
            <a-icon type="dash"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-Link :to="'/article/' + record.id">文章编辑</router-Link>
            </a-menu-item>
            <a-menu-item>
              <a :href="'https://t.pog.ltd/article/' + record.id" target="_blank">文章预览</a>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm
                title="确定要删除已推送的资讯吗"
                @confirm="deleteArticle(record.article.id)"
                okText="Yes"
                cancelText="No"
              >
                <a-tooltip placement="top">
                  <template slot="title"></template>
                  <a style="color:#F56C6C">删除文章</a>
                </a-tooltip>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </div>
</template>
<script>
import { FindArticles } from "@/api/articles";
export default {
  name: "GameListPage",
  data() {
    return {
      swit: false,
      loading: false,
      total: 0,
      query: "",
      page: 1,
      page_size: 10,
      data: [],
      search: "",
      columns: [
        {
          dataIndex: "id",
          title: "id"
        },
        {
          dataIndex: "title",
          title: "文章名称"
        },
        {
          dataIndex: "show_type",
          title: "是否有视频封面",
          scopedSlots: { customRender: "show_type" }
        },
        {
          dataIndex: "like_count",
          title: "点赞数"
        },
        {
          dataIndex: "comment_count",
          title: "评论数"
        },
        {
          title: "更多操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  methods: {
    onSearch() {
      this.init();
    },
    changePage(pagination) {
      this.page = pagination.current;
      this.page_size = pagination.pageSize;

      this.init();
    },
    async init() {
      this.loading = true;
      this.search = this.query;
      try {
        const r = await FindArticles(this.query, this.page, this.page_size);
        if (r.status !== 0) {
          this.$message.warn("未知错误 status=" + r.status);
        } else {
          this.data = r.data.articles;
          this.page = r.data.page;
          this.page_size = r.data.page_size;
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
    this.init();
  }
};
</script>


<style lang="scss" scoped>
div.root {
}

.edit {
  i {
    font-size: 16px;
    margin: 4px;
  }
}
</style>