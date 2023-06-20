import { SocketHandler } from "../utils/SocketHandler";

export class RoomHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true);

    // Attach event handlers for different socket events
    this.on("SOCKET_TEST", this.testEvent)
      .on("c:leaving:room", this.leavingRoom)
      .on("c:joining:room", this.joiningRoom);
  }

  /**
   * Handler function for the "SOCKET_TEST" event
   * @param {any} payload - The payload received with the event
   */
  async testEvent(payload) {
    // Emit an "IS_TESTED" event back to the socket that triggered the event
    this.socket.emit("IS_TESTED", payload);
  }

  /**
   * Handler function for the "c:leaving:room" event
   * @param {any} payload - The payload received with the event
   */
  leavingRoom(payload) {
    if (!payload.roomId) {
      // If no roomId is provided in the payload, emit an "error" event with an error message
      this.socket.emit("error", { error: "Please provide a room Id." });
      return;
    }

    // Leave the specified room using the leave() method of the socket
    this.socket.leave(payload.roomId);

    // Emit an "s:leaving:room" event to all clients in the room (except the current socket)
    // Pass the profile data (this.profile) as the payload of the event
    this.socket.to(payload.roomId).emit("s:leaving:room", this.profile);
  }

  /**
   * Handler function for the "c:joining:room" event
   * @param {any} payload - The payload received with the event
   */
  joiningRoom(payload) {
    if (!payload.roomId) {
      // If no roomId is provided in the payload, emit an "error" event with an error message
      this.socket.emit("error", {
        error: "Something went wrong with the room Id.",
      });
      return;
    }

    // Join the specified room using the join() method of the socket
    this.socket.join(payload.roomId);

    // Emit an "s:joining:room" event to all clients in the room (except the current socket)
    // Pass the profile data (this.profile) as the payload of the event
    this.socket.to(payload.roomId).emit("s:joining:room", this.profile);
  }
}
