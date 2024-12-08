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
                            Error Log
                        </h2>
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
                                <h3 class="card-title">Error Log Files</h3>
                            </div>
                            <div class="table-responsive">
                                <table class="table card-table table-vcenter text-nowrap" id="table-log">
                                    <thead>
                                        <tr>
                                            <th class="w-1">#</th>
                                            <th>Filename</th>
                                            <th>Size</th>
                                            <th>Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($logFiles as $key => $logFile)
                                            <tr>
                                                <td>{{ $loop->iteration }}</td>
                                                <td>{{ $logFile->getFilename() }}</td>
                                                <td>{{ $logFile->getSize() }}</td>
                                                <td>{{ date('d-m-Y H:i:s', $logFile->getMTime()) }}</td>
                                                <td>
                                                    <a href="{{ route('log.error.show', $logFile->getFilename()) }}" target="_blank" title="Show file {{ $logFile->getFilename() }}">View</a> |
                                                    <a href="{{ route('log.error.download', $logFile->getFilename()) }}" target="_blank"
                                                        title="Download file {{ $logFile->getFilename() }}">Download</a>
                                                </td>
                                            </tr>
                                        @endforeach
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
    <script src="{{ asset('js/pages/log-error.js') }}"></script>
@endpush
