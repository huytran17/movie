<template>
  <v-row v-if="has_suggestion_list" class="pt-3">
    <v-col cols="12">
      <v-row class="suggestion-list">
        <v-col
          cols="4"
          lg="12"
          v-for="(film, index) in get_suggestion_list"
          :key="index"
        >
          <v-row>
            <v-col cols="12" lg="5" class="d-flex d-lg-block">
              <v-img
                src="https://picsum.photos/id/11/500/300"
                cover
                width="200px"
                @click="$router.push(localePath(`/film/${film._id}`))"
                class="clickable"
              ></v-img>
            </v-col>
            <v-col cols="7" class="d-none d-lg-block pl-0">
              <div class="text-body-2">
                <span class="app-body">
                  <span
                    class="suggestion-title clickable"
                    v-html="$t(film.title)"
                    @click="$router.push(localePath(`/film/${film._id}`))"
                  ></span>
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
      const filtered_films = this.filterFilmByCategory({
        category: this.category,
        exclude_id: this.exclude_id,
      });
      return filtered_films;
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

<style scoped>
.suggestion-list {
  max-height: 507.75px;
  overflow: auto;
}
/* width */
.suggestion-list::-webkit-scrollbar {
  width: 1px;
}

/* Track */
.suggestion-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.suggestion-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.suggestion-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.suggestion-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
::v-deep .v-btn {
  border-radius: 0 !important;
}
</style>
