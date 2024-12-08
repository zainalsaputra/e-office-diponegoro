$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#form-update-password').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                $.LoadingOverlay("hide");
                $("#form-update-password")[0].reset();

                $("#modal-update-password").modal("hide");
                Swal.fire('Sukses!', 'Password berhasil diubah', 'success');
            },
            error: function (response) {
                $.LoadingOverlay("hide");
                if (response.status == 422) {
                    var error = response.responseJSON.meta.message;
                    Swal.fire('Error!', error, 'error');
                } else {
                    $.LoadingOverlay("hide");
                    Swal.fire('Error!', 'Terjadi Kesalahan Server', 'error');
                    console.log(response);
                }
            }
        });
    });
});
