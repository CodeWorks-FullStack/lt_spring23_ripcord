import { AppState } from "../AppState";
import { Channel } from "../models/Channel";
import { Message } from "../models/Message";
import { Room } from "../models/Room";
import { User } from "../models/User";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ChannelsService {
  async getAll() {
    const res = await api.get("api/channels");
    AppState.channels = res.data.map((c) => new Channel(c));
  }

  async setActiveChannel(serverId) {
    const res = await api.get(`api/channels/${serverId}`);
    logger.log(new Channel(res.data));
    AppState.channel = new Channel(res.data);
    AppState.editChannel = new Channel(res.data);
    // await this.getRooms(serverId);
    // await this.getUsers(serverId);
  }

  // async getUsers(channelId) {
  //   const res = await api.get(`api/channels/${channelId}/users`);
  //   logger.log("[GETTING ROOMS USERS]", res.data);
  //   AppState.users = res.data.map((u) => new User(u));
  // }

  async getMessages() {
    const res = await api.get("api/channels/64359c414dc0b5da04e9666e/messages");
    let messages = res.data.map((m) => new Message(m));
    logger.log(messages);
  }

  async getRooms(channelId) {
    const res = await api.get(`api/channels/${channelId}/rooms`);
    AppState.rooms = [];
    AppState.rooms = res.data.map((r) => new Room(r));
  }

  async create(channelBody) {
    const res = await api.post("api/channels", channelBody);
    // NOTE COMMENTED OUT FOR WEB SOCKETS.. DON"T NEED
    // AppState.channels.push(new Channel(res.data));
  }

  async edit(channelBody) {
    const res = await api.put(`api/channels/${channelBody.id}`, channelBody);
    logger.log(res.data, "EDIT CHNL");
  }

  async delete(channelId) {
    const res = await api.delete(`api/channels/${channelId}`);
    logger.log("[DELETING CHANNEL]", res.data);
    AppState.channels = AppState.channels.filter((c) => c.id != channelId);
  }
}

export const channelsService = new ChannelsService();
