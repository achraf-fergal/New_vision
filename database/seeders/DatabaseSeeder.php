<?php

// namespace Database\Seeders;

// use App\Models\Avis;
// use App\Models\blockedlaureat;
// use App\Models\Comment;
// use App\Models\Gestionnaire;
// use App\Models\laureat;
// use App\Models\souvenir;
// use App\Models\User;
// // use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\Hash;

// class DatabaseSeeder extends Seeder
// {
//     /**
//      * Seed the application's database.
//      */
//     public function run(): void
//     {
//         // User::factory(10)->create();

//         // User::factory()->create([
//         //     'name' => 'Test User',
//         //     'email' => 'test@example.com',
//         // ]);

//         User::create([
//             'nom' => 'Antar',
//             'prenom' => 'Anass',
//             'email' => 'antaranass2004@gmail.com',
//             'password' => Hash::make('password'),
//             'telephone' => '0628147444',
//             'imageSRC' => null ,
//             'bio' => null,
//             'promotion' => 2024,
//             'filiere' => 'developpement_digital',
//             'etablissement' => 'ISTA HH1',
//             'fonction' => 'developpeur',
//             'employeur' => 'Smart Academy',
//             'valide' => true,
//             'is_blocked' => false,
//         ]);

//         Gestionnaire::create([
//             'matricule' => 1,
//             'nom' => 'Antar',
//             'prenom' => 'Anass',
//             'email' =>  'admin@gmail.com',
//             'telephone' =>  '0628147444',
//             'password' => Hash::make('password'),
//             'CIN' => 'BF100000',
//             'role' => 'superadmin',
//             'imageSRC' => null,
//         ]);

//         // laureat::factory(10)->create();
//         // Avis::factory(12)->create();
//         // Gestionnaire::factory(5)->create();
//         // souvenir::factory(20)->create();
//         // blockedlaureat::factory(10)->create();
//         // Comment::factory(10)->create();

//     }
// }

