$(function () {

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $("#basic-datepicker").flatpickr({
        altInput: true,
        altFormat: "d F Y",
        dateFormat: "Y-m-d",
        locale: "id",
        defaultDate: "today"
    })

    var table = $("#table").DataTable({
        ajax: '/matkes/transaksi/keranjang',
        info: false,
        lengthChange: false,
        searching: false,
        ordering: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        columnDefs: [
            {
                targets: 0,
                width: "8%",
                className: "text-center",
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: 'nama',
            },
            {
                targets: 2,
                width: "15%",
                className: "text-center",
                data: 'satuan',
            },
            {
                targets: 3,
                width: "15%",
                className: "text-center",
                data: 'jumlah',
            },
            {
                targets: 4,
                width: "8%",
                className: "text-center",
                data: 'uuid',
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-danger btn-sm btn-icon" data-id="${data}"><i class="fas fa-times"></i></button>`
                }
            }
        ],
    });

    $('.numeric').mask('000000000', {reverse: true});

    $('#barang').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        var harga = $('option:selected', this).attr("data-price");
        var stok = $('option:selected', this).attr("data-stock");
        var satuan = $('option:selected', this).attr("data-unit");

        $("#harga").val(harga);
        $("#stok").val(stok);
        $("#satuan").val(satuan);
        $("input[name='qty']").val(1);
    });

    var debounce = null;

    $("input[name='qty']").on('keyup', function(e){
        clearTimeout(debounce);
        debounce = setTimeout(function(){
            var jumlah = parseInt($("input[name='qty']").cleanVal());
            var stock = parseInt($("#stok").val());

            if (jumlah < 1) {
                $("input[name='qty']").val('1');
            }
        }, 100);
    });

    $('#form').submit(function (e) {
        e.preventDefault();
        var nama = $("#barang option:selected").text();
        var id = $("#barang option:selected").val();
        var satuan = $("#satuan").val();
        var qty = $("input[name='qty']").val();
        var harga = $("#harga").val();

        var data = {id: id, nama: nama, satuan: satuan, qty: qty, harga: harga};

        $.ajax({
            type: "POST",
            url: "/matkes/transaksi/keranjang",
            data: data,
            success: function (response) {
                Swal.fire('Berhasil!', 'Barang telah ditambahkan.', 'success');
                table.ajax.reload()
                $("#barang").val('').selectpicker('refresh');
                $("input[name='qty']").val('');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 500) {
                    Swal.fire('Error!', 'Terjadi Kesalahan Server.', 'error')
                }
            }
        });
    });

    $('#table tbody').on('click', '.btn-danger', function (){
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Barang akan dihapus dari daftar keranjang ini.",
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
                    url: "/matkes/transaksi/keranjang",
                    data: {uuid: $(this).data('id')},
                    success: function (response) {
                        Swal.fire('Berhasil!', 'Barang dihapus dari keranjang.', 'success');
                        table.ajax.reload();
                    }
                });
            }
        })
    });

    $("#proses").click(function (e) {
        e.preventDefault();
        var data = table.rows().data();
        if (data.length > 0) {
            Swal.fire({
                title: 'Anda Yakin?',
                text: "Barang dalam keranjang akan di proses.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, proses!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        type: "POST",
                        url: "/matkes/transaksi/proses/masuk",
                        data: {dari: $('input[name="dari"]').val(), type: $(this).data('type')},
                        beforeSend: function() {
                            $.LoadingOverlay("show")
                        },
                        success: function (response) {
                            $.LoadingOverlay("hide")
                            $("input[name='dari']").val('');
                            $("#stok").val('');
                            Swal.fire({
                                title: 'Berhasil!',
                                text: "Barang sudah proses.",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                // cancelButtonColor: '#d33',
                                confirmButtonText: 'Selesai',
                                // cancelButtonText: 'Selesai'
                            }).then((result) => {
                                if (result.value) {
                                    // redirect ke halaman cetak
                                }
                            })
                            table.ajax.reload();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $.LoadingOverlay("hide")
                            console.log(jqXHR)

                        }
                    });
                }
            })
        } else {
            Swal.fire('Error!', 'Tidak dapat diproses, keranjang masih kosong.', 'error');
        }
    });


});
