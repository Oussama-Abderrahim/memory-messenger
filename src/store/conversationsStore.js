import Vue from "vue";
import Vuex from "vuex";
import DateFormatter from "@/utils/DateFormatter";

Vue.use(Vuex);

const state = {
  DEFAULT: {
    SENDER_NAME: "utilisateur",
    AVATAR: "https://www.atlantic-avitaillement.fr/wp-content/uploads/765-default-avatar.png",
    CONV: {
      title: "",
      messages: [],
      participants: [],
    },
  },
  currentIndex: -1,
  conversations: [],
};

const mutations = {
  ADD_CONV: (state, conversation) => {
    state.currentIndex++;
    state.conversations.push(conversation);
  },
  SET_INDEX: (state, i) => {
    state.currentIndex = i;
  },
};

const getters = {
  currentConversation: (state) =>
    state.conversations.length > 0 ? state.conversations[state.currentIndex] : state.DEFAULT.CONV,
  conversations: (state) => state.conversations,
};

const actions = {
  setConversationIndex: (store, i) => {
    store.commit("SET_INDEX", i);
  },
  addConversation: (store, { conv, filepath }) => {
    let conversation = {
      title: conv.title,
      filepath,
    };

    /* Load participants */
    conversation.participants = conv.participants.map((participant) => {
      return {
        name: participant.name,
        avatar: participant.avatar || state.DEFAULT.AVATAR,
      };
    });

    conversation.avatar = conversation.participants[0].avatar;
    conversation.preview = conv.messages[0].content;
    conversation.time = DateFormatter.formatDate(conv.messages[0].timestamp_ms);

    /* Load messages */
    conversation.messages = [];

    // Reverse the conversation to start from the first
    let reversedMsg = conv.messages.reverse();

    let prevMsg = null;

    for (let message of reversedMsg) {
      let newMessage = {};

      // if same sender_name, just concat
      if (prevMsg && message.sender_name == prevMsg.sender_name) {
        prevMsg.content += "\n" + (message.content || "");
        prevMsg.photos = prevMsg.photos ? prevMsg.photos.concat(message.photos) : message.photos;
      }
      // Else add a new message
      else {
        newMessage = {
          content: message.content || "",
          sender_name: message.sender_name || conversation.participants[0].name,
          timestamp: message.timestamp_ms,
          photos: message.photos,
        };
        conversation.messages.push(newMessage);
        prevMsg = newMessage;
      }
    }
    store.commit("ADD_CONV", conversation);
  },
};

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: true,
});

export default store;
