import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";

function Login({ canResetPassword, error }) {
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [locale, setLocale] = useState("");

    const isRTL = i18n.language === "ar";

    const { data, setData, post, processing, reset, clearErrors, get } =
        useForm({
            email: "",
            password: "",
            remember: false,
        });

    const availableLocales = {
        fr: "Français",
        en: "English",
        ar: "العربية",
    };

    const { errors } = usePage().props;

    const toggleLangDropdown = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const closeLangDropdown = () => {
        setIsLangDropdownOpen(false);
    };

    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem("lang", localeKey);
        setLocale(localeKey);
        closeLangDropdown();

        router.post(
            "/change-lang",
            { locale: localeKey },
            {
                preserveScroll: true,
            },
        );
        clearErrors();
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            setLocale(savedLang);
        }
    }, []);

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

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const handleSocial = (Provider) => {
        window.location.href = `/login/${Provider}`;
    };

    useEffect(() => {
        if (errors.NotExists) {
            toast.error(errors.NotExists, {
                icon: "🚧",
            });
        }
    }, [errors]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isLangDropdownOpen &&
                !event.target.closest(".lang-dropdown-container")
            ) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isLangDropdownOpen]);

    return (
        <div
            className={`min-h-screen flex ${isRTL ? "rtl" : ""}`}
            dir={isRTL ? "rtl" : "ltr"}
        >
            <Head title={t("login_title")} />

            <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800"></div>

                <div className="relative w-full flex flex-col justify-center items-center text-white p-12">
                    <h1 className="text-5xl font-bold mb-6">
                        {t("welcome_back")}
                    </h1>
                    <p className="text-xl text-gray-300 text-center max-w-md mb-8">
                        {t("community_description")}
                    </p>

                    <div className="text-center mt-4">
                        <p className="text-white-600 mb-3">
                            {t("dont_have_account")}
                        </p>
                        <Link
                            href={route("register")}
                            className="w-[400px] h-12 border border-white text-white rounded-lg font-semibold hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center"
                        >
                            {t("register_button")}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
                <div className="w-full max-w-md">
                    <div className="flex justify-end mb-4">
                        <div className="relative lang-dropdown-container">
                            <button
                                className="flex items-center gap-1 text-slate-500 font-medium hover:text-black transition-colors"
                                onClick={toggleLangDropdown}
                            >
                                <Globe size={18} />
                                <span>
                                    {availableLocales[i18n.language] ||
                                        "Français"}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {isLangDropdownOpen && (
                                <div
                                    className={`absolute ${isRTL ? "left-0" : "right-0"} top-full mt-2 bg-white shadow-md rounded-md py-1 w-36 z-50`}
                                >
                                    {Object.keys(availableLocales).map(
                                        (localeKey) => (
                                            <button
                                                key={localeKey}
                                                onClick={() =>
                                                    changeLang(localeKey)
                                                }
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${i18n.language === localeKey ? "font-medium text-black" : "text-gray-600"}`}
                                            >
                                                {availableLocales[localeKey]}
                                            </button>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {t("login_title")}
                        </h2>
                        <p className="text-gray-600">{t("login_subtitle")}</p>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => handleSocial("google")}
                            className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-lg hover:bg-white transition-colors"
                        >
                            <FcGoogle size={20} />
                            <span className="text-sm font-medium">
                                {t("login_with_google")}
                            </span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-100 text-gray-600">
                                {t("login_or_continue")}
                            </span>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={`space-y-6 ${isRTL ? "text-right" : ""}`}
                    >
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value={t("email_label")}
                            />
                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                placeholder={t("email_placeholder")}
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                isFocused={true}
                                onChange={handleChange}
                                dir={isRTL ? "rtl" : "ltr"}
                                disabled={processing}
                            />
                            {errors.email && (
                                <div className="mt-2">
                                    <CgDanger
                                        className={`text-base text-red-600 inline ${isRTL ? "ml-1" : "mr-1"}`}
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2 inline"
                                    />
                                    <InputError
                                        message={error}
                                        className="mt-2 inline"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value={t("password_label")}
                            />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder={t("password_placeholder")}
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    dir={isRTL ? "rtl" : "ltr"}
                                    disabled={processing}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                                >
                                    {!showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="mt-2">
                                    <CgDanger
                                        className={`text-base text-red-600 inline ${isRTL ? "ml-1" : "mr-1"}`}
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2 inline"
                                    />
                                </div>
                            )}
                        </div>

                        <div
                            className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    value={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 text-black rounded border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                                />
                                <label
                                    htmlFor="remember"
                                    className={`text-sm text-gray-600 ${isRTL ? "mr-2" : "ml-2"}`}
                                >
                                    {t("remember_me")}
                                </label>
                            </div>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 hover:text-black hover:underline transition-colors"
                                >
                                    {t("forgot_password")}
                                </Link>
                            )}
                        </div>

                        <button
                            disabled={processing}
                            className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 mx-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {t("sign_in_loading")}
                                </>
                            ) : (
                                t("sign_in_button")
                            )}
                        </button>
                    </form>
                    <div className={`mt-2 text-center`}>
                        <span className="text-gray-600">
                            {t("are_you_admin")}
                        </span>
<Link
    href={route("gestionnaire.login")}
    as="a"
    className="ml-2 text-blue-600 hover:underline font-medium"
>
    {t("go_to_admin_login")}
</Link>
                    </div>
                </div>
            </div>

            <Toaster position={isRTL ? "top-left" : "top-center"} />
        </div>
    );
}

export default Login;
