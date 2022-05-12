<template>
  <v-container>
    <div class="text-h6">
      <span class="app-title">
        <span v-html="$t('No data found..')"></span>
      </span>
    </div>
    <div class="text-body-2">
      <v-btn color="primary" @click="$router.push(localePath(''))" depressed>
        <span class="app-body">
          <span v-html="$t('Back to home')"></span>
        </span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
