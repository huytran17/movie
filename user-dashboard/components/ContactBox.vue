<template>
  <div class="mt-5" v-if="!smaller_than_1025">
    <div class="text-body-1 text-sm-h6 font-weight-medium pt-1 pb-5">
      <span>{{ $t("Contacts") }}</span>
    </div>
    <div>
      <v-tabs grow v-model="contact_tab">
        <v-tab
          class="pt-2"
          v-for="(contact_item, index) in contact_items"
          :key="index"
        >
          <v-badge color="green" content="6">
            <span>{{ contact_item.label }}</span>
          </v-badge>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="contact_tab" class="tiny-scrollbar-vertical pt-2">
        <v-tab-item>
          <v-list-item
            v-for="(group, index) in groups"
            :key="index"
            class="pl-1"
          >
            <v-badge
              bordered
              overlap
              offset-x="25"
              offset-y="20"
              dot
              :color="group.is_active ? 'success' : 'primary'"
            >
              <v-list-item-avatar>
                <v-img
                  :alt="`${group.title} avatar`"
                  :src="group.background"
                ></v-img>
              </v-list-item-avatar>
            </v-badge>

            <v-list-item-content>
              <v-list-item-title v-text="group.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-tab-item>

        <v-tab-item>
          <v-list-item v-for="(friend, index) in friends" :key="index">
            <v-badge
              bordered
              overlap
              offset-x="25"
              offset-y="20"
              dot
              :color="friend.is_active ? 'success' : 'primary'"
            >
              <v-list-item-avatar>
                <v-avatar size="40"
                  ><v-img
                    :alt="`${friend.username} avatar`"
                    :src="friend.avatar"
                  ></v-img
                ></v-avatar>
              </v-list-item-avatar>
            </v-badge>

            <v-list-item-content>
              <v-list-item-title v-text="friend.username"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "ContactBox",
  mixins: [systemMixins],
  data() {
    return {
      contact_tab: null,
      contact_items: [
        {
          label: this.$t("Groups"),
        },
        {
          label: this.$t("Friends"),
        },
      ],
      friends: [
        {
          username: "Huy Tran",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          username: "Huy Tran 2",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          username: "Huy Tran 3",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          username: "Huy Tran 4",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: false,
        },
        {
          username: "Huy Tran",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          username: "Huy Tran 2",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          username: "Huy Tran 3",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          username: "Huy Tran 4",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: false,
        },
      ],
      groups: [
        {
          title: "Group",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          title: "Group 2",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          title: "Group 3",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          title: "Group 4",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: false,
        },
        {
          title: "Group",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          title: "Group 2",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          title: "Group 3",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: true,
        },
        {
          title: "Group 4",
          background: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          is_active: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
::v-deep .v-tabs-items {
  max-height: 340px !important;
  overflow-y: auto;
}
</style>
