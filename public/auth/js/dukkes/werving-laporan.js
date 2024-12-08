$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('[data-toggle="select2"]').select2();

    bsCustomFileInput.init();

    var table = $("#table").DataTable({
        ajax: {
            url: "/dukkes/werving/laporan",
            data: function (d) {
                d.id = $("#filter-giat").val();
            },
        },
        lengthChange: false,
        scrollX: true,
        ordering: false,
        buttons: [
            { extend: "excel", className: "btn-success waves-effect waves-light" },
        ],
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        columns: [
            { data: "nomor" },
            {
                data: "nama",
                render: function (data, type, row, meta) {
                    return `${data} ${row.pkt} ${row.nrp} ${row.kesatuan}`
                }
            },
            { data: "tb_bb" },
            { data: "tensi_nadi" },
            { data: "peny_dalam" },
            { data: "ekg" },
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
            { data: "nilai" },
            { data: "ms_tms_1" },
            { data: "ket" }
        ],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });

    $("#filter-giat").on("change", function () {
        table.ajax.reload();
        countStakes($(this).val())
        countKeterangan($(this).val())
    });

    function countStakes(id) {
        $.ajax({
            type: "get",
            url: "/dukkes/werving/laporan/stakes",
            data: {id: id},
            dataType: "json",
            beforeSend: function () {
                $("#stakes_i").html('0');
                $("#stakes_ii").html('0');
                $("#stakes_iii").html('0');
                $("#stakes_iv").html('0');
                $("#stakes_th").html('0');
                $("#stakes_jml").html('0');
            },
            success: function (response) {
                var data = response.data
                $("#stakes_i").html(data['I']);
                $("#stakes_ii").html(data['II']);
                $("#stakes_iii").html(data['III']);
                $("#stakes_iv").html(data['IV']);
                $("#stakes_th").html(data['TH']);

                var jumlah = 0;
                $.each(data, function (key, val) {
                    jumlah += val
                });

                $("#stakes_jml").html(jumlah);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            }
        });
    }

    function countKeterangan(id) {
        $.ajax({
            type: "get",
            url: "/dukkes/werving/laporan/keterangan",
            data: {id: id},
            dataType: "json",
            beforeSend: function () {
                $("#ket_ms").html('0');
                $("#ket_tms").html('0');
                $("#ket_th").html('0');
                $("#ket_jml").html('0');
            },
            success: function (response) {
                var data = response.data
                $("#ket_ms").html(data['MS']);
                $("#ket_tms").html(data['TMS']);
                $("#ket_th").html(data['TH']);

                var jumlah = 0;
                $.each(data, function (key, val) {
                    jumlah += val
                });

                $("#ket_jml").html(jumlah);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            }
        });
    }


});
