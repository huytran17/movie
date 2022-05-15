<template>
  <v-container fluid>
    <HomeSlider />
    <ListFilm
      v-if="has_popular_films"
      title="Phổ biến"
      :list_films="popular_films"
    />
    <ListFilm
      v-if="has_newest_films"
      title="Mới phát hành"
      :list_films="newest_films"
    />
    <ListFilm
      v-if="has_usuk_films"
      title="Phim Âu - Mỹ"
      :list_films="usuk_films"
    />
    <ListFilm
      v-if="has_vietnam_films"
      title="Phim Việt Nam"
      :list_films="vietnam_films"
    />
    <ListFilm
      v-if="has_horror_films"
      title="Phim Kinh dị"
      :list_films="horror_films"
    />
    <ListFilm
      v-if="has_comedy_films"
      title="Phim Hài"
      :list_films="comedy_films"
    />
    <ListFilm
      v-if="has_theater_films"
      title="Phim chiếu rạp"
      :list_films="theater_films"
    />
    <ListFilm
      v-if="has_fiction_films"
      title="Phim viễn tưởng"
      :list_films="fiction_films"
    />
    <ListFilm
      v-if="has_action_films"
      title="Phim hành động"
      :list_films="action_films"
    />
    <ListFilm v-if="has_kid_films" title="Trẻ em" :list_films="kid_films" />
    <ListFilm
      v-if="has_family_films"
      title="Phim Gia đình"
      :list_films="family_films"
    />
  </v-container>
</template>

<script>
import HomeSlider from "@/components/dashboard/HomeSlider";
import ListFilm from "@/components/dashboard/ListFilm";
import filmMixins from "@/mixins/film";

export default {
  name: "IndexPage",
  layout: "default",
  mixins: [filmMixins],
  components: { HomeSlider, ListFilm },
  computed: {
    comedy_films() {
      return this.filterFilmByCategory({ categories: "comedy" });
    },
    horror_films() {
      return this.filterFilmByCategory({ categories: "horror" });
    },
    theater_films() {
      return this.filterFilmByCategory({ categories: "theater" });
    },
    family_films() {
      return this.filterFilmByCategory({ categories: "family" });
    },
    kid_films() {
      return this.filterFilmByCategory({ categories: "cartoon" });
    },
    fiction_films() {
      return this.filterFilmByCategory({ categories: "fiction" });
    },
    action_films() {
      return this.filterFilmByCategory({ categories: "action" });
    },
    vietnam_films() {
      return this.filterFilmByCategory({ categories: "vietnam" });
    },
    usuk_films() {
      return this.filterFilmByCategory({ categories: "usuk" });
    },
    has_fiction_films() {
      return this.fiction_films.length > 0;
    },
    has_action_films() {
      return this.action_films.length > 0;
    },
    has_comedy_films() {
      return this.comedy_films.length > 0;
    },
    has_theater_films() {
      return this.theater_films.length > 0;
    },
    has_family_films() {
      return this.family_films.length > 0;
    },
    has_kid_films() {
      return this.kid_films.length > 0;
    },
    has_vietnam_films() {
      return this.vietnam_films.length > 0;
    },
    has_usuk_films() {
      return this.usuk_films.length > 0;
    },
    has_horror_films() {
      return this.horror_films.length > 0;
    },
    has_popular_films() {
      return this.popular_films.length > 0;
    },
    has_newest_films() {
      return this.newest_films.length > 0;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_FILMS_EXCLUDE_SERIES();
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>
