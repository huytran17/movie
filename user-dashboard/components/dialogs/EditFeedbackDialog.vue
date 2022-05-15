<template>
  <v-dialog
    v-if="choosen_feedback"
    :value="show_dialog"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-body-1">
        <span v-html="$t('Edit feedback')" class="app-title"></span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="pl-0 pb-0">
            <v-rating
              :value="choosen_feedback.star_count"
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
          <v-col cols="12" class="py-0">
            <v-text-field
              :value="choosen_feedback.content"
              hide-details
              :placeholder="$t('Type your feedback...')"
              class="pt-0"
              @input="
                updateFeedbackObject({
                  variable_path: 'content',
                  data: $event,
                })
              "
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog">
          <span v-html="$t('Cancel')"></span>
        </v-btn>
        <v-btn color="green darken-1" text @click="action">
          <span v-html="$t('Save')"></span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import feedbackMixins from "@/mixins/feedback";

export default {
  name: "EditFeedbackDialog",
  mixins: [feedbackMixins],
  props: {
    show_dialog: {
      type: Boolean,
      default() {
        return false;
      },
    },
    choosen_feedback: {
      type: Object,
      default() {
        return null;
      },
    },
    action: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },

  methods: {
    closeDialog() {
      this.$emit("close-edit-feedback-dialog");
    },
  },
};
</script>

<style></style>
