<script setup></script>

<template>
  <!-- Footer -->
  <footer>
    <div class="weatherWrapper" id="page-footer">
      <div class="content py-3">
        <div class="row fs-sm">
          <div class="col-sm-6 order-sm-2 py-1 text-center text-sm-end">
            <slot name="content-right"> </slot>
          </div>
          <div class="col-sm-6 order-sm-1 py-1 text-center text-sm-start">
            <slot name="content-left"> </slot>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- END Footer -->
</template>
