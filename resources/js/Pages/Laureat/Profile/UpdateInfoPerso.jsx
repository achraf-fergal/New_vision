import { useEffect, useState } from 'react';
import { User, Edit, X, Save } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';

const InformationsPersonnelles = ({ user }) => {
    const { t, i18n } = useTranslation();
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
    });

    const [isEdit, setIsEdit] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(
            data.nom !== user.nom ||
            data.prenom !== user.prenom ||
            data.email !== user.email ||
            data.telephone !== user.telephone ||
            data.filiere !== user.filiere ||
            data.bio !== (user.bio || '') ||
            data.promotion !== user.promotion ||
            data.etablissement !== user.etablissement ||
            data.employeur !== (user.employeur || '') ||
            data.fonction !== (user.fonction || '')
        );
    }, [data, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (hasChanges) {
            post(route("laureat.profile.update"), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('personal_info.success_update'));
                    setIsEdit(false);
                }
            });
        } else {
            setIsEdit(false);
        }
    };

    const toggleEdit = () => {
        if (!isEdit) {
            setIsEdit(true);
        } else if (hasChanges) {
            if (confirm(t('personal_info.confirm_cancel'))) {
                reset();
                setIsEdit(false);
            }
        } else {
            setIsEdit(false);
        }
    };


    return (
        <div
            className="bg-white shadow sm:rounded-lg p-6 mb-6"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                    {t('personal_info.title')}
                </h2>

                {!isEdit ? (
                    <button
                        onClick={toggleEdit}
                        className={`flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors ${i18n.language === 'ar' ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <Edit size={18} />
                        {t('personal_info.edit_button')}
                    </button>
                ) : (
                    <div className={`flex gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <button
                            onClick={handleSubmit}
                            disabled={!hasChanges}
                            className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''
                                } ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            <Save size={18} />
                            {t('personal_info.save_button')}
                        </button>
                        <button
                            onClick={toggleEdit}
                            className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${i18n.language === 'ar' ? 'flex-row-reverse' : ''
                                }`}
                        >
                            <X size={18} />
                            {t('personal_info.cancel_button')}
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <InputLabel htmlFor="bio" value={t('personal_info.fields.bio')} />
                <TextInput
                    id="bio"
                    name="bio"
                    value={data.bio}
                    className="mt-1 block w-full"
                    onChange={handleChange}
                    disabled={!isEdit}
                    maxLength={155}
                    placeholder={t('personal_info.fields.bio')}
                />
                {data.bio?.length >= 155 && (
                    <p className="mt-1 text-sm text-red-600">
                        {t('personal_info.fields.bio_limit')}
                    </p>
                )}
                {errors.bio && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                        <CgDanger />
                        <InputError message={errors.bio} />
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <InputLabel htmlFor="nom" value={t('personal_info.fields.first_name')} />
                    <TextInput
                        id="nom"
                        name="nom"
                        value={data.nom}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.first_name')}
                    />
                    {errors.nom && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.nom} />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="prenom" value={t('personal_info.fields.last_name')} />
                    <TextInput
                        id="prenom"
                        name="prenom"
                        value={data.prenom}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.last_name')}
                    />
                    {errors.prenom && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.prenom} />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('personal_info.fields.email')} />
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.email')}
                    />
                    {(errors.email || errors.EmailExists) && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.email} />
                            <InputError message={errors.EmailExists} />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="telephone" value={t('personal_info.fields.phone')} />
                    <TextInput
                        id="telephone"
                        name="telephone"
                        value={data.telephone}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.phone')}
                    />
                    {errors.telephone && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.telephone} />
                        </div>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">
                {t('personal_info.sections.academic')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <InputLabel htmlFor="etablissement" value={t('personal_info.fields.institution')} />
                    <TextInput
                        id="etablissement"
                        name="etablissement"
                        value={data.etablissement}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.institution')}
                    />
                    {errors.etablissement && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.etablissement} />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="filiere" value={t('personal_info.fields.field')} />
                    <SelectInput
                        id="filiere"
                        name="filiere"
                        value={data.filiere}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                        disabled={!isEdit}
                    >
                        <option value="" disabled>{t('personal_info.select_placeholder')}</option>
                        <option value="developpement_digital">{t('branches.developpement_digital')}</option>
                        <option value="reseaux_informatique">{t('branches.reseaux_informatique')}</option>
                        <option value="gestion_entreprise">{t('branches.gestion_entreprise')}</option>
                        <option value="commerce_vente">{t('branches.commerce_vente')}</option>
                        <option value="comptabilite">{t('branches.comptabilite')}</option>
                        <option value="hotellerie_tourisme">{t('branches.hotellerie_tourisme')}</option>
                        <option value="batiment_travaux_publics">{t('branches.batiment_travaux_publics')}</option>
                        <option value="mecanique_auto">{t('branches.mecanique_auto')}</option>
                        <option value="electricite_batiment">{t('branches.electricite_batiment')}</option>
                        <option value="electronique_industrielle">{t('branches.electronique_industrielle')}</option>
                        <option value="maintenance_industrielle">{t('branches.maintenance_industrielle')}</option>
                        <option value="soudage_chaudronnerie">{t('branches.soudage_chaudronnerie')}</option>
                        <option value="agriculture">{t('branches.agriculture')}</option>
                        <option value="audiovisuel_multimedia">{t('branches.audiovisuel_multimedia')}</option>
                        <option value="arts_graphiques_imprimerie">{t('branches.arts_graphiques_imprimerie')}</option>
                        <option value="sante_social">{t('branches.sante_social')}</option>
                        <option value="logistique_transport">{t('branches.logistique_transport')}</option>
                    </SelectInput>
                    {errors.filiere && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.filiere} />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="promotion" value={t('personal_info.fields.promotion')} />
                    <TextInput
                        id="promotion"
                        name="promotion"
                        value={data.promotion}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.promotion')}
                    />
                    {errors.promotion && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.promotion} />
                        </div>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">
                {t('personal_info.sections.professional')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <InputLabel htmlFor="employeur" value={t('personal_info.fields.employer')} />
                    <TextInput
                        id="employeur"
                        name="employeur"
                        value={data.employeur}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.employer')}
                    />
                    {errors.employeur && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.employeur} />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="fonction" value={t('personal_info.fields.position')} />
                    <TextInput
                        id="fonction"
                        name="fonction"
                        value={data.fonction}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                        disabled={!isEdit}
                        placeholder={t('personal_info.fields.position')}
                    />
                    {errors.fonction && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                            <CgDanger />
                            <InputError message={errors.fonction} />
                        </div>
                    )}
                </div>
            </div>

            <Toaster position={i18n.language === 'ar' ? 'top-left' : 'top-right'} />
        </div>
    );
};

export default InformationsPersonnelles;
