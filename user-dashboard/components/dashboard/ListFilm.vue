<template>
  <div class="mt-5">
    <div class="title">
      <div class="text-subtitle-1 text-h6">
        <span class="app-body white--text">
          <span v-html="$t(title)"></span>
        </span>
      </div>
    </div>
    <div class="video-list mt-2">
      <v-sheet class="mx-auto w-100" elevation="8" dark>
        <v-slide-group show-arrows="mobile" class="position-relative">
          <v-slide-item
            v-for="(film, index) in films"
            :key="index"
            class="clickable"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                class="my-4 mx-2 position-relative"
                height="250"
                width="180"
              >
                <v-img
                  :lazy-src="film.image_lazy_src"
                  :src="film.image_src"
                  :alt="film.title"
                  height="100%"
                  width="100%"
                  cover
                >
                  <div
                    :class="{ 'show-title': hover && !is_mobile }"
                    class="transparent--text px-2 py-1 w-100 film-title position-absolute"
                  >
                    <div class="text-subtitle-2 text-sm-subtitle-1">
                      <span class="app-title">
                        <span v-html="$t(film.title)"></span>
                      </span>
                    </div>
                  </div>
                </v-img>
              </v-card>
            </v-hover>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "ListFilm",
  mixins: [systemMixins],
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    films: {
      type: Array,
      default() {
        return [
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
          {
            title: "Populate film",
            url: "http://",
            image_src: "https://picsum.photos/id/11/500/300",
            image_lazy_src: "https://picsum.photos/id/11/10/6",
          },
        ];
      },
    },
  },
};
</script>

<style scoped>
.show-title {
  color: #ffffff !important;
  background: rgba(0, 0, 0, 0.5);
  transform: translateY(0%) !important;
}
.film-title {
  bottom: 0;
  transition: all 0.25s linear;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transform: translateY(100%);
}
::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
  position: absolute;
  height: 100%;
  transition: all 0.3s linear;
  background: rgba(0, 0, 0, 0);
  min-width: 30px !important;
  z-index: 999;
}
::v-deep .v-slide-group__prev .v-icon,
::v-deep .v-slide-group__next .v-icon {
  opacity: 0 !important;
}
::v-deep .v-slide-group__prev {
  left: 0;
}
::v-deep .v-slide-group__next {
  right: 0;
}
::v-deep .v-item-group:hover .v-slide-group__prev {
  background: rgba(0, 0, 0, 0.2);
}
::v-deep .v-item-group:hover .v-slide-group__next {
  background: rgba(0, 0, 0, 0.2);
}
::v-deep .v-item-group:hover .v-slide-group__prev .v-icon {
  opacity: 1 !important;
}
::v-deep .v-item-group:hover .v-slide-group__next .v-icon {
  opacity: 1 !important;
}
</style>
