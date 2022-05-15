<template>
  <v-dialog
    v-if="choosen_comment"
    :value="show_dialog"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-body-1">
        <span v-html="$t('Reply comment')" class="app-title"></span>
      </v-card-title>
      <v-card-text class="mt-4">
        <blockquote class="text-body-2">
          <span class="app-body" v-html="choosen_comment.content"></span>
        </blockquote>
      </v-card-text>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" class="py-0">
            <Editor
              :content="new_comment"
              @on-input="
                updateNewCommentObject({
                  variable_path: 'content',
                  data: $event,
                })
              "
            />
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
import commentMixins from "@/mixins/comment";

export default {
  name: "BaseReplyCommentDialog",
  mixins: [commentMixins],
  props: {
    show_dialog: {
      type: Boolean,
      default() {
        return false;
      },
    },
    choosen_comment: {
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
      this.$emit("close-reply-comment-dialog");
    },
  },
};
</script>

<style></style>
