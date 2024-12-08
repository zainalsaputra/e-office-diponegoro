$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('input[name="tanggal"]').flatpickr({
        altInput: true,
        altFormat: "j F Y",
        dateFormat: "Y-m-d",
        defaultDate: "today",
        locale: "id"
    });

    $('.money').mask('000.000.000.000.000', {reverse: true});
    $('.numeric').mask('000.000.000', {reverse: true});

    $('.modal').on('hidden.bs.modal', function (e) {
        $('form').trigger('reset');
        $('input[name="tanggal"]').flatpickr({
            altInput: true,
            altFormat: "j F Y",
            dateFormat: "Y-m-d",
            defaultDate: "today",
            locale: "id"
        });
    })

    $.fn.dataTable.ext.buttons.add = {
        text: 'INPUT DATA',
        className: 'btn-info waves-effect',
        action: function ( e, dt, node, config ) {
            $("#modalInput").modal('show')
        }
    };

    var table = $("#table").DataTable({
        ajax: {
            url: '/matkes/material/masuk'
        },
        lengthChange: false,
        scrollX: true,
        ordering: false,
        buttons: ['add'],
        columnDefs: [
            {
                targets: 0,
                width: "8%",
                className: "text-center",
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: "material.name",
            },
            {
                targets: 2,
                width: "13%",
                className: "text-center",
                data: 'material.unit'
            },
            {
                targets: 3,
                width: "13%",
                className: "text-center",
                data: 'quantity',
                render: $.fn.dataTable.render.number( '.', ',')
            },
            {
                targets: 4,
                width: "13%",
                className: "text-center",
                data: 'stock',
                render: $.fn.dataTable.render.number( '.', ',')
            },
            {
                targets: 5,
                width: "20%",
                className: "text-center",
                data: 'created_at',
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

        ],
        initComplete: function () {
            table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));
        }
    });

    $("#form-input").submit(function (e) {
        e.preventDefault();

        var data = $(this).serializeArray();

        for (var item in data)
        {

            if (data[item].name == 'jumlah') {
                data[item].value =$('input[name="jumlah"]').cleanVal();
            }

            if (data[item].name == 'stok') {
                data[item].value =$('input[name="stok"]').cleanVal();
            }

            if (data[item].name == 'harga') {
                data[item].value =$('input[name="harga"]').cleanVal();
            }
        }

        $.ajax({
            type: "POST",
            url: "/matkes/material/masuk",
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

    $("select[name='material']").on('change', function () {
        $.ajax({
            type: "get",
            url: "/matkes/material/show/"+$(this).val(),
            success: function (response) {
                var data = response.data
                $("input[name='jumlah']").val('');
                $("#origin").val(data.stock);

                $("input[name='stok']").val(data.stock);
                $(".numeric").trigger('input');

                $("input[name='harga']").val(data.price);
                $(".money").trigger('input');
            }
        });
    });

    var debounce = null;

    $("input[name='jumlah']").on('keyup', function(e){
    clearTimeout(debounce);
    debounce = setTimeout(function(){
        var jumlah = parseInt($("input[name='jumlah']").cleanVal());
        var stock = parseInt($("#origin").val());

        if (jumlah > 0) {
            var sisa = stock + jumlah
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


});
