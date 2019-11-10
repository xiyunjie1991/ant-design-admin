<template>
  <div class="root">
    <a-card hoverable class="card">
      <h2>玩家猩球管理平台</h2>
      <div class="form">
        <a-input class="input" placeholder="手机号" v-model="phone">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <a-input
          class="input"
          type="password"
          placeholder="密码"
          v-model="password"
          @pressEnter="submit"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <a-button
          @click="submit"
          block
          class="submit"
          type="primary"
          html-type="submit"
          :loading="loading"
          :disabled="phone==='' || password===''"
        >登录</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { login } from "@/api/account";
import { setToken } from "@/api/auth";
export default {
  name: "LoginPage",
  data() {
    return {
      phone: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async submit(e) {
      if (this.phone === "" || this.password === "") {
        return;
      }
      this.loading = true;
      try {
        const r = await login(this.phone, this.password);
        if (r.status === 10002) {
          this.$message.warn("手机号不存在");
        } else if (r.status === 10003) {
          this.$message.warn("密码错误");
        } else if (r.status !== 0) {
          this.$message.error("未知错误 - " + r.status);
        } else {
          setToken(r.data.token);
          this.$router.replace("/");
        }
      } catch (e) {
        console.error(e);
        this.$message.info("请求错误");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.root {
  width: 100%;
  height: 100%;
  text-align: center;

  background: url("../../assets/image/cover.jpg");

  .card {
    width: 360px;
    border-radius: 6px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    top: 50%;
    transform: translateY(-80%);

    h2 {
      user-select: none;
    }

    .form {
      margin-top: 20px;

      .input:not(:first-child) {
        margin-top: 10px;
      }

      .submit {
        margin-top: 15px;
      }
    }
  }
}
</style>