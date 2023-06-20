import { AppState } from "../AppState";
import { Message } from "../models/Message";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class MessagesService {
  async createMessage(messageData) {
    const res = await api.post("api/messages", messageData);
    logger.log(new Message(res.data));
    // AppState.messages.push(new Message(res.data));
  }
}

export const messagesService = new MessagesService();
