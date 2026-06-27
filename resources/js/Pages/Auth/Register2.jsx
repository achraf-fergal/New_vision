import { useState, useEffect } from "react";
import { BsArrowLeftCircle, BsGlobe } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { CgDanger } from "react-icons/cg";
import { useTranslation } from "react-i18next";

function SignUpSTEP2({ InitialData }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const availableLocales = {
        en: 'English',
        fr: 'Français',
        ar: 'العربية'
    };

    const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);


    const { data, setData, errors, processing, post, reset, clearErrors } = useForm({
        nom: InitialData.nom,
        prenom: InitialData.prenom,
        password: InitialData.password,
        email: InitialData.email,
        promotion: "",
        filiere: "",
        etablissement: "",
        telephone: "",
        fonction: "",
        employeur: "",
    });

    const GoBack = () => {
        if (window.confirm(
            t('confirm_back_to_step1') +
            "\n" +
            t('back_step_warning')
        )) {
            router.get('register');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route("FinalRegister"), {
            onSuccess: () => {
                toast.success(t('account_created_success'));
            },
        });
    };

    const handleReset = () => {
        reset();
    };

    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem('lang', localeKey);
        toggleLangDropdown();

        router.post('/change-lang', { locale: localeKey }, {
            preserveScroll: true,
        });
        clearErrors();
    };



    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            i18n.changeLanguage(savedLang);
        }
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isLangDropdownOpen && !event.target.closest('.lang-dropdown-container')) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isLangDropdownOpen]);


    return (
        <div className={`bg-gray-100 min-h-screen flex flex-col items-center justify-center ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Head title={t('register_title')} />

            <div className="w-11/12 mb-4 flex justify-end">
                <div className="relative lang-dropdown-container mt-4">
                    <button
                        className="flex items-center gap-1 text-slate-500 font-medium hover:text-black transition-colors"
                        onClick={toggleLangDropdown}
                    >
                        <BsGlobe size={18} />
                        <span>{availableLocales[i18n.language] || 'Français'}</span>
                        <FiChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isLangDropdownOpen && (
                        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 bg-white shadow-md rounded-md py-1 w-36 z-50`}>
                            {Object.keys(availableLocales).map((localeKey) => (
                                <button
                                    key={localeKey}
                                    onClick={() => changeLang(localeKey)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${i18n.language === localeKey ? 'font-medium text-black' : 'text-gray-600'}`}
                                >
                                    {availableLocales[localeKey]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-11/12">
                <button onClick={GoBack} className="flex items-center">
                    <BsArrowLeftCircle size={35} color="black" />
                </button>
                <h1 className="mt-4 mb-6 font-bold text-4xl">{t('sign_up_now')}</h1>
                <p className="mb-4 font-bold text-black/50">{t('step_two_of_two')}</p>
                <div className="bg-green-200 text-green-800 w-12 h-12 rounded-lg text-center py-2">
                    <span className="font-bold text-xl">2</span>
                </div>
                <form onSubmit={handleSubmit} method="post" className="mt-14">
                    <div className="flex flex-row space-x-5">
                        <div className="mb-4 w-1/2">
                            <InputLabel htmlFor="promotion" value={t('promotion') + " *"} />
                            <TextInput
                                id="promotion"
                                type="text"
                                name="promotion"
                                placeholder={t('enter_promotion')}
                                value={data.promotion}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="promotion"
                                isFocused={true}
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {(errors.promotion) && (
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={errors.promotion} className="mt-2 inline" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4 w-1/2" style={!isRTL ? { marginLeft: "5%" } : { marginRight: "5%" }}>
                            <InputLabel htmlFor="filiere" value={t('filiere') + " *"} />
                            <SelectInput
                                id="filiere"
                                name="filiere"
                                value={data.filiere}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                dir={isRTL ? "rtl" : "ltr"}
                            >
                                <option value="" disabled>
                                    {t('choose_branche')}
                                </option>
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

                            {(errors.filiere) && (
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={errors.filiere} className="mt-2 inline" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row space-x-5">
                        <div className="mb-4 w-1/2">
                            <InputLabel htmlFor="etablissement" value={t('etablissement') + " *"} />
                            <TextInput
                                id="etablissement"
                                type="text"
                                name="etablissement"
                                placeholder={t('enter_etablissement')}
                                value={data.etablissement}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="etablissement"
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {(errors.etablissement) && (
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={errors.etablissement} className="mt-2 inline" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4 w-1/2" style={!isRTL ? { marginLeft: "5%" } : { marginRight: '5%' }}>
                            <InputLabel htmlFor="telephone" value={t('telephone') + " *"} />
                            <TextInput
                                id="telephone"
                                type="text"
                                name="telephone"
                                placeholder={t('enter_telephone')}
                                value={data.telephone}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="telephone"
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {(errors.telephone) && (
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={errors.telephone} className="mt-2 inline" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row space-x-5">
                        <div className="mb-4 w-1/2">
                            <InputLabel htmlFor="fonction" value={t('fonction')} />
                            <TextInput
                                id="fonction"
                                type="text"
                                name="fonction"
                                placeholder={t('enter_fonction')}
                                value={data.fonction}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                        </div>
                        <div className="mb-4 w-1/2" style={!isRTL ? { marginLeft: "5%" } : { marginRight: '5%' }}>
                            <InputLabel htmlFor="employeur" value={t('employeur')} />
                            <TextInput
                                id="employeur"
                                type="text"
                                name="employeur"
                                placeholder={t('enter_employeur')}
                                value={data.employeur}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                        </div>
                    </div>

                    <div className={`flex flex-row justify-between items-center mt-5 mb-5`}>
                        <p className="text-gray-600">
                            {t('any_questions')}{" "}
                            <Link
                                href={"/"}
                                className="text-gray-600 hover:underline"
                            >
                                {t('contact_us')}
                            </Link>
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="reset"
                                className="px-4 py-2 bg-gray-300 text-[#1c150d] font-bold rounded-lg border border-gray-300 hover:opacity-80"
                                onClick={handleReset}
                            >
                                {t('reset')}
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[black] text-[white] font-bold rounded-lg border border-[black] hover:opacity-80 disabled:cursor-not-allowed"
                                disabled={processing}
                            >
                                {processing ? t('processing') : t('sign_up')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster position={isRTL ? "top-left" : "top-center"} />
        </div>
    );
};

export default SignUpSTEP2;
