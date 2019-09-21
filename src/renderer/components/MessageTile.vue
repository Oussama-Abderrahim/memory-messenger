<template>

  <v-layout
    row
    wrap
    @click="1"
    class="message"
  >
    <v-flex xs9>
      <div
        class="message-sender"
        v-html="$getSenderNameHTML(message.sender_name, message.timestamp)"
      >
      </div>
      <div class="white--text message-content">
        {{ message.content }}
      </div>
      <div
        v-if='message.photos'
        class="message-photo"
      >
        <img
          :src='getImgPath(message.photos[0].uri)'
          alt="Photo"
        >
      </div>
    </v-flex>
    <v-flex xs3>
      <div class="message-avatar">
        <img
          :src="avatarSrc"
          width='50'
        >
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
	props: {
		avatarSrc: { type: String, default: '' },
		message: {
			type: Object,
			default: {
				sender_name: 'user',
				timestamp: new Date(),
				content: 'text',
				photos: []
			}
		},
		filepath: { type: String, default: '/' }
	},
	data: () => ({
		DEFAULT: {
			SENDER_NAME: 'utilisateur',
			AVATAR: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
		}
	}),
	methods: {
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
				'Lundi',
				'Mardi',
				'Mercredi',
				'Jeudi',
				'Vendredi',
				'Samedi',
				'Dimanche'
			];
			const MONTHS = [
				'Janvier',
				'Fevrier',
				'Mars',
				'Avril',
				'Mai',
				'Juin',
				'Juillet',
				'Aout',
				'Septembre',
				'Octobre',
				'Novembre',
				'Decembre'
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
	&:hover {
		background: #525252;
	}

	&-avatar {
		width: 100%;
		text-align: center;
	}
	&-sender {
		font-weight: bold;
		color: $blue;
	}

	&-content {
		font-weight: normal;
	}

	&-photo {
		img {
			width: 90%;
		}
	}
}
</style>
