<template>
  <div class="ml-auto side-box-wrapper mt-6">
    <template>
      <BirthdayBox />
    </template>
    <template>
      <ContactBox />
    </template>
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
  width: 300px;
}
@media only screen and (max-width: 1025px) {
  .side-box-wrapper {
    width: 95% !important;
    margin: auto;
  }
}
</style>
