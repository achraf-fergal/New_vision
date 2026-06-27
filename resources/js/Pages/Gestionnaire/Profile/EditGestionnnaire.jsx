import { useEffect, useState } from 'react';
import { User, Camera, Save, X, Edit2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Dashboard from '@/Layouts/DashboardGestionnaireLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InformationsPersonnelles from './Forms.jsx/UpdateProfileInformation';
import PhotoProfile from './Forms.jsx/UpdatePhotoProfile';
import UpdatePassword from './Forms.jsx/UpdatePassword';
import { t } from 'i18next';

function EditProfile({ Admin }) {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-100 pb-8 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {t('Gestionnaire.profile.edit_title')}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {t('Gestionnaire.profile.edit_description')}
                        </p>
                    </div>
                </div>
                <div className="py-8">
                    <PhotoProfile Admin={Admin} />
                    <InformationsPersonnelles Admin={Admin} />
                    <UpdatePassword Admin={Admin} />
                </div>
            </div>
            <Toaster />
        </div>
    );
}

EditProfile.layout = page => <Dashboard children={page} title={t('Gestionnaire.profile.title')} />;

export default EditProfile;
