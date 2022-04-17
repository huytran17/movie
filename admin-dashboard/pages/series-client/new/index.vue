<template>
  <v-container>
    <div class="text-body-1 text-sm-h6 text-uppercase primary--text mb-4">
      <span class="app-title">
        <span v-html="$t('Thêm Series')"></span>
      </span>
    </div>
    <v-form v-model="form_valid">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            :rules="titleRules"
            :label="$t('Title')"
            :value="new_series.title"
            required
            @input="updateInput({ variable_path: 'title', data: $event })"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            depressed
            color="primary"
            @click="createSeries()"
            :disabled="!form_valid"
          >
            <span v-html="$t('Lưu')"></span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import seriesMixins from "@/mixins/series";

export default {
  name: "NewUser",
  mixins: [seriesMixins],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    async createSeries() {
      await this.CREATE_SERIES();
      this.$router.push(this.localePath("/series-client"));
    },

    updateInput({ variable_path, data }) {
      this.UPDATE_NEW_SERIES_DATA({
        variable_path,
        data,
      });
    },
  },
};
</script>

<style></style>
