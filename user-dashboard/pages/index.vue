<template>
  
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    await this.$axios.get("/api/").then(response => console.log(response))
  }
}
</script>
