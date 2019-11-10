<template>
  <a-layout class="root">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo"/>
      <a-menu theme="dark" mode="inline">
        <a-sub-menu v-for="(m,i) in rList" :key="i">
          <span slot="title">
            <a-icon :type="m.meta.icon"/>
            <span>{{m.meta.name}}</span>
          </span>

          <a-menu-item v-if="!n.hidden" v-for="(n,j) in m.children" :key="i+'.'+j">
            <router-link :to="getPath(m.path,n.path)">
              <span>{{n.meta.title}}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="right">
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div class="avatar">
          <a-dropdown>
            <a-avatar :src="getFileUrl(account.avatar)" icon="user"/>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">主页</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="logout">退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-breadcrumb style="margin: 8px 16px">
        <a-breadcrumb-item v-for="(n,i) in bcList" :key="i">
          <span v-if="i === 0">{{n.meta.name}}</span>
          <span v-if="i !== 0">{{n.meta.title}}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { getAccount } from "@/api/account";
import { clearToken } from "@/api/auth";
import { getFileUrl } from "@/api/file";
export default {
  name: "MainPage",
  data() {
    return {
      collapsed: false,
      account: {},
      rList: [],
      bcList: []
    };
  },
  watch: {
    $route(newValue, oldValue) {
      this.getBreadcrumb();
    }
  },
  methods: {
    getFileUrl,
    getPath(fa, ch) {
      return fa + "/" + ch;
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.bcList = matched;
    },
    async logout() {
      clearToken();
      this.$router.replace("/");
    }
  },
  async created() {
    this.getBreadcrumb();
    const rlr = this.$router.options.routes.filter(v => {
      if (v.meta) {
        return v;
      }
    });
    this.rList = rlr;

    try {
      const r = await getAccount();
      this.account = r.data;
    } catch (err) {
      this.$message.error(err);
    } finally {
    }
  }
};
</script>
<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    background: url("../../assets/image/icon.jpg");
    background-size: cover;
  }

  div.right {
    overflow: auto;
    div.header {
      background: #fff;
      padding: 0;
      padding-right: 20px;

      div.avatar {
        float: right;
        cursor: pointer;
      }
    }

    div.content {
      margin: 8px 16px;
      padding: 12px;
      background: #fff;
      min-height: auto;
    }
  }
}
</style>
