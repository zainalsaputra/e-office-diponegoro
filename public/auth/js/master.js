$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('#update-password').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: "/update-password",
            data: $(this).serialize(),
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $("#modalPassword").modal("hide");
                Swal.fire('Berhasil!', response.meta.message, 'success')
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR);
                if (jqXHR.status == 422) {
                    Swal.fire('Oops!', "Isian tidak valid", 'error')
                } else {
                    Swal.fire('Error!', 'Server Error', 'error')
                }
            }
        });
    });

    $('.btn-akun').click(function (e) {
        e.preventDefault();

        $.ajax({
            type: "GET",
            url: "/get-profile",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $("#profile-name").val(response.data.name);
                $("#profile-email").val(response.data.email);
                $("#modalProfil").modal("show");
            }
        });
    });

    $('#update-profil').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: "/update-profile",
            data: $(this).serialize(),
            beforeSend: function () {
                $.LoadingOverlay('show');
            },
            success: function (response) {
                $.LoadingOverlay('hide');
                $('.pro-user-name').html(response.data.name);
                $('#modalProfil').modal('hide');
                Swal.fire('Berhasil!', response.meta.message, 'success');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide');
                Swal.fire('Error!', response.meta.message, 'error');
            }
        });
    });
});
