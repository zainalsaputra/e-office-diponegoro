$(document).ready(function () {

    let state = '';

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    // $('input[name="tanggal"]').flatpickr({
    //     altInput: true,
    //     altFormat: "j F Y",
    //     dateFormat: "Y-m-d",
    //     defaultDate: "today",
    //     locale: "id",
    //     maxDate: "today"
    // });

    $('.money').mask('000.000.000.000.000', {reverse: true});
    $('.numeric').mask('000.000.000', {reverse: true});

    $('.modal').on('hidden.bs.modal', function (e) {
        $('form').trigger('reset');
        $("select[name='material']").val('').trigger('change');
    })

    $.fn.dataTable.ext.buttons.in = {
        text: '<i class="fas fa-arrow-circle-down"></i> MASUK',
        className: 'btn-success waves-effect',
        action: function ( e, dt, node, config ) {
            state = 'masuk'
            income()
        }
    };

    $.fn.dataTable.ext.buttons.out = {
        text: '<i class="fas fa-arrow-circle-up"></i> KELUAR',
        className: 'btn-danger waves-effect',
        action: function ( e, dt, node, config ) {
            state = 'keluar'
            outcome()
        }
    };

    var table = $("#table").DataTable({
        ajax: {
            url: "/matkes/item/stok/"+$("#id").val()
        },
        lengthChange: false,
        ordering: false,
        scrollX: true,
        buttons: ['in', 'out'],
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
                className: "text-center",
                data: "created_at",
                render: function (data, type, row, meta) {
                    var date = new Date(data);
                    return (
                        date.getDate() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getFullYear()
                    );
                }
            },
            {
                targets: 2,
                width: '20%',
                className: "text-center",
                data: "masuk",
                render: $.fn.dataTable.render.number( '.', ',')
            },
            {
                targets: 3,
                width: '20%',
                className: "text-center",
                data: "keluar",
                render: $.fn.dataTable.render.number( '.', ',')
            },
            {
                targets: 4,
                width: '20%',
                className: "text-center",
                data: "sisa",
                render: $.fn.dataTable.render.number( '.', ',')
            },
        ],
        initComplete: function() {
            table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
        }

    });


    function income() {
        $("h5.modal-title").html('INPUT MATKES MASUK');
        $(".modal-header").removeClass("bg-danger").addClass("bg-success");

        $.ajax({
            type: "get",
            url: "/matkes/item/show/"+$("#id").val(),
            success: function (response) {
                $("input[name='stok']").val(response.data.stok).trigger('input');
                $("#origin").val(response.data.stok);
                $("input[name='harga']").val(response.data.harga).trigger('input');
            }
        });

        $("#modalInput").modal('show')

    }

    function outcome() {
        $("h5.modal-title").html('INPUT MATKES KELUAR');
        $(".modal-header").removeClass("bg-success").addClass("bg-danger");

        $.ajax({
            type: "get",
            url: "/matkes/item/show/"+$("#id").val(),
            success: function (response) {
                $("input[name='stok']").val(response.data.stok).trigger('input');
                $("#origin").val(response.data.stok);
                $("input[name='harga']").val(response.data.harga).trigger('input');
            }
        });

        $("#modalInput").modal('show')
    }

    var debounce = null;

    $("input[name='jumlah']").on('keyup', function(e){
    clearTimeout(debounce);
    debounce = setTimeout(function(){
        var jumlah = parseInt($("input[name='jumlah']").cleanVal());
        var stock = parseInt($("#origin").val());

        if (jumlah > 0) {

            if (state == "masuk" ) {
                var sisa = stock + jumlah
            } if (state == "keluar") {
                var sisa = stock - jumlah
                if (jumlah > stock) {
                    $("input[name='jumlah']").val(stock).trigger('input')
                }
            }

            if(sisa < 0) {
                $("input[name='stok']").val("0");
            } else {
                $("input[name='stok']").val(sisa);
            }
        } else {
            $("input[name='stok']").val(stock);
        }

        // $("input[name='stok']").val(sisa);
        $("input[name='stok']").trigger('input');
    }, 100);
    });

    $("#form-input").submit(function (e) {
        e.preventDefault();

        var data = $(this).serializeArray();

        for (var item in data)
        {

            if (data[item].name == 'jumlah') {
                data[item].value = $('input[name="jumlah"]').cleanVal();
            }

            if (data[item].name == 'stok') {
                data[item].value = $('input[name="stok"]').cleanVal();
            }

            if (data[item].name == 'harga') {
                data[item].value = $('input[name="harga"]').cleanVal();
            }
        }

        $.ajax({
            type: "POST",
            url: "/matkes/item/stok/"+state,
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
                Swal.fire("Disimpan!", "Data berhasil disimpan.", "success");

                $("#harga").html(response.data.harga);

                table.ajax.reload();
                table.columns.adjust().draw();
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
