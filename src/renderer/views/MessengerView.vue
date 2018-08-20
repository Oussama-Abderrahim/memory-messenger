<template>
  <v-layout row wrap class="messenger">
    <v-flex xs8>
      <v-card
        v-scroll:#messages="onMessagesScroll"
        class="messenger-messages" id="messages" ref="messages">
        <v-toolbar v-if='search.browseSearchMode' color="grey darken-4">
          <v-toolbar-title>Found {{search.foundIndexes.length}} results ({{(search.searchIndex+1)}} of {{search.foundIndexes.length}}) </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat>
            Previous
          </v-btn>

          <v-btn flat @click="nextSearchResult">
            Next
          </v-btn>

        </v-toolbar>
        <v-toolbar v-else color="grey darken-4">
          <v-toolbar-title>{{conversation.title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text style='padding:0'>
          <v-list three-line>
            <template v-for="(message, i) in shownConversation.messages">
              <v-list-tile
                :key="i"
                avatar
                @click="1"
                class="message">
                <v-list-tile-avatar>
                  <img :src="conversation.participants[0].avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title
                  class="message-sender"
                  v-html='$getSenderNameHTML(message.sender_name, message.timestamp)'></v-list-tile-title>
                  <v-list-tile-sub-title class="white--text message-content" v-html='message.content'></v-list-tile-sub-title>

                </v-list-tile-content>
              </v-list-tile>
              <v-layout justify-center :key='"photo" + i' v-if='message.photos'>
                <img :src='getImgPath(message.photos[0].uri)' alt="Photo">
              </v-layout>
            </template>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title @click='loadMoreMessages'>Charger la suite</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs4 class="messenger-controls">
      <v-btn @click='loadConversation'>load Conversation</v-btn>
      <v-list subheader>
        <v-subheader>Rechercher</v-subheader>
        <v-list-tile >
          <v-list-tile-content>
            <messenger-search-bar @searched='showSearchResult'/>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        <v-subheader>Participants</v-subheader>
        <v-list-tile
          v-for="(participant, i) in conversation.participants"
          :key="i"
          avatar
          @click="1">
          <v-list-tile-avatar>
            <img :src="participant.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html='participant.name'></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import MessengerSearchBar from '@/components/MessengerSearchBar';
import loadConversationFromFile from '@/api/loadConversationFromFile';
import store from '@/stores/conversationsStore';
import Vuex from 'vuex';

export default {
	store,
	components: {
		MessengerSearchBar
	},
	data() {
		return {
			DEFAULT: {
				SENDER_NAME: 'utilisateur',
				AVATAR: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
			},
			search: {
				browseSearchMode: false,
				searchIndex: 0,
				foundIndexes: []
			},
			filepath: '/',
			messagesOffset: 0,
			messagesCount: 30,
			shownConversation: {
				messages: []
			}
		};
	},
	computed: {
		...Vuex.mapGetters({
			conversation: 'currentConversation'
		})
	},
	watch: {
		conversation() {
			this.shownConversation.messages = this.conversation.messages.slice(
				0,
				this.messagesCount
			);
		}
	},
	methods: {
		...Vuex.mapActions(['addConversation']),
		$getSenderNameHTML(sender_name, timestamp) {
			return (
				(sender_name || this.DEFAULT.SENDER_NAME) +
				` <span class="grey--text text--lighten-1">${this.$getFormattedDate(timestamp)}</span>`
			);
		},
		/**
		 *
		 */
		getImgPath(uri) {
			return this.filepath + uri;
		},
		/**
		 *
		 */
		onMessagesScroll(e) {
			if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
				this.loadMoreMessages();
			}
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
		 * calls LoadConversationFromFile method to select a file
		 * loads Message objects to conversation data
		 * Reverse the order so that older messages are shown first
		 * loads Participant objects to conversation data
		 */
		loadConversation() {
			this.messagesCount = 30;
			this.messagesOffset = 0;
			loadConversationFromFile((conv, filepath) => {
				console.log(conv);
				if (conv == null) return;
				this.filepath = filepath;
				this.addConversation(conv);
				this.refreshShownMessages();
				this.loadMoreMessages();
			});
		},
		/**
		 *
		 */
		loadMoreMessages() {
			const LOAD_STEP = 10; // how many message to load each time
			let lastMessageIndex = this.messagesOffset + this.messagesCount;
			let newMessages = this.conversation.messages.slice(
				lastMessageIndex,
				lastMessageIndex + LOAD_STEP
			);
			this.$set(
				this.shownConversation,
				'messages',
				this.shownConversation.messages.concat(newMessages)
			);
			this.messagesCount += LOAD_STEP;
		},
		refreshShownMessages() {
			this.$set(
				this.shownConversation,
				'messages',
				this.conversation.messages.slice(
					this.messagesOffset,
					this.messagesOffset + this.messagesCount
				)
			);
      this.loadMoreMessages();
		},
		/**
		 *
		 */
		showSearchResult(foundIndexes) {
			this.search.foundIndexes = foundIndexes;
			this.search.browseSearchMode = true;
			this.search.searchIndex = -1;
			this.nextSearchResult();
    },
    /**
     * Increment the search index and refreshshownMessages
     */
		nextSearchResult() {
			this.search.searchIndex++;
			this.search.searchIndex %= this.search.foundIndexes.length; // Back to 0 after last
			this.messagesOffset = Math.max(
				this.search.foundIndexes[this.search.searchIndex] - 1,
				0
			);
			this.messagesCount = 30;
			this.refreshShownMessages();
    },
    /**
     * Decrement the search index and refreshShownMessages
     */
		prevSearchResult() {
			this.search.searchIndex--;
			if (this.search.searchIndex < 0)
				this.search.searchIndex = this.search.foundIndexes.length - 1; // Back to 0 after last
			this.messagesOffset = Math.max(
				this.search.foundIndexes[this.search.searchIndex] - 1,
				0
			);
			this.messagesCount = 30;
			this.refreshShownMessages();
		}
	},
	mounted() {
		this.search.searchIndex = 0;
		this.search.browseSearchMode = false;
	}
};
</script>

<style lang="scss">
$grey: #2980b9; // grey darken-2
$darkgrey: #424242; // grey darken-3
$blue: #2980b9;

.messenger {
	color: white;
	height: 100%;
	max-height: 100vh;
	overflow: hidden;

	&-messages {
		background: $grey;
		height: 100%;
		overflow-y: scroll;
	}
	&-controls {
		background-color: $darkgrey;
		height: 100%;
		overflow-y: scroll;
	}

	.message {
		background: inherit;

		&-sender {
			font-weight: bold;
			color: $blue;
		}

		&-content {
			font-weight: normal;
		}
	}
}
</style>
