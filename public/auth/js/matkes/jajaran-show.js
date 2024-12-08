$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('.numeric').mask('000.000.000', {reverse: true});

    $('.modal').on('hidden.bs.modal', function (e) {
        $('form').trigger('reset');
        $('.selectpicker').prop("selected", false).trigger('change');
    })

    var arr = window.location.pathname.split('/');
    console.log();

    var table = $("#table").DataTable({
        ajax: "/matkes/jajaran/show/" + arr[arr.length - 1],
        lengthChange: false,
        ordering: false,
        buttons: [
            {
                text: 'ALKES BARU',
                className: "btn btn-info waves-effect",
                action: function ( e, dt, node, config ) {
                    $("#modalInput").modal('show')
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: '7%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: "nama",
                render: function (data, type, row, meta) {
                    return `<a role="button" href="#" class="btn-edit">${data}</a>`
                }
            },
            {
                targets: 2,
                width: "8%",
                data: "satuan",
                className: 'text-center',
            },
            {
                targets: 3,
                width: "8%",
                data: "jumlah",
                className: 'text-center',
            },
            {
                targets: 4,
                className: 'text-center',
                data: "nilai",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' )
            },
            {
                targets: 5,
                width: "10%",
                data: "kondisi_b",
                className: 'text-center',
            },
            {
                targets: 6,
                width: "10%",
                data: "kondisi_rr",
                className: 'text-center',
            },
            {
                targets: 7,
                width: "10%",
                data: "kondisi_rb",
                className: 'text-center',
            }
        ],
        initComplete: function () {
            table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));
        }
    });


    // Button Edit
    $("#table tbody").on('click', '.btn-edit', function () {
        var data = table.row( $(this).parents('tr') ).data();
        console.log(data);
        $("#id").val(data.id);

        $("input[name=nama]").val(data.nama);
        $("input[name=jumlah]").val(data.jumlah).trigger('input');
        $("input[name=nilai]").val(data.nilai).trigger('input');
        $("input[name=baik]").val(data.kondisi_b);
        $("input[name=rr]").val(data.kondisi_rr);
        $("input[name=rb]").val(data.kondisi_rb);

        $("#modalUpdate").modal('show');
    });


    $("#form-input").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/matkes/alkes",
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
            url: "/matkes/alkes",
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
                            jqXHR.responseJSON.data,
                            'error'
                        )
                        break;
                }
            }
        });
    });
});
