<template>
  <v-row v-if="has_feedback_list">
    <v-col cols="12">
      <v-row class="feedback-list">
        <v-col
          cols="4"
          lg="12"
          v-for="(feedback, index) in get_feedback_list"
          :key="index"
        >
          <v-row>
            <v-col cols="12" lg="5" class="d-flex d-lg-block">
              <v-img
                src="https://picsum.photos/id/11/500/300"
                cover
                width="200px"
                @click="$router.push(localePath(`/feedback/${feedback._id}`))"
                class="clickable"
              ></v-img>
            </v-col>
            <v-col cols="7" class="d-none d-lg-block pl-0">
              <div class="text-body-2">
                <span class="app-body">
                  <span
                    class="feedback-title clickable"
                    v-html="$t(feedback.title)"
                    @click="
                      $router.push(localePath(`/feedback/${feedback._id}`))
                    "
                  ></span>
                </span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import feedbackMixins from "@/mixins/feedback";

export default {
  name: "BaseFeedbackList",
  mixins: [feedbackMixins],
  computed: {
    has_feedback_list() {
      return this.get_feedback_list.length > 0;
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await Promise.all([this.GET_FEEDBACKS()]);
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
.feedback-list::-webkit-scrollbar {
  width: 1px;
}

/* Track */
.feedback-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.feedback-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.feedback-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.feedback-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
