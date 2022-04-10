<template>
  <v-container>
    <v-row>
      <v-col>
        <BaseFeedbackTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseFeedbackTable from "@/pages/feedbacks-client/widget/BaseFeedbackTable";
export default {
  name: "UsersClient",
  components: { BaseFeedbackTable },
};
</script>

<style></style>
