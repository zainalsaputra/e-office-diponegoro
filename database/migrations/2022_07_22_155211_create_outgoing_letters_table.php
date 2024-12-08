<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutgoingLettersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outgoing_letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('major_id')->references('id')->on('majors');
            $table->foreignId('letter_type_id')->references('id')->on('letter_types');
            $table->string('no_surat');
            $table->date('tgl_surat');
            $table->integer('kepada');
            $table->text('perihal');
            $table->text('file');
            $table->enum('status', ['dikirim', 'diterima', 'diproses', 'dikembalikan'])->default('dikirim');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('outgoing_letters');
    }
}
