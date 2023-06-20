<template>
  <form @submit.prevent="create()">
    <div class="mb-3">
      <label for="name" class="form-label">Title:</label>
      <input type="text" v-model="editable.title" class="form-control" id="title" aria-describedby="roomName">
    </div>
    <button data-bs-dismiss="modal" type="submit" class="btn btn-outline-dark">Submit</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { roomsService } from "../../services/RoomsService";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import { AppState } from "../../AppState";


export default {



  setup() {
    const editable = ref({})



    return {
      editable,
      async create() {
        try {
          let roomBody = editable.value
          roomBody.channelId = AppState.editChannel.id
          await roomsService.create(roomBody)
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      }

    }
  }
}
</script>

<style></style>
