const DEFAULT_USER_NAME = "User";

/**
 * @class
 * @classdesc A single Message from a user
 */
class Message {
  /**
   *
   * @param {Object} Msg
   * @param {string} Msg.content
   * @param {string} Msg.sender_name
   * @param {Number} Msg.timestamp_ms
   * @param {Object[]} Msg.photos
   */
  constructor({ content, sender_name, timestamp_ms, photos = undefined } = {}, filepath = "") {
    /** @type {string} content - Message text */
    this.content = content || "";

    /** @type {string} sender_name - Name of sender */
    this.sender_name = sender_name || DEFAULT_USER_NAME;

    /** @type {Number} timestamp - Timestamp of the message in ms */
    this.timestamp = timestamp_ms || Date.parse(new Date());

    /** @type {Object[]} [photos] - Array of photos attached to the file */
    this.photos = this.getPhotosURIs(photos, filepath);
  }

  /**
   * 
   * @param {Array} photos Array of objects with uri photo ( from original data )
   * @param {string} filepath Path to the folder containing the photos directory
   */
  getPhotosURIs(photos, filepath) {
    if (!photos) return undefined;

    return photos.map((photo) => ({
      uri: filepath + photo.uri.replace(/messages\/.*?\/photos/, "photos"),
    }));
  }

  /**
   * Concat a given message to this one
   * @param {Object} message
   * @param {string} message.content
   * @param {Object[]} message.photos
   */
  concatMessage(message, filepath) {
    this.content += "\n" + (message.content || "");
    let newphotos = this.getPhotosURIs(message.photos, filepath);
    this.photos = this.photos ? this.photos.concat(newphotos) : newphotos;
  }
}

export default Message;
