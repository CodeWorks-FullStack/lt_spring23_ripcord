<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <main>
    <router-view />
  </main>

  <Modal id="channelModal">
    <template #header>
      <div>Create Channel</div>
    </template>

    <template #body>
      <ChannelForm />
    </template>
  </Modal>


</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ChannelForm from "./components/Forms/ChannelForm.vue"
import Modal from "./components/Util/Modal.vue"
import RoomForm from "./components/Forms/RoomForm.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ChannelForm, Modal, RoomForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100dvh - 32px - 64px);
}
</style>
