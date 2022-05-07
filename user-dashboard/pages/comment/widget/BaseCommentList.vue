<template>
  <div class="mt-6">
    <v-row v-for="(comment_asset, index) in comment_assets" :key="index">
      <v-col cols="11" v-if="hasValidUser(comment_asset.parent)">
        <v-row>
          <v-col cols="12" class="d-flex pb-0">
            <div>
              <v-img
                :src="getUserAvatar(comment_asset.parent)"
                width="40"
                height="40"
                class="rounded-circle"
              ></v-img>
            </div>
            <div class="pl-4">
              <div class="text-body-2">
                <span class="app-title">
                  <span v-html="getUserFullname(comment_asset.parent)"></span>
                </span>
              </div>
              <div class="text-body-2">
                <span class="app-body">
                  <span v-html="$t(comment_asset.parent.content)"></span>
                </span>
              </div>

              <div class="mt-n4 mb-2 like">
                <v-icon
                  small
                  class="clickable"
                  :color="userLiked(comment_asset.parent) ? 'red' : ''"
                  @click="
                    likeComment({
                      comment_id: comment_asset.parent._id,
                      user_id: user._id,
                    })
                  "
                  >{{
                    userLiked(comment_asset.parent)
                      ? "mdi-heart"
                      : "mdi-heart-outline"
                  }}</v-icon
                >
                <span class="text-body-2">
                  <span class="app-body">
                    <span
                      v-html="countCommentLikes(comment_asset.parent)"
                    ></span>
                  </span>
                </span>
                <v-icon
                  small
                  class="ml-2 clickable"
                  @click="
                    () => {
                      setChoosenComment({ comment: comment_asset.parent });
                      openBaseReplyCommentDialog();
                    }
                  "
                  >mdi-reply-outline</v-icon
                >
              </div>
            </div>
          </v-col>

          <v-col class="pt-0 comment-function mt-n3" cols="12">
            <div>
              <div class="text-body-2">
                <span class="app-body">
                  <i>
                    <small>
                      {{ $moment(comment_asset.parent.created_at).fromNow() }}
                    </small>
                  </i>
                </span>
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            v-for="(child, index) in comment_asset.children"
            :key="index"
            class="pl-15 d-flex justify-space-between"
          >
            <div class="d-flex" v-if="hasValidUser(child)">
              <div>
                <v-img
                  :src="getUserAvatar(child)"
                  width="40"
                  height="40"
                  class="rounded-circle"
                ></v-img>
              </div>
              <div class="pl-4">
                <div class="text-body-2">
                  <span class="app-title">
                    <span v-html="getUserFullname(child)"></span>
                  </span>
                </div>
                <div class="text-body-2">
                  <span class="app-body">
                    <span v-html="$t(child.content)"></span>
                  </span>
                </div>

                <div class="mt-n4 like">
                  <v-icon
                    small
                    class="clickable"
                    :color="userLiked(child) ? 'red' : ''"
                    @click="
                      likeComment({
                        comment_id: child._id,
                        user_id: user._id,
                      })
                    "
                    >{{
                      userLiked(child) ? "mdi-heart" : "mdi-heart-outline"
                    }}</v-icon
                  >
                  <span class="text-body-2">
                    <span class="app-body">
                      <span v-html="countCommentLikes(child)"></span>
                    </span>
                  </span>
                </div>
                <div class="text-body-2 mt-n1">
                  <span class="app-body">
                    <i>
                      <small>
                        {{ $moment(child.created_at).fromNow() }}
                      </small>
                    </i>
                  </span>
                </div>
              </div>
            </div>

            <div v-if="hasValidUser(child)">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    class="ml-auto d-block"
                    @click="setChoosenComment({ comment: child })"
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
                        @click="deleteComment({ comment: child })"
                      ></span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-if="can_edit_comment && hasValidUser(comment_asset.parent)"
        cols="1"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              class="ml-auto d-block"
              @click="setChoosenComment({ comment: comment_asset.parent })"
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
                  @click="deleteComment({ comment: comment_asset.parent })"
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
    <BaseReplyCommentDialog
      :show_dialog="show_reply_comment_dialog"
      :choosen_comment="comment"
      :action="replyComment"
      @close-reply-comment-dialog="show_reply_comment_dialog = false"
    />
  </div>
</template>

<script>
import authMixins from "@/mixins/auth";
import filmMixins from "@/mixins/film";
import commentMixins from "@/mixins/comment";
import commentAssetMixins from "@/mixins/comment-asset";
import EditCommentDialog from "@/components/dialogs/EditCommentDialog";
import BaseReplyCommentDialog from "@/components/dialogs/BaseReplyCommentDialog";

export default {
  name: "BaseCommentList",
  mixins: [commentMixins, authMixins, filmMixins, commentAssetMixins],
  components: {
    EditCommentDialog,
    BaseReplyCommentDialog,
  },
  data() {
    return {
      show_edit_comment_dialog: false,
      show_reply_comment_dialog: false,
      film_id: null,
    };
  },
  computed: {
    can_edit_comment(comment) {
      const comment_user = _.get(comment, "user._id", "");
      const user_can_edit = comment_user === this.user._id;

      return user_can_edit;
    },
  },
  methods: {
    getUserAvatar(comment) {
      const has_aws_location = _.get(comment, "user.aws.meta.location", "");
      return has_aws_location;
    },
    async likeComment({ comment_id, user_id }) {
      await this.LIKE_COMMENT({
        comment_id,
        user_id,
      });
      await this.GET_COMMENT_ASSETS_BY_FILM_ID({ film_id: this.film_id });
    },
    userLiked(comment) {
      const liked_array = _.get(comment, "meta.liked_by", []);
      return liked_array.includes(this.user._id);
    },
    getUserFullname(comment) {
      const first_name = _.get(comment, "user.first_name", "");
      const last_name = _.get(comment, "user.last_name", "");

      return `${first_name} ${last_name}`;
    },
    hasValidUser(comment) {
      const user = _.get(comment, "user");
      return !_.isNil(user);
    },
    countCommentLikes(comment) {
      const count_liked = _.get(comment, "meta.liked_by", []);
      return count_liked.length;
    },
    async updateComment() {
      await this.UPDATE_COMMENT({
        comment_id: this.comment._id,
      });
      await this.GET_COMMENT_ASSETS_BY_FILM_ID({ film_id: this.film_id });
      this.updateEditCommentObject({
        variable_path: "content",
        data: "",
      });
      this.show_edit_comment_dialog = false;
    },
    async deleteComment({ comment }) {
      await this.DELETE_COMMENT({
        comment_id: comment._id,
      });
      await this.GET_COMMENT_ASSETS_BY_FILM_ID({ film_id: this.film_id });
    },
    openEditCommentDialog() {
      this.show_edit_comment_dialog = true;
    },
    openBaseReplyCommentDialog() {
      this.show_reply_comment_dialog = true;
    },
    setChoosenComment({ comment }) {
      this.SET_COMMENT({ data: comment });
    },
    async replyComment() {
      await this.REPLY_COMMENT({
        user: this.user._id,
        film: this.film._id,
        parent_comment_id: this.comment._id,
      });
      await this.GET_COMMENT_ASSETS_BY_FILM_ID({ film_id: this.film._id });
    },
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      this.film_id = this.$route.params.id;
      await this.GET_COMMENT_ASSETS_BY_FILM_ID({ film_id: this.film_id });
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
