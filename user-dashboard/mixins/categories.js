import _ from "lodash";

export default {
  data() {
    return {
      film_categories: [
        {
          text: "Hài",
          value: "comedy",
        },
        {
          text: "Kinh dị",
          value: "horror",
        },
        {
          text: "Tài liệu",
          value: "documentary",
        },
        {
          text: "Gia đình",
          value: "family",
        },
        {
          text: "Trẻ em",
          value: "kid",
        },
        {
          text: "Âu Mỹ",
          value: "usuk",
        },
        {
          text: "Viễn tưởng",
          value: "fiction",
        },
        {
          text: "Chiếu rạp",
          value: "theater",
        },
        {
          text: "Hành động",
          value: "action",
        },
        {
          text: "Giật gân",
          value: "thrilling",
        },
        {
          text: "Thần thoại",
          value: "legend",
        },
        {
          text: "Phiêu lưu",
          value: "adventure",
        },
        {
          text: "Võ thuật",
          value: "martial_arts",
        },
        {
          text: "Tâm lý",
          value: "mentality",
        },
        {
          text: "Hoạt hình",
          value: "cartoon",
        },
        {
          text: "Học đường",
          value: "school",
        },
        {
          text: "Tình cảm",
          value: "affection",
        },
        {
          text: "Tội phạm",
          value: "criminal",
        },
      ],
    };
  },
  methods: {
    getCategoryText({ category_code }) {
      const category = this.film_categories.find(
        (category) => category.value === category_code
      );

      const category_text = _.get(category, "text", "");

      return category_text;
    },

    matchCategories(categories_array) {
      const categories = this.film_categories.map((category) => {
        const should_return = categories_array.includes(category.value);
        if (!should_return) {
          return;
        }
        return category.text;
      });
      const filtered_categories = categories.filter(
        (category) => !_.isNil(category)
      );
      return filtered_categories;
    },
  },
};
