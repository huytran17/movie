<template>
  <SignUpForm />
</template>

<script>
import systemMixins from "@/mixins/system";
import SignUpForm from "@/components/auth/SignUpForm";

export default {
  name: "LoginPage",
  mixins: [systemMixins],
  layout() {
    return "public";
  },
  components: {
    SignUpForm,
  },
};
</script>

<style lang="scss" scoped></style>
