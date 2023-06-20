import { socketProvider } from "../SocketProvider";
import { channelsService } from "../services/ChannelsService.js";
import { messagesService } from "../services/MessagesService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class MessagesController extends BaseController {
  constructor() {
    super("api/messages");
    this.router
      .get("/:id", this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getOne(req, res, next) {
    try {
      let messageId = req.params.id;
      let message = await messagesService.getOne(messageId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let messageBody = req.body;
      messageBody.creatorId = req.userInfo.id;
      let message = await messagesService.create(messageBody);

      // Notify the clients in the room about the newly created message
      // Use the 'messageRoom' function of the 'socketProvider' to send a socket event to a specific room
      // Pass the room ID, event name "s:creating:message", and the 'message' object as parameters
      socketProvider.messageRoom(
        message.roomId.toString(),
        "s:creating:message",
        message
      );

      // Notify the channel owner about the newly created message
      // Use the 'messageUser' function of the 'socketProvider' to send a socket event to a specific user
      // Pass the channel owner's ID, event name "s:channelOwner:messageCreated", and the 'message' object as parameters
      socketProvider.messageUser(
        message.channel.creatorId.toString(),
        "s:channelOwner:messageCreated",
        message
      );
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let messageBody = req.body;
      messageBody.creatorId = req.userInfo.id;
      messageBody.id = req.params.id;
      let editedMessage = await messagesService.edit(messageBody);
      return res.send(editedMessage);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let messageId = req.params.id;
      let userId = req.userInfo.id;
      let message = await messagesService.delete(messageId, userId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }
}
