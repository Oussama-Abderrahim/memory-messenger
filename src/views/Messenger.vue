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
          <!-- Search Toolbar, appear when button clicked -->
          <v-toolbar color="secondary_dark" dense floating v-if="showSearch">
            <v-btn icon small>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn icon small>
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-toolbar-title v-if='searching' class='title ml-3'>Result 1 of 10</v-toolbar-title>
            <v-text-field
              v-if="!searching"
              class="ml-4"
              outlined
              dense
              full-width
              filled
              single-line
              label="Search Here"
              hide-details
              prepend-inner-icon="search"
            ></v-text-field>
          </v-toolbar>

          <!-- Messages -->
          <perfect-scrollbar @ps-y-reach-end="loadMoreMessages" class="fill-height">
            <message-tile
              v-for="(message, i) in shownConversation.messages"
              :filepath="currentConversation.filepath"
              :avatarSrc="getAvatar(message.sender_name)"
              :key="'message-' + i"
              :message="message"
            ></message-tile>
          </perfect-scrollbar>
        </v-container>
      </v-col>
      <!-- Informations Bar -->
      <v-col cols="3" class="fill-height messenger-informations pr-5">
        <v-container fill-height mx-3 fluid>
          <v-row class="fill-height" justify="start">
            <v-col cols="12" class="text-center">
              <!-- Current conversation Information -->
              <v-container class="user-card" fluid>
                <v-row justify="center">
                  <v-avatar size="100" color="grey">
                    <v-img :src="currentConversation.avatar" alt="alt" />
                  </v-avatar>
                </v-row>
                <v-row justify="center" class="mt-3">
                  <h3>{{currentConversation.title || "Conversation Title"}}</h3>
                </v-row>
              </v-container>

              <!-- Search Options -->
              <v-expansion-panels class="mt-10" v-model="searchPanel">
                <v-expansion-panel class="search-options-panel">
                  <v-expansion-panel-header>Advanced search</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- Search Button -->
                    <v-btn small block tile text @click="showSearch = !showSearch">
                      Search in conversation
                      <v-spacer></v-spacer>
                      <v-icon left>mdi-magnify</v-icon>
                    </v-btn>

                    <!-- Start Date Picker  -->
                    <v-menu
                      v-model="startDatePicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="startDate"
                          label="Starting Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startDate" @input="startDatePicker = false"></v-date-picker>
                    </v-menu>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConversationTile from "@/components/ConversationTile";
import MessageTile from "@/components/MessageTile";
import store from "@/store/conversationsStore";
import Vuex from "vuex";

export default {
  store,
  components: {
    ConversationTile,
    MessageTile
  },
  data: () => ({
    searchPanel: 0,
    showSearch: true,
    startDate: null,
    startDatePicker: false,
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
  overflow: hidden;
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

  &-informations {
    & .user-card,
    & .search-options-panel {
      background-color: var(--v-secondary_dark-base) !important;
    }
  }
}
</style>