<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">

          <!-- SECTION MODAL HEADER -->
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="header"></slot>
          </h1>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- SECTION MODAL BODY -->
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {



  setup() {



    return {

    }
  }
}
</script>

<style></style>
