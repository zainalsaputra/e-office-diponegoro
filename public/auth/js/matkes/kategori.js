$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('.modal').on('hidden.bs.modal', function (e) {
        $('form').trigger('reset');
    })

    var table = $("#table").DataTable({
        ajax: {
            url: '/matkes/kategori'
        },
        lengthChange: false,
        ordering: false,
        buttons: [
            {
                text: 'INPUT DATA',
                className: "btn-info waves-effect",
                action: function ( e, dt, node, config ) {
                    $("#modalInput").modal('show')
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: '10%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: 'nama',
                render: function (data, type, row, meta) {
                    return `<a href="/matkes/item/${row.id}">${data}</a>`
                }
            },
            {
                targets: 2,
                width: '10%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return `<button type="button" title="Edit" class="btn btn-warning btn-sm btn-icon btn-edit"><i class="fas fa-pencil-alt"></i></button>`
                }
            },

        ],
        initComplete: function () {
            table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));
        }
    });

    // Button Edit
    $("#table tbody").on('click', '.btn-edit', function () {
        var data = table.row( $(this).parents('tr') ).data();

        $("#id").val(data.id);
        $("#nama").val(data.nama);

        $("#modalUpdate").modal('show');
    });

    $("#form-input").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/matkes/kategori",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
                $("*").removeClass("is-invalid");
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $('#modalInput').modal('hide');
                $("#form-input").trigger("reset");
                Swal.fire("Disimpan!", "Data berhasil disimpan.", "success");
                table.ajax.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR)
                switch (jqXHR.status) {
                    case 422:
                        var response = jqXHR.responseJSON
                        $.each(response.data, function (key, value) {
                            $(`*[name="${key}"]`).addClass('is-invalid');

                            $.each(value, function (index, val) {
                                $(`ul.msg_${key}`).append(`<li>${val}</li>`);
                            });
                        });
                        break;
                    default:
                        Swal.fire(
                            'Error!',
                            jqXHR.responseJSON.data,
                            'error'
                        )
                        break;
                }
            }
        });
    });

    $("#form-update").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: "/matkes/kategori/",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
                $("*").removeClass("is-invalid");
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $('#modalUpdate').modal('hide');
                $("#form-update").trigger("reset");
                Swal.fire("Disimpan!", "Data berhasil disimpan.", "success");
                table.ajax.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR)
                switch (jqXHR.status) {
                    case 422:
                        var response = jqXHR.responseJSON
                        $.each(response.data, function (key, value) {
                            $(`*[name="${key}"]`).addClass('is-invalid');

                            $.each(value, function (index, val) {
                                $(`ul.msg_${key}`).append(`<li>${val}</li>`);
                            });
                        });
                        break;
                    default:
                        Swal.fire(
                            'Error!',
                            jqXHR.responseJSON.message,
                            'error'
                        )
                        break;
                }
            }
        });
    });
});
