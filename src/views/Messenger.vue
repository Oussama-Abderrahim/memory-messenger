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
            <message-tile v-for="(message, i) in messages" :key="i" :message="message"></message-tile>
          </perfect-scrollbar>
        </v-container>
      </v-col>
      <!-- Informations Bar -->
      <v-col cols="3">
        <v-container fill-height></v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConversationTile from "@/components/ConversationTile";
import MessageTile from "@/components/MessageTile";
export default {
  components: {
    ConversationTile,
    MessageTile
  },
  data: () => ({
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
    ],
    messages: [
      {
        sender_name: "user1",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      {
        sender_name: "user",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      {
        sender_name: "user1",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      {
        sender_name: "user",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      {
        sender_name: "user1",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      {
        sender_name: "user",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      {
        sender_name: "user1",
        timestamp: new Date(),
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate consequatur quis! Saepe at soluta esse? Alias dicta aliquid ex hic expedita et nesciunt fuga qui, enim perspiciatis magnam magni!",
        photos: []
      },
      
    ]
  }),

  methods: {
    sayHello() {}
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