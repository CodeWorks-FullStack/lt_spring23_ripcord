import { applyStyles } from "@popperjs/core";
import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { SocketHandler } from "../utils/SocketHandler";

class SocketService extends SocketHandler {
  constructor() {
    super();
    this.on("error", this.onError);
  }

  onError(e) {
    Pop.toast(e.message, "error");
  }
}

export const socketService = new SocketService();
