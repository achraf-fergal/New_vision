import React from "react";
import Dashboard from "@/Layouts/DashboardLayout";
import MyPostDetail from "./Composents/MyPoste";
import { BookIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
const MyPostes = ({ Postes }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="pt-8" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className='text-2xl font-bold text-gray-800'>
                        {t('my_posts')}
                    </h1>
                </div>
            </div>
            {
                Postes.length === 0 ? (
                    <div className={`text-center mt-40 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <BookIcon className="w-16 h-16 mx-auto my-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-2">
                            {t('no_posts')}
                        </h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto">
                            {t('be_first_to_post')}
                        </p>
                    </div>
                ) :
                    Postes.map((poste, index) => (
                        <MyPostDetail key={index} Poste={poste} />
                    ))
            }
        </div>
    );
};

MyPostes.layout = page => <Dashboard children={page} title={t('my_posts')} />;

export default MyPostes;