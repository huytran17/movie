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
        <v-col cols="12" sm="7">
          <v-file-input
            v-model="file_of_series_thumbnail"
            small-chips
            truncate-length="15"
            :label="$t('Choose thumbnail')"
            @change="uploadThumbnail"
            accept="image/*"
          ></v-file-input>
        </v-col>
        <v-col
          v-if="series_thumbnail"
          cols="12"
          sm="5"
          class="d-flex justify-end"
        >
          <v-img :src="series_thumbnail"></v-img>
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
      file_of_series_thumbnail: null,
    };
  },
  computed: {
    has_series() {
      return !!this.series;
    },
    series_thumbnail() {
      const has_aws_location = _.get(
        this.series,
        "aws_thumbnail.meta.location",
        ""
      );
      return has_aws_location;
    },
  },
  methods: {
    async updateSeries() {
      const { is_error, message } = await this.UPDATE_SERIES({
        series_id: this.series._id,
      });
      if (is_error) {
        this.$toast.error(this.$t(message));
        return;
      }
      this.$toast.success(this.$t("Updated series successfully!"));
    },

    updateInput({ variable_path, data }) {
      this.SET_SERIES_DATA({
        variable_path,
        data,
      });
    },

    async uploadThumbnail() {
      const max_size = 50 * 1024 * 1024; // 5MB
      const file = this.file_of_series_thumbnail;
      const file_size = _.get(file, "size", max_size + 1);

      if (file && file_size <= max_size) {
        this.$nextTick(async () => {
          const { is_error, message } = await this.UPDATE_SERIES_THUMBNAIL({
            file: this.file_of_series_thumbnail,
            series_id: this.series._id,
          });
          if (is_error) {
            this.$toast.error(this.$t(message));
            return;
          }
          this.$toast.success(this.$t("Updated series successfully!"));
        });
      }
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
