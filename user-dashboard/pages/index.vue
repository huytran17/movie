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
import HomeSlider from "@/components/dashboard/HomeSlider";
import ListFilm from "@/components/dashboard/ListFilm";

export default {
  name: "IndexPage",
  layout: "default",
  components: { HomeSlider, ListFilm },
};
</script>
