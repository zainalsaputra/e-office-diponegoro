$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var table = $("#table").DataTable({
        ajax: {
            url: "/yankes/pers/laporan",
            // data: function (d) {
            //     d.tahun = $('#tahun').val()
            // }
        },
        processing: true,
        ordering: false,
        lengthChange: false,
        scrollX: true,
        // scrollX: true,
        // scrollCollapse: true,
        // scrollY: "350px",
        // paging: false,
        fixedColumns: {
            left: 2,
        },
        language: {
            processing: '<span>Proses...</span> '
        },
        buttons: [
            // {
            //     text: 'DOWNLOAD',
            //     className: "btn btn-success waves-effect waves-light",
            //     action: function (e, dt, node, config) {
            //         window.location.href = "/yankes/pers/laporan/download?tahun=" + $('#tahun').val()
            //     }
            // },
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success waves-effect waves-light",
                title: "Ekspor Data Sakit Kronis dan Menahun",

            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: "200px",
                className: "align-middle",
                data: "satuan",
                render: function (data, type, row, meta) {
                    return data;
                }
            },
            {
                targets: 1,
                width: "250px",
                className: "align-middle",
                data: "nama",
                render: function (data, type, row, meta) {
                    return data;
                }
            },
            {
                targets: 2,
                width: "150px",
                className: "text-center align-middle",
                data: "tgl_lahir",
                render: function (data, type, row, meta) {
                    return data ? moment(row.tgl_lahir).format('DD-MM-YYYY') : `-`;
                }
            },
            {
                targets: 3,
                width: "150px",
                className: "text-center align-middle",
                data: "pangkat",
                render: function (data, type, row, meta) {
                    return data ? data : `-`;
                }
            },
            {
                targets: 4,
                width: "150px",
                className: "text-center align-middle",
                data: "nomor",
                render: function (data, type, row, meta) {
                    return data ? data : `-`;
                }
            },
            {
                targets: 5,
                width: "150px",
                className: "text-center align-middle",
                data: "jabatan",
                render: function (data, type, row, meta) {
                    return data ? data : `-`;
                }
            },
            {
                targets: 6,
                width: "150px",
                className: "text-center align-middle",
                data: "diagnosa",
                render: function (data, type, row, meta) {
                    if (data.length > 0) {
                        if (data.length == 1) {
                            return data[0].nama_penyakit
                        } else {
                            var join = data.map((list) => list.nama_penyakit).join(", ")
                            return join
                        }
                    } else {
                        return `-`
                    }
                }
            },
            {
                targets: 7,
                width: "250px",
                className: "text-center align-middle",
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data.length > 0) {
                        if (data.length == 1) {
                            return moment(data[0].tmt_sakit).format('DD-MM-YYYY')
                        } else {
                            var join = data.map((list) => moment(list.tmt_sakit).format('DD-MM-YYYY')).join(", ")
                            return join
                        }
                    } else {
                        return `-`
                    }
                }
            },
            {
                targets: 8,
                width: "150px",
                className: "text-center align-middle",
                data: 'last_riwayat',
                render: function (data, type, row, meta) {
                    if (data != null) {
                        return data.tempat_rawat ? data.tempat_rawat : `-`
                    }
                    return `-`
                }
            },
            {
                targets: 9,
                width: "250px",
                className: "text-center align-middle",
                data: "last_riwayat",
                render: function (data, type, row, meta) {
                    if (data != null) {
                        return data.tgl_berobat ? moment(data.tgl_berobat).format('DD-MM-YYYY') : `-`
                    }
                    return `-`
                }
            },
            {
                targets: 10,
                width: "150px",
                className: "text-center align-middle",
                data: "last_riwayat",
                render: function (data, type, row, meta) {
                    if (data != null) {
                        return data.hasil_berobat ? data.hasil_berobat : `-`
                    }
                    return `-`
                }
            },
            {
                targets: 11,
                width: "150px",
                className: "text-center align-middle",
                data: "last_riwayat",
                render: function (data, type, row, meta) {
                    if (data != null) {
                        return data.keterangan ? data.keterangan : `-`
                    }
                    return `-`
                }
            }
        ],
        initComplete: function () {
            table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
            table.columns.adjust().draw()
        }
    });

    // FILTER
    // $('#filter').submit(function (e) {
    //     e.preventDefault();
    //     table.ajax.reload(function () {
    //         var data = table.rows().data()
    //         if (data.length) {
    //             table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
    //             $('.download').show();
    //         } else {
    //             $('.download').hide();
    //         }
    //     });
    // });
});
