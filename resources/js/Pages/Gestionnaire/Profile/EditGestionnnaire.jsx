// import { useEffect, useState } from 'react';
// import { User, Camera, Save, X, Edit2 } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import { CgDanger } from 'react-icons/cg';
// import { useForm } from '@inertiajs/react';
// import Dashboard from '@/Layouts/DashboardGestionnaireLayout';
// import InputLabel from '@/Components/InputLabel';
// import TextInput from '@/Components/TextInput';
// import InputError from '@/Components/InputError';

// function EditProfile({ Admin }) {

//     const { data, setData, post, errors, processing, reset } = useForm({
//         id: Admin.id,
//         matricule: Admin.matricule,
//         nom: Admin.nom || '',
//         prenom: Admin.prenom || '',
//         email: Admin.email || '',
//         password: '',
//         password_confirmation: '',
//         imageSRC: Admin.imageSRC || null
//     })

//     const [image, setImage] = useState(data.imageSRC);

//     console.log(Admin);

//     const [Errors, setErrors] = useState({})

//     useEffect(() => {
//         setErrors({ ...errors })
//     }, [errors])


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: value
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         post(route("gestionnaire.profile",{
//             ...data,deleteImage:true
//         }), {
//             preserveScroll: true,
//             onSuccess: () => {
//                 toast.success('Votre Informations Personnelles a été mis à jour avec succès'),
//                 setData({
//                     ...data,
//                     imageSRC:null
//                 })
//             }
//         });
//     }

//     const handleChangePhoto=(e)=>{
//         const file = e.target.files[0];

//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImage(reader.result);
//             };
//             reader.readAsDataURL(file);

//             setData({
//                 ...data,
//                 imageSRC: file
//             })
//         }

//     }




//     return (
//         <div className="min-h-screen bg-gray-100 pb-8 px-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800 dark:text-white"> Modifier Votre Profil </h1>
//                         <p className="text-gray-600 dark:text-gray-300 mt-2">
//                             Vous pouvez modifier votre profil ici.
//                         </p>
//                     </div>
//                 </div>

//                 <div className=" py-8 ">

//                     <div className="mb-6 bg-white shadow sm:rounded-lg sm:p-8">
//                         <h2 className="text-xl font-semibold mb-4">Photo de profil</h2>
//                         <div className="flex items-center gap-6">
//                             <div className="relative">
//                                 {
//                                     image ?
//                                         <img
//                                             src={"/storage/" + image}
//                                             alt={data.nom + " " + data.prenom}
//                                             className="w-28 h-28 rounded-full border-2 border-gray-400"
//                                         />
//                                         :
//                                         <div
//                                             className="w-28 h-28 rounded-full border-2 border-gray-400 flex justify-center items-center">
//                                             <User className="h-16 w-16 text-gray-400 " />
//                                         </div>
//                                 }

//                             </div>
//                             <div className="flex gap-4">
//                                 {data.imageSRC &&
//                                     <button
//                                         onClick={handleSubmit}
//                                         className="px-4 py-2 text-sm font-semibold border border-red-500 rounded-lg hover:bg-red-600 hover:text-white">
//                                         Supprimer
//                                     </button>
//                                 }
//                                 <label
//                                     className=" px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-950 cursor-pointer ">
//                                     {processing ? "Changer la photo" : "Upload Photo"}
//                                     <input
//                                         type="file"
//                                         className="hidden"
//                                         accept="image/*"
//                                     // onChange={handleImageChange}
//                                     />
//                                 </label>
//                             </div>


//                         </div>


//                     </div>

//                     <div className="bg-white shadow sm:rounded-lg sm:p-8">
//                         <h2 className="text-xl font-semibold mb-6">Informations Personnelles</h2>
//                         <div className="grid md:grid-cols-2 gap-6">
//                             <div>
//                                 <InputLabel htmlFor="matricule" value="Matricule" />
//                                 <TextInput
//                                     disabled
//                                     id="matricule"
//                                     name="matricule"
//                                     value={data.matricule}
//                                     className="mt-1 block w-full cursor-not-allowed "
//                                 />

//                             </div>

//                             <div>
//                                 <InputLabel htmlFor="email" value="Email" />
//                                 <TextInput
//                                     id="email"
//                                     name="email"
//                                     placeholder="Entrer votre email"
//                                     value={data.email}
//                                     className="mt-1 block w-full"
//                                     onChange={handleChange}
//                                 />
//                                 {
//                                     (Errors.EmailExists || Errors.email) && (
//                                         <div className="mt-2" >
//                                             <CgDanger className="text-base text-red-600 inline " />
//                                             <InputError message={Errors.EmailExists} className="mt-2" />
//                                             <InputError message={Errors.email} className="mt-2" />
//                                         </div>
//                                     )
//                                 }
//                             </div>

//                             <div>
//                                 <InputLabel htmlFor="nom" value="Nom" />
//                                 <TextInput
//                                     id="nom"
//                                     name="nom"
//                                     placeholder="Entrer votre nom"
//                                     value={data.nom}
//                                     className="mt-1 block w-full"
//                                     onChange={handleChange}
//                                 />
//                                 {
//                                     Errors.nom && (
//                                         <div className="mt-2" >
//                                             <CgDanger className="text-base text-red-600 inline " />
//                                             <InputError message={Errors.nom} className="mt-2" />
//                                         </div>
//                                     )
//                                 }
//                             </div>

//                             <div>
//                                 <InputLabel htmlFor="prenom" value="Prenom" />
//                                 <TextInput
//                                     id="prenom"
//                                     name="prenom"
//                                     placeholder="Entrer votre prenom"
//                                     value={data.prenom}
//                                     className="mt-1 block w-full"
//                                     onChange={handleChange}
//                                 />
//                                 {
//                                     Errors.prenom && (
//                                         <div className="mt-2" >
//                                             <CgDanger className="text-base text-red-600 inline " />
//                                             <InputError message={Errors.prenom} className="mt-2" />
//                                         </div>
//                                     )
//                                 }
//                             </div>
//                         </div>
//                         {
//                             (data.nom !== Admin.nom || data.prenom !== Admin.prenom || data.email !== Admin.email) && (
//                                 <>
//                                     <div className="flex justify-end gap-2">
//                                         <button
//                                             onClick={() => {
//                                                 reset();
//                                                 setErrors({});
//                                             }}
//                                             className=" px-6 py-2 mt-4 rounded-lg transition duration-300 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2">
//                                             <X size={20} />
//                                             Annuler
//                                         </button>
//                                         <button
//                                             onClick={handleSubmit}
//                                             className="px-6 py-2 mt-4 bg-black text-white rounded-lg hover:opacity-90 flex items-center gap-2">
//                                             <Save size={20} />
//                                             Enregistrer
//                                         </button>
//                                     </div>
//                                 </>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
//             <Toaster />
//         </div>);
// }



// EditProfile.layout = page => <Dashboard children={page} title={"profile"} />


// export default EditProfile

import { useEffect, useState } from 'react';
import { User, Camera, Save, X, Edit2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import Dashboard from '@/Layouts/DashboardGestionnaireLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InformationsPersonnelles from './Forms.jsx/UpdateProfileInformation';
import PhotoProfile from './Forms.jsx/UpdatePhotoProfile';
import UpdatePassword from './Forms.jsx/UpdatePassword';

function EditProfile({ Admin }) {

    return (
        <div className="min-h-screen bg-gray-100 pb-8 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white"> Modifier Votre Profil </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Vous pouvez modifier votre profil ici.
                        </p>
                    </div>
                </div>
                <div className=" py-8 ">
                    <PhotoProfile Admin={Admin} />
                    <InformationsPersonnelles Admin={Admin} />
                    <UpdatePassword Admin={Admin} />
                </div>
            </div>
            <Toaster />
        </div>
    );
}



EditProfile.layout = page => <Dashboard children={page} title={"profile"} />


export default EditProfile

