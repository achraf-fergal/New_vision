import React, { useEffect, useState } from "react";
import { Shield, Lock, Eye, FileText, Bell, UserCheck, Import, Globe, ChevronDown } from "lucide-react";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Confidentialite() {
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
        <div className={`pt-16 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
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
                        {t('confidentialite_title')}
                    </h1>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 w-24 bg-black rounded"></div>
                    </div>
                    <p className="text-lg text-gray-600">
                        {t('confidentialite_subtitle', { app_name: import.meta.env.VITE_APP_NAME })}
                    </p>
                </div>

                <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8 ${textAlignClass}`}>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('introduction_title')}</h2>
                    <p className="text-gray-600 mb-4">
                        {t('introduction_content_1', { app_name: import.meta.env.VITE_APP_NAME })}
                    </p>
                    <p className="text-gray-600">
                        {t('introduction_content_2')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 ${textAlignClass}`}>
                        <div className={`flex items-center gap-3 mb-4 `}>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Eye className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{t('info_collected_title')}</h3>
                        </div>
                        <ul className={`text-gray-600 space-y-3 list-disc ${isRTL ? 'list-inside' : 'list-inside'} ${listClass}`}>
                            {
                                t('info_collected_list', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 ${textAlignClass}`}>
                        <div className={`flex items-center gap-3 mb-4 `}>
                            <div className="bg-green-100 p-3 rounded-full">
                                <Shield className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{t('data_usage_title')}</h3>
                        </div>
                        <ul className={`text-gray-600 space-y-3 list-disc ${isRTL ? 'list-inside' : 'list-inside'} ${listClass}`}>
                            {
                                t('data_usage_list', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 ${textAlignClass}`}>
                        <div className={`flex items-center gap-3 mb-4 `}>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <UserCheck className="text-purple-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{t('data_sharing_title')}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {t('data_sharing_text')}
                        </p>
                        <ul className={`text-gray-600 space-y-3 list-disc ${isRTL ? 'list-inside' : 'list-inside'} ${listClass}`}>
                            {
                                t('data_sharing_list', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 ${textAlignClass}`}>
                        <div className={`flex items-center gap-3 mb-4 `}>
                            <div className="bg-red-100 p-3 rounded-full">
                                <Lock className="text-red-600" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{t('data_security_title')}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {t('data_security_text')}
                        </p>
                        <ul className={`text-gray-600 space-y-3 list-disc ${isRTL ? 'list-inside' : 'list-inside'} ${listClass}`}>
                            {
                                t('data_security_list', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8 ${textAlignClass}`}>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('user_rights_title')}</h2>
                    <p className="text-gray-600 mb-4">
                        {t('user_rights_intro')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {Object.entries(t('user_rights_list', { returnObjects: true })).map(([key, value]) => (
                            <div className={`flex items-start gap-3 ${isRTL ? 'text-right' : ''}`} key={key}>
                                <div className="mt-1 text-blue-600">•</div>
                                <p className="text-gray-600">
                                    <span className="font-medium text-gray-800">
                                        {isRTL ? ` ${value.split(":")[0]}:` : `${value.split(":")[0]} :`}
                                    </span>
                                    {value.split(":")[1]}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-600">
                        {t('user_rights_contact')}
                        <a href={`mailto:${import.meta.env.VITE_MAIL_USERNAME}`} className="text-blue-600 hover:underline"> {import.meta.env.VITE_MAIL_USERNAME}</a>
                    </p>
                </div>

                <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8 ${textAlignClass}`}>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('cookies_title')}</h2>
                    <p className="text-gray-600 mb-4">
                        {t('cookies_text')}
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                            <strong>{t('cookies_types')}</strong> {t('cookies_types_text')}
                        </p>
                    </div>
                </div>

                <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8 ${textAlignClass}`}>
                    <div className={`flex items-center gap-3 mb-4 `}>
                        <Bell className="text-amber-600" size={24} />
                        <h2 className="text-2xl font-semibold text-gray-800">{t('policy_changes_title')}</h2>
                    </div>
                    <p className="text-gray-600">
                        {t('policy_changes_text')}
                    </p>
                </div>

                <div className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 ${textAlignClass}`}>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('contact')}</h2>
                    <p className="text-gray-600 mb-6">
                        {t('contact_text')}
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">{t('contact_email')}</h4>
                                <a href={`mailto:${import.meta.env.VITE_MAIL_USERNAME}`} className="text-blue-600 hover:underline">{import.meta.env.VITE_MAIL_USERNAME}</a>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">{t('contact_form')}</h4>
                                <button
                                    onClick={() => router.visit('/')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    {t('Contact_Button')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>{t('footer_text', { year: new Date().getFullYear(), app_name: import.meta.env.VITE_APP_NAME })}</p>
                </div>
            </div>
        </div>
    );
}
