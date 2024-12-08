<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomingLetter extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'major_id',
        'no_agenda',
        'tgl_terima',
        'no_surat',
        'tgl_surat',
        'dari',
        'perihal',
        'status',
        'keterangan',
        'file'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sender()
    {
        return $this->belongsTo(Major::class, 'dari', 'id');
    }
}
