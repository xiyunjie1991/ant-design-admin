<template>
  <div></div>
</template>

<script>
export default {
  name: "WelcomePage",
  created() {
    const token = this.$cookies.get("token");
    if (token && token.length > 0) {
      this.$router.push("/dashboard");
    } else {
      this.$router.push("/login");
    }
  }
};
</script>