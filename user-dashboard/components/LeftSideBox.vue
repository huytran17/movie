<template>
  <div class="side-box-wrapper mt-6">
    <BirthdayBox />
    <ContactBox />
  </div>
</template>

<script>
import BirthdayBox from "@/components/BirthdayBox";
import ContactBox from "@/components/ContactBox";

export default {
  name: "LeftSideBox",
  components: {
    BirthdayBox,
    ContactBox,
  },
};
</script>

<style scoped>
.side-box-wrapper {
  max-width: 300px !important;
}
</style>
