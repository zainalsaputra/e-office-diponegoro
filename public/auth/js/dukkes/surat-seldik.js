$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var table = $("#table").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        scrollX: true,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        columnDefs: [
            {
                targets: 0,
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                className: 'text-center',
                data: 'kegiatan.nama'
            },
            {
                targets: 2,
                className: 'text-center',
                data: 'stakes'
            },
            {
                targets: 3,
                className: 'text-center',
                data: 'ms_tms_1'
            },
            {
                targets: 4,
                className: 'text-center',
                data: 'tgl_diputuskan'
            },
            {
                targets: 5,
                className: 'text-center',
                data: '_id',
                render: function(data, type, row, meta) {
                    return `<button type="button" class="btn btn-sm btn-info" data-id="${row._id}" title="Detail"><i class="fas fa-eye"></i></button> <a role="button" href="/dukkes/seldik/surat/generate/${row._id}" target="_blank" class="btn btn-sm btn-danger" title="Download"><i class="fas fa-file-pdf"></i></a>`
                }
            }
        ],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });

    var table_detail = $("#table-detail").DataTable({
        dom: 't',
        lengthChange: false,
        scrollX: true,
        columns: [
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
    });

    $('#filter_nrp').submit(function (e) {
        e.preventDefault();

        if ($('input[name="nrp"]').val() == '') {
            $('input[name="nrp"]').addClass('is-invalid');
        } else {
            $('input[name="nrp"]').removeClass('is-invalid');

            $.ajax({
                type: "get",
                url: "/dukkes/seldik/surat",
                data: $(this).serialize(),
                dataType: "JSON",
                beforeSend: function () {
                    $.LoadingOverlay('show')

                    // empty span and table
                    $('span#nama').html('');
                    $('span#pangkat').html('');
                    $('span#nrp').html('');
                    $('span#satuan').html('');

                    table.clear().draw()
                },
                success: function (response) {
                    $.LoadingOverlay('hide')
                    var data = response.data[0];
                    console.log(data)

                    $('span#nama').html(data.nama);
                    $('span#pangkat').html(data.pkt);
                    $('span#nrp').html(data.nrp);
                    $('span#satuan').html(data.kesatuan);

                    table.clear().row.add(data).draw()
                },
                error: function (xhr, textStatus, errorThrown) {
                    $.LoadingOverlay("hide");
                    if (xhr.status == 404) {
                        Swal.fire('Oops!', 'Data tidak ditemukan.', 'error');
                    } else {
                        console.log(xhr);
                        Swal.fire('Error!','Terjadi Kesalahan Server.', 'error')
                    }
                },

            });

        }

    });

    function populateTable(data) {

        table_detail.row.add({
            "tb_bb": data.tb_bb,
            "tensi_nadi": data.tensi_nadi,
            "peny_dalam": data.peny_dalam,
            "ekg": data.ekg,
            "treadmill": data.treadmill,
            "paru": data.paru,
            "rontgen": data.rontgen,
            "usg_abdomen": data.usg_abdomen,
            "lab": data.lab,
            "tht": data.tht,
            "saraf": data.saraf,
            "kulit": data.kulit,
            "bedah": data.bedah,
            "atas": data.atas,
            "bawah": data.bawah,
            "audiometri": data.audiometri,
            "mata": data.mata,
            "gigi": data.gigi,
            "jiwa": data.jiwa,
            "stakes": data.stakes,
            "ms_tms_1": data.ms_tms_1,
            "ket": data.ket,
            "no_sket": data.no_sket,
            "sket": data.sket,
            "dasar_no_surat": data.dasar_no_surat,
            "ms_tms_2": data.ms_tms_2,
            "prihal": data.prihal,
            "tgl_diputuskan": data.tgl_diputuskan,
            "tgl_terbit": data.tgl_terbit,
            "u": data.u,
            "a": data.a,
            "b": data.b,
            "d": data.d,
            "l": data.l,
            "g": data.g,
            "j": data.j,
            "thn_lahir": data.thn_lahir,
        }).draw();
    }

    $("#table tbody").on("click", '.btn-info',  function () {
        $.ajax({
            type: "get",
            url: "/dukkes/seldik/detail/"+$(this).data('id'),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show');
                table_detail.clear().draw();

                $("span#nama").html("");
                $("span#pangkat").html("");
                $("span#satuan").html("");
            },
            success: function (response) {
                $.LoadingOverlay('hide');
                populateTable(response.data);
                $("span#nama").html(response.data.nama);
                $("span#pangkat").html(`${response.data.pkt} ${response.data.nrp}`);
                $("span#satuan").html(response.data.kesatuan);

                $('#modalDetail').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide');
                console.log(jqXHR);
            }
        });
    });

    $("#modalDetail").on("shown.bs.modal", function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });


});
