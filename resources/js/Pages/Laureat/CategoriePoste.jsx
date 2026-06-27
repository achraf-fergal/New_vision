import React from "react";
import Dashboard from "@/Layouts/DashboardLayout";
import { BookIcon } from "lucide-react";
import { usePage } from "@inertiajs/react";
import PostDetail from "./Composents/CategoryPostsFilter";
import { useTranslation } from 'react-i18next';
import { t } from "i18next";

const CategoriePoste = ({ Postes }) => {
    const { t, i18n } = useTranslation();
    const { Categorie } = usePage().props;

    const isRTL = i18n.language === 'ar';

    return (
        <div className="pt-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center">
                    <h1 className='text-2xl font-bold text-gray-800'>
                        {t('category_posts.title')} {t('branches.'+Categorie)}
                    </h1>
                </div>
            </div>
            {
                Postes.length === 0 ? (
                    <div className={`text-center mt-40 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <BookIcon className="w-16 h-16 mx-auto my-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-2">{t('category_posts.empty.title')}</h3>
                        <p className="text-sm text-gray-500">
                            {t('category_posts.empty.description')}
                        </p>
                    </div>
                ) :
                    Postes.map((poste, index) => (
                        <PostDetail key={index} Poste={poste} />
                    ))
            }
        </div>
    );
};

CategoriePoste.layout = page => <Dashboard children={page} title={t('category_posts.page_title')} />;
export default CategoriePoste;
