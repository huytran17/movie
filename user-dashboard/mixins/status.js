import _ from "lodash";

export default {
  data() {
    return {
      statuses: [
        {
          text: "Có sẵn",
          value: "available",
        },
      ],
    };
  },
  methods: {
    getStatusText({ status_code }) {
      const status = this.statuses.find(
        (status) => status.value === status_code
      );

      const status_text = _.get(status, "text", "");

      return status_text;
    },
  },
};
