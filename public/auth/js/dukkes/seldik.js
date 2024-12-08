$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('[data-toggle="select2"]').select2();

    bsCustomFileInput.init();

    $(".modal").on("hidden.bs.modal", function (e) {
        $("#form-create").trigger("reset");
    });

    var table = $("#table").DataTable({
        ajax: {
            url: "/dukkes/seldik/show",
            data: function (d) {
                d.id = $("#filter-giat").val();
            },
        },
        processing: true,
        lengthChange: false,
        scrollX: true,
        buttons: [
            {
                extend: "excel",
                text: 'Download',
                className: "btn-success waves-effect waves-light download",
                filename: function () {
                    return `HASIL PRAPURNA TUGAS ${$("#filter-giat option:selected").text()}`;
                },
            },
            {
                text: 'Clear Data',
                className: "btn-danger waves-effect waves-light truncate",
                action: function (e, dt, node, config) {
                    truncate($("#filter-giat option:selected").val());
                },
            },
        ],
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        columns: [
            {
                data: "tanggal",
                render: function (data, type, row, meta) {
                    var date = new Date(data);
                    return (
                        date.getDate() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getFullYear()
                    );
                },
            },
            { data: "nomor" ,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: "nama" },
            { data: "pkt" },
            { data: "nrp" },
            { data: "kesatuan" },
            { data: "tb_bb" },
            { data: "tensi_nadi" },
            { data: "peny_dalam" },
            { data: "ekg" },
            { data: "treadmill" },
            { data: "paru" },
            { data: "rontgen" },
            { data: "usg_abdomen" },
            { data: "lab" },
            { data: "tht" },
            { data: "saraf" },
            { data: "kulit" },
            { data: "bedah" },
            { data: "atas" },
            { data: "bawah" },
            { data: "audiometri" },
            { data: "mata" },
            { data: "gigi" },
            { data: "jiwa" },
            { data: "stakes" },
            { data: "ms_tms_1" },
            { data: "ket" },
            { data: "no_sket" },
            { data: "sket" },
            { data: "dasar_no_surat" },
            { data: "ms_tms_2" },
            { data: "prihal" },
            { data: "tgl_diputuskan" },
            { data: "tgl_terbit" },
            { data: "u" },
            { data: "a" },
            { data: "b" },
            { data: "d" },
            { data: "l" },
            { data: "g" },
            { data: "j" },
            { data: "thn_lahir" },
        ],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        },
        initComplete: function () {
            table.columns.adjust().draw()
        },
    });

    $("#filter-giat").on("change", function () {
        reloadDatable();
    });

    // Create Kegiatan
    $("#form-create").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/dukkes/kegiatan",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                $("#modalCreate").modal("hide");
                $.LoadingOverlay("hide");
                if (response.meta.status == "success") {
                    var data = response.data;
                    $("#kegiatan").append(
                        '<option value="' +
                            data._id +
                            '">' +
                            data.nama +
                            "</option>"
                    );
                    $("#filter-giat").append(
                        '<option value="' +
                            data._id +
                            '">' +
                            data.nama +
                            "</option>"
                    );

                    Swal.fire(
                        "Berhasil!",
                        "Data berhasil ditambahkan.",
                        "success"
                    );
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                switch (xhr.status) {
                    case 422:
                        Swal.fire(
                            "Error!",
                            "Data yang dikirim tidak valid",
                            "error"
                        );

                        $.each(xhr.responseJSON.data, function (key, value) {
                            $("*[name=" + key + "]").addClass("is-invalid");
                            $.each(
                                xhr.responseJSON.data[key],
                                function (ke, val) {
                                    $("<li>" + val + "</li>").appendTo(
                                        $("div[name=msg_" + key + "]").find(
                                            "ul"
                                        )
                                    );
                                }
                            );
                        });
                        break;
                    default:
                        Swal.fire(
                            "Error!",
                            "Terjadi kesalahan pada server.",
                            "error"
                        );
                        console.log(
                            thrownError +
                                "\r\n" +
                                xhr.statusText +
                                "\r\n" +
                                xhr.responseText
                        );
                        break;
                }
            },
        });
    });

    $("#form-import").submit(function (e) {
        e.preventDefault();
        var formData = new FormData($("#form-import")[0]);
        $.ajax({
            type: "POST",
            url: "/dukkes/seldik",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $.LoadingOverlay("show");
                $("#kegiatan").removeClass("is-invalid");
            },
            success: function (response) {
                $.LoadingOverlay("hide");
                if (response.meta.status == "success") {
                    $("#form-import").trigger("reset");
                    Swal.fire("Berhasil!", response.meta.message, "success");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $.LoadingOverlay("hide");
                switch (xhr.status) {
                    case 422:
                        Swal.fire(
                            "Error!",
                            "Data yang dikirim tidak valid",
                            "error"
                        );

                        $.each(xhr.responseJSON.data, function (key, value) {
                            $("select[name=" + key + "]").addClass(
                                "is-invalid"
                            );
                            $("input[name=" + key + "]").addClass("is-invalid");
                            $.each(
                                xhr.responseJSON.data[key],
                                function (ke, val) {
                                    $("<li>" + val + "</li>").appendTo(
                                        $("div[name=msg_" + key + "]").find(
                                            "ul"
                                        )
                                    );
                                }
                            );
                        });
                        break;
                    default:
                        Swal.fire(
                            "Error!",
                            "Terjadi kesalahan pada server.",
                            "error"
                        );
                        console.log(
                            thrownError +
                                "\r\n" +
                                xhr.statusText +
                                "\r\n" +
                                xhr.responseText
                        );
                        break;
                }
            },
        });
    });

    // Preview
    function handleFile(e) {
        var files = e.target.files,
            f = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            var wb = XLSX.read(data, { type: "array" });
            // console.log(wb)
            var json = to_json(wb);
            console.log(json.master);
            render(json.master);
        };
        reader.readAsArrayBuffer(f);
    }

    function to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                raw: false,
                header: 0,
            });
            if (roa.length > 0) result[sheetName] = roa;
        });
        return result;
    }

    function render(json) {
        if ($.fn.dataTable.isDataTable("#example")) {
            $("#example").DataTable().destroy();
            $("#example").empty();
        }

        $("#example").DataTable({
            scrollX: true,
            ordering: false,
            data: json,
            columns: [
                { data: "tanggal" },
                { data: "nomor" },
                { data: "nama" },
                { data: "pkt" },
                { data: "nrp" },
                { data: "kesatuan" },
                { data: "tb_bb" },
                { data: "tensi_nadi" },
                { data: "peny_dalam" },
                { data: "ekg" },
                { data: "treadmill" },
                { data: "paru" },
                { data: "rontgen" },
                { data: "usg_abdomen" },
                { data: "lab" },
                { data: "tht" },
                { data: "saraf" },
                { data: "kulit" },
                { data: "bedah" },
                { data: "atas" },
                { data: "bawah" },
                { data: "audiometri" },
                { data: "mata" },
                { data: "gigi" },
                { data: "jiwa" },
                { data: "stakes" },
                { data: "ms_tms_1" },
                { data: "ket" },
                { data: "no_sket" },
                { data: "sket" },
                { data: "dasar_no_surat" },
                { data: "ms_tms_2" },
                { data: "prihal" },
                { data: "tgl_diputuskan" },
                { data: "tgl_terbit" },
                { data: "u" },
                { data: "a" },
                { data: "b" },
                { data: "d" },
                { data: "l" },
                { data: "g" },
                { data: "j" },
                { data: "thn_lahir" }
            ],
        });
    }

    $("#file").change(function (e) {
        // e.preventDefault();
        handleFile(e);
        $("#modalPreview").modal("show");
    });

    $("#modalPreview").on("shown.bs.modal", function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });

    function reloadDatable() {
        table.ajax.reload(function() {
            var data = table.rows(0).data()
            if (data.length > 0) {
                table.buttons( '.download' ).enable();
                table.buttons( '.truncate' ).enable();
            } else {
                table.buttons( '.download' ).disable();
                table.buttons( '.truncate' ).disable();
            }
            table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
        });
    }

    function truncate(id) {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Data hasil rikkes dalam kegiatan ini akan dihapus permanen.",
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
                    url: "/dukkes/seldik/truncate",
                    data: {giat: id},
                    beforeSend: function() {
                        $.LoadingOverlay("show");
                    },
                    success: function (response) {
                        $.LoadingOverlay("hide");
                        reloadDatable();
                        Swal.fire(
                            "Berhasil!",
                            "Data berhasil dihapus",
                            "success"
                        );
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.LoadingOverlay("hide");
                        Swal.fire(
                            "Error!",
                            "Terjadi kesalahan pada server.",
                            "error"
                        );
                        console.log(
                            thrownError +
                                "\r\n" +
                                xhr.statusText +
                                "\r\n" +
                                xhr.responseText
                        );
                    },
                });
            }
        })
    }
});
