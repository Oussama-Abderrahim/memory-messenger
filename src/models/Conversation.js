import DateFormatter from "@/utils/DateFormatter";

class Conversation {
  /**
   *
   * @param {conv} Object: conversation loaded from file
   */
  constructor({ title, filepath, messages, participants }) {
    this.avatar = "";
    this.participants = [];
    this.messages = [];
    this.title = title;
    this.filepath = filepath;
    this.preview = messages[0].content;
    this.time = DateFormatter.formatDate(messages[0].timestamp_ms);
    this.setParticipants(participants);
    this.setMessages(messages);
  }

  setParticipants(participants) {
    this.participants = participants.map((participant) => {
      return {
        name: participant.name,
        avatar: participant.avatar, // || state.DEFAULT.AVATAR,
      };
    });

    this.avatar = this.participants[0].avatar; ///TODO
  }

  setMessages(messages) {
    // Reverse the conversation to start from the first
    let reversedMsg = messages.reverse();

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
          sender_name: message.sender_name || "User",
          timestamp: message.timestamp_ms,
          photos: message.photos,
        };
        this.addMessage(newMessage);
        prevMsg = newMessage;
      }
    }
  }

  addMessage(message) {
    this.messages.push(message);
  }
}

export default Conversation;
