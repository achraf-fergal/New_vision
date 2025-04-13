<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared(
            <<<SQL
                CREATE TRIGGER before_laureat_blocked
                BEFORE DELETE ON laureats
                FOR EACH ROW
                BEGIN
                    IF (old.valide=1) THEN
                    DELETE FROM Avis WHERE laureat_id = old.id;
                    INSERT INTO blockedlaureats (nom, prenom, email , password, telephone, imageSRC, promotion, filiere, etablissement, fonction, employeur, valide)
                    VALUES (old.nom , old.prenom , old.email , old.password, old.telephone , old.imageSRC , old.promotion , old.filiere , old.etablissement , old.fonction , old.employeur , old.valide);
                    END IF;
                END
            SQL
        );


        DB::unprepared(
            <<<SQL
                CREATE TRIGGER before_laureat_unblocked
                BEFORE DELETE ON blockedlaureats
                FOR EACH ROW
                BEGIN
                    INSERT INTO laureats (nom, prenom, email , password, telephone, imageSRC, promotion, filiere, etablissement, fonction, employeur, valide)
                    VALUES (old.nom , old.prenom , old.email , old.password, old.telephone , old.imageSRC , old.promotion , old.filiere , old.etablissement , old.fonction , old.employeur , old.valide);
                END
            SQL
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS before_laureat_blocked;
            SQL
        );


        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS before_laureat_unblocked;
            SQL
        );
    }
};
