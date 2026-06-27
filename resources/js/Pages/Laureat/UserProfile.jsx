import Dashboard from "@/Layouts/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import PhotoProfile from "./Profile/UpdateProfilePhoto";
import { ArrowLeft } from "lucide-react";
import InformationsPersonnelles from "./Profile/UpdateInfoPerso";
import UpdatePassword from "./Profile/UpdatePassword";
import { useTranslation } from "react-i18next";
import { t } from "i18next";


function IndexProfile() {
    const { user } = usePage().props;
    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    return (
        <div className={`pt-8 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center">
                <Link
                    href={route('dashboard')}
                    className="text-gray-500 hover:text-gray-800"
                    title={t('profile.back_button')}
                >
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className={`text-2xl font-bold text-gray-800 ${i18n.language === 'ar' ? 'transform rotate-180' : ''}`} />
                    </button>
                </Link>
                <h1 className='text-2xl font-bold text-gray-800'>
                    {t('profile.title')}
                </h1>
            </div>

            <PhotoProfile user={user} />
            <InformationsPersonnelles user={user} />
            <UpdatePassword user={user} />
        </div>
    );
}

IndexProfile.layout = page => <Dashboard children={page} title={t('profile.title')} />;

export default IndexProfile;