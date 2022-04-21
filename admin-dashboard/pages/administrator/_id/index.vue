<template>
  <v-container class="h-100">
    <div class="white px-4 py-3">
      <div class="text-h6 text-sm-h5 text-center primary--text">
        <div class="app-title">
          <span v-html="$t('Cập nhật thông tin tài khoản')"></span>
        </div>
      </div>
      <EditProfileForm />
    </div>
  </v-container>
</template>

<script>
import EditProfileForm from "@/components/admin/EditProfileForm";
export default {
  name: "ProfileIndex",
  components: { EditProfileForm },
};
</script>

<style></style>
