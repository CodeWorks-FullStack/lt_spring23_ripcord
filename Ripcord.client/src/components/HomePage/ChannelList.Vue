<template>
  <div class="col-md-1 bgDark bigHeight">
    <div class="row border-bottom topList">
      <div class="col-3 col-md-12 text-center my-2">
        <img @click="pushToHome()" class="my-1 channelImage selectable" src="src\assets\img\Group 1.png" title="Ripcord"
          alt="Channel Image" srcset="">
      </div>
    </div>
    <div class="row middleList verticalScroll">
      <div class="col-3 col-md-12 text-center mt-2" v-for="c in channels" :key="c.id">
        <ServerList :server="c" />
      </div>
    </div>
    <div v-if="account" class="row bottomList align-items-center">
      <div class="col-10 mx-auto">
        <button class="btn btn-outline buttonText p-0" type="button" data-bs-target="#channelModal"
          data-bs-toggle="modal">
          <span>Create <i class="mdi mdi-pencil-outline"></i></span></button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import ServerList from "../HomePage/ServerList.vue";
import { router } from "../../router";

export default {



  setup() {



    return {
      channels: computed(() => AppState.channels),
      account: computed(() => AppState.account),

      pushToHome() {
        try {
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

    }
  },
  components: { ServerList }
}
</script>

<style scoped>
.bgDark {
  background-color: #0d1c16;
  color: whitesmoke;
}

.bigHeight {
  height: 100dvh;
}

.channelImage {
  height: auto;
  width: 90%;
  border-radius: 50%;
  aspect-ratio: 1/1;
  cursor: pointer;
}

.topList {
  height: 15%;
}

.middleList {
  height: 75%;
}

.bottomList {
  height: 10%;
  background-color: #13251f;
}

.verticalScroll {
  overflow-x: hidden;
  overflow-y: scroll;
}

.verticalScroll::-webkit-scrollbar {
  width: 2px;
  height: 5dvh;
  background-color: #053f0500;
}

.verticalScroll::-webkit-scrollbar-thumb {
  background: #053f0500;
}

.buttonText {
  color: whitesmoke !important;
  font-size: smaller !important;
}
</style>