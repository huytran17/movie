<template>
  <div>
    <Editor
      :content="comment_data"
      @on-input="
        updateCommentObject({
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
  data() {
    return {
      comment_data: {
        content: "",
      },
    };
  },
};
</script>

<style></style>
