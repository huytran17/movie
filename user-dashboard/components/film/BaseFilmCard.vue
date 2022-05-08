<template>
  <v-badge
    v-if="getAgeLimit()"
    color="green"
    :content="getAgeLimitString()"
    offset-y="26px"
    :offset-x="getAgeLimit() < 10 ? '25px' : '30px'"
  >
    <v-card
      class="my-1 mx-1 position-relative no-border-radius no-box-shadow"
      @click="goToFilm"
      height="250"
      width="180"
    >
      <v-img
        :src="getFilmThumbnail()"
        :alt="film_item.title"
        cover
        max-height="345.83"
        class="no-border-radius"
      >
      </v-img>
    </v-card>
  </v-badge>
  <v-card
    v-else
    class="my-1 mx-1 position-relative no-border-radius no-box-shadow"
    @click="goToFilm"
    height="250"
    width="180"
  >
    <v-img
      :src="getFilmThumbnail()"
      :alt="film_item.title"
      cover
      class="no-border-radius"
    >
    </v-img>
  </v-card>
</template>

<script>
import authMixins from "@/mixins/auth";
export default {
  name: "BaseFilmCard",
  mixins: [authMixins],
  props: {
    film_item: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      show_notification_dialog: false,
    };
  },
  methods: {
    getAgeLimit() {
      const age_limit = _.get(this.film_item, "meta.age_limit", 0);
      return age_limit;
    },
    getAgeLimitString() {
      const age_limit = this.getAgeLimit();
      return `${age_limit}+`;
    },

    getFilmThumbnail() {
      return _.get(this.film_item, "aws_thumbnail.meta.location", "");
    },

    goToFilm() {
      console.log(this.user);
      const user_birthday = _.get(this.user, "birthday");
      const user_age = this.$moment().diff(user_birthday, "years");
      const film_age_limit = _.get(this.film_item, "meta.age_limit");
      const should_compare = !_.isNil(user_age) && !_.isNil(film_age_limit);

      if (should_compare) {
        const can_not_play = user_age < film_age_limit;
        if (can_not_play) {
          this.$emit("open-notification-dialog", { age: film_age_limit });
          return;
        }
      }

      this.$router.push(this.localePath(`/film/${this.film_item._id}`));
    },
  },
};
</script>

<style scoped></style>
