<template>
  <v-skeleton-loader
    v-if="is_loading"
    type="table-heading, table-tbody, table-tfoot"
    class="w-100 mt-2"
  />
</template>

<script>
export default {
  name: "BaseTableLoader",
  props: {
    is_loading: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>

<style></style>
