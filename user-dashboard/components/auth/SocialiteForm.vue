<template>
  <div class="mt-5">
    <div class="text-body-2 text-sm-body-1 mb-2">
      <div class="w-50 mx-auto text-center socialite-method position-relative">
        <span class="text-uppercase px-3 position-relative socialite-text">
          {{ $t("Or") }}
        </span>
      </div>
    </div>
    <div class="socialites d-flex justify-center pb-4 pb-sm-0">
      <div class="facebook">
        <v-icon color="red accent-3">mdi-google</v-icon>
      </div>
      <div class="facebook">
        <v-icon color="primary">mdi-facebook</v-icon>
      </div>
      <div class="facebook">
        <v-icon color="info">mdi-twitter</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialiteForm",
};
</script>

<style scoped>
.socialite-method::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 0;
  border-top: 1px dotted #909090;
}
.socialite-text {
  background: white;
  z-index: 9999;
}
.socialites {
  gap: 10px;
}
</style>
