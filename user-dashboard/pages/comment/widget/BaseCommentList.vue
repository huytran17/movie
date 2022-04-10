<template>
  <div>
    <v-row v-for="(comment, index) in comments" :key="index">
      <v-col cols="12" class="d-flex pb-0">
        <div>
          <v-img
            src="https://picsum.photos/id/11/500/300"
            width="40"
            height="40"
            class="rounded-circle"
          ></v-img>
        </div>
        <div class="pl-4">
          <div class="text-body-2">
            <span class="app-title">
              <span
                >{{ comment.user.first_name }}
                {{ comment.user.last_name }}</span
              >
            </span>
          </div>
          <div class="text-body-2">
            <span class="app-body">
              <span v-html="$t(comment.content)"></span>
            </span>
          </div>
        </div>
      </v-col>

      <v-col class="pt-0 comment-function">
        <div>
          <div class="text-body-2">
            <span class="app-body">
              <i>
                <small>
                  {{ $moment(comment.created_at).fromNow() }}
                </small>
              </i>
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import commentMixins from "@/mixins/comment";
export default {
  name: "BaseCommentList",
  mixins: [commentMixins],
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_COMMENTS();
    } catch (e) {
      console.log(e);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>

<style scoped>
.comment-function {
  padding-left: 66px;
}
</style>
