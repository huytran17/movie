<template>
  <v-container fluid>
    <v-row class="justify-center">
      <div class="text-h5 primary--text pb-5">
        <span class="app-title">
          <span
            v-html="
              $t(
                `Thống kê từ ${$moment()
                  .subtract('1', 'year')
                  .format('DD/MM/YYYY')} đến ${$moment().format('DD/MM/YYYY')}`
              )
            "
          ></span>
        </span>
      </div>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <BaseLineChartLoader v-if="chart_loading" />
          <BaseLineCharts
            v-else
            :chartData="admin_chart_data"
            :options="getLineChartOptions()"
            class="admin-statistic-chart"
          />
        </div>
        <div class="mt-4">
          <BaseLineChartLoader v-if="chart_loading" />
          <BaseLineCharts
            v-else
            :chartData="user_chart_data"
            :options="getLineChartOptions()"
            class="admin-statistic-chart"
          />
        </div>
        <div class="mt-4">
          <BaseLineChartLoader v-if="chart_loading" />
          <BaseLineCharts
            v-else
            :chartData="film_chart_data"
            :options="getLineChartOptions()"
            class="admin-statistic-chart"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import analyticsMixins from "@/mixins/analytics";
import BaseLineCharts from "@/components/charts/BaseLineCharts";
import BaseLineChartLoader from "@/components/loaders/BaseLineChartLoader";

export default {
  name: "DashboardStatistic",
  mixins: [analyticsMixins],
  components: {
    BaseLineCharts,
    BaseLineChartLoader,
  },
  computed: {
    /**
     * get film chart data
     */
    film_chart_data() {
      return {
        labels: this.admin_date_count_analytics,
        datasets: [
          {
            label: "Film",
            borderColor: "yellow",
            borderWidth: 1,
            backgroundColor: "rgba(246, 255, 0, 0.4)",
            data: this.film_count_analytics,
          },
        ],
      };
    },
    /**
     * get user chart data
     */
    user_chart_data() {
      return {
        labels: this.admin_date_count_analytics,
        datasets: [
          {
            label: "User",
            borderColor: "green",
            borderWidth: 1,
            backgroundColor: "rgba(0, 255, 46, 0.4)",
            data: this.admin_count_analytics,
          },
        ],
      };
    },
    /**
     * get admin chart data
     */
    admin_chart_data() {
      return {
        labels: this.admin_date_count_analytics,
        datasets: [
          {
            label: "Admin",
            borderColor: "blue",
            borderWidth: 1,
            backgroundColor: "rgba(84, 203, 247, 0.4)",
            data: this.admin_count_analytics,
          },
        ],
      };
    },
  },

  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await Promise.all([
        this.GET_ADMIN_ANALYTICS(),
        this.GET_USER_ANALYTICS(),
        this.GET_FILM_ANALYTICS(),
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
.admin-statistic-chart {
  max-height: 256px;
}
</style>
