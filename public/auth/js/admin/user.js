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
                ajax: '/admin/user',
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
                        data: "name"
                    },
                    {
                        targets: 1,
                        className: "text-center",
                        data: "email"
                    },
                    {
                        targets: 2,
                        className: "text-center",
                        data: "roles",
                        render: function (data, type, row, meta) {
                            var role = data[0].name;
                            return role.toUpperCase()
                        }
                    },
                    {
                        targets: 3,
                        className: "text-center",
                        data: "status",
                        render: function (data, type, row, meta) {
                            if (data == 'active') {
                                return `<span class="badge bg-success text-white">aktif</span>`
                            }
                            return `<span class="badge bg-danger text-white">nonaktif</span>`
                        }
                    },
                    {
                        targets: 4,
                        className: "text-center",
                        data: "id",
                        render: function (data, type, row, meta) {
                            return `<button type="button" class="btn btn-sm btn-primary mr-1 btn-permission" title="Permission" data-id="${data}"><i class="fas fa-fingerprint"></i></button><button type="button" class="btn btn-sm btn-primary mr-1 btn-password" title="Password" data-id="${data}"><i class="fas fa-key"></i></button><button type="button" class="btn btn-sm btn-primary btn-edit" title="Edit" data-id="${data}"><i class="fas fa-edit"></i></button>`
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

    $('#table tbody').on( 'click', '.btn-password', function () {
        var data = table.row( $(this).parents('tr') ).data();
        $('input[name="email"]').val(data.email);
        $('input[name="id"]').val(data.id);

        $("#modalPassword").modal("show");
    } );

    $('#table tbody').on( 'click', '.btn-edit', function () {
        var data = table.row( $(this).parents('tr') ).data();
        console.log(data);
        $('input[name="name"]').val(data.name);
        $('input[name="email"]').val(data.email);
        $('select[name="status"]').val(data.status);
        $('select[name="role"]').val(data.roles[0].name);
        $('select').selectpicker('refresh');
        $('input[name="id"]').val(data.id);

        $("#modalEdit").modal("show");
    } );

    $('#table tbody').on( 'click', '.btn-permission', function () {
        var id = $(this).data("id");
        $.ajax({
            type: "get",
            url: "/admin/user/getPermission/"+id,
            beforeSend: function() {
                $('input:checkbox').removeAttr('checked');
            },
            success: function (response) {
                var data = response.data
                $("input[name='id']").val(id);
                for (let index = 0; index < data.length; index++) {
                    const id = data[index].id;
                    $('#permission'+id).attr('checked','checked');
                }
                $("#modalPermission").modal('show');
            }
        });
    } );

    $('#form-create').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/admin/user",
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

    $('#form-password').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/admin/user/password",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $('#modalPassword').modal('hide')
                Swal.fire('Berhasil!', 'Password berhasil diubah', 'success')
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

    $('#form-edit').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "put",
            url: "/admin/user",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $('#modalEdit').modal('hide')
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

    $("#form-permission").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/admin/user/permission",
            data: $(this).serialize(),
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                $.LoadingOverlay("hide");
                $("#modalPermission").modal('hide');
                Swal.fire("Berhasil!", response.meta.message, "success");
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
