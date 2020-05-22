<template>
  <v-container fill-height class="messenger" fluid mx-6 py-0>
    <v-row class="fill-height" dense>
      <!-- Conversations Bar -->
      <v-col cols="3" class="fill-height messenger-conversations">
        <v-container fill-height>
          <v-row class="fill-height">
            <v-col cols="12" class="fill-height">
              <h3>Conversation</h3>
              <!-- Search Bar -->
              <v-text-field
                outlined
                dense
                full-width
                label="Search Here"
                prepend-inner-icon="search"
              ></v-text-field>
              <v-row dense>
                <v-col cols="7">Recent Chats</v-col>
                <v-spacer></v-spacer>
                <v-col cols="3">New Chat</v-col>
              </v-row>
              <!-- Conversations Lists -->
              <perfect-scrollbar
                :options="{scrollingThreshold: 300}"
                class="messenger-conversations-list"
              >
                <!-- Single Card -->
                <conversation-tile
                  @click="setConversationIndex(i); refreshShownMessages()"
                  v-for="(item,i) in conversations"
                  :active="item == currentConversation"
                  :item="item"
                  :key="'conversation-'+i"
                />
              </perfect-scrollbar>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <!-- Messages Bar -->
      <v-col cols="6" class="fill-height messenger-messages">
        <v-container fill-height>
          <perfect-scrollbar @ps-y-reach-end="loadMoreMessages" class="fill-height">
            <message-tile
              v-for="(message, i) in shownConversation.messages"
              :filepath="filepath"
              :avatarSrc="getAvatar(message.sender_name)"
              :key="'message-' + i"
              :message="message"
            ></message-tile>
          </perfect-scrollbar>
        </v-container>
      </v-col>
      <!-- Informations Bar -->
      <v-col cols="3" class="fill-height">
        <v-container fill-height>
          <v-row class="fill-height">
            <v-btn @click="loadConversation" color="success">Load Conversation</v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConversationTile from "@/components/ConversationTile";
import MessageTile from "@/components/MessageTile";
import loadConversationFromFile from "@/api/loadConversationFromFile";
import store from "@/store/conversationsStore";
import Vuex from "vuex";

export default {
  store,
  components: {
    ConversationTile,
    MessageTile
  },
  data: () => ({
    filepath: "/",
    messagesOffset: 0,
    messagesCount: 30,
    shownConversation: {
      messages: []
    },
    activeConversation: -1
  }),
  computed: {
    ...Vuex.mapGetters({
      currentConversation: "currentConversation",
      conversations: "conversations"
    })
  },
  watch: {
    currentConversation() {
      this.shownConversation.messages = this.currentConversation.messages.slice(
        0,
        this.messagesCount
      );
    }
  },
  methods: {
    ...Vuex.mapActions({
      addConversation: "addConversation",
      storeSetConversationIndex: "setConversationIndex"
    }),
    setConversationIndex(i) {
      this.storeSetConversationIndex(i);
      this.messagesCount = 30;
      this.messagesOffset = 0;
      this.refreshShownMessages();
    },
    /**
     * calls LoadConversationFromFile method to select a file
     * loads Message objects to conversation data
     * Reverse the order so that older messages are shown first
     * loads Participant objects to conversation data
     */
    loadConversation() {
      console.log(this.conversations);
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
        "messages",
        this.currentConversation.messages.slice(
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
      if (lastMessageIndex >= this.currentConversation.messages.length) return;

      let newMessages = this.currentConversation.messages.slice(
        lastMessageIndex,
        lastMessageIndex + LOAD_STEP
      );
      this.$set(
        this.shownConversation,
        "messages",
        this.shownConversation.messages.concat(newMessages)
      );
      this.messagesCount += LOAD_STEP;
    },
    /**
     * Get Avatar url from participants object
     */
    getAvatar(name) {
      let participant = this.currentConversation.participants.filter(
        p => p.name == name
      );
      if (participant && participant.length) {
        return participant[0].avatar;
      } else {
        return null;
      }
    }
  },

  mounted() {}
};
</script>

<style lang='scss'>
.ps {
  width: 100%;
}
.messenger {
  background-color: var(--v-secondary-base);
  width: 100%;
  padding: 0;

  &-conversations,
  &-messages {
    border-right: 2px solid var(--v-secondary_dark-base);
  }

  &-conversations {
    .ps {
      height: 80%;
    }
  }
}
</style>