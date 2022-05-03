<template>
  <v-carousel
    cycle
    height="700"
    max-height="700"
    hide-delimiter-background
    show-arrows-on-hover
    :hide-delimiters="true"
    class="mb-5"
  >
    <v-carousel-item v-for="(item, i) in slide_items" :key="i">
      <v-sheet height="100%" class="position-relative">
        <v-img
          :src="item.slide_image_src"
          :alt="item.alt"
          :height="700"
          :max-height="700"
        />
        <div
          class="position-absolute slide-infomation white--text px-3 px-sm-9 py-5 w-100"
        >
          <div class="slide-title">
            <div class="text-h5 text-sm-h4">
              <span class="app-title text-capitalize">
                <span v-html="$t(item.title)"></span>
              </span>
            </div>
          </div>
          <div class="slide-functions d-flex flex-column flex-sm-row pt-8 pb-5">
            <div>
              <v-btn
                color="red white--text pr-2 ml-0 mt-3 mt-sm-0"
                depressed
                tile
                @click="item.play"
              >
                <span v-html="$t('Phát')"></span>
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="slide-description">
            <div class="text-subtitle-1 text-h6">
              <span class="app-body">
                <span v-html="$t(item.description)"></span>
              </span>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import systemMixins from "@/mixins/system";
import filmMixins from "@/mixins/film";

export default {
  name: "HomeSlider",
  mixins: [systemMixins, filmMixins],
  data() {
    return {
      slide_items: [],
    };
  },

  async fetch() {
    try {
      const { data: films } = await this.GET_FILMS_PAGINATED({
        page: 1,
        entries_per_page: 4,
        keep_in_store: false,
      });

      this.slide_items = films.map((film, index) => {
        return {
          slide_image_src: require(`@/assets/images/dashboard/slide-${
            index + 1
          }.webp`),
          alt: film.title,
          title: film.title,
          description: film.description,
          play: () => {
            this.$router.push(this.localePath(`/film/${film._id}`));
          },
        };
      });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.slide-infomation {
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.05);
}
</style>
