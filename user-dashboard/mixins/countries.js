import _ from "lodash";

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

    matchCountries(countries_array) {
      const countries = this.countries.map((country) => {
        const should_return = countries_array.includes(country.code);
        if (!should_return) {
          return;
        }
        return country.name;
      });
      const filtered_countries = countries.filter(
        (country) => !_.isNil(country)
      );
      return filtered_countries;
    },
  },
};
