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
                            Surat Keluar
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    @if (auth()->user()->isAdmin())
                    @else
                    <div class="col-auto ms-auto d-print-none">
                        <div class="btn-list">
                            <span class="d-none d-sm-inline">
                                <a href="#" class="btn btn-white" data-bs-toggle="modal" data-bs-target="#modal-create">
                                    <span class="me-2">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    Surat Baru
                                </a>
                            </span>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Daftar Surat Keluar</h3>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter" style="width: 100%" id="table-outgoing">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Perihal</th>
                                            <th>No. Surat</th>
                                            <th>Kepada</th>
                                            <th>Status</th>
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

@section('modal')
    {{-- Modal Create --}}
    <div class="modal modal-blur fade" id="modal-create" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Surat Keluar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" method="post" id="form-create">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Jenis Surat</label>
                            <select class="form-control" name="jenis" id="jenis" required>
                                <option selected disabled>- Pilih Jenis -</option>
                                @foreach ($typesName as $t)
                                    <option value="{{ $t->id }}">{{ $t->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">No. Surat</label>
                                    <input type="text" class="form-control" name="no_surat">
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Tanggal</label>
                                <input type="date" class="form-control" name="tgl_surat" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Kepada</label>
                            <select class="form-control" name="kepada" id="kepada" required>
                                <option selected disabled>- Pilih Tujuan -</option>
                                @foreach ($major as $t)
                                    <option value="{{ $t->id }}">{{ $t->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Perihal</label>
                            <textarea class="form-control" name="perihal" rows="3"></textarea>
                        </div>
                        <div>
                            <label for="formFile" class="form-label">File Surat</label>
                            <input class="form-control" type="file" name="file" id="file" accept=".pdf">
                            <small class="text-muted">Format PDF | Maks. 2Mb</small>
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

    {{-- Modal Edit --}}
    <div class="modal modal-blur fade" id="modal-edit" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Surat Keluar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" method="post" id="form-edit">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">No. Surat</label>
                                    <input type="text" class="form-control" name="no_surat" id="edit_no_surat" required>
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Tanggal</label>
                                <input type="date" class="form-control" name="tgl_surat" id="edit_tgl_surat" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Kepada</label>
                            <select class="form-control" name="kepada" id="edit_kepada" required>
                                @foreach ($major as $t)
                                    <option value="{{ $t->id }}">{{ $t->name }}</option>
                                @endforeach
                            </select>
                            {{-- <?php dd(auth()->user()->major_id)?> --}}
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Perihal</label>
                            <textarea class="form-control" name="perihal" id="edit_perihal" rows="3"></textarea>
                        </div>
                        <div>
                            <label for="formFile" class="form-label">File Surat <small>(opsional)</small></label>
                            <input class="form-control" type="file" name="file" id="file" accept=".pdf">
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
    <script src="{{ asset('js/pages/outgoing.js') }}"></script>
@endpush
