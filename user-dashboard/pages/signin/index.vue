<template>
  <div
    class="container-fluid h-100 d-flex flex-column justify-center sign-in-page"
  >
    <SignInForm />
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
import SignInForm from "@/components/auth/signin/SignInForm";

export default {
  name: "SignInPage",
  mixins: [authMixin],
  layout: "public",
  components: {
    SignInForm,
  },
  async fetch() {
    try {
      const { is_error } = await this.AUTO_SIGN_IN();

      // if (!is_error) {
      //   this.$router.push(this.localePath("/"));
      // }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.sign-in-page {
  background-image: url("assets/images/auth/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: block;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}

.sign-in-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}
</style>
