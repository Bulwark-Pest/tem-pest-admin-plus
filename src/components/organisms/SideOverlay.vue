<script setup>
import { useTemplateStore } from "@/stores/template";

// Main store
const store = useTemplateStore();

// textarea resize in notes
const textAreaResize = () => {
  const textAreaTechNotes   = document.getElementById('floatingTextarea1');
  const textAreaOfficeNotes = document.getElementById('floatingTextarea2');
  const textAreaSalesNotes  = document.getElementById('floatingTextarea3');

  if(textAreaSalesNotes !== null) {
    textAreaSalesNotes.style.height    = 'auto';
    textAreaSalesNotes.style.height    = textAreaSalesNotes.scrollHeight + 'px';
  }
  if(textAreaTechNotes !== null) {
    textAreaTechNotes.style.height     = 'auto';
    textAreaTechNotes.style.height     = textAreaTechNotes.scrollHeight + 'px';
  }
  if(textAreaOfficeNotes !== null) {
    textAreaOfficeNotes.style.height   = 'auto';
    textAreaOfficeNotes.style.height   = textAreaOfficeNotes.scrollHeight + 'px';
  }
  if (textAreaTechNotes !== null && textAreaTechNotes.scrollHeight  > textAreaOfficeNotes.scrollHeight) {
    textAreaOfficeNotes.style.height = textAreaTechNotes.scrollHeight + 'px';
  } else if (textAreaTechNotes !== null){
    textAreaTechNotes.style.height   = textAreaOfficeNotes.scrollHeight + 'px';
  }
}


const panelHeightByLead = () => {

 const myTabCustomerDetails = document.getElementById('myTabCustomerDetails');
 const pHeightByLeadElements = document.querySelectorAll('.pHeightByLead');
  if(myTabCustomerDetails){
    const divHeightClient = myTabCustomerDetails.clientHeight - 40;

    pHeightByLeadElements.forEach(element => {
      element.style.height = `${divHeightClient}px`;
    });
  }

}


// Call the function on page load and whenever the window is resized
window.addEventListener('load', function() {
  textAreaResize();
  panelHeightByLead();

});

window.addEventListener('resize', function() {
  textAreaResize();
  panelHeightByLead();
});



// Get local storage
const userName = localStorage.getItem('userName');
// eslint-disable-next-line no-unused-vars
</script>

<template>
  <!-- Side Overlay-->
  <aside id="side-overlay">
    <slot>
      <!-- Side Header -->
      <div class="content-header border-bottom backgroundBlue text-white">
        <slot name="header">
          <!-- User Avatar -->
          <a class="img-link " href="javascript:void(0)">
            <img
              class="img-avatar img-avatar32"
              src="/src/assets/image/icons/user-default.jpg"
              alt="Avatar"
            />
          </a>
          <!-- END User Avatar -->

          <!-- User Info -->
          <div class="ms-2">
            <a class="fw-semibold text-white" href="javascript:void(0)"
              >{{userName}}</a
            >
          </div>
          <!-- END User Info -->
        </slot>

        <!-- Close Side Overlay -->
        <button
          type="button"
          class="ms-auto btn btn-sm  "
          @click="store.sideOverlay({ mode: 'close' })"
        >
          <i class="fa fa-fw fa-times text-white"></i>
        </button>
        <!-- END Close Side Overlay -->
      </div>
      <!-- END Side Header -->

      <slot name="content">
        <!-- Side Content -->

        <!-- END Side Content -->
      </slot>
    </slot>
  </aside>
  <!-- END Side Overlay -->
</template>
