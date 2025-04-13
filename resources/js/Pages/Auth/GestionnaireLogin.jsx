import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        matricule: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("gestionnaire.login"),
            {
                onError: (errors) => {
                    if (errors.ExistsAdmin) {
                        toast.error(errors.ExistsAdmin, {
                            icon: '🚧'
                        })
                    }
                },
            },

        );
    };

    return (
        <div className="min-h-screen flex">
            <Head title="Gestionnaire Login" />
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/background.jpg')] bg-center bg-cover"></div>
                </div>
                <div className="relative w-full flex flex-col justify-center items-center text-white p-12">
                    <h1 className="text-5xl font-bold mb-6">Admin Portal</h1>
                    <p className="text-xl text-gray-300 text-center max-w-md">
                        Secure access for system administrators. Please verify your credentials to continue.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                        <p className="text-gray-600">Please enter your administrator credentials</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="matricule" value={"Matricule"} />
                            <TextInput
                                id="matricule"
                                type="text"
                                name="matricule"
                                placeholder="Enter your matricule"
                                value={data.matricule}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="matricule"
                                aria-label="Matricule"
                                aria-invalid={!!errors.matricule}
                            />
                            {(errors.matricule || errors.ExistsAdmin) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline ml-2 mb-1" />
                                    <InputError message={errors.matricule} />
                                    <InputError message={errors.ExistsAdmin} />
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value={"Password"} />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={!showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                    autoComplete="password"
                                    aria-label="Password"
                                    aria-invalid={!!errors.password}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline ml-2 mb-1" />
                                    <InputError message={errors.password} />
                                </div>
                            )}
                        </div>

                        <button
                            disabled={processing}
                            className="w-full h-12 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Loading...
                                </>
                            ) : (
                                "Access Admin Portal"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}

export default AdminLogin;
