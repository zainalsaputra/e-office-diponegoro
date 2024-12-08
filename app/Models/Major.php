<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'type', 'shortname', 'faculty'];

    public function users()
    {
        return $this->hasMany(User::class);
    }


    // old
    // public function letterTypes()
    // {
    //     return $this->hasMany(LetterType::class);
    // }
    
    public function letterTypes()
    {
        return $this->hasMany(LetterType::class);
    }
}
