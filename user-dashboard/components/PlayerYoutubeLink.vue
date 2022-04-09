<template>
  <div>
    <vue-plyr class="player">
      <div class="plyr__video-embed">
        <iframe
          :src="src"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
    </vue-plyr>
  </div>
</template>

<script>
// More information here https://github.com/sampotts/plyr#options
export default {
  props: {
    options: { type: Object, required: true },
  },
  computed: {
    src() {
      return `${
        _.get(this.options, "source").src
      }?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    },
  },
};
</script>

<style>
.player {
  height: 300px;
}

.plyr__caption {
  color: white;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 0;
  text-shadow: 1px 1px 3px #000000;
  background: transparent;
}

@media only screen and (max-width: 500px) {
  .plyr__caption {
    color: white;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 0;
    text-shadow: 1px 1px 3px #000000;
    background: transparent;
  }
}
</style>

<style scoped>
::v-deep .plyr--video {
  max-height: 750px !important;
}
</style>
