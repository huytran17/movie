<template>
  <div>
    <vue-plyr class="player" :options="options">
      <video controls crossorigin :data-poster="poster">
        <source
          v-for="(source, index) in options.sources"
          :key="index"
          :src="source.src"
          :type="source.type"
        />

        <track
          v-for="(source, index) in options.tracks"
          :key="index"
          :kind="source.kind"
          :label="source.label"
          :src="source.src"
          :srclang="source.srclang"
          :default="source.default"
        />
      </video>
    </vue-plyr>
  </div>
</template>

<script>
// More information here https://github.com/sampotts/plyr#options
export default {
  props: {
    options: { type: Object, required: true },
    poster: {
      type: String,
      default() {
        return "";
      },
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
</style>
