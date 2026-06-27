import { useEffect, useState } from 'react';
import { CgDanger } from 'react-icons/cg';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import { useTranslation } from "react-i18next";

function Contact() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';


    const { data, setData, processing, errors, post, reset, clearErrors } = useForm({
        fullname: "",
        email: "",
        subject: "",
        message: "",
    });


    useEffect(() => {
        clearErrors();
    }, [isRTL])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const emailPromise = new Promise((resolve, reject) => {
            post(route('SendEmail'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    resolve(t('email_sent_success'));
                },
                onError: (errors) => {
                    reject(t('email_sent_error'));
                },
            });
        });

        toast.promise(emailPromise, {
            loading: t('sending'),
            success: (msg) => msg,
            error: (err) => err,
        });
    };

    return (
        <>
            <section id="contact" className="w-full bg-gray-100 pt-40 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-8xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">{t('contact_title')}</h2>
                    <form onSubmit={sendEmail} method='post' className={isRTL ? "text-right" : ""}>
                        <div className="mb-4">
                            <InputLabel htmlFor="fullname" value={t('fullname_label')} />
                            <TextInput
                                name="fullname"
                                id="fullname"
                                placeholder={t('fullname_placeholder')}
                                className="mt-1 block w-full"
                                value={data.fullname}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {
                                errors.fullname && (
                                    <div className={`mt-2 ${isRTL ? "text-right" : ""}`}>
                                        {
                                            !isRTL && (
                                                <CgDanger className="text-base text-red-600 inline" />
                                            )
                                        }
                                        <InputError message={errors.fullname} className="mt-2" />
                                        {
                                            isRTL && (
                                                <CgDanger className="text-base text-red-600 inline" />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value={t('email_label')} />
                            <TextInput
                                name="email"
                                id="email"
                                placeholder={t('email_placeholder')}
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {
                                errors.email && (
                                    <div className={`mt-2 ${isRTL ? "text-right" : ""}`}>
                                        {
                                            !isRTL && (
                                                <CgDanger className="text-base text-red-600 inline" />
                                            )
                                        }
                                        <InputError message={errors.email} className="mt-2" />
                                        {
                                            isRTL && (
                                                <CgDanger className="text-base text-red-600 inline" />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="subject" value={t('subject_label')} />
                            <TextInput
                                name="subject"
                                id="subject"
                                placeholder={t('subject_placeholder')}
                                className="mt-1 block w-full"
                                value={data.subject}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="message" value={t('message_label')} />
                            <TextArea
                                name="message"
                                placeholder={t('message_placeholder')}
                                className="w-full border-gray-300"
                                value={data.message}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                            />
                            {
                                errors.message && (
                                    <div className={`mt-2 ${isRTL ? "text-right" : ""}`}>
                                        {
                                            !isRTL && (
                                                <CgDanger className="text-base text-red-600 inline" />
                                            )
                                        }
                                        <InputError message={errors.message} className="mt-2" />
                                        {
                                            isRTL && (
                                                <CgDanger className="text-base text-red-600 inline" />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <button
                            className={`btn font-bold mt-4 bg-[black] text-[white] w-32 rounded-lg border border-[black] py-2 px-4 transition-all duration-200 hover:opacity-90 ${isRTL ? "float-left" : "float-right"}`}
                            name="send"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? t('sending_button') : t('send_button')}
                        </button>
                    </form>
                </div>
                <Toaster
                    position={isRTL ? "top-left" : "top-right"}
                />
            </section>
        </>
    );
}

export default Contact;
