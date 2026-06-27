import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";

function SignUpSTEP1() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [locale, setLocale] = useState('');

    const {InitialData} = usePage().props;


    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const availableLocales = {
        'fr': 'Français',
        'en': 'English',
        'ar': 'العربية'
    };


    const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);



    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            setLocale(savedLang);
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



    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nom: (InitialData) ? InitialData.nom : "",
        prenom: (InitialData) ? InitialData.prenom : "",
        password: "",
        password_confirmation: "",
        email: (InitialData) ? InitialData.email : "",
    });

    // console.log(InitialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route("register"));
    };

    const handleReset = () => {
        reset();
    }

    const handleRedirect = () => {
        setTimeout(() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };



    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem('lang', localeKey);
        setLocale(localeKey);
        toggleLangDropdown();

        router.post('/change-lang', { locale: localeKey }, {
            preserveScroll: true,
        });
        clearErrors();
    };

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
                <h1 className="mb-6 font-bold text-5xl">{t('sign_up_now')}</h1>
                <p className="mb-4 font-bold text-black/50">{t('step_one_of_two')}</p>
                <div className="bg-green-200 text-green-800 w-12 h-12 rounded-lg text-center py-2">
                    <span className="font-bold text-xl">1</span>
                </div>
                <form onSubmit={handleSubmit} className="mt-14">
                    <div className="flex flex-row ">
                        <div className="mb-6 w-1/2">
                            <InputLabel htmlFor="prenom" value={t('first_name') + " *"} />
                            <TextInput
                                id="prenom"
                                type="text"
                                name="prenom"
                                placeholder={t('enter_first_name')}
                                value={data.prenom}
                                className="mt-1 block w-full"
                                autoComplete="lastname"
                                isFocused={true}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />

                            {(errors.prenom) && (
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={errors.prenom} className="mt-2 inline" />
                                </div>
                            )}
                        </div>
                        <div className="mb-6 w-1/2" style={!isRTL ? { marginLeft: "6%" } : { marginRight: "6%" }}>
                            <InputLabel htmlFor="nom" value={t('last_name') + " *"} />
                            <TextInput
                                id="nom"
                                type="text"
                                name="nom"
                                placeholder={t('enter_last_name')}
                                value={data.nom}
                                className="mt-1 block w-full"
                                autoComplete="firstname"
                                isFocused={true}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />

                            {(errors.nom) && (
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={errors.nom} className="mt-2 inline" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="email" value={t('email') + " *"} />
                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            placeholder={t('enter_email')}
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            isFocused={true}
                            onChange={handleChange}
                            dir={isRTL ? "rtl" : "ltr"}
                        />
                        {(errors.email || errors.ExistsEmail) && (
                            <div className="mt-2">
                                <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                <InputError message={errors.email} className="mt-2 inline" />
                                <InputError message={errors.ExistsEmail} className="mt-2 inline" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-row">
                        <div className="mb-6 w-1/2">
                            <InputLabel htmlFor="password" value={t('password') + " *"} />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder={t('enter_password')}
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />

                            {(errors.password) ?
                                (data.password === "") ?
                                    <div className="mt-2">
                                        <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                        <InputError message={errors.password} className="mt-2 inline" />
                                    </div>
                                    : (!validatePassword(data.password, t).isValid) ?
                                        validatePassword(data.password, t).messages.map((message, index) => {
                                            return (
                                                <div className="mt-2" key={index}>
                                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                                    <InputError message={message} className="mt-2 inline" />
                                                </div>
                                            )
                                        })
                                        : null
                                : null
                            }
                        </div>
                        <div className="mb-6 w-1/2" style={!isRTL ? { marginLeft: "5%" } : { marginRight: "5%" }}>
                            <InputLabel htmlFor="re-password" value={t('confirm_password') + " *"} />
                            <TextInput
                                id="re-password"
                                type="password"
                                name="password_confirmation"
                                placeholder={t('verify_password')}
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {(errors.password) ?
                                (data.password_confirmation !== data.password) &&
                                <div className="mt-2">
                                    <CgDanger className={`text-red-600 inline ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    <InputError message={t('password_mismatch')} className="mt-2 inline" />
                                </div>
                                : null
                            }
                        </div>
                    </div>

                    <div className={`flex flex-row justify-between items-center mt-5 mb-5 `}>
                        <p className="text-gray-500">
                            {t('any_questions')}
                            <Link href="/" className="text-gray-500 hover:underline" onClick={handleRedirect}>
                                {t('contact_us')}
                            </Link>
                        </p>
                        <div className={`flex ${!isRTL && "space-x-3"}`} >
                            <button
                                type="reset"
                                className={`px-4 py-2  bg-gray-300 text-[#1c150d] font-bold rounded-lg border border-gray-300 hover:opacity-80 ${isRTL && "ml-3"} `}
                                onClick={handleReset}
                            >
                                {t('reset')}
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[black] text-[white] font-bold rounded-lg border border-[black] hover:opacity-80 disabled:cursor-not-allowed"
                                disabled={processing}
                            >
                                {processing ? t('processing') : t('continue')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster position={isRTL ? "top-left" : "top-center"} />
        </div>
    );
}

export default SignUpSTEP1;


const validatePassword = (password, t) => {

    const requirements = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const messages = [
        !requirements.minLength && t('password_min_length'),
        !requirements.hasUppercase && t('password_uppercase'),
        !requirements.hasLowercase && t('password_lowercase'),
        !requirements.hasNumber && t('password_number'),
        !requirements.hasSpecialChar && t('password_special_char'),
    ].filter(Boolean);

    return {
        isValid: messages.length === 0,
        messages
    };
};
