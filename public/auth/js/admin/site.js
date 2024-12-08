$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    bsCustomFileInput.init();

    $("#logo").on('change', function () {
        var input = $(this)[0];
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    });

    $("#form-site").submit(function (e) {
        e.preventDefault();

        var formData = new FormData($("#form-site")[0]);
        $.ajax({
            url: "/admin/setting",
            type: "POST",
            data : formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $.LoadingOverlay('show')
            },
            success: function(data){
                $.LoadingOverlay('hide')
                Swal.fire('Berhasil!', 'Data berhasil disimpan', 'success');
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $.LoadingOverlay('hide')
                Swal.fire('Error!', 'Terjadi Kesalahan', 'error');
                console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });
});
