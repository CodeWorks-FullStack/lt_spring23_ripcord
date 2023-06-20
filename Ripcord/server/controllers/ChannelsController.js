import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { channelsService } from "../services/ChannelsService";
import { SocketHandler } from "../utils/SocketHandler";
import { socketProvider } from "../SocketProvider";

export class ChannelsController extends BaseController {
  constructor() {
    super("api/channels");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .get("/:id/rooms", this.getRooms)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let channels = await channelsService.getAll();
      return res.send(channels);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      let channelId = req.params.id;
      let channel = await channelsService.getOne(channelId);
      return res.send(channel);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let channelBody = req.body;
      channelBody.creatorId = req.userInfo.id;
      let channel = await channelsService.create(channelBody);
      return res.send(channel);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let channelBody = req.body;
      channelBody.creatorId = req.userInfo.id;
      channelBody.id = req.params.id;
      let editedChannel = await channelsService.edit(channelBody);
      return res.send(editedChannel);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let creatorId = req.userInfo.id;
      let channelId = req.params.id;
      let message = await channelsService.delete(channelId, creatorId);
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }

  // SECTION MESSAGES

  async getMessages(req, res, next) {
    try {
      let channelId = req.params.id;
      let messages = await channelsService.getMessages(channelId);
      return res.send(messages);
    } catch (error) {
      next(error);
    }
  }

  // SECTION ROOMS

  async getRooms(req, res, next) {
    try {
      let channelId = req.params.id;
      let rooms = await channelsService.getRooms(channelId);
      return res.send(rooms);
    } catch (error) {
      next(error);
    }
  }
}
