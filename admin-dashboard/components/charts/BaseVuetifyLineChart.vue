<template>
  <v-card class="mt-4 mx-auto" max-width="400">
    <v-sheet class="v-sheet--offset mx-auto" :color="color" elevation="12" max-width="calc(100% - 32px)">
      <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16" auto-draw></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">{{ title }}</div>
      <div class="subheading font-weight-light grey--text">
        {{ sub_title }}
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>{{ icon }}</v-icon>
      <span class="caption grey--text font-weight-light">{{ last_modified_status }}</span>
    </v-card-text>
  </v-card>
</template>
w

<script>
export default {
  name: "VuetifyLineChart",
  props: {
    title: { type: String, default: "User Registrations" },
    sub_title: { type: String, default: "Last Campaign Performance" },
    icon: { type: String, default: "mdi-clock" },
    last_modified_status: {
      type: String,
      default: "last registration 26 minutes ago",
    },
    color: { type: String, default: "cyan" },
    labels: {
      yype: Array,
      default() {
        return ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
      },
    },
    // eslint-disable-next-line vue/require-valid-default-prop
    value: { type: Array, default: [200, 675, 410, 390, 310, 460, 250, 240] },
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
