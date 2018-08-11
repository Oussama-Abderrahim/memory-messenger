import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  DEFAULT: {
    SENDER_NAME: "utilisateur",
    AVATAR: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    CONV: {
      title: "",
      messages: [],
      participants: []
    }
  },
  currentIndex: -1,
  conversations: []
};

const mutations = {
  ADD_CONV: (state, conversation) => {
    state.currentIndex++;
    state.conversations.push(conversation);
  }
};

const getters = {
  currentConversation: state =>
    state.conversations.length > 0
      ? state.conversations[state.currentIndex]
      : state.DEFAULT.CONV,
  conversations: state => state.conversations
};

const actions = {
  addConversation: (store, conv) => {
    /* Load messages */
    let conversation = {
      title: conv.title
    };

    conversation.messages = conv.messages.reverse().map(message => {
      return {
        content: message.content,
        sender_name: message.sender_name,
        timestamp: message.timestamp,
        photos: message.photos
      };
    });

    /* Load participants */
    conversation.participants = conv.participants.map(name => {
      return {
        name,
        avatar: state.DEFAULT.AVATAR
      };
    });
    store.commit("ADD_CONV", conversation);
  }
};

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: true
});

export default store;
