import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { roomsService } from "../services/RoomsService";

export class RoomsController extends BaseController{
  constructor() {
    super('api/rooms')
    this.router
    .get("", this.getAll)
    .get("/:id", this.getOne)
    .get("/:id/messages", this.getMessages)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get("/:id/friend", this.getFriendRoom)
    .post("", this.create)
    .put("/:id", this.edit)
    .delete("/:id", this.delete)
  }

  async getAll (req, res, next) {
  try {
    let rooms = await roomsService.getAll()
    return res.send(rooms)
  } catch (error) {
    next(error)
  }
  }


  async getOne(req, res, next) {
    try {
    let roomId = req.params.id
    let room = await roomsService.getOne(roomId)
      return res.send(room)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let roomData = req.body
      roomData.creatorId = req.userInfo.id
      let room = await roomsService.create(roomData)
      return res.send(room)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let roomData = req.body
      roomData.creatorId = req.userInfo.id
      roomData.id = req.params.id
      let editedRoom = await roomsService.edit(roomData)
      return res.send(editedRoom)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let roomId = req.params.id
      let userId = req.userInfo.id
      let message = await roomsService.delete(roomId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  // SECTION MESSAGES

  async getMessages(req, res, next) {
    try {
      let roomId = req.params.id
      let messages = await roomsService.getMessages(roomId)
      return res.send(messages)
    } catch (error) {
      next(error)
    }
  }

  // SECTION FRIENDS

  async getFriendRoom (req, res, next) {
  try {
    let channelId = req.params.id
    let room = await roomsService.getFriendRoom(channelId)
    return res.send(room)
  } catch (error) {
    next(error)
  }
  }


}
