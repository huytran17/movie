<template>
  <v-container fluid>
    <div class="user-statistic">
      <BaseLineCharts
        :chartData="chartData"
        :options="options"
        class="user-statistic-chart"
      />
    </div>
  </v-container>
</template>

<script>
import analyticsMixins from "@/mixins/analytics";
import BaseLineCharts from "@/components/charts/BaseLineCharts";
export default {
  name: "DashboardStatistic",
  mixins: [analyticsMixins],
  components: {
    BaseLineCharts,
  },
  data() {
    return {
      chartData: {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          {
            label: "Test 1",
            borderColor: "blue",
            borderWidth: 1,
            data: [100, 200, 140],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
    };
  },

  async fetch() {
    try {
      await this.GET_USER_ANALYTICS();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.user-statistic-chart {
  height: 300px;
  max-height: 300px;
}
</style>
