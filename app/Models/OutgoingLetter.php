<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutgoingLetter extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'major_id',
        'letter_type_id',
        'no_surat',
        'tgl_surat',
        'kepada',
        'perihal',
        'file',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function recipient()
    {
        return $this->belongsTo(Major::class, 'kepada', 'id');
    }
}
