$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    bsCustomFileInput.init();

    $('.money').mask('000.000.000.000.000', {reverse: true});
    $('.numeric').mask('000.000.000', {reverse: true});

    $('.modal').on('hidden.bs.modal', function (e) {
        $('form').trigger('reset');
        $('.selectpicker').prop("selected", false).trigger('change');
    })

    $.fn.dataTable.ext.buttons.add = {
        text: 'PAKET BARU',
        className: 'btn-info waves-effect',
        action: function ( e, dt, node, config ) {
            $("#modalInput").modal('show')
        }
    };

    var table = $("#table").DataTable({
        ajax: {
            url: window.location.pathname
        },
        lengthChange: false,
        scrollX: true,
        ordering: false,
        buttons: ['add'],
        columnDefs: [
            {
                targets: 0,
                width: '8%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: "nama",
                render: function (data, type, row, meta) {
                    return `<a href="/matkes/item/stok/${row.id}">${data}</a>`
                }
            },
            {
                targets: 2,
                width: '10%',
                className: "text-center",
                data: "satuan",
            },
            {
                targets: 3,
                width: '10%',
                className: "text-center",
                data: "stok",
                render: $.fn.dataTable.render.number( '.', ',')
            },
            {
                targets: 4,
                width: '15%',
                className: "text-center",
                data: "harga",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-')

            },
            {
                targets: 5,
                width: '15%',
                className: "text-center",
                data: "total",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' )
            },
            {
                targets: 6,
                width: '15%',
                className: "text-center",
                data: "id",
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-icon btn-sm btn-info" data-id="${data}" title="Detail"><i class="fas fa-exclamation-circle"></i></button> <button type="button" class="btn btn-icon btn-sm btn-import btn-success" data-id="${data}" title="Import"><i class="fas fa-upload"></i></button>`
                }
            },
        ],
        initComplete: function() {
            table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
        }
    });

    var table2 = $("#table2").DataTable({
        ajax: "",
        lengthChange: false,
        ordering: false,
        scrollY: "50vh",
        scrollCollapse: true,
        paging: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                width: "8%",
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: "nama"
            },
            {
                targets: 2,
                className: "text-center",
                width: "10%",
                data: "satuan"
            },
            {
                targets: 3,
                className: "text-center",
                width: "10%",
                data: "jumlah"
            }
        ]
    })


    table2.columns.adjust().draw();

    // FORM INPUT
    $("#form-input").submit(function (e) {
        e.preventDefault();

        var data = $(this).serializeArray();

        for (var item in data)
        {
            if (data[item].name == 'stok') {
                data[item].value = $('input[name="stok"]').cleanVal();
            }

            if (data[item].name == 'harga') {
                data[item].value = $('input[name="harga"]').cleanVal();
            }
        }

        $.ajax({
            type: "POST",
            url: "/matkes/item/paket",
            data: $.param(data),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
                $("*").removeClass("is-invalid");
                $('ul[class^="msg_"]').empty();
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
                            jqXHR.responseJSON.message,
                            'error'
                        )
                        break;
                }
            }
        });
    });

    // FORM IMPORT
    $("#form-import").submit(function (e) {
        e.preventDefault();

        var formData = new FormData($("#form-import")[0]);

        $.ajax({
            url: "/matkes/item/paket/import",
            type: "POST",
            data : formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $("#modalImport").modal('hide')
                if (response.meta.status == 'success') {
                    Swal.fire('Berhasil!', response.meta.message, 'success');

                    table.ajax.reload()
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR)
                switch (jqXHR.status) {
                    case 422:
                        Swal.fire(
                            'Kesalahan!',
                            jqXHR.responseJSON.meta.message,
                            'error')
                        break;
                    default:
                        Swal.fire(
                            'Error!',
                            jqXHR.responseJSON.meta.message,
                            'error'
                        )
                        break;
                }
            }
        });
    });

    // BUTTON DETAIL
    $("#table tbody").on("click", '.btn-info', function() {
        var id = $(this).data("id")
        table2.ajax.url("/matkes/item/paket/detail/" + id).load(function() {
            $("#modalDetail").modal('show')
        });
    })

    // BUTTON IMPORT
    $("#table tbody").on("click", '.btn-import', function() {
        var id = $(this).data("id")
        $("#paket").val(id);
        console.log($("#paket").val())
        $("#modalImport").modal('show')
    })

    $('#modalDetail').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });

});
