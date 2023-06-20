<template>
  <form @submit.prevent="createChannel()">
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input type="text" v-model="editable.name" class="form-control" id="name" aria-describedby="channelName">
    </div>
    <div class="mb-3">
      <label for="channelImage" class="form-label">Image:</label>
      <input type="text" class="form-control" v-model="editable.img" id="img">
    </div>
    <div class="mb-3">
      <label class="form-label" for="description">Description:</label>
      <textarea class="form-control" name="description" id="description" v-model="editable.description"
        rows="3"></textarea>
    </div>
    <button data-bs-dismiss="modal" type="submit" class="btn btn-outline-dark">Submit</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import { channelsService } from "../../services/ChannelsService";
import { AppState } from "../../AppState";

export default {



  setup() {
    let editable = ref({})



    return {
      editable,
      async createChannel() {
        try {
          let channelBody = editable.value
          await channelsService.create(channelBody)
          editable.value = {}
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async editChannel() {
        try {
          const channelBody = editable.value
          await channelsService.edit(channelBody)
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

      handleSubmit() {
        if (AppState.editChannel) {
          this.editChannel()
        } else {
          this.createChannel()
        }
      }
    }
  }
}
</script>

<style></style>
