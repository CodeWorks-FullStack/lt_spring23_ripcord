<template>
  <div class="container">
    <router-link :to="{ name: 'Home' }">
      <div class="btn btn-outline-light mt-4">Home</div>
    </router-link>
    <div class="row">
      <div class="col-1">
        <Login />
      </div>
    </div>
    <h1 class="mt-5">Account Information</h1>
    <div class="user-info">
      <div class="user-avatar">
        <img :src="account.picture" alt="User Avatar">
      </div>
      <div class="user-details">
        <h2>{{ account.name }}</h2>
        <p>{{ account.email }}</p>
      </div>
    </div>
    <h2>Account Settings</h2>
    <div class="account-settings">
      <div class="change-password">
        <div>
          <h2 class="mb-4">Edit Account</h2>
          <form @submit.prevent="submitForm" class="row g-3">
            <div class="col-md-6">
              <label for="name" class="form-label">Name:</label>
              <input type="text" id="name" v-model="editable.name" class="form-control">
            </div>
            <div class="col-md-6">
              <label for="picture" class="form-label">Picture:</label>
              <input type="text" id="picture" v-model="editable.picture" class="form-control">
            </div>
            <div class="col-md-12">
              <label for="email" class="form-label">Email:</label>
              <input type="email" id="email" v-model="editable.email" class="form-control">
            </div>
            <div class="col-md-12 mt-3">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
      <!-- <div class="delete-account">
        <h3>Delete Account</h3>
        <button @click="deleteAccount">Delete My Account</button>
      </div> -->
    </div>
  </div>

</template>

<script>
import { ref, computed } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import Login from "../components/Login.vue"
import ChannelForm from "../components/Forms/ChannelForm.vue";

export default {
  data() {
    let editable = ref({})
    return {
      account: computed(() => AppState.account),
      editable,

      async submitForm() {
        try {
          let accountBody = editable.value
          await accountService.editAccount(accountBody)
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      }
    };
  },
  components: { Login, ChannelForm }
};
</script>

<style>
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.user-avatar {
  margin-right: 2rem;
}

.user-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.account-settings {
  display: flex;
  justify-content: space-between;
}

.change-password {
  margin-right: 2rem;
}

.delete-account button {
  color: red;
}

body {
  background-color: rgb(53, 51, 51);
  color: white;
}
</style>
