import _ from "lodash";

export default {
  data() {
    return {
      qualities: [
        {
          text: "4K",
          value: "4k",
        },
        {
          text: "Full HD",
          value: "full hd",
        },
        {
          text: "HD",
          value: "hd",
        },
        {
          text: "Thấp",
          value: "low",
        },
      ],
    };
  },
  methods: {
    getQualityText({ quality_code }) {
      const quality = this.qualitys.find(
        (quality) => quality.value === quality_code
      );

      const quality_text = _.get(quality, "text", "");

      return quality_text;
    },
  },
};
