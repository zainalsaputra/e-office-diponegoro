<div class="navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbar-menu">
        <div class="navbar navbar-light">
            <div class="container-xl">
                <ul class="navbar-nav">
                    <li class="nav-item {{ set_active('home') }}">
                        <a class="nav-link" href="{{ route('home') }}">
                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                <!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                </svg>
                            </span>
                            <span class="nav-link-title">
                                Home
                            </span>
                        </a>
                    </li>
                    @if (auth()->user()->isAdmin())
                        {{-- <li class="nav-item {{ set_active('faculty.index') }}">
                            <a class="nav-link" href="{{ route('faculty.index') }}">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-building"></i>
                                </span>
                                <span class="nav-link-title">
                                    Fakultas
                                </span>
                            </a>
                        </li> --}}
                        {{-- <li class="nav-item {{ set_active('major.index') }}">
                            <a class="nav-link" href="{{ route('major.index') }}">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-building-columns"></i>
                                </span>
                                <span class="nav-link-title">
                                    Prodi
                                </span>
                            </a>
                        </li> --}}
                        <li class="nav-item dropdown {{ set_active(['letter.incoming.*', 'letter.outgoing.*']) }}">
                            <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" role="button" aria-expanded="false">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-rotate"></i>
                                </span>
                                <span class="nav-link-title">
                                    Transaksi Surat
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item {{ set_active('letter.outgoing.index') }}"
                                    href="{{ route('letter.outgoing.index') }}">
                                    Surat Keluar
                                </a>
                                <a class="dropdown-item {{ set_active('letter.incoming.index') }}"
                                    href="{{ route('letter.incoming.index') }}">
                                    Surat Masuk
                                </a>
                            </div>
                        </li>
                        <li class="nav-item dropdown {{ set_active('letter-type.*') }}">
                            <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" role="button" aria-expanded="false">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-table"></i>
                                </span>
                                <span class="nav-link-title">
                                    Data Referensi
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item {{ set_active('letter-type.index') }}"
                                    href="{{ route('major.division.index') }}">
                                    Divisi
                                </a>
                                <a class="dropdown-item {{ set_active('letter-type.index') }}"
                                    href="{{ route('letter-type.index') }}">
                                    Jenis Surat
                                </a>
                            </div>
                        </li>
                        <li class="nav-item {{ set_active('user.index') }}">
                            <a class="nav-link" href="{{ route('user.index') }}">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="far fa-user"></i>
                                </span>
                                <span class="nav-link-title">
                                    User
                                </span>
                            </a>
                        </li>
                        <li class="nav-item dropdown {{ set_active('log.*') }}">
                            <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" role="button" aria-expanded="false">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-list"></i>
                                </span>
                                <span class="nav-link-title">
                                    Logs
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item {{ set_active('') }}" href="#">
                                    Activity Log
                                </a>
                                <a class="dropdown-item" href="/log/error">
                                    Error Log
                                </a>
                                <a class="dropdown-item" href="/log/queue">
                                    Queue Log
                                </a>
                            </div>
                        </li>
                    @else
                        <li class="nav-item dropdown {{ set_active(['letter.incoming.*', 'letter.outgoing.*']) }}">
                            <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" role="button" aria-expanded="false">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-rotate"></i>
                                </span>
                                <span class="nav-link-title">
                                    Transaksi Surat
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item {{ set_active('letter.outgoing.index') }}"
                                    href="{{ route('letter.outgoing.index') }}">
                                    Surat Keluar
                                </a>
                                <a class="dropdown-item {{ set_active('letter.incoming.index') }}"
                                    href="{{ route('letter.incoming.index') }}">
                                    Surat Masuk
                                </a>
                            </div>
                        </li>
                        {{-- <li class="nav-item {{ set_active('letter.history') }}">
                            <a class="nav-link" href="{{ route('letter.history') }}">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-clock-rotate-left"></i>
                                </span>
                                <span class="nav-link-title">
                                    Riwayat Surat
                                </span>
                            </a>
                        </li> --}}
                        {{-- <li class="nav-item dropdown {{ set_active('letter-type.*') }}">
                            <a class="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <i class="fa-solid fa-cog"></i>
                                </span>
                                <span class="nav-link-title">
                                    Pengaturan
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item {{ set_active('letter-type.index') }}" href="{{ route('letter-type.index') }}">
                                    Jenis Surat
                                </a>
                            </div>
                        </li> --}}
                    @endif
                </ul>
                {{-- <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                    <form action="." method="get">
                        <div class="input-icon">
                            <span class="input-icon-addon">
                                <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="10" cy="10" r="7" />
                                    <line x1="21" y1="21" x2="15" y2="15" />
                                </svg>
                            </span>
                            <input type="text" value="" class="form-control" placeholder="Search…" aria-label="Search in website">
                        </div>
                    </form>
                </div> --}}
            </div>
        </div>
    </div>
</div>
