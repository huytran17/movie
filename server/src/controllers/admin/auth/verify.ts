import _ from "lodash";

export default function makeVerifyController() {
  return async function verifyController(httpRequest: {
    context: { validated: { email: string } };
  }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const user = _.get(httpRequest, "context.user");

      return {
        headers,
        statusCode: 200,
        body: { user },
      };
    } catch (err) {
      // TODO: add in error handling here
      return {
        headers,
        statusCode: 200,
        body: {
          error: err.message,
        },
      };
    }
  };
}
