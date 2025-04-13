import { useState } from 'react';
import { CgDanger } from 'react-icons/cg';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';

function Contact() {
    const { data, setData, processing, errors, post, reset } = useForm({
        fullname: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value); // Utilise setData avec la signature correcte
    };


    const sendEmail = (e) => {
        e.preventDefault();


        const emailPromise = new Promise((resolve, reject) => {
            post(route('SendEmail'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    resolve("Email envoyé avec succès !");
                },
                onError: (errors) => {
                    reject("Erreur lors de l'envoi de l'email.");
                },
            });
        });

        toast.promise(emailPromise, {
            loading: 'Envoi en cours...',
            success: (msg) => msg,
            error: (err) => err,
        });
    };

    return (
        <>
            <section id="contact" className="w-full bg-gray-100 pt-40 pb-24 px-4 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-8xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Contact</h2>
                    <form onSubmit={sendEmail} method='post'>
                        <div className="mb-4">
                            <InputLabel htmlFor="fullname" value="Your Full Name*" />
                            <TextInput
                                name="fullname"
                                id="fullname"
                                placeholder="Enter your full name"
                                className="mt-1 block w-full"
                                value={data.fullname}
                                onChange={handleChange}
                            />
                            {
                                errors.fullname && (
                                    <div className="mt-2" >
                                        <CgDanger className="text-base text-red-600 inline " />
                                        <InputError message={errors.fullname} className="mt-2" />
                                    </div>
                                )
                            }
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="Your Email*" />
                            <TextInput
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={handleChange}
                            />
                            {
                                errors.email && (
                                    <div className="mt-2" >
                                        <CgDanger className="text-base text-red-600 inline " />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                )
                            }
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="subject" value="Subject" />
                            <TextInput
                                name="subject"
                                id="subject"
                                placeholder="Enter your subject"
                                className="mt-1 block w-full"
                                value={data.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="message" value="Your message *" />
                            <TextArea
                                name="message"
                                placeholder="Type your text here..."
                                className="w-full border-gray-300"
                                value={data.message}
                                onChange={handleChange}
                            />
                            {
                                errors.message && (
                                    <div className="mt-2" >
                                        <CgDanger className="text-base text-red-600 inline " />
                                        <InputError message={errors.message} className="mt-2" />
                                    </div>
                                )
                            }
                        </div>

                        <button
                            className="btn font-bold mt-4 bg-[black] text-[white] w-32 rounded-lg border border-[black] py-2 px-4 float-right hover:opacity-90 transition-all duration-200"
                            name="send" type="submit" disabled={processing}>
                            {processing ? "Sending..." : "Send Email"}
                        </button>
                    </form>
                </div>
                <Toaster />
            </section>
        </>
    );
}

export default Contact;
