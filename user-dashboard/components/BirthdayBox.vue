<template>
  <v-sheet
    height="125"
    class="pl-3 pr-1 py-2 soft-box-shadow rounded-lg"
    v-if="!smaller_than_1025"
  >
    <div class="d-flex flex-column justify-around h-100">
      <div class="text-body-2 text-sm-body-1 font-weight-bold">
        <span>{{ $t("Birthdays") }}</span>
      </div>
      <div class="d-flex justify-between">
        <div class="mt-1">
          <v-img :src="gift_icon" max-width="36" max-height="36"></v-img>
        </div>
        <div class="text-body-2 text-sm-body-1 pl-4">
          <span class="font-weight-medium">{{
            birthday_data.user.username
          }}</span>
          <span>{{ $t("and") }}</span>
          <span class="font-weight-medium"
            ><span>{{ birthday_data.others.amount }} </span
            >{{ $tc("other", birthday_data.others.amount) }}</span
          >
          <span>{{ $t("have a birthday today.") }}</span>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import systemMixins from "@/mixins/system";

export default {
  name: "BirthdayBox",
  mixins: [systemMixins],
  data() {
    return {
      gift_icon: require("@/assets/images/gift-icon.png"),
      birthday_data: {
        user: {
          username: "Jessica",
        },
        others: {
          amount: 100,
        },
      },
    };
  },
  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
};
</script>

<style></style>
