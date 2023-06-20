<template>
  <section class="container-fluid bigHeight">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <ChannelList class="order-1 order-md-1" />
      <!-- SECTION FRIENDS/ROOMS LIST -->
      <FriendRoomList class="order-2 order-md-2" />
      <!-- SECTION CHAT -->
      <ChatRoom class="order-4 order-md-3" />
      <!-- SECTION WHO'S ONLINE -->
      <WhoIsOnline class="order-3 order-md-4" />
    </div>
  </section>

  <Modal id="editChannel">
    <template #header>
      <div>Edit Channel</div>
    </template>

    <template #body>
      <ChannelForm />
    </template>
  </Modal>

  <Modal id="createRoom">
    <template #header>
      <div>Create Room</div>
    </template>

    <template #body>
      <RoomForm />
    </template>
  </Modal>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"
import { AppState } from "../AppState";
import FriendRoomList from "../components/HomePage/FriendRoomList.vue";
import ChannelList from "../components/HomePage/ChannelList.vue"
import ChatRoom from "../components/HomePage/ChatRoom.vue"
import WhoIsOnline from "../components/HomePage/WhoIsOnline.vue";
import Modal from "../components/Util/Modal.vue";
import ChannelForm from "../components/Forms/ChannelForm.vue";
import RoomForm from "../components/Forms/RoomForm.vue";
import { useRoute, useRouter } from "vue-router";
import { roomsService } from "../services/RoomsService";
import { socketService } from "../services/SocketService"
import { adsService } from "../services/AdsService";
import { router } from "../router.js";

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()


    // The router.beforeEach() function is a navigation guard that is called before each route change.
    router.beforeEach((to, from) => {
      // Log the 'to' and 'from' routes for debugging purposes
      logger.log('[TO]', to, "[FROM]", from)

      // Check if the previous route is "Channel"
      if (from.name == "Channel") {
        // If the user is leaving a channel, call the leaveRoom() function to handle necessary actions
        // The leaveRoom() function is responsible for managing any tasks related to leaving the room associated with the channel
        // Pass the channel ID (from.params.id) as a parameter to the leaveRoom() function
        leaveRoom(from.params.id)
      }
    })

    // The router.afterEach() function is a navigation guard that is called after each route change.
    router.afterEach((to, from) => {
      // Check if the current route is "Channel"
      if (to.name == "Channel") {
        // If the user has arrived at a channel, perform the following actions:

        // Call the below functions to handle necessary actions for joining the room associated with the channel
        joinRoom()
        getChannels()
        getChannel()
        getMessages()
        getAds()
      }
    })

    function leaveRoom(roomId) {
      try {
        // Create a payload object with the roomId parameter
        let payload = { roomId: roomId }

        // Emit a socket event "c:leaving:room" with the payload
        // This event notifies the server that the user is leaving the specified room
        socketService.emit("c:leaving:room", payload)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    function joinRoom() {
      try {
        // Create a payload object with the roomId obtained from route.params.id
        // This assumes that the route object is available and contains the necessary information
        let payload = { roomId: route.params.id }

        // Emit a socket event "c:joining:room" with the payload
        // This event notifies the server that the user is joining the specified room
        socketService.emit("c:joining:room", payload)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }


    async function getChannels() {
      try {
        await channelsService.getAll();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    async function getChannel() {
      try {
        const channelId = route.params.id
        await channelsService.setActiveChannel(channelId)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getMessages() {
      try {
        let roomId = route.params.id
        await roomsService.getMessages(roomId)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }
    return {
    };
  },
  components: { FriendRoomList, ChannelList, ChatRoom, WhoIsOnline, Modal, ChannelForm, RoomForm }
}
</script>

<style scoped lang="scss">
.bigHeight {
  height: 100dvh;
}
</style>
