<template>
  <LoginForm />
</template>

<script>
import systemMixins from "@/mixins/system";
import LoginForm from "@/components/auth/LoginForm";

export default {
  name: "LoginPage",
  mixins: [systemMixins],
  layout() {
    return "public";
  },
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss" scoped></style>
