import React, { useState, useEffect } from 'react';
import { ThumbsUp, Flag, Plus, Send, X } from 'lucide-react';
import Dashboard from '@/Layouts/DashboardLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import InputError from '@/Components/InputError';
import { CgDanger } from 'react-icons/cg';
import 'dayjs/locale/ar'
import 'dayjs/locale/fr'
import 'dayjs/locale/en'

const AvisPanel = () => {
    const { Avis, auth, Laureat_Activity } = usePage().props;
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { data, setData, post, put, delete: del, errors, reset, clearErrors } = useForm({
        avis: '',
        dateAvis: dayjs().format('YYYY-MM-DD'),
    });
    const { t, i18n } = useTranslation();



    const handleMarkHelpful = (avisId) => {
        post(route('avis.helpful', avisId), {
            preserveScroll: true,
        });
    };

    const handleReport = (avisId) => {
        post(route('avis.report', avisId), {
            preserveScroll: true,
        });
    };

    const handleDelete = (avisId) => {
        post(route('avis.destroy', avisId), {
            preserveScroll: true,
        });
    };

    const handleSubmitAvis = () => {

        post(route('avis.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowCreateForm(false);
            }
        });
    };

    const formatUserInfo = (user) => {
        return t('avis.user_info', {
            fonction: user.fonction || '',
            etablissement: user.etablissement || '',
            separator: user.fonction && user.etablissement ? t('avis.separator') : ''
        });
    };

    useEffect(() => {
        clearErrors();
    }, [i18n.language])


    dayjs.locale(i18n.language)

    return (
        <div className={`py-8 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className={`flex justify-between items-center ${i18n.language === 'ar' ? 'pl-6' : 'pr-6'} mb-6`}>
                <h1 className="text-2xl font-bold text-gray-800">
                    {t('avis.title')}
                </h1>
                <button
                    className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center ${i18n.language === 'ar' ? ' flex-row-reverse' : null}`}
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? (
                        <>
                            <X className="w-4 h-4 mr-2" />
                            {t('avis.cancel_button')}
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            {t('avis.add_button')}
                        </>
                    )}
                </button>
            </div>

            {showCreateForm && (
                <div className="bg-gray-50 p-6 mb-6 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                        {t('avis.create_title')}
                    </h2>
                    <div className="flex flex-col">
                        <>
                            <textarea
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm mb-1"
                                rows="4"
                                placeholder={t('avis.placeholder')}
                                value={data.avis}
                                onChange={(e) => setData('avis', e.target.value)}
                            ></textarea>
                            {
                                errors.avis && (
                                    <div className="" >
                                        <CgDanger className={`text-base text-red-600 inline ${i18n.language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                        <InputError message={errors.avis} className="mt-2 inline" />
                                    </div>
                                )
                            }
                        </>

                        <div className="flex justify-end">
                            <button
                                className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : null} `}
                                onClick={handleSubmitAvis}
                            >
                                <Send className={`w-4 h-4 mr-2`} />
                                {t('avis.submit_button')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {Avis.length > 0 ? (
                Avis.map((avis) => (
                    <div key={avis.id} className={`px-6 border-t border-gray-200 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <div className="py-6 flex">
                            <div className="w-28 text-gray-500 text-sm">
                                {dayjs(avis.dateAvis).format(t('avis.date_format'))}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    {avis.user.imageSRC ? (
                                        <img
                                            className="w-8 h-8 rounded-full object-cover"
                                            src={'/storage/' + avis.user.imageSRC}
                                            alt={`${avis.user.nom} ${avis.user.prenom}`}
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                                            {avis.user.nom.charAt(0) + avis.user.prenom.charAt(0)}
                                        </div>
                                    )}

                                    <h3 className="text-lg font-medium text-gray-800 mx-2">
                                        {avis.user.nom + ' ' + avis.user.prenom}
                                    </h3>
                                    <span className="text-gray-500 text-sm">
                                        {formatUserInfo(avis.user)}
                                    </span>
                                    <span className="text-gray-500 text-sm mx-2">•</span>
                                    <span className="text-gray-500 text-sm">
                                        {dayjs(avis.created_at).format(t('avis.time_format'))}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{avis.avis}</p>
                                <div className="flex items-center">
                                    <button
                                        className={`flex items-center text-sm hover:text-blue-600 ${i18n.language === 'ar' ? 'ml-4' : 'mr-4'} ${Laureat_Activity?.Helpful_Avis.find(elem => elem === avis.id) ? 'text-blue-600' : 'text-gray-600'}`}
                                        onClick={() => handleMarkHelpful(avis.id)}
                                        disabled={Laureat_Activity?.Helpful_Avis.find(elem => elem === avis.id)}
                                    >
                                        <ThumbsUp className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                        {t('avis.helpful')} ({avis.helpful})
                                    </button>
                                    <button
                                        className={`flex items-center text-sm hover:text-red-600 ${Laureat_Activity?.Report_Avis.find(elem => elem === avis.id) ? 'text-red-600' : 'text-gray-600'}`}
                                        onClick={() => handleReport(avis.id)}
                                        disabled={Laureat_Activity?.Report_Avis.find(elem => elem === avis.id)}
                                    >
                                        <Flag className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                        {t('avis.report')} ({avis.report})
                                    </button>

                                    {auth.user && auth.user.id === avis.user_id && (
                                        <button
                                            className={`${i18n.language === 'ar' ? 'mr-auto' : 'ml-auto'} flex items-center text-sm text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1`}
                                            onClick={() => handleDelete(avis.id)}
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center mt-36 text-gray-500">
                    <p className="text-lg">{t('avis.no_reviews')}</p>
                </div>
            )}
        </div>
    );
};

AvisPanel.layout = (page) => <Dashboard children={page} title={t('avis.title')} />;

export default AvisPanel;
