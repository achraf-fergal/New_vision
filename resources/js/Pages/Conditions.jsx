import React, { useEffect, useState } from "react";
import { FileText, AlertCircle, CheckCircle, Users, BookOpen, ShieldCheck, MessageSquare, Globe, ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Conditions() {
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


    const currentYear = new Date().getFullYear();

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
                        {t('conditions.title')}
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 w-24 bg-black rounded"></div>
                    </div>
                    <p className="text-lg text-gray-600">
                        {t('conditions.subtitle', { appName: import.meta.env.VITE_APP_NAME })}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('conditions.introduction.title')}</h2>
                    <p className="text-gray-600 mb-4">
                        {t('conditions.introduction.welcome', { appName: import.meta.env.VITE_APP_NAME })}
                    </p>
                    <p className="text-gray-600">
                        {t('conditions.introduction.agreement')}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="text-blue-600" size={24} />
                        <h2 className="text-2xl font-semibold text-gray-800">{t('conditions.definitions.title')}</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="min-w-4 text-blue-600 mt-1">•</div>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">{t('conditions.definitions.platform.term')} </span>
                                {t('conditions.definitions.platform.definition', { appName: import.meta.env.VITE_APP_NAME })}
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="min-w-4 text-blue-600 mt-1">•</div>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">{t('conditions.definitions.user.term')} </span>
                                {t('conditions.definitions.user.definition')}
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="min-w-4 text-blue-600 mt-1">•</div>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">{t('conditions.definitions.account.term')} </span>
                                {t('conditions.definitions.account.definition')}
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="min-w-4 text-blue-600 mt-1">•</div>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">{t('conditions.definitions.content.term')} </span>
                                {t('conditions.definitions.content.definition')}
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="min-w-4 text-blue-600 mt-1">•</div>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">{t('conditions.definitions.services.term')} </span>
                                {t('conditions.definitions.services.definition')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Users className="text-green-600" size={24} />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">{t('conditions.registration.title')}</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600">{t('conditions.registration.intro')}</p>

                            <div className="pl-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.registration.rules.accurate')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.registration.rules.confidentiality')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.registration.rules.singleAccount')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.registration.rules.affiliation')}</p>
                                </div>
                            </div>

                            <p className="text-gray-600">{t('conditions.registration.suspension')}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <MessageSquare className="text-blue-600" size={24} />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">{t('conditions.content.title')}</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600">{t('conditions.content.intro')}</p>

                            <div className="pl-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.content.rules.illegal')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.content.rules.harassment')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.content.rules.impersonation')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.content.rules.privacy')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.content.rules.spam')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 min-w-5 mt-1" size={18} />
                                    <p className="text-gray-600">{t('conditions.content.rules.malware')}</p>
                                </div>
                            </div>

                            <p className="text-gray-600">{t('conditions.content.enforcement')}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('conditions.intellectual.title')}</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                {t('conditions.intellectual.protection')}
                            </p>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-gray-600">
                                    <span className="font-medium">{t('conditions.intellectual.userContent.label')}</span>
                                    {t('conditions.intellectual.userContent.license')}
                                </p>
                            </div>

                            <p className="text-gray-600">
                                {t('conditions.intellectual.warranty')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('conditions.liability.title')}</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                {t('conditions.liability.disclaimer')}
                            </p>

                            <p className="text-gray-600">
                                {t('conditions.liability.noGuarantee')}
                            </p>

                            <div className="pl-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="min-w-4 text-gray-400 mt-1">•</div>
                                    <p className="text-gray-600">{t('conditions.liability.limits.availability')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="min-w-4 text-gray-400 mt-1">•</div>
                                    <p className="text-gray-600">{t('conditions.liability.limits.fixes')}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="min-w-4 text-gray-400 mt-1">•</div>
                                    <p className="text-gray-600">{t('conditions.liability.limits.security')}</p>
                                </div>
                            </div>

                            <p className="text-gray-600">
                                {t('conditions.liability.damages')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-amber-100 p-3 rounded-full">
                                <ShieldCheck className="text-amber-600" size={24} />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">{t('conditions.modifications.title')}</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                {t('conditions.modifications.right')}
                            </p>

                            <p className="text-gray-600">
                                {t('conditions.modifications.notice')}
                            </p>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-sm text-gray-600">
                                    <strong>{t('conditions.modifications.tip.label')}</strong> {t('conditions.modifications.tip.content')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('conditions.law.title')}</h2>
                        <p className="text-gray-600">
                            {t('conditions.law.applicable', { country: t('country') })}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('conditions.contact.title')}</h2>
                        <p className="text-gray-600 mb-6">
                            {t('conditions.contact.intro')}
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2">{t('conditions.contact.email.title')}</h4>
                                    <a href={`mailto:${import.meta.env.VITE_MAIL_USERNAME}`} className="text-blue-600 hover:underline">{import.meta.env.VITE_MAIL_USERNAME}</a>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2">{t('conditions.contact.form.title')}</h4>
                                    <button
                                        onClick={() => router.visit('/')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {t('conditions.contact.form.button')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('conditions.agreement.title')}</h2>
                    <p className="text-gray-600">
                        {t('conditions.agreement.content')}
                    </p>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>{t('conditions.footer.copyright', { year: currentYear, appName: import.meta.env.VITE_APP_NAME })}</p>
                </div>
            </div>
        </div>
    );
}
