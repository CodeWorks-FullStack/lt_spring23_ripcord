import { socketProvider } from "../SocketProvider";
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
