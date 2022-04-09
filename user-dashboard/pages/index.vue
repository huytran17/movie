<template>
  <v-container fluid>
    <HomeSlider />
    <ListFilm
      v-if="has_populate_films"
      title="Phổ biến"
      :list_films="populate_films"
    />
    <ListFilm
      v-if="has_newest_films"
      title="Mới phát hành"
      :list_films="newest_films"
    />
    <ListFilm v-if="has_usuk_films" title="Âu - Mỹ" :list_films="usuk_films" />
    <ListFilm
      v-if="has_vietnam_films"
      title="Việt Nam"
      :list_films="vietnam_films"
    />
    <ListFilm
      v-if="has_horror_films"
      title="Kinh dị"
      :list_films="horror_films"
    />
    <ListFilm v-if="has_comedy_films" title="Hài" :list_films="comedy_films" />
    <ListFilm
      v-if="has_documentary_films"
      title="Phim tài liệu"
      :list_films="documentary_films"
    />
    <ListFilm v-if="has_kid_films" title="Trẻ em" :list_films="kid_films" />
    <ListFilm
      v-if="has_family_films"
      title="Gia đình"
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
      return this.filterFilmByCategory({ category: "comedy" });
    },
    horror_films() {
      return this.filterFilmByCategory({ category: "horror" });
    },
    documentary_films() {
      return this.filterFilmByCategory({ category: "documentary" });
    },
    family_films() {
      return this.filterFilmByCategory({ category: "family" });
    },
    kid_films() {
      return this.filterFilmByCategory({ category: "kid" });
    },
    vietnam_films() {
      return this.filterFilmByCategory({ category: "vietnam" });
    },
    usuk_films() {
      return this.filterFilmByCategory({ category: "usuk" });
    },
    has_comedy_films() {
      return this.comedy_films.length > 0;
    },
    has_documentary_films() {
      return this.documentary_films.length > 0;
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
    has_populate_films() {
      return this.populate_films.length > 0;
    },
    has_newest_films() {
      return this.newest_films.length > 0;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_FILMS();
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>
