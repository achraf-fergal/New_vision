import { useEffect, useState } from 'react';
import { User, Camera, Save, X, Edit2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useTranslation } from 'react-i18next';

function InformationsPersonnelles({ Admin }) {
    const { t, i18n } = useTranslation();

    const { data, setData, post, errors, processing, reset } = useForm({
        id: Admin.id,
        matricule: Admin.matricule,
        nom: Admin.nom || '',
        prenom: Admin.prenom || '',
        email: Admin.email || '',
        telephone: Admin.telephone || '',
        CIN: Admin.CIN || '',
        password: '',
        password_confirmation: '',
    });

    const [Errors, setErrors] = useState({});

    useEffect(() => {
        setErrors({ ...errors });
    }, [errors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route("gestionnaire.profile"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('Gestionnaire.profile.profile_updated'));
            }
        });
    };


    return (
        <div className="mb-6 bg-white shadow sm:rounded-lg sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{t('Gestionnaire.profile.info_title')} - #{Admin.role.toUpperCase()}</h2>
            </div>
            <div className={`grid md:grid-cols-2 gap-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div>
                    <InputLabel htmlFor="matricule" value={t('Gestionnaire.profile.matricule')} />
                    <TextInput
                        disabled
                        id="matricule"
                        name="matricule"
                        value={data.matricule}
                        className="mt-1 block w-full cursor-not-allowed"
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="nom" value={t('Gestionnaire.profile.lastname')} />
                    <TextInput
                        id="nom"
                        name="nom"
                        placeholder={t('Gestionnaire.profile.enter_lastname')}
                        value={data.nom}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        Errors.nom && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={Errors.nom} className="mt-2" />
                            </div>
                        )
                    }
                </div>

                <div>
                    <InputLabel htmlFor="prenom" value={t('Gestionnaire.profile.firstname')} />
                    <TextInput
                        id="prenom"
                        name="prenom"
                        placeholder={t('Gestionnaire.profile.enter_firstname')}
                        value={data.prenom}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        Errors.prenom && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={Errors.prenom} className="mt-2" />
                            </div>
                        )
                    }
                </div>

                <div>
                    <InputLabel htmlFor="cin" value={t('Gestionnaire.profile.cin')} />
                    <TextInput
                        id="cin"
                        name="CIN"
                        placeholder={t('Gestionnaire.profile.enter_cin')}
                        value={data.CIN}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        Errors.CIN && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={Errors.CIN} className="mt-2" />
                            </div>
                        )
                    }
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('Gestionnaire.profile.email')} />
                    <TextInput
                        id="email"
                        name="email"
                        placeholder={t('Gestionnaire.profile.enter_email')}
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        (Errors.EmailExists || Errors.email) && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={Errors.EmailExists} className="mt-2" />
                                <InputError message={Errors.email} className="mt-2" />
                            </div>
                        )
                    }
                </div>

                <div>
                    <InputLabel htmlFor="telephone" value={t('Gestionnaire.profile.telephone')} />
                    <TextInput
                        id="telephone"
                        name="telephone"
                        placeholder={t('Gestionnaire.profile.enter_telephone')}
                        value={data.telephone}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        (Errors.telephone) && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={Errors.telephone} className="mt-2" />
                            </div>
                        )
                    }
                </div>
            </div>
            {
                (data.nom !== Admin.nom || data.prenom !== Admin.prenom || data.email !== Admin.email || data.telephone !== Admin.telephone) && (
                    <div className={`flex ${i18n.language === 'ar' ? 'justify-start' : 'justify-end'} gap-2`}>
                        <button
                            onClick={() => {
                                reset();
                                setErrors({});
                            }}
                            className="px-6 py-2 mt-4 rounded-lg transition duration-300 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2">
                            <X size={20} />
                            {t('cancel')}
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 mt-4 bg-black text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                            <Save size={20} />
                            {t('save')}
                        </button>
                    </div>
                )
            }
            <Toaster />
        </div>
    );
}

export default InformationsPersonnelles;
