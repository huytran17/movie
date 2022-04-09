<template>
  <div>
    <Editor :content="new_comment" />
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
