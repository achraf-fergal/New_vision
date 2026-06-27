import React, { useEffect, useState } from "react";
import { FileText, Cookie, Lock, Shield, AlertTriangle, Info, ExternalLink, ShieldCheck, ChevronDown, Globe } from "lucide-react";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function CookiesPolicy() {
    const { t, i18n } = useTranslation();

    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

        return () => {
            document.documentElement.dir = 'ltr';
        };
    }, [isRTL]);

    const textAlignClass = isRTL ? 'text-right' : 'text-left';

    const listClass = isRTL ? 'pr-2 mr-4' : 'pl-2';
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



    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem('lang', localeKey);
        toggleLangDropdown();

        router.post('/change-lang', { locale: localeKey }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-end">
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
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('cookies_page.title')}
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 w-24 bg-black rounded"></div>
                    </div>
                    <p className="text-lg text-gray-600">
                        {t('cookies_page.subtitle', { appName: import.meta.env.VITE_APP_NAME })}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('cookies_page.introduction.title')}</h2>
                    <p className="text-gray-600 mb-4">
                        {t('cookies_page.introduction.welcome', { appName: import.meta.env.VITE_APP_NAME })}
                    </p>
                    <p className="text-gray-600">
                        {t('cookies_page.introduction.disclaimer')}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Cookie className="text-blue-600" size={24} />
                        <h2 className="text-2xl font-semibold text-gray-800">{t('cookies_page.whatIs.title')}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        {t('cookies_page.whatIs.description1')}
                    </p>
                    <p className="text-gray-600">
                        {t('cookies_page.whatIs.description2')}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Info className="text-blue-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">{t('cookies_page.types.title')}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        {t('cookies_page.types.description')}
                    </p>

                    <div className="space-y-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">{t('cookies_page.types.essential.title')}</h3>
                            <p className="text-gray-600 mb-3">
                                {t('cookies_page.types.essential.description')}
                            </p>
                            <div className="pl-4 space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className="min-w-4 text-blue-600 mt-1">•</div>
                                    <p className="text-gray-600"><span className="font-medium">{t('cookies_page.example')}:</span> {t('cookies_page.types.essential.example')}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="min-w-4 text-blue-600 mt-1">•</div>
                                    <p className="text-gray-600"><span className="font-medium">{t('cookies_page.duration')}:</span> {t('cookies_page.types.essential.duration')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">{t('cookies_page.types.preferences.title')}</h3>
                            <p className="text-gray-600 mb-3">
                                {t('cookies_page.types.preferences.description')}
                            </p>
                            <div className="pl-4 space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className="min-w-4 text-blue-600 mt-1">•</div>
                                    <p className="text-gray-600"><span className="font-medium">{t('cookies_page.example')}:</span> {t('cookies_page.types.preferences.example')}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="min-w-4 text-blue-600 mt-1">•</div>
                                    <p className="text-gray-600"><span className="font-medium">{t('cookies_page.duration')}:</span> {t('cookies_page.types.preferences.duration')}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Shield className="text-green-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">{t('cookies_page.usage.title')}</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            {t('cookies_page.usage.description')}
                        </p>

                        <div className="pl-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-green-600 min-w-5 mt-1" size={18} />
                                <p className="text-gray-600">{t('cookies_page.usage.reason1')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-green-600 min-w-5 mt-1" size={18} />
                                <p className="text-gray-600">{t('cookies_page.usage.reason2')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-green-600 min-w-5 mt-1" size={18} />
                                <p className="text-gray-600">{t('cookies_page.usage.reason3')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-green-600 min-w-5 mt-1" size={18} />
                                <p className="text-gray-600">{t('cookies_page.usage.reason4')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-green-600 min-w-5 mt-1" size={18} />
                                <p className="text-gray-600">{t('cookies_page.usage.reason5')}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Lock className="text-blue-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">{t('cookies_page.management.title')}</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            {t('cookies_page.management.description')}
                        </p>

                        <div className="pl-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="min-w-4 text-blue-600 mt-1">•</div>
                                <p className="text-gray-600">{t('cookies_page.management.option1')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="min-w-4 text-blue-600 mt-1">•</div>
                                <p className="text-gray-600">{t('cookies_page.management.option2')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="min-w-4 text-blue-600 mt-1">•</div>
                                <p className="text-gray-600">{t('cookies_page.management.option3')}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="min-w-4 text-blue-600 mt-1">•</div>
                                <p className="text-gray-600">{t('cookies_page.management.option4')}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mt-4">
                            {t('cookies_page.management.browsers')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Google Chrome</h4>
                                <p className="text-gray-600 text-sm">
                                    {t('cookies_page.management.chrome')}
                                </p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Mozilla Firefox</h4>
                                <p className="text-gray-600 text-sm">
                                    {t('cookies_page.management.firefox')}
                                </p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Safari</h4>
                                <p className="text-gray-600 text-sm">
                                    {t('cookies_page.management.safari')}
                                </p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Microsoft Edge</h4>
                                <p className="text-gray-600 text-sm">
                                    {t('cookies_page.management.edge')}
                                </p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-yellow-600 min-w-5 mt-1" size={18} />
                                <p className="text-gray-700">
                                    <span className="font-medium">{t('cookies_page.management.warning.title')}:</span> {t('cookies_page.management.warning.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('cookies_page.changes.title')}</h2>
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            {t('cookies_page.changes.description1')}
                        </p>

                        <p className="text-gray-600">
                            {t('cookies_page.changes.description2')}
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600">
                                <strong>{t('cookies_page.changes.advice.title')}:</strong> {t('cookies_page.changes.advice.description')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('cookies_page.contact.title')}</h2>
                    <p className="text-gray-600 mb-6">
                        {t('cookies_page.contact.description')}
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">{t('cookies_page.contact.email')}:</h4>
                                <a href={`mailto:${import.meta.env.VITE_MAIL_USERNAME}`} className="text-blue-600 hover:underline">{import.meta.env.VITE_MAIL_USERNAME}</a>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">{t('cookies_page.contact.form')}:</h4>
                                <button
                                    onClick={() => router.visit('/')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    {t('cookies_page.contact.button')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. {t('cookies_page.footer.rights')}</p>
                </div>
            </div>
        </div>
    );
}
