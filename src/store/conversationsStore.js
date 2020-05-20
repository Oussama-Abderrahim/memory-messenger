import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	DEFAULT: {
		SENDER_NAME: 'utilisateur',
		AVATAR:
			'https://lh3.googleusercontent.com/-mGkGQtgsLjA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcAQmY3uszZ1HR-gE4VfvMMJkiSNQ.CMID/s96-c/photo.jpg',
		CONV: {
			title: '',
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
	},
	SET_INDEX: (state, i) => {
		state.currentIndex = i;
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
	setConversationIndex: (store, i) => {
		store.commit('SET_INDEX', i);
	},
	addConversation: (store, conv) => {
		let conversation = {
			title: conv.title
		};

		/* Load participants */
		conversation.participants = conv.participants.map(participant => {
			return {
				name: participant.name,
				avatar: participant.avatar || state.DEFAULT.AVATAR
			};
		});

		/* Load messages */

		conversation.messages = [];

		// Reverse the conversation to start from the first
		let reversedMsg = conv.messages.reverse();

		for (let message of reversedMsg) {
			let prevMsg = conversation.messages[conversation.messages.length - 1];
			// if same sender_name, just concat
			if (prevMsg && message.sender_name == prevMsg.sender_name) {
				prevMsg.content += '\n' + (message.content || '');
				prevMsg.photos = prevMsg.photos
					? prevMsg.photos.concat(message.photos)
					: message.photos;
			} else {
				conversation.messages.push({
					content: message.content || '',
					sender_name: message.sender_name || conversation.participants[0].name,
					timestamp: message.timestamp_ms,
					photos: message.photos
				});
			}
		}
		store.commit('ADD_CONV', conversation);
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
