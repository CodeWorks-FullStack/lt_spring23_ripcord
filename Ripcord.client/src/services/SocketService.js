import { applyStyles } from "@popperjs/core";
import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { SocketHandler } from "../utils/SocketHandler";

class SocketService extends SocketHandler {
  constructor() {
    super(true);
    this.on("error", this.onError)
      .on("s:creating:channel", this.creatingChannel)
      .on("s:creating:message", this.creatingMessage)
      .on("s:leaving:room", this.leavingRoom)
      .on("s:joining:room", this.joiningRoom);
  }

  onError(e) {
    Pop.toast(e.message, "error");
  }

  creatingChannel(payload) {
    // Create a new channel object using the payload
    let newChannel = new Channel(payload);

    // Log the new channel payload
    logger.log("[NEW CHANNEL PAYLOAD]", payload);

    // Check if the payload is empty or undefined
    if (!payload) {
      // Throw an error if the payload is missing
      throw new Error("Sorry, something went wrong with the payload.");
    } else {
      // Check if the creatorId of the new channel is different from the current account's id
      if (AppState.account.id != newChannel.creatorId) {
        // Display a toast message indicating the creation of the new channel
        Pop.toast(`${newChannel.name} has been created!`);
      }

      // Add the new channel to the AppState's channels array
      AppState.channels.push(newChannel);
    }
  }

  creatingMessage(payload) {
    // Log the payload of the message being created
    logger.log("[CREATING MESSAGE PAYLOAD]", payload);

    // Create a new message object using the payload
    let message = new Message(payload);

    // Add the new message to the AppState's messages array
    AppState.messages.push(message);
  }

  leavingRoom(payload) {
    // Check if a payload exists and if the current account ID is different from the payload ID
    if (payload && AppState.account.id != payload.id) {
      // Display a toast notification when a user leaves the room
      Pop.toast(`
    <h5>${payload.nickname} has left the room.</h5>
    `);
    }
  }

  joiningRoom(payload) {
    // Log the payload to the console for debugging purposes
    logger.log(payload);

    // Check if a payload exists and if the current account ID is different from the payload ID
    if (payload && AppState.account.id != payload.id) {
      // Display a toast notification when a user joins the room
      Pop.toast(
        `
    <h5 class="p-3 text-danger">${payload.nickname} has joined the room!</h5>
    `,
        "danger",
        "bottom-end"
      );
    }
  }
}

export const socketService = new SocketService();