// <?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\LaureatActivity;
use App\Models\Souvenir;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->seedUsers();
        $this->call(GestionnaireSeeder::class);
        $this->seedSouvenirs();
        $this->seedComments();
        $this->seedLaureatActivities();
    }

    /**
     * Seed users table with 20 users.
     */
    private function seedUsers(): void
    {
        $userImages = [
            'https://randomuser.me/api/portraits/men/1.jpg',
            'https://randomuser.me/api/portraits/women/1.jpg',
            'https://randomuser.me/api/portraits/men/2.jpg',
            'https://randomuser.me/api/portraits/women/2.jpg',
            'https://randomuser.me/api/portraits/men/3.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/4.jpg',
            'https://randomuser.me/api/portraits/women/4.jpg',
            'https://randomuser.me/api/portraits/men/5.jpg',
            'https://randomuser.me/api/portraits/women/5.jpg',
            'https://randomuser.me/api/portraits/men/6.jpg',
            'https://randomuser.me/api/portraits/women/6.jpg',
            'https://randomuser.me/api/portraits/men/7.jpg',
            'https://randomuser.me/api/portraits/women/7.jpg',
            'https://randomuser.me/api/portraits/men/8.jpg',
            'https://randomuser.me/api/portraits/women/8.jpg',
            'https://randomuser.me/api/portraits/men/9.jpg',
            'https://randomuser.me/api/portraits/women/9.jpg',
            'https://randomuser.me/api/portraits/men/10.jpg',
            'https://randomuser.me/api/portraits/women/10.jpg',
        ];

        $filieres = [
            'developpement_digital',
            'reseaux_informatique',
            'gestion_entreprise',
            'commerce_vente',
            'comptabilite',
            'hotellerie_tourisme',
            'batiment_travaux_publics',
            'mecanique_auto',
            'electricite_batiment',
            'electronique_industrielle',
            'maintenance_industrielle',
            'soudage_chaudronnerie',
            'agriculture',
            'audiovisuel_multimedia',
            'arts_graphiques_imprimerie',
            'sante_social',
            'logistique_transport',
        ];

        $etablissements = ['ENSA', 'EST', 'ENCG', 'FST', 'FS', 'FSJES', 'FP', 'ENS'];
        $fonctions = ['Développeur', 'Ingénieur', 'Chef de projet', 'Consultant', 'Analyste', 'Designer', 'Technicien', 'Directeur', null];
        $employeurs = ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple', 'IBM', 'Oracle', 'SAP', 'Capgemini', null];

        $users = [];

        for ($i = 0; $i < 20; $i++) {
            // Download the image and store it locally
            $imageUrl = $userImages[$i];
            $imageContents = file_get_contents($imageUrl);
            $imageName = 'users/user_'.($i + 1).'_'.time().'.jpg';
            Storage::disk('public')->put($imageName, $imageContents);

            // Create the user
            $users[] = [
                'nom' => 'Nom'.($i + 1),
                'prenom' => 'Prenom'.($i + 1),
                'email' => 'user'.($i + 1).'@example.com',
                'password' => Hash::make('password'),
                'telephone' => '06'.str_pad(rand(1000000, 9999999), 7, '0', STR_PAD_LEFT),
                'imageSRC' => $imageName,
                'bio' => 'Bio de l\'utilisateur '.($i + 1).'. Diplômé et passionné par son domaine.',
                'promotion' => rand(2010, 2023),
                'filiere' => $filieres[array_rand($filieres)],
                'etablissement' => $etablissements[array_rand($etablissements)],
                'fonction' => $fonctions[array_rand($fonctions)],
                'employeur' => $employeurs[array_rand($employeurs)],
                'valide' => rand(0, 1),
                'is_blocked' => 0,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert all users at once
        User::insert($users);
        echo "20 users created successfully!\n";
    }

    /**
     * Seed souvenirs table with 40 memories.
     */
    private function seedSouvenirs(): void
    {

        $filieres = [
            'developpement_digital',
            'reseaux_informatique',
            'gestion_entreprise',
            'commerce_vente',
            'comptabilite',
            'hotellerie_tourisme',
            'batiment_travaux_publics',
            'mecanique_auto',
            'electricite_batiment',
            'electronique_industrielle',
            'maintenance_industrielle',
            'soudage_chaudronnerie',
            'agriculture',
            'audiovisuel_multimedia',
            'arts_graphiques_imprimerie',
            'sante_social',
            'logistique_transport',
        ];

        $souvenirImages = [
            'https://source.unsplash.com/800x600/?graduation',
            'https://source.unsplash.com/800x600/?university',
            'https://source.unsplash.com/800x600/?students',
            'https://source.unsplash.com/800x600/?campus',
            'https://source.unsplash.com/800x600/?education',
            'https://source.unsplash.com/800x600/?library',
            'https://source.unsplash.com/800x600/?classroom',
            'https://source.unsplash.com/800x600/?lecture',
            'https://source.unsplash.com/800x600/?study',
            'https://source.unsplash.com/800x600/?college',
            'https://source.unsplash.com/800x600/?alumni',
            'https://source.unsplash.com/800x600/?celebration',
            'https://source.unsplash.com/800x600/?engineering',
            'https://source.unsplash.com/800x600/?business',
            'https://source.unsplash.com/800x600/?science',
            'https://source.unsplash.com/800x600/?mathematics',
            'https://source.unsplash.com/800x600/?computer',
            'https://source.unsplash.com/800x600/?laboratory',
            'https://source.unsplash.com/800x600/?project',
            'https://source.unsplash.com/800x600/?teamwork',
            'https://source.unsplash.com/800x600/?workshop',
            'https://source.unsplash.com/800x600/?seminar',
            'https://source.unsplash.com/800x600/?conference',
            'https://source.unsplash.com/800x600/?research',
            'https://source.unsplash.com/800x600/?internship',
            'https://source.unsplash.com/800x600/?exchange',
            'https://source.unsplash.com/800x600/?dormitory',
            'https://source.unsplash.com/800x600/?friends',
            'https://source.unsplash.com/800x600/?party',
            'https://source.unsplash.com/800x600/?trip',
            'https://source.unsplash.com/800x600/?club',
            'https://source.unsplash.com/800x600/?sport',
            'https://source.unsplash.com/800x600/?award',
            'https://source.unsplash.com/800x600/?diploma',
            'https://source.unsplash.com/800x600/?certificate',
            'https://source.unsplash.com/800x600/?presentation',
            'https://source.unsplash.com/800x600/?thesis',
            'https://source.unsplash.com/800x600/?exam',
            'https://source.unsplash.com/800x600/?professor',
            'https://source.unsplash.com/800x600/?books',
        ];

        $categories = $filieres;
        $contenusSouvenirs = [
            'Un souvenir inoubliable de mes années d\'études.',
            'Moment de partage et d\'apprentissage avec mes camarades de promotion.',
            'Ce jour-là, j\'ai compris que j\'avais choisi la bonne voie professionnelle.',
            'Une journée qui a changé ma vision de mon métier.',
            'La remise des diplômes, un moment fort en émotions !',
            'Projet de fin d\'études : la consécration de tant d\'efforts.',
            'Stage qui m\'a ouvert les portes de mon premier emploi.',
            'Conférence inspirante qui a orienté mon parcours professionnel.',
            'Visite d\'entreprise qui m\'a fait découvrir mon futur employeur.',
            'Collaboration enrichissante avec des professionnels du secteur.',
            'Cérémonie de remise des prix pour l\'excellence académique.',
            'Séminaire international avec des étudiants du monde entier.',
            'Voyage d\'études qui a élargi mes horizons.',
            'Participation à un concours national d\'innovation.',
            'Journée d\'intégration avec ma nouvelle promotion.',
            'Première présentation devant un jury professionnel.',
            'Formation complémentaire qui a valorisé mon CV.',
            'Rencontre avec un mentor qui m\'a guidé dans mes choix.',
            'Développement d\'un projet entrepreneurial entre étudiants.',
            'Expérience de volontariat qui m\'a enrichi personnellement.',
        ];

        $souvenirs = [];
        $userIds = User::pluck('id')->toArray();

        for ($i = 0; $i < 40; $i++) {
            // Download the image and store it locally
            $imageUrl = $souvenirImages[$i];
            // $imageContents = file_get_contents($imageUrl);
            // $imageName = 'souvenirs/souvenir_' . ($i + 1) . '_' . time() . '.jpg';
            // Storage::disk('public')->put($imageName, $imageContents);

            // Generate random statistics for engagement
            $likesCount = rand(0, 100);
            $savesCount = rand(0, 50);
            $commentsCount = rand(0, 30);
            $sharesCount = rand(0, 20);

            // Create the souvenir
            $souvenirs[] = [
                'photo' => null,
                'content' => $contenusSouvenirs[array_rand($contenusSouvenirs)].' '.Str::random(50),
                'dateSouvenir' => Carbon::now()->subDays(rand(1, 365 * 3))->format('Y-m-d'),
                'user_id' => $userIds[array_rand($userIds)],
                'likes_count' => $likesCount,
                'saves_count' => $savesCount,
                'comments_count' => $commentsCount,
                'shares_count' => $sharesCount,
                'categorie' => $categories[array_rand($categories)],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert all souvenirs at once
        Souvenir::insert($souvenirs);
        echo "40 souvenirs created successfully!\n";
    }

    /**
     * Seed comments table with 40 comments.
     */
    private function seedComments(): void
    {
        $commentContents = [
            'Quel beau souvenir, merci de partager !',
            'Je me souviens de ce jour comme si c\'était hier.',
            'Cette expérience a vraiment été enrichissante pour nous tous.',
            'C\'était une période formidable de nos vies d\'étudiants.',
            'Je suis nostalgique en voyant cette photo.',
            'Que de chemin parcouru depuis ce moment !',
            'Cette promotion était exceptionnelle, n\'est-ce pas ?',
            'Je n\'oublierai jamais ces instants passés ensemble.',
            'Ce projet nous a vraiment soudés en tant qu\'équipe.',
            'C\'est incroyable de voir où nous en sommes maintenant.',
            'J\'aimerais pouvoir revivre ces moments.',
            'Cette expérience a été fondatrice pour ma carrière.',
            'Merci pour ce retour en arrière !',
            'Je reconnais bien l\'ambiance de notre établissement !',
            'Cela me rappelle tellement de bons souvenirs.',
            'On devrait organiser une réunion d\'anciens élèves !',
            'Cette période m\'a appris tant de choses.',
            'Les meilleurs moments de ma formation académique.',
            'Je suis fier d\'avoir fait partie de cette aventure.',
            'Ces années d\'études resteront gravées à jamais.',
        ];

        $comments = [];
        $userIds = User::pluck('id')->toArray();
        $souvenirIds = Souvenir::pluck('id')->toArray();

        for ($i = 0; $i < 40; $i++) {
            $comments[] = [
                'content' => $commentContents[array_rand($commentContents)],
                'souvenir_id' => $souvenirIds[array_rand($souvenirIds)],
                'user_id' => $userIds[array_rand($userIds)],
                'edited' => rand(0, 1),
                'created_at' => now()->subHours(rand(1, 720)),
                'updated_at' => now()->subHours(rand(0, 24)),
            ];
        }

        // Insert all comments at once
        Comment::insert($comments);
        echo "40 comments created successfully!\n";
    }

    /**
     * Seed laureat activities for MongoDB.
     */
    private function seedLaureatActivities(): void
    {
        $userIds = User::pluck('id')->toArray();

        foreach ($userIds as $userId) {
            // Get the number of souvenirs created by this user
            $myPostesCount = Souvenir::where('user_id', $userId)->count();

            // Get the number of comments created by this user
            $myCommentsCount = Comment::where('user_id', $userId)->count();

            // Create random arrays of liked and saved posts
            $likedPosts = Souvenir::inRandomOrder()->limit(rand(0, 10))->pluck('id')->toArray();
            $savedPosts = Souvenir::inRandomOrder()->limit(rand(0, 5))->pluck('id')->toArray();

            // Create random arrays of helpful and reported comments
            $helpfulComments = Comment::inRandomOrder()->limit(rand(0, 8))->pluck('id')->toArray();
            $reportedComments = Comment::inRandomOrder()->limit(rand(0, 3))->pluck('id')->toArray();

            // Create the laureat activity record
            LaureatActivity::create([
                'Laureat_id' => $userId,
                'Liked_Poste' => $likedPosts,
                'saved_Poste' => $savedPosts,
                'Helpful_Avis' => $helpfulComments,
                'Report_Avis' => $reportedComments,
                'Count_SavedPoste' => count($savedPosts),
                'Count_LikedPoste' => count($likedPosts),
                'MyPostes_Count' => $myPostesCount,
                'MyComments_Count' => $myCommentsCount,
            ]);
        }

        echo "Laureat activities created successfully for all users!\n";
    }
}
