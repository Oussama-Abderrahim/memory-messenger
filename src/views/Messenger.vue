<template>
  <v-container fill-height class="messenger" fluid mx-6>
    <v-row class="fill-height" dense>
      <v-col cols="3" class="fill-height">
        <v-container fill-height class="messenger-conversations">
          <v-row class="fill-height">
            <v-col cols="12" class="fill-height">
              <h3>Conversation</h3>
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
              <!-- Single Card -->
              <v-container fluid pa-0 class="messenger-conversations-list">
                <conversation-tile
                  @click="activeConversation = i"
                  :active="i == activeConversation"
                  :item="item"
                  v-for="(item,i) in conversations"
                  :key="i"
                />
              </v-container>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-container></v-container>
      </v-col>
      <v-col cols="3">
        <v-container></v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConversationTile from "@/components/ConversationTile";
export default {
  components: {
    ConversationTile
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
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
      {
        title: "Gerald Dean",
        preview: "I am ready.",
        time: "6:50pm"
      },
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

.messenger {
  background-color: var(--v-secondary-base);
  width: 100%;

  &-conversations {
    border: 1px solid grey;

    &-list {
      height: 80%;
      padding-top: 0;
      margin-top: 0;
      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: red;
    }
  }
}

html {
  --scrollbarBG: #cfd8dc;
  --thumbBG: #90a4ae;
}

body::-webkit-scrollbar {
  width: 11px;
}
body {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
body::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
body::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}
</style>