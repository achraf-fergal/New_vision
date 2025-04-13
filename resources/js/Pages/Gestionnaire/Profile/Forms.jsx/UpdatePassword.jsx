import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function UpdatePassword({ Admin }) {

    const { data, setData, processing, errors, post, reset } = useForm({
        id: Admin.id,
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const handlechange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        post(route('gestionnaire.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Mot de passe mis à jour avec succès');
            }
        });
    }


    console.log(errors)
    return (

        <div className="bg-white shadow sm:rounded-lg sm:p-8">
            <h2 className="text-xl font-semibold mb-4">
                Modifier Password
            </h2>

            <div className='mb-4'>
                <InputLabel htmlFor='current_password' value='Cureent Password' />
                <TextInput
                    id='current_password'
                    name='current_password'
                    type='password'
                    className='w-1/2'
                    placeholder='Enter your current password'
                    value={data.current_password}
                    onChange={handlechange}
                />
                {
                    errors.current_password && (
                        <div className="mt-2" >
                            <CgDanger className="text-base text-red-600 inline " />
                            <InputError message={errors.current_password} className="mt-2" />
                        </div>
                    )
                }
            </div>

            <div className='mb-4'>
                <InputLabel htmlFor='password' value='New Password' />
                <TextInput
                    id='password'
                    name='password'
                    type='password'
                    className='w-1/2'
                    placeholder='Enter your new password'
                    value={data.password}
                    onChange={handlechange}
                />
                {
                    (errors.password || errors.CheckPassword) && (
                        <div className="mt-2" >
                            <CgDanger className="text-base text-red-600 inline " />
                            <InputError message={errors.password} className="mt-2" />
                            <InputError message={errors.CheckPassword} className="mt-2" />
                        </div>
                    )
                }
            </div>

            <div>
                <InputLabel htmlFor='password_confirmation' value='Confirm Password' />
                <TextInput
                    id='password_confirmation'
                    name='password_confirmation'
                    type='text'
                    className='w-1/2'
                    placeholder='Confirm your new password'
                    value={data.password_confirmation}
                    onChange={handlechange}
                />
                {
                    errors.password_confirmation && (
                        <div className="mt-2" >
                            <CgDanger className="text-base text-red-600 inline " />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    )
                }
            </div>
            {
                (data.password || data.password_confirmation || data.current_password) && (
                    <>
                        <div className="flex justify-end gap-2 w-1/2 ">
                            <button
                                onClick={() => {
                                    reset();
                                }}
                                className=" px-6 py-2 mt-4 rounded-lg transition duration-300 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2">
                                <X size={20} />
                                Annuler
                            </button>
                            <button
                                onClick={handlesubmit}
                                className="px-6 py-2 mt-4 bg-black text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                                <Save size={20} />
                                Enregistrer
                            </button>
                        </div>
                    </>
                )
            }
            <Toaster />
        </div>
    )
}
