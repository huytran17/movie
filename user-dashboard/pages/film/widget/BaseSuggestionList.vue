<template>
  <v-row v-if="has_suggestions_list" class="pt-3">
    <v-col cols="12">
      <v-row class="suggestion-list">
        <v-col
          cols="4"
          lg="12"
          v-for="(film, index) in suggestions_list"
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
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    exclude_ids: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      suggestions_list: [],
    };
  },
  computed: {
    has_suggestions_list() {
      return this.suggestions_list.length > 0;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      console.log("-----------------", this.categories);
      const { data, pagination } = await this.GET_FILMS_PAGINATED({
        categories: this.categories,
        exclude_ids: this.exclude_ids,
        keep_in_store: false,
        new_state: true,
      });
      this.suggestions_list = data;
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
