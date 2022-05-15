export default {
  data() {
    return {
      countries: [
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
        {
          name: "China",
          code: "cn",
        },
        {
          name: "Thailand",
          code: "th",
        },
        {
          name: "United Arab Emirates",
          code: "ae",
        },
        {
          name: "Korea",
          code: "kr",
        },
      ],
    };
  },
  methods: {
    getCountryText({ country_code }) {
      const country = this.countries.find(
        (country) => country.code === country_code
      );

      const country_text = _.get(country, "name", "");

      return country_text;
    },
  },
};
