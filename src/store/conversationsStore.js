import Vue from "vue";
import Vuex from "vuex";
import Conversation from "@/models/Conversation";

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
    let conversation = new Conversation({
      title: conv.title,
      filepath,
      messages: conv.messages,
      participants: conv.participants,
    });

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
