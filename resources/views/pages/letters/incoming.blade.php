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
                            Surat Masuk
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-auto ms-auto d-print-none">
                        {{-- <div class="btn-list">
                            <span class="d-none d-sm-inline">
                                <a href="#" class="btn btn-white" data-bs-toggle="modal" data-bs-target="#modal-create">
                                    <span class="me-2">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    Surat Baru
                                </a>
                            </span>
                        </div> --}}
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Daftar Surat Masuk</h3>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter" style="width: 100%" id="table-incoming">
                                    <thead>
                                        <tr>
                                            <th class="w-1">#</th>
                                            <th>Perihal</th>
                                            {{-- <th>No. Agenda</th> --}}
                                            <th>No. Surat</th>
                                            <th>Dari</th>
                                            <th>Tanggal Masuk</th>
                                            @if (auth()->user()->isAdmin())
                                            <th id="col_true">Aksi</th>
                                            @else
                                            <th>Aksi</th>
                                            @endif
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
        @include('includes.footer')
    </div>
@endsection

@push('js')
    <script src="{{ asset('js/pages/incoming.js') }}"></script>
@endpush
