import { useEffect, useState } from 'react';
import { User, Camera, Save, X, Edit2, Edit } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

function InformationsPersonnelles({ user }) {

    const { data, setData, post, errors, processing, reset } = useForm({
        id: user.id,
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        telephone: user.telephone || '',
        bio: user.bio || '',
        filiere: user.filiere || '',
        promotion: user.promotion || '',
        etablissement: user.etablissement || '',
        employeur: user.employeur || '',
        fonction: user.fonction || '',
        password: '',
        password_confirmation: '',
    })

    const [isEdit, setIsEdit] = useState(false)
    const [detecteChange, setdetecteChange] = useState(false)

    console.log(user);

    const [Errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({ ...errors })
    }, [errors])

    useEffect(() => {
        setdetecteChange(
            (data.nom !== user.nom) ||
            (data.prenom !== user.prenom) ||
            (data.email !== user.email) ||
            (data.telephone !== user.telephone) ||
            (data.filiere !== user.filiere) ||
            (data.bio !== (user.bio ? user.bio : '')) ||
            (data.promotion !== user.promotion) ||
            (data.etablissement !== user.etablissement) ||
            (data.employeur !== (user.employeur ? user.employeur : '')) ||
            (data.fonction !== (user.fonction ? user.fonction : ''))
        )
    }, [data])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (detecteChange) {
            post(route("laureat.profile.update"), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Votre Informations Personnelles a été mis à jour avec Succès');
                    setIsEdit(false)

                }
            });
        }
        else {
            setIsEdit(false);
        }
    }


    const handleEdit = () => {
        if (!isEdit) {
            setIsEdit(true)
        }

        if (isEdit)
            if (detecteChange) {
                confirm('Are you sure you want cancel your changes?') && setData({ ...user, fonction: user.fonction ? user.fonction : '', employeur: user.employeur ? user.employeur : '' }) && setIsEdit(false)
            }
            else {
                setIsEdit(false)
            }
    }



    return (
        <div className="mb-6 bg-white shadow sm:rounded-lg sm:p-8">


            <div className='flex flex-row justify-between'>
                <h2 className="text-xl font-semibold mb-6">Informations Personnelles : </h2>

                {
                    !isEdit &&
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={handleEdit}
                            className=" px-6 py-4 bg-black text-white rounded-lg hover:opacity-90 flex items-center gap-2 h-2/3 w-full ">
                            <Edit size={20} />
                            Modifier Votre Information
                        </button>
                    </div>
                }
                {
                    isEdit &&
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 h-2/3 w-full ">
                            <Edit size={20} />
                            Enregistrer
                        </button>
                        <button
                            onClick={handleEdit}
                            className=" px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 h-2/3 w-full ">
                            <Edit size={20} />
                            Annuler
                        </button>
                    </div>
                }

            </div>

            <div className='my-4' >
                <InputLabel htmlFor="bio" value="bio" />
                <TextInput
                    id="bio"
                    name="bio"
                    placeholder="Entrer votre bio"
                    value={data.bio}
                    className="mt-1 block w-full"
                    onChange={handleChange}
                    disabled={!isEdit}
                    maxLength={155}
                />
                {
                    data.bio.length >= 155 && <p className='text-red-600'>Le bio ne doit pas dépasser 155 caractères</p>
                }
                {
                    Errors.nom && (
                        <div className="mt-2" >
                            <CgDanger className="text-base text-red-600 inline " />
                            <InputError message={Errors.nom} className="mt-2" />
                        </div>
                    )
                }
            </div>
            <div className="grid md:grid-cols-2 gap-6">


                <div>
                    <InputLabel htmlFor="nom" value="Nom" />
                    <TextInput
                        id="nom"
                        name="nom"
                        placeholder="Entrer votre nom"
                        value={data.nom}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
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
                        disabled={!isEdit}

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
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        name="email"
                        placeholder="Entrer votre email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
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
                    <InputLabel htmlFor="telephone" value="Telephone" />
                    <TextInput
                        id="telephone"
                        name="telephone"
                        placeholder="Entrer votre telephone"
                        value={data.telephone}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}

                    />
                    {
                        (Errors.telephone) && (
                            <div className="mt-2" >
                                <CgDanger className="text-base text-red-600 inline " />
                                <InputError message={Errors.telephone} className="mt-2" />
                            </div>
                        )
                    }
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 mt-10">Informations Academiques : </h2>
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <InputLabel htmlFor="etablissement" value="Etablissement" />
                    <TextInput
                        id="etablissement"
                        name="etablissement"
                        placeholder="Entrer votre etablissement"
                        value={data.etablissement}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}

                    />
                    {
                        (Errors.etablissement) && (
                            <div className="mt-2" >
                                <CgDanger className="text-base text-red-600 inline " />
                                <InputError message={Errors.etablissement} className="mt-2" />
                            </div>
                        )
                    }
                </div>
                <div>
                    <InputLabel htmlFor="filiere" value="Filiere" />
                    <TextInput
                        id="filiere"
                        name="filiere"
                        placeholder="Entrer votre filiere"
                        value={data.filiere}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}

                    />
                    {
                        (Errors.filiere) && (
                            <div className="mt-2" >
                                <CgDanger className="text-base text-red-600 inline " />
                                <InputError message={Errors.filiere} className="mt-2" />
                            </div>
                        )
                    }
                </div>
                <div>
                    <InputLabel htmlFor="promotion" value="Promotion" />
                    <TextInput
                        id="promotion"
                        name="promotion"
                        placeholder="Entrer votre promotion"
                        value={data.promotion}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}

                    />
                    {
                        (Errors.promotion) && (
                            <div className="mt-2" >
                                <CgDanger className="text-base text-red-600 inline " />
                                <InputError message={Errors.promotion} className="mt-2" />
                            </div>
                        )
                    }
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-6 mt-10">Informations Professionnelle : </h2>
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <InputLabel htmlFor="employeur" value="Employeur" />
                    <TextInput
                        id="employeur"
                        name="employeur"
                        placeholder="Entrer votre employeur"
                        value={data.employeur}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}

                    />
                    {
                        (Errors.employeur) && (
                            <div className="mt-2" >
                                <CgDanger className="text-base text-red-600 inline " />
                                <InputError message={Errors.employeur} className="mt-2" />
                            </div>
                        )
                    }
                </div>
                <div>
                    <InputLabel htmlFor="fonction" value="Fonction" />
                    <TextInput
                        id="fonction"
                        name="fonction"
                        placeholder="Entrer votre fonction"
                        value={data.fonction}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}

                    />
                    {
                        (Errors.fonction) && (
                            <div className="mt-2" >
                                <CgDanger className="text-base text-red-600 inline " />
                                <InputError message={Errors.fonction} className="mt-2" />
                            </div>
                        )
                    }
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default InformationsPersonnelles;

