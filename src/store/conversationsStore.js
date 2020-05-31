import Vue from "vue";
import Vuex from "vuex";
import Conversation from "@/models/Conversation";

Vue.use(Vuex);

const state = {
  currentIndex: -1,
  conversations: [],
};

const mutations = {
  ADD_CONV: (state, conversation) => {
    state.currentIndex++;
    state.conversations.push(conversation);
  },
  REMOVE_CONV: (state, id) => {
    let index = state.conversations.map((conversation) => conversation.id).indexOf(id);
    state.conversations.splice(index, 1);
    if (state.currentIndex >= state.conversations.length) state.currentIndex = state.conversations.length - 1;
    if (state.conversations.length == 0) state.currentIndex = -1;
  },
  SET_INDEX: (state, i) => {
    state.currentIndex = i;
  },
};

const getters = {
  currentConversation: (state) =>
    state.conversations.length > 0 ? state.conversations[state.currentIndex] : new Conversation(),
  conversations: (state) => state.conversations,
};

const actions = {
  setConversationIndex: (store, i) => {
    store.commit("SET_INDEX", i);
  },
  removeConversation: (store, id) => {
    store.commit("REMOVE_CONV", id);
  },
  addConversation: (store, { conv, filepath }) => {
    let conversation = new Conversation({
      title: conv.title,
      filepath,
      thread_path: conv.thread_path,
      messages: conv.messages,
      participants: conv.participants,
    });

    store.commit("ADD_CONV", conversation);
    return conversation;
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
