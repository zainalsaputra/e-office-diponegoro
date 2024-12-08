$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $(".modal").on("hidden.bs.modal", function (e) {
        $("form").trigger("reset");
    });

    var table = $("#table").DataTable({
                ajax: '/admin/permission',
                lengthChange: false,
                ordering: false,
                language: {
                    paginate: {
                        previous: "<i class='mdi mdi-chevron-left'>",
                        next: "<i class='mdi mdi-chevron-right'>"
                    }
                },
                buttons: [
                    {
                        text: '<i class="fas fa-plus mr-1"></i>Baru',
                        className: "btn btn-success import waves-effect waves-light",
                        action: function ( e, dt, node, config ) {
                            $("#modalCreate").modal('show')
                        }
                    },
                ],
                columnDefs: [
                    {
                        targets: 0,
                        className: "text-center",
                        data: "name",
                        render: function(data, type, row, meta) {
                            return data.toUpperCase()
                        }
                    },
                    {
                        targets: 1,
                        width: "25%",
                        className: "text-center",
                        data: "id",
                        render: function (data, type, row, meta) {
                            return `<button type="button" class="btn btn-sm btn-primary btn-edit" title="Edit" data-id="${data}"><i class="fas fa-edit"></i></button>`
                        }
                    }
                ],
                drawCallback: function () {
                    $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
                },
                initComplete: function () {
                    table.buttons().container().appendTo( $('.col-md-6:eq(0)', table.table().container() ) );
                }
    });

    $('#table tbody').on( 'click', '.btn-edit', function () {
        var data = table.row( $(this).parents('tr') ).data();
    } );

    $('#form-create').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/admin/permission",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $('#modalCreate').modal('hide')
                table.ajax.reload()
                Swal.fire('Berhasil!', 'Data berhasil disimpan', 'success')
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR);
                if (jqXHR.status == 422) {
                    Swal.fire('Oops!', 'Ada isian yang salah', 'error')
                } else {
                    Swal.fire('Error!', 'Server Error', 'error')
                }
            }
        });
    });

});
