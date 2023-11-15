// addNetValue.js
export default {
  beforeMount: function(el, binding) {
    let span = el.querySelector('.p-slider-handle');
    if (span) {
      span.setAttribute(binding.arg, binding.value);
    }
  },
  updated: function(el, binding) {
    let span = el.querySelector('.p-slider-handle');
    if (span) {
      span.setAttribute(binding.arg, binding.value);
    }
  }
}
