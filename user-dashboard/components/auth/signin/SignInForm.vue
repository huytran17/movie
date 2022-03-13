<template>
  <div class="sign-in-form-wrapper mx-auto">
    <div class="sign-in-form mx-auto mt-8">
      <div class="text-h5 mb-8 text-center">
        <span class="font-weight-bold white--text">
          {{ $t("Sign In") }}
        </span>
      </div>
      <v-form ref="form" v-model="form_valid">
        <v-row>
          <v-text-field
            @input="setLoginData($event, 'email')"
            type="email"
            :rules="emailRules"
            :label="$t('Email')"
            filled
            dense
            autofocus
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            @input="setLoginData($event, 'password')"
            type="password"
            :rules="passwordRules"
            :label="$t('Password')"
            filled
            dense
          ></v-text-field>
        </v-row>

        <v-row>
          <v-btn
            depressed
            tile
            color="red"
            class="w-100 mt-3 white--text"
            @click="signin"
            >{{ $t("Sign In") }}</v-btn
          >
        </v-row>
      </v-form>
      <div class="mt-6 ml-n3 text-body-2">
        <a @click="$router.push(localePath('/signup'))"
          ><span class="white--text clickable">{{ $t("Sign Up") }}</span></a
        >
      </div>

      <div class="my-3 text-body-2 text-center white--text">
        <span>{{ $t("OR") }}</span>
      </div>

      <div class="d-flex justify-around mt-4">
        <v-icon class="clickable" color="primary">mdi-facebook</v-icon>
        <v-icon class="clickable" color="red">mdi-google</v-icon>
        <v-icon class="clickable" color="info">mdi-twitter</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import authMixin from "@/mixins/auth";

export default {
  name: "SignInForm",
  mixins: [authMixin],
  data() {
    return {
      form_valid: false,
    };
  },
  methods: {
    /**
     * set the login data
     */
    setLoginData(data, path) {
      this.SET_SIGN_IN_DATA({ data, path });
    },

    async signin() {
      try {
        const has_all_required_data =
          this.sign_in_data.email && this.sign_in_data.password;
        if (!this.form_valid || !has_all_required_data) {
          this.$toast.warning(this.$t("Invalid data..."));
          return;
        }
        await this.SIGN_IN().then((res) => {
          if (res.is_error) {
            this.$toast.error(this.$t(res.message));
            return;
          }
          localStorage.setItem("access_token", res.access_token);
          this.$toast.success(this.$t("Welcome!"));
          this.$router.push(this.localePath("/"));
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.sign-in-form {
  width: 300px;
  max-width: 300px;
  margin-bottom: 60px;
}
.sign-in-form-wrapper {
  width: 400px;
  max-width: 400px;
  height: 435px;
  border: 1px solid red;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 1;
}
::v-deep .v-input__slot {
  background: rgba(255, 255, 255, 0.5) !important;
}
::v-deep .v-messages__message {
  margin-left: -12px;
}
::v-deep .v-label--active.primary--text {
  color: #ffffff !important;
}
@media only screen and (max-width: 409px) {
  .sign-in-form {
    max-width: 270px;
  }
  .sign-in-form-wrapper {
    max-width: 370px;
  }
}
@media only screen and (max-width: 382px) {
  .sign-in-form {
    max-width: 230px;
  }
  .sign-in-form-wrapper {
    max-width: 330px;
  }
}

@media only screen and (max-width: 343px) {
  .sign-in-form {
    max-width: 200px;
  }
  .sign-in-form-wrapper {
    max-width: 300px;
  }
}
@media only screen and (max-width: 310px) {
  .sign-in-form {
    max-width: 180px;
  }
  .sign-in-form-wrapper {
    max-width: 280px;
  }
}

@media only screen and (max-width: 290px) {
  .sign-in-form {
    max-width: 150px;
  }
  .sign-in-form-wrapper {
    max-width: 250px;
  }
}
@media only screen and (max-width: 258px) {
  .sign-in-form {
    max-width: 130px;
  }
  .sign-in-form-wrapper {
    max-width: 230px;
  }
}
</style>
