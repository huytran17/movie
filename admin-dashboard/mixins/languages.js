import _ from "lodash";

export default {
  data() {
    return {
      languages: [
        {
          name: "Việt Nam",
          code: "vn",
        },
        {
          name: "Mỹ",
          code: "us",
        },
        {
          name: "Anh",
          code: "en",
        },
        {
          name: "Philippines",
          code: "ph",
        },
        {
          name: "Indonesia",
          code: "id",
        },
        {
          name: "Japan",
          code: "jp",
        },
      ],
    };
  },
  methods: {
    getLanguageText({ language_code }) {
      const language = this.languages.find(
        (language) => language.code === language_code
      );

      const language_text = _.get(language, "name", "");

      return language_text;
    },
  },
};
