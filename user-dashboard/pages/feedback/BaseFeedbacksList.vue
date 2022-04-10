<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-rating
              :value="new_feedback.star_count"
              background-color="green lighten-3"
              color="green"
              @change="
                updateFeedbackObject({
                  variable_path: 'star_count',
                  data: $event,
                })
              "
            ></v-rating>
          </v-col>
          <v-col cols="12" class="pt-0"
            ><v-text-field
              hide-details
              placeholder="Type your feedback..."
              class="pt-0"
              @input="
                updateFeedbackObject({
                  variable_path: 'content',
                  data: $event,
                })
              "
            ></v-text-field
          ></v-col>

          <v-col cols="12" class="pt-0 d-flex justify-end">
            <v-btn depressed color="primary" @click="createFeedback">
              <span v-html="$t('Gửi')"></span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="has_feedback_list" class="pt-2 feedback-wrapper">
      <v-col cols="12" class="pt-0">
        <v-row>
          <v-col
            cols="12"
            v-for="(feedback, index) in get_feedback_list"
            :key="index"
          >
            <v-row>
              <v-col cols="11" class="pb-0 d-flex">
                <div>
                  <v-img
                    src="https://picsum.photos/id/11/500/300"
                    width="40"
                    height="40"
                    class="rounded-circle"
                  ></v-img>
                </div>
                <div class="ml-3">
                  <v-rating
                    :value="feedback.star_count"
                    readonly
                    background-color="yellow lighten-3"
                    color="yellow"
                  ></v-rating>

                  <div class="text-body-2">
                    <span class="app-body">
                      <span
                        class="feedback-title"
                        v-html="$t(feedback.content)"
                      ></span>
                    </span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import feedbackMixins from "@/mixins/feedback";
import authMixins from "@/mixins/auth";

export default {
  name: "BaseFeedbacksList",
  mixins: [feedbackMixins, authMixins],
  props: {
    film_id: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed: {
    get_feedback_list() {
      return this.feedbacks || [];
    },
    has_feedback_list() {
      return this.get_feedback_list.length > 0;
    },
  },
  methods: {
    async createFeedback() {
      await Promise.all([
        this.CREATE_FEEDBACK({
          user: this.user._id,
          film: this.film_id,
        }),
        this.GET_FEEDBACK_BY_FILM_ID({ film_id: this.film_id }),
      ]);
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await Promise.all([
        this.GET_FEEDBACK_BY_FILM_ID({ film_id: this.film_id }),
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
.feedback-list {
  max-height: 507.75px;
  overflow: auto;
}
/* width */
.feedback-wrapper::-webkit-scrollbar {
  width: 1px;
}

/* Track */
.feedback-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.feedback-wrapper::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.feedback-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.feedback-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
::v-deep .mdi-star {
  padding-top: 0 !important;
}
::v-deep .mdi-star:first-child,
::v-deep .mdi-star-outline:first-child {
  padding-left: 0 !important;
}
::v-deep .v-rating--readonly > button {
  padding-top: 0 !important;
}
.feedback-wrapper {
  max-height: 500px;
  overflow-y: auto;
}
</style>
