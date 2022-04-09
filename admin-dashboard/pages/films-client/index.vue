<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          depressed
          dense
          color="primary"
          @click="$router.push(localePath('/films-client/new'))"
        >
          <span class="text-body-2">
            <span class="app-body">
              <span v-html="$t('Thêm phim')"></span>
            </span>
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <BaseFilmTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseFilmTable from "@/pages/films-client/widget/BaseFilmTable";
export default {
  name: "UsersClient",
  components: { BaseFilmTable },
};
</script>

<style></style>
