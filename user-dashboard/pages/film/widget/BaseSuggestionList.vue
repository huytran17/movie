<template>
  <v-row v-if="has_suggestion_list">
    <v-col cols="12">
      <div class="text-body-2 text-sm-body-1">
        <span class="app-title">
          <span v-html="$t('Gợi ý')"></span>
        </span>
      </div>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col
          cols="4"
          lg="12"
          v-for="(film, index) in get_suggestion_list"
          :key="index"
        >
          <v-row>
            <v-col cols="4" lg="5">
              <v-img :src="film.thumbnail_url" width=""></v-img>
            </v-col>
            <v-col cols="7" class="d-none d-lg-block">
              <div class="text-body-2">
                <span class="app-body">
                  <span v-html="$t(film.title)"></span>
                </span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import filmMixins from "@/mixins/film";

export default {
  name: "BaseSuggestionList",
  mixins: [filmMixins],
  props: {
    category: {
      type: String,
      default() {
        return "vietnam";
      },
    },
    exclude_id: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed: {
    get_suggestion_list() {
      return this.filterFilmByCategory({
        category: this.category,
        exclude_id: this.exclude_id,
      });
    },
    has_suggestion_list() {
      return this.get_suggestion_list.length > 0;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await Promise.all([this.GET_FILMS()]);
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style></style>
