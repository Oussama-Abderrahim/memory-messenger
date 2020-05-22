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
                  @click="activeConversation = i"
                  :active="i == activeConversation"
                  :item="item"
                  v-for="(item,i) in conversations"
                  :key="i"
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
          <perfect-scrollbar class="fill-height">
            <message-tile
              v-for="(message, i) in shownConversation.messages"
              :key="i"
              :message="message"
            ></message-tile>
          </perfect-scrollbar>
        </v-container>
      </v-col>
      <!-- Informations Bar -->
      <v-col cols="3">
        <v-container fill-height>
          <v-btn @click="loadConversation" color="success">Load Conversation</v-btn>
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
    activeConversation: -1,
    conversations: [
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      }
    ]
  }),
  computed: {
    ...Vuex.mapGetters({
      conversation: "currentConversation"
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
    ...Vuex.mapActions(["addConversation"]),
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
        "messages",
        this.conversation.messages.slice(
          this.messagesOffset,
          this.messagesOffset + this.messagesCount
        )
      );
    }
  },

  mounted() {}
};
</script>

<style lang='scss'>
$pink: #f1558a;
$blue: #222a3f;
$dark_blue: #1d2437;
$gray: #969aa6;

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