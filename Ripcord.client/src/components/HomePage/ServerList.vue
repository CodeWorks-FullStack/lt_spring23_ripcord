<template>
  <router-link :to="{
    name: 'Channel', params: { id: server.id }
  }">
    <img class="my-1 channelImage selectable" :src=server.img :title=server.name alt="Channel Image" srcset="">
  </router-link>
</template>

<script>
import { RouterLink } from "vue-router";
import { Channel } from "../../models/Channel";
import { channelsService } from "../../services/ChannelsService";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import { router } from "../../router";


export default {
  props: { server: { type: Channel, required: true } },
  setup() {
    return {
      async setActiveChannel(serverId) {
        try {
          await channelsService.setActiveChannel(serverId);
          router.push({ name: 'Channel', params: { id: serverId } })
        }
        catch (error) {
          logger.error("[ERROR]", error);
          Pop.error(("[ERROR]"), error.message);
        }
      }
    };
  },
  components: { RouterLink }
}
</script>

<style scoped>
.channelImage {
  height: auto;
  width: 75%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  object-position: center;
  object-fit: cover;
}

/* .channelImage:hover {

} */
</style>
