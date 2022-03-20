<template>
  <v-container fluid>
    <HomeSlider />
    <ListFilm title="Phổ biến" />
    <ListFilm title="Âu - Mỹ" />
    <ListFilm title="Mới phát hành" />
    <ListFilm title="Việt Nam" />
    <ListFilm title="Kinh dị" />
    <ListFilm title="Hài" />
    <ListFilm title="Phim tài liệu" />
    <ListFilm title="Trẻ em" />
    <ListFilm title="Gia đình" />
  </v-container>
</template>

<script>
import authMixin from "@/mixins/auth";
import HomeSlider from "@/components/dashboard/HomeSlider";
import ListFilm from "@/components/dashboard/ListFilm";

export default {
  name: "IndexPage",
  layout: "default",
  mixins: [authMixin],
  components: { HomeSlider, ListFilm },
  async fetch() {
    try {
      await this.VERIFY();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
