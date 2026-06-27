import React from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { t } from "i18next";
import i18n from "./i18n";

export default function NotFound() {
    const isRTL = i18n.language === "ar";

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            className="pt-1 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center"
        >
            <div className="max-w-xl mx-auto text-center">
                <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-100 p-5 rounded-full">
                            <AlertTriangle className="text-red-600" size={48} />
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('not_found.title')}
                    </h1>

                    <div className="flex justify-center mb-6">
                        <div className="h-1 w-24 bg-black rounded"></div>
                    </div>

                    <p className="text-lg text-gray-600 mb-6">
                        {t('not_found.message')}
                    </p>

                    <div className={`flex justify-center ${isRTL ? "space-x-reverse" : "space-x-4"} space-x-4`}>
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            <Home size={20} />
                            {t("not_found.back_home")}
                        </Link>
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.back();
                            }}
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
                        >
                            <ArrowLeft size={20} />
                            {t('not_found.previous_page')}
                        </Link>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-gray-600">
                        {t('not_found.contact_text')}{' '}
                        <Link href="/" className="hover:text-blue-600 hover:underline">
                            {t('not_found.contact_us')}
                        </Link>
                    </p>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>{t('footer_text', {
                        year: new Date().getFullYear(),
                        app_name: import.meta.env.VITE_APP_NAME 
                    })}</p>
                </div>
            </div>
        </div>
    );
}
