import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";

function AdminLogin() {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            login: "",
            password: "",
        });

    const [showPassword, setShowPassword] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("gestionnaire.login"), {
            onError: (errors) => {
                if (errors.ExistsAdmin) {
                    toast.error(errors.ExistsAdmin, {
                        icon: "🚧",
                    });
                }
            },
        });
    };

    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [locale, setLocale] = useState("");

    const isRTL = i18n.language === "ar";

    const availableLocales = {
        fr: "Français",
        en: "English",
        ar: "العربية",
    };

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
        clearErrors();

        router.post(
            "/change-lang",
            { locale: localeKey },
            {
                preserveScroll: true,
            },
        );
        reset();
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            setLocale(savedLang);
        }
    }, []);

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
        <div className="min-h-screen flex" dir={isRTL ? "rtl" : "ltr"}>
            <Head title={t("admin_login.title")} />
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/background.jpg')] bg-center bg-cover"></div>
                </div>
                <div className="relative w-full flex flex-col justify-center items-center text-white p-12">
                    <h1 className="text-5xl font-bold mb-6">
                        {t("admin_login.portal_title")}
                    </h1>
                    <p className="text-xl text-gray-300 text-center max-w-md">
                        {t("admin_login.portal_description")}
                    </p>
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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {t("admin_login.title")}
                        </h2>
                        <p className="text-gray-600">
                            {t("admin_login.subtitle")}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="login"
                                value={t("admin_login.matricule")}
                            />
                            <TextInput
                                id="login"
                                type="text"
                                name="login"
                                placeholder={t(
                                    "admin_login.matricule_placeholder",
                                )}
                                value={data.login}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                aria-label={t("admin_login.matricule")}
                                aria-invalid={!!errors.login}
                            />
                            {(errors.login || errors.ExistsAdmin) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline ml-2 mb-1" />
                                    <InputError message={errors.login} />
                                    <InputError message={errors.ExistsAdmin} />
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value={t("admin_login.password")}
                            />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={!showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder={t(
                                        "admin_login.password_placeholder",
                                    )}
                                    value={data.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                    autoComplete="password"
                                    aria-label={t("admin_login.password")}
                                    aria-invalid={!!errors.password}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                    }}
                                    className={`absolute ${isRTL ? "left-4 " : "right-4 "} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 `}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline ml-2 mb-1" />
                                    <InputError message={errors.password} />
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
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 hover:text-black hover:underline transition-colors"
                            >
                                {t("forgot_password")}
                            </Link>
                        </div>

                        <button
                            disabled={processing}
                            className="w-full h-12 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    {t("admin_login.loading")}
                                </>
                            ) : (
                                t("admin_login.button")
                            )}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">
                            {t("want_to_login_as_user")}
                        </span>
                        <Link
                            href={route("login")}
                            className="ml-2 text-blue-600 hover:underline font-medium"
                        >
                            {t("go_to_user_login")}
                        </Link>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}

export default AdminLogin;
