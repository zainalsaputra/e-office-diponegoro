$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var DateTime = luxon.DateTime;
    const now = DateTime.now();

    var date = now.toISODate();

    var table = $("#table").DataTable({
        lengthChange: false,
        scrollX: true,
        ordering: false,
        buttons: [
            {
                extend: 'excel',
                text: '<i class="fas fa-file-excel mr-1"></i> Excel',
                className: 'btn-success waves-effect',
                title: '',
                filename: function () {
                    return `Rekap Matkes ${$("#bulan").val()} ${$("#tahun").val()}`;
                },
                messageTop: function() {
                    return `LAPORAN MATKES BULAN ${$("#bulan").val()} TA ${$("#tahun").val()}`;
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: '8%',
                className: 'text-center',
            },
            {
                targets: 1,
            },
            {
                targets: 2,
                width: '13%',
                className: "text-center",
            },
            {
                targets: 3,
                width: '10%',
                className: "text-center",
                render: $.fn.dataTable.render.number( '.', ',', 0)
            },
            {
                targets: 4,
                width: '10%',
                className: "text-center",
                render: $.fn.dataTable.render.number( '.', ',', 0)
            },
            {
                targets: 5,
                width: '10%',
                className: "text-center",
                render: $.fn.dataTable.render.number( '.', ',', 0)
            },
            {
                targets: 6,
                width: '15%',
                className: "text-center",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-')
            },
            {
                targets: 7,
                width: '15%',
                className: "text-center",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-')
            },
            {
                targets: 8,
                width: '10%',
                className: "text-center",
            }
        ]
        });

    table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));

    $("#form-periode").submit(function (e) {
        e.preventDefault();

        $("#bulan").val($("select[name='bulan'] option:selected").text());
        $("#tahun").val($("select[name='tahun'] option:selected").text());

        $.ajax({
            type: "GET",
            url: "/matkes/laporan/item",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $.LoadingOverlay('show')
                $("#table").DataTable().clear();
                $("#table").DataTable().draw();
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                populateDataTable(response.data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR)
                switch (jqXHR.status) {
                    case 404:
                        Swal.fire(
                            'Oops!',
                            "Data tidak ditemukan",
                            'error'
                        )
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

    function populateDataTable(data) {
        $.each(data, function (index, value) {
            // You could also use an ajax property on the data table initialization
            $('#table').dataTable().fnAddData( [
                index + 1,
                value.nama,
                value.satuan,
                parseInt(value.masuk),
                parseInt(value.keluar),
                parseInt(value.akhir),
                parseInt(value.harga_satuan),
                parseInt(value.harga_total),
                value.keterangan,
            ]);
        });
    }
});
