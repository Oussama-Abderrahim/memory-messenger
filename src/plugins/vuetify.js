import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#f1558a",
        secondary: "#222a3f",
        secondary_dark: "#1d2437",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#969aa6",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
    dark: true,
    options: {
      customProperties: true,
    },
  },
});
