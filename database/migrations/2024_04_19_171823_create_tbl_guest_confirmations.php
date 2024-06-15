<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_guest_confirmations', function (Blueprint $table) {
            $table->Increments('confirmation_id');
            $table->string('your_name');
            $table->string('attendance_status');
            $table->string('relationship_to_couple');
            $table->string('party_size');
            $table->text('message_to_couple');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_guest_confirmations');
    }
};
