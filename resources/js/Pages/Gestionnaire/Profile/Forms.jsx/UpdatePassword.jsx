import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useTranslation } from 'react-i18next';

export default function UpdatePassword({ Admin }) {
    const { t, i18n } = useTranslation();

    const { data, setData, processing, errors, post, reset } = useForm({
        id: Admin.id,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handlechange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        post(route('gestionnaire.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(t('Gestionnaire.profile.password_updated'));
            }
        });
    };


    return (
        <div className="bg-white shadow sm:rounded-lg sm:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {t('Gestionnaire.profile.password.title')}
                </h2>
            </div>

            <div className={`${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className='mb-4'>
                    <InputLabel htmlFor='current_password' value={t('Gestionnaire.profile.password.current')} />
                    <TextInput
                        id='current_password'
                        name='current_password'
                        type='password'
                        className='w-1/2'
                        placeholder={t('Gestionnaire.profile.password.enter_current')}
                        value={data.current_password}
                        onChange={handlechange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        errors.current_password && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={errors.current_password} className="mt-2" />
                            </div>
                        )
                    }
                </div>

                <div className='mb-4'>
                    <InputLabel htmlFor='password' value={t('Gestionnaire.profile.password.new')} />
                    <TextInput
                        id='password'
                        name='password'
                        type='password'
                        className='w-1/2'
                        placeholder={t('Gestionnaire.profile.password.enter_new')}
                        value={data.password}
                        onChange={handlechange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        (errors.password || errors.CheckPassword) && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={errors.password} className="mt-2" />
                                <InputError message={errors.CheckPassword} className="mt-2" />
                            </div>
                        )
                    }
                </div>

                <div>
                    <InputLabel htmlFor='password_confirmation' value={t('Gestionnaire.profile.password.confirm')} />
                    <TextInput
                        id='password_confirmation'
                        name='password_confirmation'
                        type='password'
                        className='w-1/2'
                        placeholder={t('Gestionnaire.profile.password.enter_confirm')}
                        value={data.password_confirmation}
                        onChange={handlechange}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    />
                    {
                        errors.password_confirmation && (
                            <div className="mt-2">
                                <CgDanger className="text-base text-red-600 inline" />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        )
                    }
                </div>
                {
                    (data.password || data.password_confirmation || data.current_password) && (
                        <div className={`flex ${i18n.language === 'ar' ? 'justify-start' : 'justify-end'} gap-2 w-1/2`}>
                            <button
                                onClick={() => {
                                    reset();
                                }}
                                className="px-6 py-2 mt-4 rounded-lg transition duration-300 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2">
                                <X size={20} />
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handlesubmit}
                                className="px-6 py-2 mt-4 bg-black text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                                <Save size={20} />
                                {t('save')}
                            </button>
                        </div>
                    )
                }
            </div>
            <Toaster />
        </div>
    );
}
