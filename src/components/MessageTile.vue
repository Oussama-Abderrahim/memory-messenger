<template>
  <v-row wrap @click="1" class="message">
    <v-col cols="2">
      <div class="message-avatar">
        <img :src="getAvatarUrl()" width="50" />
      </div>
    </v-col>
    <v-col cols="9">
      <div
        class="message-sender"
        v-html="$getSenderNameHTML(message.sender_name, message.timestamp)"
      ></div>
      <!-- White space in message-content is important as it uses white-space:pre-line -->
      <div class="white--text message-content">{{ message.content }}</div>
      <div v-for="(photo, i) in message.photos" :key="i" class="message-photo">
        <img :src="getImgPath(photo.uri)" alt="Photo" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    avatarSrc: { type: String, default: "" },
    message: {
      type: Object,
      default: () => ({
        sender_name: "user",
        timestamp: new Date(),
        content: "text",
        photos: []
      })
    },
    filepath: { type: String, default: "/" }
  },
  data: () => ({
    DEFAULT: {
      SENDER_NAME: "utilisateur",
      AVATAR:
        "https://lh3.googleusercontent.com/-mGkGQtgsLjA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcAQmY3uszZ1HR-gE4VfvMMJkiSNQ.CMID/s96-c/photo.jpg"
    }
  }),
  methods: {
    isSenderMe() {
      return this.message.sender_name == "Oussama Abderrahim";
    },
    $getSenderNameHTML(sender_name, timestamp) {
      return (
        (sender_name || this.DEFAULT.SENDER_NAME) +
        ` <span class="grey--text text--lighten-1">${this.$getFormattedDate(
          timestamp
        )}</span>`
      );
    },
    /**
     * @param timestamp in miliseconds
     * @return {String} date string in own format
     */
    $getFormattedDate(timestamp) {
      const DAYS = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche"
      ];
      const MONTHS = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
      ];
      let date = new Date(timestamp);

      return `${DAYS[date.getDay()]} ${date.getDate()} ${
        MONTHS[date.getMonth()]
      } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    /**
     *
     */
    getImgPath(uri) {
      return this.filepath + uri;
    },
    getAvatarUrl() {
      if (this.isSenderMe()) return this.DEFAULT.AVATAR;
      else return this.avatarSrc;
    }
  }
};
</script>

<style lang="scss">
$grey: #2980b9; // grey darken-2
$darkgrey: #424242; // grey darken-3
$blue: #2980b9;

.message {
  width: 100%;
  background: inherit;
  border-bottom: 1px grey solid;
  padding: 10px 0 5px 0;
  &:hover {
    background: #525252;
  }

  &-avatar {
    width: 100%;
    text-align: center;
    img {
      border: 3px solid white;
      border-radius: 50%;
    }
  }
  &-sender {
    font-weight: bold;
    color: $blue;
  }

  &-content {
    font-weight: normal;
    white-space: pre-line;
  }

  &-photo {
    img {
      width: 90%;
    }
  }
}
</style>
