$(document).ready(function () {
  var a = $("#datatable-buttons").DataTable({
    lengthChange: !1,
    buttons: [
      { extend: "copy", className: "btn-light" },
      { extend: "print", className: "btn-light" },
      { extend: "pdf", className: "btn-light" },
    ],
    language: {
      paginate: {
        previous: "<i class='mdi mdi-chevron-left'>",
        next: "<i class='mdi mdi-chevron-right'>",
      },
    },
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
    },
  });
    a.buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)")
});
