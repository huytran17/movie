<template>
  <div class="pt-3">
    <Editor
      :content="new_comment"
      @on-input="
        updateNewCommentObject({
          variable_path: 'content',
          data: $event,
        })
      "
    />
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import commentMixins from "@/mixins/comment";

export default {
  name: "BaseCommentForm",
  mixins: [commentMixins],
  component: { Editor },
};
</script>

<style></style>
