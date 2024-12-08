<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- Primary Meta Tags -->
    <title>TUUD | DENKESYAH 18.04.01 SORONG</title>
    <meta name="title" content="TUUD | DENKESYAH 18.04.01 SORONG">
    <meta name="description" content="Aplikasi Realtime Akuntabel Profesional Integratif Kesdam V/Brawijaya">
    <meta name="author" content="ITSK RS dr. Soepraoen Kesdam V/Brawijaya">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://kesdam5brawijaya.com">
    <meta property="og:title" content="TUUD | DENKESYAH 18.04.01 SORONG">
    <meta property="og:description" content="Aplikasi Realtime Akuntabel Profesional Integratif Kesdam V/Brawijaya">
    <meta property="og:image" content="https://kesdam5brawijaya.com/images/rapi5.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://kesdam5brawijaya.com">
    <meta property="twitter:title" content="TUUD | DENKESYAH 18.04.01 SORONG">
    <meta property="twitter:description"
        content="Aplikasi Realtime Akuntabel Profesional Integratif Kesdam V/Brawijaya">
    <meta property="twitter:image" content="https://kesdam5brawijaya.com/images/rapi5.png">

    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}">

    <!-- App css -->
    <link href="{{ asset('vendor/auth/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"
        id="bs-default-stylesheet" />
    <link href="{{ asset('vendor/auth/css/app.min.css') }}" rel="stylesheet" type="text/css" id="app-default-stylesheet" />

    <link href="{{ asset('vendor/auth/css/bootstrap-dark.min.css') }}" rel="stylesheet" type="text/css"
        id="bs-dark-stylesheet" />
    <link href="{{ asset('vendor/auth/css/app-dark.min.css') }}" rel="stylesheet" type="text/css" id="app-dark-stylesheet" />

    <!-- icons -->
    <link href="{{ asset('vendor/auth/css/icons.min.css') }}" rel="stylesheet" type="text/css" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap" rel="stylesheet">

</head>

<body class="loading auth-fluid-pages pb-0">

    <div class="auth-fluid">
        <!--Auth fluid left content -->
        <div class="auth-fluid-form-box">
            <div class="align-items-center d-flex h-100">
                <div class="card-body">

                    <!-- Logo -->
                    <div class="text-center mx-auto mb-3">
                        <div class="auth-logo">
                            <a href="#" class="logo logo-dark text-center">
                                <span class="logo-lg">
                                    <img src="{{ asset('auth/images/demo/logo-kesdam.png') }}" alt="" height="60">
                                </span>
                            </a>

                            {{-- <a href="#" class="logo logo-light text-center">
                                    <span class="logo-lg">
                                        <img src="{{asset('images/demo/logo-kesdam.png')}}" alt="" height="22">
                                    </span>
                                </a> --}}
                        </div>
                        <h3 style="font-family: 'Russo One', sans-serif;">R A P I</h1>
                            <h4 class="mb-1" style="font-family: 'Hammersmith One', sans-serif;">Realtime Akuntabel
                                Profesional Integratif</h4>
                            <h5 class="mt-0" style="font-family: 'Hammersmith One', sans-serif;">
                                DENKESYAH 18.04.01 SORONG </h5>
                    </div>

                    <!-- title-->
                    <h4 class="mt-0">Login</h4>
                    <p class="text-muted mb-3">Masukkan email dan password untuk akses ke aplikasi.</p>

                    <!-- form -->
                    <form action="{{ route('login') }}" method="post">
                        @csrf
                        <div class="form-group">
                            <label for="emailaddress">Email</label>
                            <input class="form-control @error('email') is-invalid @enderror" type="email"
                                value="{{ old('email') }}" id="emailaddress" name="email" required autofocus>

                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="input-group input-group-merge is-invalid">
                                <input class="form-control @error('password') is-invalid @enderror" type="password"
                                    id="password" name="password" class="form-control" required>
                            </div>

                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="form-group mb-3">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" name="remember" id="remember"
                                    {{ old('remember') ? 'checked' : '' }}>
                                <label class="custom-control-label" for="remember">Remember me</label>
                            </div>
                        </div>
                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-warning btn-block" type="submit">Log In </button>
                        </div>
                    </form>
                    <!-- end form-->

                    {{-- <!-- Footer-->
                        <footer class="footer footer-alt">
                            <p class="text-muted">Don't have an account? <a href="auth-register-2.html" class="text-muted ml-1"><b>Sign Up</b></a></p>
                        </footer> --}}

                </div> <!-- end .card-body -->
            </div> <!-- end .align-items-center.d-flex.h-100-->
        </div>
        <!-- end auth-fluid-form-box-->

        <!-- Auth fluid right content -->
        <div class="auth-fluid-right text-center">
            <div class="auth-user-testimonial">
                <h2 class="mb-3 text-white">Tata Usaha dan Usaha Dalam</h2>
                <p class="lead"><i class="mdi mdi-format-quote-open"></i> Whoever wants the pearl so they must brave
                    to jump in the deep ocean. <i class="mdi mdi-format-quote-close"></i>
                </p>
                <h5 class="text-white">
                    - Ir. Soekarno
                </h5>
            </div> <!-- end auth-user-testimonial-->
        </div>
        <!-- end Auth fluid right content -->
    </div>
    <!-- end auth-fluid-->

    <!-- Vendor js -->
    <script src="{{ asset('vendor/auth/js/vendor.min.js') }}"></script>

    <!-- App js -->
    <script src="{{ asset('vendor/auth/js/app.min.js') }}"></script>

</body>

</html>
