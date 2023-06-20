import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Channel.js').Channel[]} */
  channels: [],
  /** @type {import('./models/Channel.js').Channel||null} */
  channel: null,
  /** @type {import('./models/Channel.js').Channel||null} */
  editChannel: null,
  /** @type {import('./models/Room.js').Room[]} */
  rooms: [],
  /** @type {import('./models/Room.js').Room||null} */
  room: null,
  /** @type {import('./models/Message.js').Message[]} */
  messages: [],
  /** @type {import('./models/NewUser.js').NewUser[]} */
  users: [],
  /** @type {import('./models/Friend.js').Friend[]} */
  friends: [],
  /** @type {import('./models/Friend.js').Friend||null} */
  friend: null,
  ads: [],
});
