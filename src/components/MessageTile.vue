<template>
  <v-container fluid class="message" :class="{right: right, left: !right}">
    <v-row justify="end" align="end">
      <v-col :order="right? 1: 0" cols="2" class="avatar" align-content-end>
        <img :src="getAvatarUrl()" width="50" />
      </v-col>
      <v-col cols="10">
        <!-- Message Content -->
        <v-row class="content" :justify="right? 'end': 'start'">
          <span class="content-text">{{message.content}}</span>
        </v-row>
        <!-- Message Photos ///TODO Add stickers -->
        <v-row class="content" :justify="right? 'end': 'start'" v-if="message.photos">
          <span class="content-photo" v-for="(photo, i) in message.photos" :key="i">
            <v-img :src="getImgPath(photo)" :alt="`${message.sender_name} has sent a photo`" />
          </span>
        </v-row>
        <!-- Message Timestamp -->
        <v-row class="content" :justify="right? 'end': 'start'">
          <span class="caption content-time">{{$getFormattedDate(message.timestamp)}}</span>
        </v-row>
      </v-col>
    </v-row>
    <!-- <div v-for="(photo, i) in message.photos" :key="i" class="message-photo">
      <img :src="getImgPath(photo.uri)" alt="Photo" />
    </div>-->
  </v-container>
</template>

<script>
import DateFormatter from "@/utils/DateFormatter";
import Message from "@/models/Message";

export default {
  props: {
    avatarSrc: { type: String, default: "" },
    message: {
      type: Message,
      default: () => new Message()
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
  computed: {
    right() {
      return this.isSenderMe();
    }
  },
  methods: {
    isSenderMe() {
      return this.message.sender_name == "Oussama Abderrahim"; ///TODO: make this configurable
    },
    $getSenderNameHTML(sender_name, timestamp) {
      return (
        (sender_name || this.DEFAULT.SENDER_NAME) +
        ` <span class="grey--text text--lighten-1 caption">${this.$getFormattedDate(
          timestamp
        )}</span>`
      );
    },
    /**
     * @param timestamp in miliseconds
     * @return {String} date string in own format
     */
    $getFormattedDate(timestamp) {
      return DateFormatter.formatDate(timestamp);
    },
    /**
     *
     */
    getImgPath(photo) {
      if (photo && photo.uri) return this.filepath + photo.uri;
      return "";
    },
    getAvatarUrl() {
      if (this.isSenderMe() || !this.avatarSrc) return this.DEFAULT.AVATAR;
      else return this.avatarSrc;
    }
  }
};
</script>

<style lang="scss">
$grey: #2980b9; // grey darken-2
$darkgrey: #424242; // grey darken-3
$blue: #2980b9;

.message.right,
.message.left {
  width: 100%;

  .avatar {
    width: 100%;
    text-align: center;
    img {
      border: 3px solid white;
      border-radius: 50%;
    }
  }

  .content {
    width: 80%;

    &-text {
      border-radius: 20px;
      padding: 20px;
      font-weight: normal;
      white-space: pre-line;
      word-break: break-word;
      display: block;
    }

    &-time {
      padding-top: 10px;
    }

    &-photo {
      width: 90%;
      margin-top: 3px;
    }
  }
}

.message.right {
  width: 100%;

  .content {
    float: right;
    &-text {
      border-bottom-right-radius: 0;
      background-color: var(--v-primary-base);
    }
  }
}
.message.left {
  width: 100%;

  .content {
    &-text {
      border-bottom-left-radius: 0;
      background-color: var(--v-secondary_dark-base);
    }
  }
}
</style>
