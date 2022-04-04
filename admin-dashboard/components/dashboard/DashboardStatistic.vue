<template>
  <div>
    <BaseLineCharts :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import BaseLineCharts from "@/components/charts/BaseLineCharts";
export default {
  name: "DashboardStatistic",
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
        responsive: true,
      },
    };
  },
};
</script>

<style></style>
