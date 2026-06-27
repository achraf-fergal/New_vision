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
                DROP PROCEDURE IF EXISTS update_souvenir;
            SQL
        );

        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_comment_insert;
            SQL
        );

        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_comment_delete;
            SQL
        );
        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_user_delete;
            SQL
        );


        DB::unprepared(
            <<<SQL
                CREATE PROCEDURE update_souvenir(IN souvenir_id_v INT)
                BEGIN
                    UPDATE souvenirs
                    SET
                        comments_count = (SELECT COUNT(*) FROM comments WHERE souvenir_id = souvenir_id_v)
                    WHERE id = souvenir_id_v ;
                END
            SQL
        );



        DB::unprepared(
            <<<SQL
                CREATE TRIGGER after_comment_insert
                AFTER INSERT ON comments
                FOR EACH ROW
                BEGIN
                    CALL update_souvenir(NEW.souvenir_id);
                END
            SQL
        );

        DB::unprepared(
            <<<SQL
                CREATE TRIGGER after_comment_delete
                AFTER DELETE ON comments
                FOR EACH ROW
                BEGIN
                    CALL update_souvenir(OLD.souvenir_id);
                END
            SQL
        );

        DB::unprepared(
            <<<SQL
                CREATE TRIGGER after_user_delete
                Before DELETE ON users
                FOR EACH ROW
                BEGIN
                    DELETE FROM comments WHERE user_id = OLD.id;
                    DELETE FROM avis WHERE user_id = OLD.id;
                    DELETE FROM souvenirs WHERE user_id = OLD.id;
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
                DROP PROCEDURE IF EXISTS update_souvenir;
            SQL
        );

        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_comment_insert;
            SQL
        );

        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_comment_delete;
            SQL
        );
        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_avis_helpful;
            SQL
        );
        DB::unprepared(
            <<<SQL
                DROP TRIGGER IF EXISTS after_user_delete;
            SQL
        );
    }
};
