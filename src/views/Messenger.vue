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
              <perfect-scrollbar :options="{scrollingThreshold: 300}" class="messenger-conversations-list">
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

    .ps {
      height: 80%;
    }
  }
}
</style>