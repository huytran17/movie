<template>
  <v-container class="d-flex justify-center pt-10">
    <div class="d-flex flex-column justify-center">
      <div class="text-h6">
        <span class="app-title">
          <span v-html="$t('No data found...')"></span>
        </span>
      </div>
      <div>
        <v-img :src="no_data_image" max-width="300px"></v-img>
      </div>
      <div class="text-body-2 d-flex justify-center">
        <v-btn color="primary" @click="$router.push(localePath(''))" depressed>
          <span class="app-body">
            <span v-html="$t('Back to home')"></span>
          </span>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "BaseNoContent",
  data() {
    return {
      no_data_image: require("@/assets/images/empty_item.svg"),
    };
  },
};
</script>

<style></style>
