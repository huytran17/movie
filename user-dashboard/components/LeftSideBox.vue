<template>
  <div class="ml-auto side-box-wrapper mt-3">
    <div>
      <BirthdayBox />
    </div>
    <div>
      <ContactBox />
    </div>
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
</style>
