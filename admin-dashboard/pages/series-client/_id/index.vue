<template>
  <v-container v-if="has_series">
    <div class="text-body-1 text-sm-h6 text-uppercase primary--text mb-4">
      <span class="app-title">
        <span v-html="$t('Chỉnh Sửa Series')"></span>
      </span>
    </div>
    <v-form v-model="form_valid">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            :rules="titleRules"
            :label="$t('Title')"
            :value="series.title"
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
            @click="updateSeries()"
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
  computed: {
    has_series() {
      return !!this.series;
    },
  },
  methods: {
    async updateSeries() {
      await this.UPDATE_SERIES({ series_id: this.series._id });
    },

    updateInput({ variable_path, data }) {
      this.SET_SERIES_DATA({
        variable_path,
        data,
      });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      const series_id = this.$route.params.id;
      await this.GET_SERIES({ series_id });
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style></style>
