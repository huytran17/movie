<template>
  <div class="mt-5">
    <div class="text-body-1 text-sm-h6 font-weight-medium">
      <span>{{ $t("Contacts") }}</span>
    </div>
    <div>
      <v-tabs grow>
        <v-tab>
          <v-badge color="green" content="6">
            <span>{{ $t("Groups") }}</span>
          </v-badge>
        </v-tab>
        <v-tab>
          <v-badge color="green" content="6">
            <span>{{ $t("Friends") }}</span>
          </v-badge>
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactBox",
};
</script>

<style></style>
