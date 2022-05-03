<template>
  <v-dialog
    v-if="choosen_comment"
    :value="show_dialog"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-body-1">
        <span v-html="$t('Edit comment')" class="app-title"></span>
      </v-card-title>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" class="py-0">
            <Editor
              :content="choosen_comment"
              @on-input="
                updateEditCommentObject({
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
  name: "EditCommentDialog",
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
      this.$emit("close-edit-comment-dialog");
    },
  },
};
</script>

<style></style>
