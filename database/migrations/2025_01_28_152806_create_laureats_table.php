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
        Schema::create('laureats', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email');
            $table->string('password');
            $table->string('telephone');
            $table->string('imageSRC')->nullable(true);
            $table->string('bio')->nullable(true);
            $table->year('promotion');
            $table->string('filiere');
            $table->string('etablissement');
            $table->string('fonction')->nullable(true);
            $table->string('employeur')->nullable(true);
            $table->boolean('valide')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laureats');
    }
};
