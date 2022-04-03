<template></template>

<script>
import authMixin from "@/mixins/auth";

export default {
  name: "IndexPage",
  layout: "default",
  mixins: [authMixin],
  async fetch() {
    try {
      await this.VERIFY();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
