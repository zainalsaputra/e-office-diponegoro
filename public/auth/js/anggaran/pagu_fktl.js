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

    var table = $("#table").DataTable({
        ajax: {
            url: "/yankes/fktl/pagu",
            data: function (d) {
                d.tahun = $("#tahun").val();
            },
        },
        processing: true,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
            left: 1,
        },
        language: {
            processing: "<span>Proses...</span> ",
        },
        buttons: [
            {
                extend: "excel",
                text: "DOWNLOAD",
                className: "btn btn-success waves-effect waves-light",
                title: "",
                filename: function () {
                    return `PAGU FKTL ${$("#tahun").val()}`;
                },
                customize: function (xlsx) {
                    var sheet = xlsx.xl.worksheets["sheet1.xml"];

                    $("c[r=A1] t", sheet).text("id");
                    $("c[r=B1] t", sheet).text("fktl");
                    $("c[r=C1] t", sheet).text("pagu_tahun_ini");
                    $("c[r=D1] t", sheet).text("sisa_pendapatan_tahun_lalu");
                    $("c[r=E1] t", sheet).text("pagu_modal");
                    $("c[r=F1] t", sheet).text("pagu_jasa");
                    $("c[r=G1] t", sheet).text("pagu_pemeliharaan");
                    $("c[r=H1] t", sheet).text("pagu_operasional");
                    $("row:first c", sheet).attr("s", "42");

                    var col = $("col", sheet);
                    $(col[0]).attr("width", 0.42);
                },
                exportOptions: {
                    orthogonal: "exportxls",
                },
            },
            {
                text: "IMPORT",
                className: "btn btn-info import waves-effect waves-light",
                action: function (e, dt, node, config) {
                    $("#tahun-import").val($("#tahun").val());
                    $("#modalImport").modal("show");
                },
            },
            {
                text: "TUTUP BUKU",
                className: "btn btn-danger tutup waves-effect waves-light",
                action: function (e, dt, node, config) {
                    var tahun = $("#tahun").val();

                    Swal.fire({
                        title: "Anda Yakin ?",
                        text: `Transaksi di tahun ${tahun} akan ditutup.`,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ya tutup!",
                        cancelButtonText: "Batal",
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                type: "POST",
                                url: "/yankes/fktl/pagu/tutup",
                                data: { tahun: tahun },
                                beforeSend: function () {
                                    $.LoadingOverlay("show");
                                },
                                success: function (response) {
                                    $.LoadingOverlay("hide");
                                    if (response.meta.status == "success") {
                                        Swal.fire(
                                            "Berhasil!",
                                            response.meta.message,
                                            "success"
                                        );
                                        location.reload();
                                    }
                                    table
                                        .buttons()
                                        .container()
                                        .removeClass("btn-group")
                                        .appendTo(
                                            $(
                                                ".col-md-6:eq(0)",
                                                table.table().container()
                                            )
                                        );
                                },
                                error: function (
                                    jqXHR,
                                    textStatus,
                                    errorThrown
                                ) {
                                    $.LoadingOverlay("hide");
                                    console.log(jqXHR);
                                    switch (jqXHR.status) {
                                        case 422:
                                            Swal.fire(
                                                "Kesalahan!",
                                                jqXHR.responseJSON.meta.message,
                                                "error"
                                            );
                                            break;
                                        default:
                                            Swal.fire(
                                                "Error!",
                                                jqXHR.responseJSON.meta.message,
                                                "error"
                                            );
                                            break;
                                    }
                                },
                            });
                        }
                    });
                },
            },
        ],
        columnDefs: [
            {
                targets: 0,
                data: "uuid",
                visible: false,
                searchable: false,
            },
            {
                targets: 1,
                width: "320px",
                data: "nama",
            },
            {
                targets: 2,
                width: "150px",
                className: "text-center",
                data: "pagu",
                render: function (data, type, row, meta) {
                    if (type == "exportxls") {
                        return data;
                    }
                    return $.fn.dataTable.render
                        .number(".", ",", 0, "Rp ", ",-")
                        .display(data);
                },
            },
            {
                targets: 3,
                width: "150px",
                className: "text-center",
                data: "sisa",
                render: function (data, type, row, meta) {
                    if (type == "exportxls") {
                        return data;
                    }
                    return $.fn.dataTable.render
                        .number(".", ",", 0, "Rp ", ",-")
                        .display(data);
                },
            },
            {
                targets: 4,
                width: "150px",
                className: "text-center",
                data: "modal",
                render: function (data, type, row, meta) {
                    if (type == "exportxls") {
                        return data;
                    }
                    return $.fn.dataTable.render
                        .number(".", ",", 0, "Rp ", ",-")
                        .display(data);
                },
            },
            {
                targets: 5,
                width: "150px",
                className: "text-center",
                data: "jasa",
                render: function (data, type, row, meta) {
                    if (type == "exportxls") {
                        return data;
                    }
                    return $.fn.dataTable.render
                        .number(".", ",", 0, "Rp ", ",-")
                        .display(data);
                },
            },
            {
                targets: 6,
                width: "150px",
                className: "text-center",
                data: "pemeliharaan",
                render: function (data, type, row, meta) {
                    if (type == "exportxls") {
                        return data;
                    }
                    return $.fn.dataTable.render
                        .number(".", ",", 0, "Rp ", ",-")
                        .display(data);
                },
            },
            {
                targets: 7,
                width: "150px",
                className: "text-center",
                data: "operasional",
                render: function (data, type, row, meta) {
                    if (type == "exportxls") {
                        return data;
                    }
                    return $.fn.dataTable.render
                        .number(".", ",", 0, "Rp ", ",-")
                        .display(data);
                },
            },
        ],
        initComplete: function () {
            table.columns.adjust().draw();
        },
    });

    // FILTER
    $("#tahun").on(
        "changed.bs.select",
        function (e, clickedIndex, isSelected, previousValue) {
            table.ajax.reload(function () {
                var data = table.rows(0).data();
                if (data[0].tutup == 1) {
                    table.buttons(".import").disable();
                    table.buttons(".tutup").disable();
                } else {
                    table.buttons(".import").enable();
                    table.buttons(".tutup").enable();
                }
                table
                    .buttons()
                    .container()
                    .removeClass("btn-group")
                    .appendTo($(".col-md-6:eq(0)", table.table().container()));
            });
        }
    );

    // FORM IMPORT
    $("#form-import").submit(function (e) {
        e.preventDefault();

        var formData = new FormData($("#form-import")[0]);

        $.ajax({
            url: "/yankes/fktl/pagu",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                $.LoadingOverlay("hide");
                $("#modalImport").modal("hide");
                if (response.meta.status == "success") {
                    Swal.fire("Berhasil!", response.meta.message, "success");
                    table.ajax.reload();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                console.log(jqXHR);
                switch (jqXHR.status) {
                    case 422:
                        Swal.fire(
                            "Kesalahan!",
                            jqXHR.responseJSON.meta.message,
                            "error"
                        );
                        break;
                    default:
                        Swal.fire(
                            "Error!",
                            jqXHR.responseJSON.meta.message,
                            "error"
                        );
                        break;
                }
            },
        });
    });
});
