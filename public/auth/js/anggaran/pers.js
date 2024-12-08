$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    bsCustomFileInput.init();

    $(".modal").on("hidden.bs.modal", function (e) {
        $("#form-import").trigger("reset");
    });

    var table1 = $("#table-pers").DataTable({
        ajax: {
            url: "/yankes/pers",
            data: function (d) {
                d.satuan = $('#satuan').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        language: {
            processing: '<span>Proses...</span> '
        },
        buttons: [
            {
                text: 'TAMBAH DATA',
                className: "btn btn-sm btn-info waves-effect waves-light",
                action: function (e, dt, node, config) {
                    window.location.href = "/yankes/pers/create";
                }
            },
        ],
        columnDefs: [
            {
                targets: 0,
                className: "text-center align-middle",
                width: "5%",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                targets: 1,
                className: "text-center align-middle",
                data: 'nama',
                render: function (data, type, row, meta) {
                    return `${data}<br><small>${row.pangkat} ${row.nomor}</small></br><small>${row.jabatan}</small>`;
                }
            },
            {
                targets: 2,
                width: "15%",
                className: "text-center align-middle",
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data.length) {
                        var arr = [];
                        data.forEach(function (item) {
                            arr.push(item.nama_penyakit)
                        })
                        return arr.join(', ');
                    } else {
                        return "-"
                    }
                }
            },
            {
                targets: 3,
                width: "15%",
                className: "text-center align-middle",
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data.length) {
                        var arr = [];
                        data.forEach(function (item) {
                            arr.push(moment(item.tmt_sakit).format('DD-MM-YYYY'))
                        })
                        return arr.join(', ');
                    } else {
                        return "-"
                    }
                }
            },
            {
                targets: 4,
                width: "15%",
                className: "text-center align-middle",
                data: 'status',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `<h4><span class="badge badge-danger">${data}</span></h4>`;
                    } else {
                        return `<h4><span class="badge badge-success">Aktif</span></h4>`;
                    }
                }
            },
            {
                targets: 5,
                width: "10%",
                className: "text-center align-middle",
                data: 'nomor',
                render: function (data, type, row, meta) {
                    return `<a class="btn btn-primary" href="/yankes/pers/show?nrp=${data}" role="button"><i class="fas fa-eye"></i></a>`
                }
            }
        ],
        initComplete: function (settings, json) {
            $("#table-pers").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-pers").DataTable().table().container()));
        }
    });

    // FILTER
    $('#tahun, #bulan, #satuan').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        table1.ajax.reload(function () {
            if ($('#tahun').val() != '' && $('#bulan').val() != '' && $('#satuan').val() != '') {
                table1.buttons('.import').enable();
                table1.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table1.table().container()));
            } else {
                table1.buttons('.import').disable();
            }
        });
    });

    // FORM IMPORT
    $("#form-import").submit(function (e) {
        e.preventDefault();

        var formData = new FormData($("#form-import")[0]);

        $.ajax({
            url: "/yankes/pers",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $("#modalImport").modal('hide')
                if (response.meta.status == 'success') {
                    Swal.fire('Berhasil!', response.meta.message, 'success');
                    table1.ajax.reload()
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR)
                switch (jqXHR.status) {
                    case 422:
                        $('#modalImport').modal('toggle');
                        Swal.fire({
                            title: 'Kesalahan!',
                            type: 'error',
                            text: jqXHR.responseJSON.meta.message,
                            confirmButtonText: 'Lihat',
                        }).then((result) => {
                            if (result.value) {
                                $.each(jqXHR.responseJSON.data, function (index, element) {
                                    $(".error-body").append($(`<div id="${parseInt(index) + 1}"><p class="mb-0">Kesalahan pada baris ke: ${parseInt(index) + 2}</p></div>`));
                                    $(`#${parseInt(index) + 1}`).append($(`<ul id="ul-${parseInt(index) + 1}"></ul>`));
                                    $.each(element.message, function (i, e) {
                                        $(`#ul-${parseInt(index) + 1}`).append($(`<li>${e[0]}</li>`));
                                    });
                                });
                                $('#modalError').modal('show');
                            }
                        })
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

    $('#table-pers tbody').on('click', '.hapus', function (e) {
        e.preventDefault();

        Swal.fire({
            title: 'Anda yakin?',
            text: "Riwayat penyakit akan dihapus!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "DELETE",
                    url: "/yankes/pers/riwayat/" + $(this).data('id'),
                    beforeSend: function () {
                        $.LoadingOverlay('show')
                    },
                    success: function (response) {
                        $.LoadingOverlay('hide')
                        if (response.meta.status == 'success') {
                            Swal.fire('Berhasil!', response.meta.message, 'success');
                            table1.ajax.reload()
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.LoadingOverlay('hide')
                        Swal.fire(
                            'Error!',
                            jqXHR.responseJSON.meta.message,
                            'error'
                        )
                    }
                });
            }
        })
    });
});
