<template>
  <!-- SECTION FRIENDS -->
  <div class="d-none d-md-block col-md-2 bgPrimary bigHeight">
    <div class="row topChat border-bottom align-items-center">
      <div class=" col-12">
        <h5 class="m-0">Friends </h5>
      </div>
    </div>
    <div class="row middleChat verticalScroll">
      <div v-for="f in friends" :key="f.id" class="col-12 mt-1">
        <router-link :to="{ name: 'Friend', params: { id: f.id } }">
          <h6 class="selectable" @click="setActiveFriend(f.id)">
            <img class="onlinePicture" :src="f.Friend.picture" alt=""> {{ f.Friend.name }}
          </h6>
        </router-link>
      </div>
    </div>
    <div class="row bottomChat align-items-center">
      <div class="col-2 text-start px-1">
        <router-link :to="{ name: 'Account' }">
          <img class="onlinePicture p-0 m-0" :src="account.picture" :title="account.name" alt="">
        </router-link>
      </div>
      <div class="col-8">
        <h5 class="p-0 m-0">{{ account.name }}</h5>
      </div>
    </div>
  </div>
  <!-- SECTION ROOMS -->

  <!-- <div v-else class="col-md-2 bgPrimary bigHeight">
    <div class="row topChat">
      <div class="col-9 py-3 border-bottom border-dark align-items-center">
        <span class="m-0">{{ channel.name }}</span>
      </div>
      <div v-if="account.id == channel.creatorId" class="col-2 py-3 align-items-center">
        <div class="dropdown">
          <i type="button" data-bs-toggle="dropdown" class="dropdown-toggle mdi mdi-dots-horizontal"></i>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li data-bs-toggle="modal" data-bs-target="#editChannel"><a class="dropdown-item" href="#">Edit Channel</a>
            </li>
            <li @click="deleteChannel(channel.id)"><a class="dropdown-item" href="#">Delete Channel</a></li>
            <li data-bs-toggle="modal" data-bs-target="#createRoom"><a class="dropdown-item" href="#">Create Room</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row middleChat verticalScroll">
      <div v-for="r in rooms" :key="r.id" class="col-12 middleChatDiv mt-3">
        <h6 :title="r.title" v-if="r.Creator.id != account.id" class="selectable py-2 rounded"
          @click="setActiveRoom(r.id)">{{ r.title }}
        </h6>
        <h6 v-else :title="r.title" class="selectable py-2 rounded" @click="setActiveRoom(r.id)">{{ r.title }} <span
            @click="deleteRoom(r.id, r.title)" title="Delete" class=" mdi mdi-close"></span></h6>
      </div>
    </div>
    <div class="row bottomChat align-items-center">
      <div class="col-2 text-start px-1">
        <router-link :to="{ name: 'Account' }">
          <img class="onlinePicture p-0 m-0" :src="account.picture" :title="account.name" alt="">
        </router-link>
      </div>
      <div class="col-8">
        <h5>{{ account.name }}</h5>
      </div>
    </div>
  </div> -->
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import Login from "../../components/Login.vue"
import { channelsService } from "../../services/ChannelsService";
import { useRouter } from "vue-router";
import { roomsService } from "../../services/RoomsService";


export default {
  setup() {
    const router = useRouter()
    return {
      channel: computed(() => AppState.channel),
      friends: computed(() => AppState.friends),
      account: computed(() => AppState.account),
      rooms: computed(() => AppState.rooms),

      async setActiveRoom(roomId) {
        try {
          await roomsService.setActiveRoom(roomId);
          router.push({ name: "Room", params: { id: roomId } })
        }
        catch (error) {
          logger.error("[ERROR]", error);
          Pop.error(("[ERROR]"), error.message);
        }
      },

      async deleteChannel(channelId) {
        try {
          if (
            await Pop.confirm(`Are you sure you want to delete ${AppState.channel.name}?`)) {
            await channelsService.delete(channelId)
          }
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async deleteRoom(roomId, title) {
        try {
          if (
            await Pop.confirm(`Are you sure you want to delete ${title}?`)) {
            await roomsService.delete(roomId)
          }
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      }
    };
  },
  components: { Login }
}
</script>

<style scoped>
.bigHeight {
  height: 100dvh;
}

.topChat {
  height: 5%;
}

.middleChat {
  height: 85%;
}

.middleChatDiv {
  max-height: 10px !important;
  height: 10px !important;
}

.bottomChat {
  height: 10%;
  background-color: #13251f;
}

.bgPrimary {
  background-color: #1c3a2e;
  color: whitesmoke;
}

.onlinePicture {
  height: 35px;
  width: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.verticalScroll {
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: #053f05 2px solid;
}

.verticalScroll::-webkit-scrollbar {
  width: 2px;
  height: 5dvh;
  background-color: #053f05;
}

.verticalScroll::-webkit-scrollbar-thumb {
  background: #053f05;
}
</style>
