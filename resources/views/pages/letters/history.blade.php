@extends('layouts.app')

@section('content')
    <div class="page-wrapper">
        <div class="container-xl">
            <!-- Page title -->
            <div class="page-header d-print-none">
                <div class="row align-items-center">
                    <div class="col">
                        <!-- Page pre-title -->
                        <h2 class="page-title">
                            Riwayat Surat
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-auto ms-auto d-print-none">
                        <div class="btn-list">
                            <div class="dropdown">
                                <a href="#" class="btn btn-white dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                                    <span class="me-2">
                                        <i class="fas fa-download"></i>
                                    </span>
                                    Export Laporan
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="./e-surat-keluar.html">
                                        Surat Keluar
                                    </a>
                                    <a class="dropdown-item" href="./e-surat-masuk.html">
                                        Surat Masuk
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards">
                    <div class="col-12">
                        <div class="card">
                            <ul class="nav nav-tabs" data-bs-toggle="tabs">
                                <li class="nav-item">
                                    <a href="#tabs-home-7" class="nav-link active" data-bs-toggle="tab">Surat Keluar</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#tabs-profile-7" class="nav-link" data-bs-toggle="tab">Surat Masuk</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <!-- Tab Surat Keluar -->
                                <div class="tab-pane active show" id="tabs-home-7">
                                    <div class="table-responsive">
                                        <table class="table card-table table-vcenter text-nowrap datatable" id="table-outgoing">
                                            <thead>
                                                <tr>
                                                    <th class="w-1">#</th>
                                                    <th>Perihal</th>
                                                    <th>No. Surat</th>
                                                    <th>Kepada</th>
                                                    <th>Kontrol Surat</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!-- Tab Surat Masuk -->
                                <div class="tab-pane" id="tabs-profile-7">
                                    <div class="table-responsive">
                                        <table class="table card-table table-vcenter text-nowrap datatable">
                                            <thead>
                                                <tr>
                                                    <th class="w-1">#</th>
                                                    <th>Perihal</th>
                                                    <th>No. Agenda</th>
                                                    <th>No. Surat</th>
                                                    <th>Dari</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer footer-transparent d-print-none">
            <div class="container-xl">
                <div class="row text-center align-items-center flex-row-reverse">
                    <div class="col-lg-auto ms-lg-auto">
                        <ul class="list-inline list-inline-dots mb-0">
                            <li class="list-inline-item"><a href="./docs/index.html" class="link-secondary">Documentation</a></li>
                            <li class="list-inline-item"><a href="./license.html" class="link-secondary">License</a></li>
                            <li class="list-inline-item"><a href="https://github.com/tabler/tabler" target="_blank" class="link-secondary" rel="noopener">Source code</a></li>
                            <li class="list-inline-item">
                                <a href="https://github.com/sponsors/codecalm" target="_blank" class="link-secondary" rel="noopener">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon text-pink icon-filled icon-inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                    </svg>
                                    Sponsor
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 col-lg-auto mt-3 mt-lg-0">
                        <ul class="list-inline list-inline-dots mb-0">
                            <li class="list-inline-item">
                                Copyright &copy; 2022
                                <a href="." class="link-secondary">Tabler</a>.
                                All rights reserved.
                            </li>
                            <li class="list-inline-item">
                                <a href="./changelog.html" class="link-secondary" rel="noopener">
                                    v1.0.0-beta9
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
@endsection

@section('modal')
    <div class="modal modal-blur fade" id="modal-create" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Surat Keluar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label">No. Surat</label>
                                <input type="text" class="form-control" name="no-surat" required>
                            </div>
                        </div>
                        <div class="col">
                            <label class="form-label">Tanggal</label>
                            <input type="date" class="form-control" name="tanggal" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Kepada</label>
                        <select class="form-control" name="kepada" id="kepada" required>
                            <option selected disabled>- Pilih Tujuan -</option>
                            <option value="Dekan">Dekan</option>
                            <option value="Rektor">Rektor</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Perihal</label>
                        <textarea class="form-control" name="perihal" rows="3"></textarea>
                    </div>
                    <div>
                        <label for="formFile" class="form-label">File Surat</label>
                        <input class="form-control" type="file" id="file" accept=".pdf">
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                        Batal
                    </a>
                    <a href="#" class="btn btn-primary ms-auto" data-bs-dismiss="modal">
                        Simpan
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script src="{{ asset('js/pages/history.js') }}"></script>
@endpush
