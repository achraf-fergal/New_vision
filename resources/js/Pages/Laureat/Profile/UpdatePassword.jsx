
import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function UpdatePassword({ user }) {
    const { t, i18n } = useTranslation();

    const { data, setData, processing, errors, post, reset , clearErrors} = useForm({
        id: user.id,
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

    useEffect(()=>{
        clearErrors();
    },[i18n.language])

    const handlesubmit = (e) => {
        e.preventDefault();
        post(route('laureat.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(t('passwordUpdated'));
            }
        });
    };

    return (
        <div className="mb-6 bg-white shadow sm:rounded-lg sm:p-8">
        
            <h2 className="text-xl font-semibold mb-6">{t('personalInfo')}</h2>

            <div className='mb-6'>
                <InputLabel htmlFor='current_password' value={t('currentPassword')} />
                <TextInput
                    id='current_password'
                    name='current_password'
                    type='password'
                    className="mt-1 block w-full"
                    placeholder={t('enterCurrentPassword')}
                    value={data.current_password}
                    onChange={handlechange}
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

            <div className="grid md:grid-cols-2 gap-6 mb-3">
                <div>
                    <InputLabel htmlFor='password' value={t('newPassword')} />
                    <TextInput
                        id='password'
                        name='password'
                        type='password'
                        className="mt-1 block w-full"
                        placeholder={t('enterNewPassword')}
                        value={data.password}
                        onChange={handlechange}
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
                    <InputLabel htmlFor='password_confirmation' value={t('confirmPassword')} />
                    <TextInput
                        id='password_confirmation'
                        name='password_confirmation'
                        type='password' 
                        className="mt-1 block w-full"
                        placeholder={t('confirmYourPassword')}
                        value={data.password_confirmation}
                        onChange={handlechange}
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
            </div>

            {
                (data.password || data.password_confirmation || data.current_password) && (
                    <>
                        <div className="flex justify-end gap-2 w-full">
                            <button
                                onClick={handlesubmit}
                                className="px-6 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                                <Save size={20} />
                                {t('save')}
                            </button>
                            <button
                                onClick={() => {
                                    reset();
                                }}
                                className="px-6 py-2 mt-4 rounded-lg transition duration-300 bg-red-600 text-white hover:bg-red-700 flex items-center gap-2">
                                <X size={20} />
                                {t('cancel')}
                            </button>
                        </div>
                    </>
                )
            }
            <Toaster />
        </div>
    );
}