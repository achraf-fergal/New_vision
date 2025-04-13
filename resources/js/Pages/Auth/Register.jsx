import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

function SignUpSTEP1({InitialData}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: (InitialData)?InitialData.nom:"",
        prenom: (InitialData)?InitialData.prenom:"",
        password: "",
        password_confirmation: "",
        email: (InitialData)?InitialData.email:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route("register"));
    };

    const handleReset=()=>{
        reset();
    }


    const handleRedirect = () => {
        setTimeout(() => {
            // Pour Verifier Si section Contact Exists
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); // Delay apres direction sur page home pour donner section contact
    };


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <Head title={"Register 1"} />
            <div className="w-11/12">
                <h1 className="mb-6 font-bold text-5xl">Sign Up Now</h1>
                <p className="mb-4 font-bold text-black/50">Step One of Two</p>
                <div className="bg-green-200 text-green-800 w-12 h-12 rounded-lg text-center py-2">
                    <span className="font-bold text-xl">1</span>
                </div>
                <form onSubmit={handleSubmit} className="mt-14">
                    <div className="flex flex-row space-x-5">
                        <div className="mb-6 w-1/2">

                            <InputLabel htmlFor="prenom" value="Prenom *" />
                            <TextInput
                                id="prenom"
                                type="text"
                                name="prenom"
                                placeholder="Enter your prenom"
                                value={data.prenom}
                                className="mt-1 block w-full"
                                autoComplete="lastname"
                                isFocused={true}
                                onChange={handleChange}
                            />

                            {(errors.prenom) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline " />
                                    <InputError message={errors.prenom} className="mt-2" />
                                </div>
                            )}

                        </div>
                        <div className="mb-6 w-1/2" style={{ marginLeft: "5%" }}>
                            <InputLabel htmlFor="nom" value="Nom *" />
                            <TextInput
                                id="nom"
                                type="text"
                                name="nom"
                                placeholder="Enter your nom"
                                value={data.nom}
                                className="mt-1 block w-full"
                                autoComplete="firstname"
                                isFocused={true}
                                onChange={handleChange}
                            />

                            {(errors.nom) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline" />
                                    <InputError message={errors.nom} className="mt-2" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div className="mb-6 w-1/2">

                            <InputLabel htmlFor="password" value="Mot de Passe *" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                            />

                            {
                                (errors.password) ?
                                    (data.password === "") ?
                                        <div className="mt-2">
                                            <CgDanger className="text-red-600 inline" />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        : (!validatePassword(data.password).isValid) ?
                                            validatePassword(data.password).messages.map((message) => {
                                                return (
                                                    <div className="mt-2">
                                                        <CgDanger className="text-red-600 inline" />
                                                        <InputError message={message} className="mt-2" />
                                                    </div>
                                                )
                                            })
                                            : null
                                    : null
                            }

                        </div>
                        <div className="mb-6 w-1/2" style={{ marginLeft: "5%" }}>

                            <InputLabel htmlFor="re-password" value="Re-Saisir Mot de Passe *" />
                            <TextInput
                                id="re-password"
                                type="text"
                                name="password_confirmation"
                                placeholder="Verify your password"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                            />
                            {
                                (errors.password) ?
                                    (data.password_confirmation !== data.password) &&
                                    <div className="mt-2">
                                        <CgDanger className="text-red-600 inline" />
                                        <InputError message={"Les mots de passe ne correspondent pas"} className="mt-2" />
                                    </div>
                                    : null
                            }

                        </div>
                    </div>
                    <div className="mb-6">

                        <InputLabel htmlFor="email" value="Email *" />
                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            isFocused={true}
                            onChange={handleChange}
                        />
                        {(errors.email || errors.ExistsEmail) && (
                            <div className="mt-2">
                                <CgDanger className="text-red-600 inline" />
                                <InputError message={errors.email} className="mt-2" />
                                <InputError message={errors.ExistsEmail} className="mt-2" />
                            </div>
                        )}

                    </div>
                    <div className="flex flex-row justify-between items-center mt-5">
                        <p className="text-gray-500">Any Questions? <Link to="/" className="text-gray-500 hover:underline" onClick={handleRedirect}>Contact Us</Link></p>
                        <div className="flex space-x-3">
                            <button type="reset" className="px-4 py-2 bg-gray-300 text-[#1c150d] font-bold rounded-lg border border-gray-300 hover:opacity-80" onClick={handleReset} >Reset</button>
                            <button type="submit" className="px-4 py-2 bg-[black] text-[white] font-bold rounded-lg border border-[black] hover:opacity-80 disabled:cursor-not-allowed " disabled={processing}>Continue</button>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

export default SignUpSTEP1;


const validatePassword = (password) => {
    const requirements = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const messages = [
        !requirements.minLength && "Mot de passe doit contenir au moins 8 caractères",
        !requirements.hasUppercase && "Mot de passe doit contenir au moins une majuscule",
        !requirements.hasLowercase && "Mot de passe doit contenir au moins une minuscule",
        !requirements.hasNumber && "Mot de passe doit contenir au moins un chiffre",
        !requirements.hasSpecialChar && "Mot de passe doit contenir au moins un caractère spécial",
    ].filter(Boolean);

    return {
        isValid: messages.length === 0,
        messages
    };
};

