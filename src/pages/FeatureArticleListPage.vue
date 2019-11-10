<template>
  <div class="root">
    <a-input-search
      placeholder="请输入猩球名称"
      style="width: 200px;margin-bottom:10px;"
      @search="onSearch"
      size="small"
      v-model="query"
    />
    <a-table
      :columns="columns"
      :loading="loading"
      :dataSource="articles"
      :rowKey="r => r.article.id"
      :pagination="{total:total,pageSize:pageSize,current:page,showSizeChanger:true,
                         showTotal:total => `总供 ${total} 条`,size:'small',}"
      @change="changePage"
    >
      <span slot="article.title" slot-scope="text, record, index">
        <router-Link :to="'/article/' + record.article.id">{{ record.article.title }}</router-Link>
      </span>
      <span slot="author.nickname" slot-scope="text, record, index">{{ record.author.nickname }}</span>
      <span slot="orb.name" slot-scope="text, record, index">{{ record.orb.name}}</span>
      <span slot="action" slot-scope="text, record, index">
        <a-dropdown>
          <a>
            <a-icon type="dash"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-Link :to="'/article/' + record.article.id">文章编辑</router-Link>
            </a-menu-item>
            <a-menu-item>
              <a :href="record.article.url" target="_blank">文章预览</a>
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
                  <a style="color:#F56C6C">移除资讯</a>
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
import { FindFeaturedArticles, RemoveFeaturedArticle } from "@/api/articles";
import { FindOrbs } from "@/api/orb";
import { getFileUrl } from "@/api/file";
export default {
  watch: {
    page() {
      history.replaceState(null, "", "/orb/list?page=" + this.page);
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      query: "",
      articles: [],
      columns: [
        {
          dataIndex: "article.title",
          title: "文章标题",
          scopedSlots: { customRender: "article.title" }
        },
        {
          dataIndex: "author.nickname",
          title: "文章作者",
          scopedSlots: { customRender: "author.nickname" }
        },
        {
          dataIndex: "orb.name",
          title: "所属猩球",
          scopedSlots: { customRender: "orb.name" }
        },
        {
          title: "更多操作",
          dataIndex: "id",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    deleteArticle(id) {
      RemoveFeaturedArticle(id).then(v => {
        if (v.status === 0) {
          this.$message.info("删除成功");
          this.init();
        }
      });
    },
    getFileUrl(avarar, size) {
      getFileUrl(avarar, size);
    },
    changePage(pagination) {
      this.page = pagination.current;
      this.pageSize = pagination.pageSize;
      this.init();
    },
    onSearch() {
      this.init();
    },
    async init() {
      const r = await FindFeaturedArticles(
        this.query,
        this.page,
        this.pageSize
      );
      if (r.status !== 0) {
        this.$message.warn("未知错误 status=" + r.status);
      } else {
        this.articles = r.data.articles;
        this.page = r.data.page;
        this.pageSize = r.data.page_size;
        this.total = r.data.total;
      }
    }
  }
};
</script>
<style>
</style>