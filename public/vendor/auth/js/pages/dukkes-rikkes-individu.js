$(document).ready(function () {
  var a = $("#datatable-buttons").DataTable({
    lengthChange: false,
    ordering: false,
    buttons: [
      { extend: "copy", className: "btn-light" },
      { extend: "print", className: "btn-light" },
      { extend: "pdf", className: "btn-light" },
    ],
    columnDefs: [
      {className: "text-center", width: "10%", targets: [0,5]},
      {className: "text-center", targets: 1},
      {className: "text-center", width: "15%", targets: 2},
      {className: "text-center", width: "20%", targets: 3},
      {className: "text-center", width: "20%", targets: 4}
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
