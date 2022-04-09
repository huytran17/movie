<template>
  <div class="editor-component">
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      :toolbar-attributes="toolbarAttrs"
      v-model="content[attr]"
      :placeholder="placeholder"
      :extensions="extensions"
      :disabled="disabled"
      :loading="loading"
    />
  </div>
</template>

<script>
/**
 * @description Find out more information here https://github.com/iliyaZelenko/tiptap-vuetify
 */
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  props: {
    content: {
      type: Object,
      required: true,
    },
    attr: {
      type: String,
      default: "content",
    },
    placeholder: {
      type: String,
      default: "Write something …",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // declare extensions you want to use
    return {
      local_loading: false,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  computed: {
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "black", dark: true }
        : { color: "white" };
    },
  },
};
</script>
<style scoped>
.editor-component {
  padding: 10px 0px;
}
</style>
