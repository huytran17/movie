<template>
  <DashboardStatistic />
</template>

<script>
import authMixin from "@/mixins/auth";

import DashboardStatistic from "@/components/dashboard/DashboardStatistic";
export default {
  name: "IndexPage",
  layout: "default",
  mixins: [authMixin],
  components: {
    DashboardStatistic,
  },
  // async fetch() {
  //   try {
  //     await this.VERIFY();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
};
</script>
