import { useEffect, useState } from 'react';
import { User, Camera, Save, X, Edit2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import Dashboard from '@/Layouts/DashboardGestionnaireLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

function InformationsPersonnelles({ Admin }) {

    const { data, setData, post, errors, processing, reset } = useForm({
        id: Admin.id,
        matricule: Admin.matricule,
        nom: Admin.nom || '',
        prenom: Admin.prenom || '',
        email: Admin.email || '',
        password: '',
        password_confirmation: '',
    })


    const [Errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({ ...errors })
    }, [errors])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route("gestionnaire.profile"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Votre Informations Personnelles a été mis à jour avec succès')
            }
        });
    }





    return (
            <div className="mb-6 bg-white shadow sm:rounded-lg sm:p-8">
                <h2 className="text-xl font-semibold mb-6">Informations Personnelles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="matricule" value="Matricule" />
                        <TextInput
                            disabled
                            id="matricule"
                            name="matricule"
                            value={data.matricule}
                            className="mt-1 block w-full cursor-not-allowed "
                        />

                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            placeholder="Entrer votre email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={handleChange}
                        />
                        {
                            (Errors.EmailExists || Errors.email) && (
                                <div className="mt-2" >
                                    <CgDanger className="text-base text-red-600 inline " />
                                    <InputError message={Errors.EmailExists} className="mt-2" />
                                    <InputError message={Errors.email} className="mt-2" />
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <InputLabel htmlFor="nom" value="Nom" />
                        <TextInput
                            id="nom"
                            name="nom"
                            placeholder="Entrer votre nom"
                            value={data.nom}
                            className="mt-1 block w-full"
                            onChange={handleChange}
                        />
                        {
                            Errors.nom && (
                                <div className="mt-2" >
                                    <CgDanger className="text-base text-red-600 inline " />
                                    <InputError message={Errors.nom} className="mt-2" />
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <InputLabel htmlFor="prenom" value="Prenom" />
                        <TextInput
                            id="prenom"
                            name="prenom"
                            placeholder="Entrer votre prenom"
                            value={data.prenom}
                            className="mt-1 block w-full"
                            onChange={handleChange}
                        />
                        {
                            Errors.prenom && (
                                <div className="mt-2" >
                                    <CgDanger className="text-base text-red-600 inline " />
                                    <InputError message={Errors.prenom} className="mt-2" />
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    (data.nom !== Admin.nom || data.prenom !== Admin.prenom || data.email !== Admin.email) && (
                        <>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        reset();
                                        setErrors({});
                                    }}
                                    className=" px-6 py-2 mt-4 rounded-lg transition duration-300 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2">
                                    <X size={20} />
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 mt-4 bg-black text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                                    <Save size={20} />
                                    Enregistrer
                                </button>
                            </div>
                        </>
                    )
                }
                <Toaster />
            </div>
    )
}

export default InformationsPersonnelles;

