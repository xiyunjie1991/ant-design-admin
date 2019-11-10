import Vue from "vue";
import VueRouter from "vue-router";
import WelcomePage from "@/pages/WelcomePage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import UserListPage from "@/pages/UserListPage";
import ArticleListPage from "@/pages/ArticleListPage";
import GameListPage from "@/pages/GameListPage";
import Layout from "@/pages/MainPage";
import GamePage from "@/pages/GamePage";
import OrbPage from "@/pages/OrbPage";
import OrbListPage from "@/pages/OrbListPage";
import ArticlePage from "@/pages/ArticlePage";
import PediaPage from "@/pages/PediaPage";
import FeaturedOrbListPage from "@/pages/FeaturedOrbListPage";
import RecommendedOrbsPage from "@/pages/RecommendedOrbsPage"
import HotKeyWordPage from "@/pages/HotKeyWordPage"
import FeatureArticleListPage from "@/pages/FeatureArticleListPage"
import OrbUserListPage from "@/pages/OrbUserListPage"
import RoomArticleListPage from "@/pages/RoomArticleListPage"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: WelcomePage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/dashboard",
    component: MainPage,
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: {
      name: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: UserListPage,
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '/feature',
    component: Layout,
    redirect: '/feature/list',
    name: 'feature',
    meta: {
      name: '资讯管理',
      icon: 'menu'
    },
    children: [
      {

        path: 'list',
        name: 'FeatureArticleListPage',
        component: FeatureArticleListPage,
        meta: { title: '资讯列表', noCache: true }
      },
      {
        path: "HotKeyWordPage",
        name: "hotKey-word-page",
        component: HotKeyWordPage,
        meta: { title: "热门关键词管理", noCache: true }
      },

    ]
  },
  {
    path: "/game",
    component: Layout,
    redirect: "/game/list",
    meta: {
      name: "游戏管理",
      icon: "google"
    },
    children: [
      {
        path: ":id(\\d+)",
        name: "game",
        component: GamePage,
        meta: { title: "游戏详情", noCache: true },
        hidden: true
      },
      {
        path: "pedia/:id(\\d+)",
        name: "pedia",
        component: PediaPage,
        meta: { title: "游戏百科", noCache: true },
        hidden: true
      },
      {
        path: "list",
        name: "game-list",
        component: GameListPage,
        meta: { title: "游戏列表", noCache: true }
      }
    ]
  },
  {
    path: "/orb",
    component: Layout,
    redirect: "/orb/list",
    meta: {
      name: "猩球管理",
      icon: "global"
    },
    children: [
      {
        path: ":id(\\d+)",
        name: "orb",
        component: OrbPage,
        meta: { title: "猩球更新", noCache: true },
        hidden: true
      },
      {
        path: "list",
        name: "orb-list",
        component: OrbListPage,
        meta: { title: "猩球列表", noCache: true }
      },
      {
        path: "FeaturedOrbList",
        name: "featured-orb-list",
        component: FeaturedOrbListPage,
        meta: { title: "精选猩球列表", noCache: true }
      },
      {
        path: "RecommendedOrbsPage",
        name: "recommended-orb-list",
        component: RecommendedOrbsPage,
        meta: { title: "推荐猩球列表", noCache: true }
      },
      {
        path: "roomarticlelist/:id(\\d+)",
        name: "room-article-list",
        component: RoomArticleListPage,
        meta: { title: "内容频道文章列表", noCache: true },
        hidden: true
      },
      {
        path: "userlist/:id(\\d+)",
        name: "userlist",
        component: OrbUserListPage,
        meta: { title: "猩球用户列表", noCache: true },
        hidden: true
      },



    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/list",
    meta: {
      name: "文章管理",
      icon: "global"
    },
    children: [
      {
        path: ":id(\\d+)",
        name: "article",
        component: ArticlePage,
        meta: { title: "文章详情", noCache: true },
        hidden: true
      },

      {
        path: "list",
        name: "article-list",
        component: ArticleListPage,
        meta: { title: "文章列表", noCache: true }
      }
    ]
  }
];

export default new VueRouter({
  routes,
  mode: "history"
});
