import Swal from "sweetalert2";

// Set default properties got Toast in bs5
export default function ({ target = "#page-container" }) {
  return Swal.mixin({
    buttonsStyling: false,
    target,
    customClass: {
      confirmButton: "btn btn-claret m-1",
      cancelButton: "btn btn-danger m-1",
      input: "form-control",
    },
  });
}
