import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

function Login({ canResetPassword, error }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password')
        });
    };

    const handleSocial = () => {
        toast('Coming soon!', { icon: '🚧' });
    };

    useEffect(() => {
        if (errors.NotExists) {
            toast.error(errors.NotExists, {
                icon: '🚧'
            });
        }
    },[errors])

    
    return (
        <div className="min-h-screen flex">
            <Head title="Log In" />

            <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800">
                </div>

                <div className="relative w-full flex flex-col justify-center items-center text-white p-12">
                    <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
                    <p className="text-xl text-gray-300 text-center max-w-md mb-8">
                        Join our community of professionals and take your career to the next level.
                    </p>
                    <div className="flex gap-6 mt-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">10K+</div>
                            <div className="text-gray-400">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-gray-400">Companies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">98%</div>
                            <div className="text-gray-400">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign IN</h2>
                        <p className="text-gray-600">Please enter your details to continue</p>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={handleSocial}
                            className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-lg hover:bg-white transition-colors"
                        >
                            <FcGoogle size={20} />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button
                            onClick={handleSocial}
                            className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-lg hover:bg-white transition-colors"
                        >
                            <BsGithub size={20} />
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                        <button
                            onClick={handleSocial}
                            className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-lg hover:bg-white transition-colors"
                        >
                            <BsLinkedin size={20} className="text-[#0077b5]" />
                            <span className="text-sm font-medium">LinkedIn</span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-100 text-gray-600">or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                isFocused={true}
                                onChange={handleChange}
                            />
                            {
                                errors.email && (
                                    <div className="mt-2" >
                                        <CgDanger className="text-base text-red-600 inline " />
                                        <InputError message={errors.email} className="mt-2" />
                                        <InputError message={error} className="mt-2" />
                                    </div>
                                )
                            }

                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {!showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                            {errors.password &&
                                <div className="mt-2">
                                    <CgDanger className="text-base text-red-600 inline " />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                            }
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-black rounded border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            {
                                canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-gray-600 hover:text-black hover:underline transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                )
                            }
                        </div>

                        <button
                            disabled={processing}
                            className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 mx-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Loading...
                                </>

                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                </div>
            </div>

            <Toaster position="top-center" />
        </div>
    );
};

export default Login;


