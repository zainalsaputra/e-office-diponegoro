$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    // bsCustomFileInput.init();

    $("#modal-penyakit").on("hidden.bs.modal", function (e) {
        $("#form-penyakit").trigger("reset");
    });

    $('#telp').mask('0000-0000-00000');

    var table = $("#table-penyakit").DataTable({
        responsive: true,
        ordering: false,
        lengthChange: false,
        buttons: [
            {
                text: 'TAMBAH DIAGNOSA',
                className: "btn btn-sm btn-info waves-effect waves-light",
                action: function (e, dt, node, config) {
                    $("#modal-penyakit").modal("show");
                }
            },
        ],
        columnDefs: [
            {
                targets: 0,
                className: "text-center align-middle",
                data: "nama"
            },
            {
                targets: 1,
                width: "15%",
                className: "text-center align-middle",
                data: "tmt",
                render: function (data, type, row, meta) {
                    return moment(data).format("DD-MM-YYYY");
                }
            },
            {
                targets: 2,
                width: "15%",
                className: "text-center align-middle",
                render: function (data, type, row, meta) {
                    return `<button class="btn btn-sm btn-danger hapus" data-id="${data}"><i class="fas fa-trash"></i></button>`;
                }
            }
        ],
        initComplete: function (settings, json) {
            $("#table-penyakit").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-penyakit").DataTable().table().container()));
        }
    });

    $("#tambah").click(function (e) {
        e.preventDefault();
        if ($("#penyakit").val() != "" && $("#tmt_sakit").val() != "") {
            table.row.add({
                "nama": $("#penyakit").val(),
                "tmt": $("#tmt_sakit").val(),
            }).draw();
            setTimeout(() => {
                $("#modal-penyakit").modal("hide");
            }, 250);
        } else {
            Swal.fire('Oops!', 'Ada isian yang kosong', 'error');
        }
    });

    $("#btn-simpan").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/yankes/pers",
            data: {
                biodata: $("#form-personil").serialize(),
                diagnosa: table.rows().data().toArray(),
            },
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                Swal.fire({
                    title: 'Sukses!',
                    text: response.meta.message,
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                    allowOusideClick: false,
                }).then((result) => {
                    if (result) {
                        window.location.href = "/yankes/pers";
                    }
                })
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $.LoadingOverlay('hide')
                switch (xhr.status) {
                    case 422:
                        var msg = xhr.responseJSON.data;
                        var arr = [];
                        $.each(msg, function (index, value) {
                            $.each(value, function (i, v) {
                                arr.push(v);
                            });
                        });
                        Swal.fire('Oops!', arr[0], 'error');
                        break;
                    case 500:
                        Swal.fire('Oops!', 'Ada kesalahan pada server', 'error');
                        break;
                    default:
                        break;
                }
            }
        });
    });

    $('#table-penyakit tbody').on('click', '.hapus', function (e) {
        e.preventDefault();
        table.row($(this).parents('tr')).remove().draw();
    });
});
