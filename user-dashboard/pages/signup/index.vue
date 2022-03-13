<template>
  <div
    class="container-fluid h-100 d-flex flex-column justify-center sign-up-page"
  >
    <SignUpForm />
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";
import SignUpForm from "@/components/auth/signup/SignUpForm";

export default {
  name: "SignInPage",
  mixins: [authMixin],
  components: {
    SignUpForm,
  },
};
</script>

<style scoped>
.sign-up-page {
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

.sign-up-page::before {
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
