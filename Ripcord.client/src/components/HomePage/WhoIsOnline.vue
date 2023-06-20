<template>
  <div class=" col-md-3 bgLight">
    <div class="row ">
      <div class="col-12" v-for="a in ads" :key="a.id">
        <div class="row justify-content-center">
          <div class="d-none d-md-block col-8 mt-4">
            <img class="img-fluid" :src=a.tall alt="">
          </div>
          <div class="d-block d-md-none col-8 my-2">
            <img class="img-fluid" :src=a.banner alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";

export default {



  setup() {




    return {
      users: computed(() => AppState.users),
      ads: computed(() => AppState.ads)

    }
  }
}
</script>

<style scoped>
.onlinePicture {
  height: 35px;
  width: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.bgLight {
  background-color: #265e49;
  color: whitesmoke;
}
</style>
