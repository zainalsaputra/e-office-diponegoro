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
                            Jenis Surat
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-auto ms-auto d-print-none">
                        <div class="btn-list">
                            <span class="d-none d-sm-inline">
                                <a href="#" class="btn btn-white" data-bs-toggle="modal" data-bs-target="#modal-create">
                                    <span class="me-2">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    Jenis Baru
                                </a>
                            </span>
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
                            <div class="card-header">
                                <h3 class="card-title">Daftar Jenis Surat</h3>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap" id="table-type" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama</th>
                                            <th>Format Nomor</th>
                                            <th>Edit</th>
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

@section('modal')
    {{-- Modal  Create --}}
    <div class="modal modal-blur fade" id="modal-create" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Jenis Baru</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" id="form-create">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Nama</label>
                            <input type="text" class="form-control" name="name" style="text-transform: uppercase" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Format Penomoran</label>
                            <input type="text" class="form-control" name="format" required>
                        </div>

                        <div class="card card-active">
                            <div class="card-body">
                                <h3>Contoh Format Penomoran</h3>
                                <p>
                                    <strong>Contoh 1</strong> : Jika format yang diinginkan adalah : ND/11/VII/2021 , maka format penomoran yang diinputkan adalah : ND/#/b/t <br><br>
                                    <strong>Contoh 2</strong> : Jika format yang diinginkan adalah : ND/11/VII/FSTK/2021 , maka format penomoran yang diinputkan adalah : ND/#/b/FSTK/t <br>
                                </p>
                                <p>
                                    Keterangan :
                                <ul>
                                    <li># : untuk penempatan nomor surat. Nomor ini akan di <i>generate</i> otomatis oleh sistem</li>
                                    <li>b : untuk penempatan bulan. Bulan akan di <i>generate</i> otomatis oleh sistem (dalam angka romawi) sesuai bulan saat surat diinput.</li>
                                    <li>t : untuk penempatan tahun. Tahun akan di <i>generate</i> otomatis oleh sistem sesuai tahun saat surat diinput.</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Batal
                        </button>
                        <button type="submit" class="btn btn-primary ms-auto">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    {{-- Modal  Edit --}}
    <div class="modal modal-blur fade" id="modal-edit" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Prodi Baru</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" id="form-edit">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Nama</label>
                            <input type="text" class="form-control" name="name" id="edit-name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Format Penomoran</label>
                            <input type="text" class="form-control" name="format" id="edit-format" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Batal
                        </button>
                        <button type="submit" class="btn btn-primary ms-auto">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script src="{{ asset('js/pages/letter-type.js') }}"></script>
@endpush
