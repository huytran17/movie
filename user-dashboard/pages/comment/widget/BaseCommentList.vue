<template>
  <div class="mt-6">
    <v-row v-for="(comment_item, index) in comments" :key="index">
      <v-col cols="11">
        <v-row>
          <v-col cols="12" class="d-flex pb-0">
            <div>
              <v-img
                :src="user_avatar"
                width="40"
                height="40"
                class="rounded-circle"
              ></v-img>
            </div>
            <div class="pl-4">
              <div class="text-body-2">
                <span class="app-title">
                  <span
                    >{{ comment_item.user.first_name }}
                    {{ comment_item.user.last_name }}</span
                  >
                </span>
              </div>
              <div class="text-body-2">
                <span class="app-body">
                  <span v-html="$t(comment_item.content)"></span>
                </span>
              </div>

              <div class="mt-n4 mb-2 like">
                <v-icon
                  small
                  class="clickable"
                  :color="userLiked(comment_item) ? 'red' : ''"
                  @click="
                    likeComment({
                      comment_id: comment_item._id,
                      user_id: user._id,
                    })
                  "
                  >{{
                    userLiked(comment_item) ? "mdi-heart" : "mdi-heart-outline"
                  }}</v-icon
                >
                <span class="text-body-2">
                  <span class="app-body">
                    <span v-html="countCommentLikes(comment_item)"></span>
                  </span>
                </span>
                <v-icon small class="ml-2 clickable">mdi-reply-outline</v-icon>
              </div>
            </div>
          </v-col>

          <v-col class="pt-0 comment-function mt-n3" cols="12">
            <div>
              <div class="text-body-2">
                <span class="app-body">
                  <i>
                    <small>
                      {{ $moment(comment_item.created_at).fromNow() }}
                    </small>
                  </i>
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col v-if="can_edit_comment" cols="1">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              class="ml-auto d-block"
              @click="setChoosenComment({ comment: comment_item })"
              >mdi-dots-vertical</v-icon
            >
          </template>
          <v-list>
            <v-list-item class="clickable">
              <v-list-item-title @click="openEditCommentDialog">
                <span v-html="$t('Edit')"></span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="clickable">
              <v-list-item-title>
                <span
                  v-html="$t('Delete')"
                  @click="deleteComment({ comment: comment_item })"
                ></span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <EditCommentDialog
      :show_dialog="show_edit_comment_dialog"
      :choosen_comment="comment"
      :action="updateComment"
      @close-edit-comment-dialog="show_edit_comment_dialog = false"
    />
  </div>
</template>

<script>
import authMixins from "@/mixins/auth";
import filmMixins from "@/mixins/film";
import commentMixins from "@/mixins/comment";
import EditCommentDialog from "@/components/dialogs/EditCommentDialog";

export default {
  name: "BaseCommentList",
  mixins: [commentMixins, authMixins, filmMixins],
  components: {
    EditCommentDialog,
  },
  data() {
    return {
      show_edit_comment_dialog: false,
      film_id: null,
    };
  },
  computed: {
    can_edit_comment(comment) {
      const comment_user = _.get(comment, "user._id", "");
      const user_can_edit = comment_user === this.user._id;

      return user_can_edit;
    },
    user_avatar() {
      const has_aws_location = _.get(this.user, "aws.meta.location", "");
      return has_aws_location;
    },
  },
  methods: {
    async likeComment({ comment_id, user_id }) {
      await this.LIKE_COMMENT({
        comment_id,
        user_id,
      });
      await this.GET_COMMENTS_BY_FILM_ID({ film_id: this.film_id });
    },
    userLiked(comment) {
      const liked_array = _.get(comment, "meta.liked_by", []);
      return liked_array.includes(this.user._id);
    },
    countCommentLikes(comment) {
      const count_liked = _.get(comment, "meta.liked_by", []);
      return count_liked.length;
    },
    async updateComment() {
      await this.UPDATE_COMMENT({
        comment_id: this.comment._id,
      });
      const film_id = _.get(this.comment, "film._id");
      await this.GET_COMMENTS_BY_FILM_ID({ film_id });

      this.show_edit_comment_dialog = false;
    },
    async deleteComment({ comment }) {
      await this.DELETE_COMMENT({
        comment_id: comment._id,
      });
      const film_id = _.get(this.comment, "film._id");
      await this.GET_COMMENTS_BY_FILM_ID({ film_id });
    },
    openEditCommentDialog() {
      this.show_edit_comment_dialog = true;
    },
    setChoosenComment({ comment }) {
      this.SET_COMMENT({ data: comment });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      this.film_id = this.$route.params.id;
      await this.GET_COMMENTS_BY_FILM_ID({ film_id: this.film_id });
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
.like {
  margin-left: -2px;
}
</style>
