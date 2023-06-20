<template>
  <section class="container-fluid bigHeight">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <ChannelList />
      <!-- SECTION FRIENDS/ROOMS LIST -->
      <FriendRoomList />
      <!-- SECTION CHAT -->
      <ChatRoom />
      <!-- SECTION WHO'S ONLINE -->
      <WhoIsOnline />
    </div>
  </section>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"
import { AppState } from "../AppState";
import FriendRoomList from "../components/HomePage/FriendRoomList.vue";
import ChatRoom from "../components/HomePage/ChatRoom.vue";
import WhoIsOnline from "../components/HomePage/WhoIsOnline.vue";
import ChannelList from "../components/HomePage/ChannelList.vue";

export default {
  setup() {
    onBeforeMount(() => {
      resetAppState()
    })
    onMounted(() => {
      getChannels();
    });
    async function getChannels() {
      try {
        await channelsService.getAll();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }
    function resetAppState() {
      try {
        AppState.users = []
        AppState.room = null
        AppState.channel = null
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }
    onUnmounted(() => {
      AppState.users = []
    });
    return {
    };
  },
  components: { FriendRoomList, ChatRoom, WhoIsOnline, ChannelList }
}
</script>

<style scoped lang="scss">
.bigHeight {
  height: 100dvh;
}
</style>
