import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";

function ForgotPassword({ status }) {
    const { t, i18n } = useTranslation();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const isRTL = i18n.language === "ar";

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();

        post(route('password.email'));
    };

    useEffect(() => {
        if (status) {
            toast.success(t(status));
        }

        if (errors.email) {
            toast.error(t(errors.email), {
                icon: '🚧'
            });
        }
    }, [status, errors, t]);




    const availableLocales = {
        'fr': 'Français',
        'en': 'English',
        'ar': 'العربية'
    };



    const toggleLangDropdown = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const closeLangDropdown = () => {
        setIsLangDropdownOpen(false);
    };

    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem('lang', localeKey);
        closeLangDropdown();

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



    return (
        <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
            <Head title={t('forgot_password_page.page_title')} />

            <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800">
                </div>


                <div className="relative w-full flex flex-col justify-center items-center text-white p-12">
                    <h1 className="text-5xl font-bold mb-6">{t('forgot_password_page.hero_title')}</h1>
                    <p className="text-xl text-gray-300 text-center max-w-md mb-8">
                        {t('forgot_password_page.hero_subtitle')}
                    </p>
                    <div className="flex flex-col items-center mt-8">
                        <div className="mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-center max-w-sm">
                            {t('forgot_password_page.hero_description')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
                <div className="w-full max-w-md">

                    <div className="flex justify-end mb-4">
                        <div className="relative lang-dropdown-container">
                            <button
                                className="flex items-center gap-1 text-slate-500 font-medium hover:text-black transition-colors"
                                onClick={toggleLangDropdown}
                            >
                                <Globe size={18} />
                                <span>{availableLocales[i18n.language] || 'Français'}</span>
                                <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
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
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('forgot_password_page.form_title')}</h2>
                        <p className="text-gray-600">{t('forgot_password_page.form_subtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value={t('email')} />
                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                placeholder={t('forgot_password_page.email_placeholder')}
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                isFocused={true}
                                onChange={handleChange}
                                disabled = {processing}
                            />
                            {errors.email && (
                                <div className="mt-2">
                                    <CgDanger className="text-base text-red-600 inline" />
                                    <InputError message={t(errors.email)} className="mt-2" />
                                </div>
                            )}
                        </div>

                        <button
                            disabled={processing}
                            className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 mx-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {t('forgot_password_page.sending')}
                                </>
                            ) : (
                                t('forgot_password_page.send_button')
                            )}
                        </button>

                        <div className="text-center mt-6">
                            <Link
                                href={route('login')}
                                className="text-sm text-gray-600 hover:text-black hover:underline transition-colors"
                            >
                                {t('forgot_password_page.back_to_login')}
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <Toaster position="top-center" />
        </div>
    );
}

export default ForgotPassword;
