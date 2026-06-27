import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    ChartLine,
    ChevronDown,
    Clock,
    Globe,
    LayoutDashboard,
    LogOut,
    Menu,
    UserCheck,
    UserCog,
    UserPlus,
    UserX,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Dashboard = ({ children, title }) => {
    const { auth } = usePage().props;
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

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
        closeLangDropdown();
        setIsMobileMenuOpen(false);
        router.post(
            "/change-lang",
            { locale: localeKey },
            {
                preserveScroll: true,
            },
        );
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang && availableLocales[savedLang]) {
            i18n.changeLanguage(savedLang);
        }
    }, [i18n]);

    useEffect(() => {
        const handleRouteChange = () => {
            closeMobileMenu();
        };
        router.on("navigate", handleRouteChange);
        return () => {
            router.off("navigate", handleRouteChange);
        };
    }, []);

    const navLinks = [

        {
            routeName: "laureat.accepted",
            titleKey: "Gestionnaire.laureat.accepted_title",
            icon: UserCheck,
            labelKey: "Gestionnaire.NavBar.users_accepted",
            role: "any",
        },
        {
            routeName: "laureat.blocked",
            titleKey: "Gestionnaire.laureat.blocked_title",
            icon: UserX,
            labelKey: "Gestionnaire.NavBar.users_blocked",
            role: "any",
        },
        {
            routeName: "Superadmin.manage",
            titleKey: "Gestionnaire.admin.title",
            icon: UserPlus,
            labelKey: "Gestionnaire.NavBar.admin_management",
            role: "superadmin",
        },
        {
            routeName: "profile.edit",
            titleKey: "Gestionnaire.profile.title",
            icon: UserCog,
            labelKey: "my_profile",
            role: "any",
        },
    ];

    const renderNavLinks = (isMobile = false) =>
        navLinks.map((link) => {
            if (link.role === "superadmin" && auth.user.role !== "superadmin") {
                return null;
            }
            return (
                <Link
                    key={link.routeName}
                    href={route(link.routeName)}
                    className={`flex items-center gap-2 text-sm font-semibold transition duration-300 hover:text-black
                            ${title === t(link.titleKey) ? "text-black" : "text-gray-500"}
                            ${isMobile ? "px-4 py-3 text-base hover:bg-gray-100 w-full" : ""}`}
                    onClick={isMobile ? closeMobileMenu : undefined}
                >
                    <link.icon className="w-4 h-4" />
                    {t(link.labelKey)}
                </Link>
            );
        });

    return (
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <Head title={title} />

            <nav className="fixed w-full top-0 left-0 flex items-center bg-white justify-between border-b border-solid border-gray-200 px-4 md:px-10 py-4 shadow-md shadow-black/5 z-50">
                <div className="flex items-center gap-4 text-[#1c150d]">
                    <Link
                        href={route("gestionnaire.dashboard")}
                        className="flex items-center gap-2"
                    >
                         <span className="text-xl font-bold text-white">NV</span>
                        <h2 className="hidden sm:block text-[#1c150d] text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">
                            {import.meta.env.VITE_APP_NAME}
                        </h2>
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-6">
                    {renderNavLinks()}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className="relative lang-dropdown-container">
                        <button
                            className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black transition-colors py-2"
                            onClick={toggleLangDropdown}
                        >
                            <Globe className="w-4 h-4" />
                            <span className="hidden lg:inline">
                                {availableLocales[i18n.language] || "Français"}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isLangDropdownOpen && (
                            <div
                                className={`absolute top-full mt-2 bg-white shadow-lg rounded-md py-1 w-36 z-50 ${i18n.language === "ar" ? "left-0" : "right-0"}`}
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
                    <div className="h-8 border-l border-gray-300"></div>
                    <Link
                        href={route("gestionnaire.logout")}
                        method="POST"
                        as="button"
                        className="flex items-center gap-2 text-sm font-semibold transition duration-300 px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden lg:inline">{t("logout")}</span>
                        <span className="lg:hidden">
                            {t("logout_short", "Exit")}
                        </span>
                    </Link>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-600 hover:text-black p-2"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div
                    className={`md:hidden fixed inset-0 top-[calc(4rem+1px)] bg-white z-40 shadow-xl overflow-y-auto transition-transform transform ${i18n.language === "ar" ? (isMobileMenuOpen ? "translate-x-0" : "translate-x-full") : isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex flex-col items-start py-4">
                        {renderNavLinks(true)}

                        <div className="w-full px-4 mt-4">
                            <div className="relative lang-dropdown-container-mobile w-full">
                                <button
                                    className="flex items-center justify-between gap-1 text-base font-semibold text-gray-600 hover:text-black transition-colors py-3 px-4 bg-gray-50 rounded-md w-full"
                                    onClick={toggleLangDropdown}
                                >
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5" />
                                        <span>
                                            {availableLocales[i18n.language] ||
                                                "Français"}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        size={20}
                                        className={`transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isLangDropdownOpen && (
                                    <div className="mt-1 bg-white shadow-md rounded-md py-1 w-full border border-gray-200">
                                        {Object.keys(availableLocales).map(
                                            (localeKey) => (
                                                <button
                                                    key={localeKey}
                                                    onClick={() =>
                                                        changeLang(localeKey)
                                                    }
                                                    className={`w-full text-left px-4 py-3 text-base hover:bg-gray-100 ${i18n.language === localeKey ? "font-semibold text-black" : "text-gray-700"}`}
                                                >
                                                    {
                                                        availableLocales[
                                                            localeKey
                                                        ]
                                                    }
                                                </button>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full px-4 mt-6">
                            <Link
                                href={route("gestionnaire.logout")}
                                method="POST"
                                as="button"
                                className="flex items-center justify-center w-full gap-2 text-base font-semibold transition duration-300 px-3 py-3 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-md"
                                onClick={closeMobileMenu}
                            >
                                <LogOut className="w-5 h-5" />
                                {t("logout")}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`pt-20 md:pt-28 min-h-screen bg-gray-100 ${isMobileMenuOpen && "md:backdrop-blur-none"}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Dashboard;
