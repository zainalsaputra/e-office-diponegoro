<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <!-- Primary Meta Tags -->
    <title>TUUD | KESDAM IV/DIPONEGORO</title>
    <meta name="title" content="Tata Usaha dan Urusan Dalam" />
    <meta name="description" content="Aplikasi E-Office Institut Teknologi Sains dan Kesehatan RS dr. Soepraoen" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://e-office.itsk-soepraoen.ac.id" />
    <meta property="og:title" content="Tata Usaha dan Urusan Dalam" />
    <meta property="og:description"
        content="Aplikasi E-Office Institut Teknologi Sains dan Kesehatan RS dr. Soepraoen" />
    <meta property="og:image" content="{{ asset('static/meta-tags.png') }}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://e-office.itsk-soepraoen.ac.id" />
    <meta property="twitter:title" content="Tata Usaha dan Urusan Dalam" />
    <meta property="twitter:description"
        content="Aplikasi E-Office Institut Teknologi Sains dan Kesehatan RS dr. Soepraoen" />
    <meta property="twitter:image" content="{{ asset('static/meta-tags.png') }}" />

    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('static/favicon.ico') }}">

    <!-- CSS files -->
    <link href="{{ asset('css/tabler.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/tabler-vendors.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/demo.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/login.css') }}" rel="stylesheet" />
</head>

<body class=" border-top-wide border-primary d-flex flex-column">
    <div class="page page-center">
        <div class="container-tight py-4">
            <form class="card card-md" action="{{ route('login') }}" method="post" autocomplete="off">
                @csrf
                <div class="card-body">
                    <div class="text-center mb-3">
                        <a href="#" class="navbar-brand navbar-brand-autodark">
                            <img src="{{ asset('static/logo.png') }}" height="50" alt="">
                            <div class="text-container">
                                <span class="e-office success text-success">TUUD</span>
                                <span class="kesdam">KESDAM IV/DIPONEGORO</span>
                            </div>
                        </a>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input type="text" class="form-control @error('username') is-invalid @enderror"
                            name="username" value="{{ old('username') }}" required>
                        @error('username')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Password</label>
                        <div class="input-group input-group-flat">
                            <input type="password" class="form-control @error('password') is-invalid @enderror"
                                name="password" autocomplete="off" required>
                            <span class="input-group-text">
                                <a href="#" class="link-secondary show-password" title="Show password"
                                    data-bs-toggle="tooltip">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                        <path
                                            d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6">
                                        </path>
                                    </svg>
                                </a>
                                <a href="#" class="link-secondary hide-password d-none" title="Hide password"
                                    data-bs-toggle="tooltip">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-off"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                                        <path
                                            d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87">
                                        </path>
                                        <path d="M3 3l18 18"></path>
                                    </svg>
                                </a>
                            </span>

                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="form-footer">
                        <button type="submit" class="btn btn-success w-100">Masuk</button>
                    </div>
                </div>
            </form>
            @if (Route::has('register'))
                <div class="text-center text-muted mt-3">
                    Belum punya akun? <a href="{{ route('register') }}" tabindex="-1">Daftar</a>
                </div>
            @endif

        </div>
    </div>
    <!-- Libs JS -->
    <script src="{{ asset('libs/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('libs/jquery/jquery-3.6.0.min.js') }}"></script>
    <!-- Tabler Core -->
    <script src="{{ asset('js/tabler.min.js') }}"></script>
    <script src="{{ asset('js/demo.min.js') }}"></script>
    <script>
        $(document).ready(function() {
            // Show hide password field
            $(".show-password").click(function() {
                $(this).toggleClass("d-none");
                $(this).siblings(".hide-password").toggleClass("d-none");
                var input = $(this).parent().siblings("input");
                if (input.attr("type") == "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
            $(".hide-password").click(function() {
                $(this).toggleClass("d-none");
                $(this).siblings(".show-password").toggleClass("d-none");
                var input = $(this).parent().siblings("input");
                if (input.attr("type") == "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        });
    </script>
</body>

</html>
