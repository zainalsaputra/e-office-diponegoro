<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TUUD | DENKESYAH 18.04.01 SORONG</title>
    <link rel="shortcut icon" href="{{ asset('static/favicon.ico') }}">
    <link rel="stylesheet" href="{{ asset('css/disposisi/fstk.css') }}">
</head>


<body onload="window.print();">
    <div class="container">
        <div class="kop-container">
            <div class="kop">
                <p style="margin-bottom: 0px">DETASEMEN KESEHATAN WILAYAH 18. 04. 01 SORONG</p>
                <p>URUSAN ADMINISTRASI</p>
            </div>
        </div>
        <div class="break"></div>
        <div class="title-container">
            <strong class="title">LEMBAR DISPOSISI</strong>
        </div>
        <div class="agenda">
            <div class="left">
                {{-- <span>No Agenda:</span> _______ / _______ / 2024 --}}
                <span>No Agenda &nbsp;:</span> <span id="agenda">{{ $data->no_agenda }}</span>
            </div>
            <div class="right">
                <span>Tanggal &nbsp;:</span> <span id="date">{{ $data->tgl_surat }}</span>
            </div>
        </div>

        <script>
            const dateElement = document.getElementById("date");
            const originalDate = dateElement.textContent;

            const [year, month, day] = originalDate.split("-");
            const formattedDate = `${day} - ${month} - ${year}`;

            dateElement.textContent = formattedDate;

            const agendaElement = document.getElementById("agenda");
            const agendaText = agendaElement.innerText;

            const formattedText = agendaText.split('/').join(' / ');

            agendaElement.innerText = formattedText;
        </script>

        <table class="disposisi-table">
            <thead>
                <tr>
                    <th id="col-1">No</th>
                    <th id="col-2">Diteruskan <br> Kepada Yth</th>
                    <th id="col-3">Tanggal</th>
                    <th id="col-4">Paraf</th>
                    <th id="col-5">Disposisi Komandan</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="col-center">1</td>
                    <td>DANDENKESYAH</td>
                    <td></td>
                    <td></td>
                    <td rowspan="2"></td>
                </tr>
                <tr>
                    <td id="col-center">2</td>
                    <td>WADAN DENKESYAH</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td id="col-center">3</td>
                    <td>PASI TUUD</td>
                    <td></td>
                    <td></td>
                    <td id="col-center">DISPOSISI WADAN</td>
                </tr>
                <tr>
                    <td id="col-center">4</td>
                    <td>PASI MINLOG</td>
                    <td></td>
                    <td></td>
                    <td rowspan="2"></td>
                </tr>
                <tr>
                    <td id="col-center">5</td>
                    <td>PASI MINKES</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td id="col-center">6</td>
                    <td>KARUMKIT dr. ARYOKO</td>
                    <td></td>
                    <td></td>
                    <td id="col-center">DISPOSISI PASI / DANTIM / KAGUD</td>
                </tr>
                <tr>
                    <td id="col-center">7</td>
                    <td>DANTIM KESLAP</td>
                    <td></td>
                    <td></td>
                    <td rowspan="2"></td>
                </tr>
                <tr>
                    <td id="col-center">8</td>
                    <td>KAGUDKESYAH</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <!-- Legend -->
        <div class="legend">
            <div class="legend-columns">
                <div class="col-legend-1">
                    <p><span>1. </span>SETUJU</p>
                    <p><span>2. </span>JADWALKAN</p>
                    <p><span>3. </span>BANTU</p>
                    <p><span>4. </span>BALAS</p>
                    <p><span>5. </span>CATAT</p>
                    <p><span>6. </span>HADIR/TIDAK</p>
                    <p><span>7. </span>WALILI</p>
                </div>
                <div class="col-legend-2">
                    <p><span>8. </span>PELAJARI</p>
                    <p><span>9. </span>SARAN</p>
                    <p><span>10.</span> TINDAK LANJUTI</p>
                    <p><span>11.</span> SEBAGAI BAHAN</p>
                    <p><span>12.</span> SIAPKAN</p>
                    <p><span>13.</span> UMP / UDK /UDL</p>
                    <p><span>14.</span> LANJUTKAN</p>
                </div>
                <div class="col-legend-3">
                    <p><span>15.</span> DUKUNG</p>
                    <p><span>16.</span> MONITOR PERKEMBANGANNYA</p>
                    <p><span>17.</span> LAPORKAN HASILNYA</p>
                    <p><span>18.</span> TERUSKAN KE SATWAH</p>
                    <p><span>19.</span> PEDOMANI JUK</p>
                    <p><span>20.</span> SELESAIKAN</p>
                    <p><span>21.</span> ARSIP</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
