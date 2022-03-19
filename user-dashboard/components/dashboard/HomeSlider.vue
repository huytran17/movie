<template>
  <v-carousel
    cycle
    height="700"
    max-height="700"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(image, i) in slide_images" :key="i">
      <v-sheet height="100%" class="position-relative">
        <v-img
          :src="image.src"
          :alt="image.alt"
          :height="700"
          :max-height="700"
        />
        <div
          class="position-absolute slide-infomation white--text px-9 py-5 w-100"
        >
          <div class="slide-title">
            <div class="text-h5 text-sm-h4">
              <span class="app-title text-capitalize">
                <span v-html="$t(image.title)"></span>
              </span>
            </div>
          </div>
          <div class="slide-functions d-flex pt-8 pb-5">
            <div>
              <v-btn color="white" depressed tile>
                <span v-html="$t('Xem trailer')"></span>
              </v-btn>
            </div>
            <div>
              <v-btn color="red white--text pr-2 ml-5" depressed tile>
                <span v-html="$t('Phát')"></span>
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="slide-description">
            <div class="text-subtitle-1 text-h6">
              <span class="app-body">
                <span v-html="$t(image.description)"></span>
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

export default {
  name: "HomeSlider",
  mixins: [systemMixins],
  data() {
    return {
      slide_images: [
        {
          src: require("@/assets/images/dashboard/slide-1.webp"),
          alt: "slide-1",
          title: "Mắt biếc",
          description:
            "Mắt biếc là phim điện ảnh chính kịch lãng mạn của Việt Nam năm 2019 do Victor Vũ đạo diễn, kiêm đảm nhiệm phần kịch bản cùng với nhóm biên kịch A Type Machine.",
        },
        {
          src: require("@/assets/images/dashboard/slide-2.webp"),
          alt: "slide-2",
          title: "Spider-man: No way home",
          description:
            "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        },
        {
          src: require("@/assets/images/dashboard/slide-3.webp"),
          alt: "slide-3",
          title: "Sherlock Holmes",
          description:
            "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional detective created by British author Sir Arthur Conan Doyle.",
        },
        {
          src: require("@/assets/images/dashboard/slide-4.webp"),
          alt: "slide-4",
          title: "Harry Potter",
          description:
            "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        },
      ],
    };
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
