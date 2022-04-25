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
              @input="
                updateFeedbackObject({
                  variable_path: 'star_count',
                  data: $event,
                })
              "
            ></v-rating>
          </v-col>
          <v-col cols="12" class="pt-0"
            ><v-text-field
              :value="new_feedback.content"
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
    <v-row v-if="has_feedbacks" class="pt-2 feedback-wrapper">
      <v-col cols="12" class="pt-0">
        <v-row>
          <v-col
            cols="12"
            v-for="(feedback_item, index) in feedbacks"
            :key="index"
          >
            <v-row>
              <v-col
                :cols="can_edit_feedback ? '10' : '12'"
                class="pb-0 d-flex"
              >
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
                    :value="feedback_item.star_count"
                    readonly
                    background-color="yellow lighten-3"
                    color="yellow"
                  ></v-rating>

                  <div class="text-body-2">
                    <span class="app-body">
                      <span
                        class="feedback-title"
                        v-html="$t(feedback_item.content)"
                      ></span>
                    </span>
                  </div>
                </div>
              </v-col>

              <v-col v-if="can_edit_feedback" cols="2">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" class="ml-auto d-block"
                      >mdi-dots-vertical</v-icon
                    >
                  </template>
                  <v-list>
                    <v-list-item class="clickable">
                      <v-list-item-title
                        @click="
                          openEditFeedbackDialog({ feedback: feedback_item })
                        "
                      >
                        <span v-html="$t('Edit')"></span>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item class="clickable">
                      <v-list-item-title>
                        <span
                          v-html="$t('Delete')"
                          @click="deleteFeedback({ feedback: feedback_item })"
                        ></span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <EditFeedbackDialog
      :show_dialog="show_edit_feedback_dialog"
      :choosen_feedback="feedback"
      :action="updateFeedback"
      @close-edit-feedback-dialog="show_edit_feedback_dialog = false"
    />
  </div>
</template>

<script>
import feedbackMixins from "@/mixins/feedback";
import authMixins from "@/mixins/auth";
import EditFeedbackDialog from "@/components/dialogs/EditFeedbackDialog";

export default {
  name: "BaseFeedbacksList",
  mixins: [feedbackMixins, authMixins],
  components: {
    EditFeedbackDialog,
  },
  props: {
    film_id: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      show_edit_feedback_dialog: false,
    };
  },
  computed: {
    can_edit_feedback(feedback) {
      const feedback_user = _.get(feedback, "user._id", "");
      const user_can_edit = feedback_user === this.user._id;

      return user_can_edit;
    },

    has_feedbacks() {
      return this.feedbacks.length > 0;
    },
  },
  methods: {
    async updateFeedback() {
      await this.UPDATE_FEEDBACK({
        feedback_id: this.feedback._id,
      });
      await this.GET_FEEDBACK_BY_FILM_ID({ film_id: this.film_id });

      this.show_edit_feedback_dialog = false;
    },
    async deleteFeedback({ feedback }) {
      await this.DELETE_FEEDBACK({
        feedback_id: feedback._id,
      });
      await this.GET_FEEDBACK_BY_FILM_ID({ film_id: this.film_id });
    },
    openEditFeedbackDialog({ feedback }) {
      this.show_edit_feedback_dialog = true;
      const feedback_data_to_edit = {
        _id: feedback._id,
        star_count: feedback.star_count,
        content: feedback.content,
      };
      this.SET_FEEDBACK({ data: feedback_data_to_edit });
    },
    async createFeedback() {
      await this.CREATE_FEEDBACK({
        user: this.user._id,
        film: this.film_id,
      });
      await this.GET_FEEDBACK_BY_FILM_ID({ film_id: this.film_id });

      this.updateFeedbackObject({
        variable_path: "star_count",
        data: 5,
      });

      this.updateFeedbackObject({
        variable_path: "content",
        data: "",
      });
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
