<template>
  <v-layout
    row
    wrap
    class="messenger"
  >
    <v-flex xs8>
      <v-card
        v-scroll:#messages="onMessagesScroll"
        class="messenger-messages"
        id="messages"
        ref="messages"
      >
        <v-toolbar
          v-if='search.browseSearchMode'
          color="grey darken-4"
        >
          <v-toolbar-title>Found {{search.foundIndexes.length}} results ({{(search.searchIndex+1)}} of {{search.foundIndexes.length}}) </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            flat
            @click='prevSearchResult'
          >
            Previous
          </v-btn>

          <v-btn
            flat
            @click="nextSearchResult"
          >
            Next
          </v-btn>

        </v-toolbar>
        <v-toolbar
          v-else
          color="grey darken-4"
        >
          <v-toolbar-title>{{conversation.title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text >
          <v-container grid-list-xs style='padding:0'>
            <v-layout
              row
              wrap
            >
              <template v-for="(message, i) in shownConversation.messages">
                <message-tile
                  :key='i'
                  :message='message'
                  :filepath='filepath'
                  :avatarSrc='conversation.participants[0].avatar'
                />
              </template>
              <v-flex xs12>
                <v-btn
                  color="info"
                  @click='loadMoreMessages'
                >Charger la suite</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex
      xs4
      class="messenger-controls"
    >
      <v-btn @click='loadConversation'>load Conversation</v-btn>
      <v-list subheader>
        <v-subheader>Rechercher</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <messenger-search-bar @searched='showSearchResult' />
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        <v-subheader>Participants</v-subheader>
        <v-list-tile
          v-for="(participant, i) in conversation.participants"
          :key="i"
          avatar
          @click="1"
        >
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
import MessageTile from '@/components/MessageTile';
import loadConversationFromFile from '@/api/loadConversationFromFile';
import store from '@/stores/conversationsStore';
import Vuex from 'vuex';

export default {
	store,
	components: {
		MessengerSearchBar,
		MessageTile
	},
	data() {
		return {
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

		/**
		 *
		 */
		onMessagesScroll(e) {
			if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
				this.loadMoreMessages();
			}
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
			});
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
}
</style>
