import { useEffect, useState } from "react";
import { ChevronDown, LogIn, UserPlus, Menu, X, Globe } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function NavBar({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [locale, setLocale] = useState('');

    const availableLocales = {
        'fr': 'Français',
        'en': 'English',
        'ar': 'العربية'
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLangDropdown = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const closeLangDropdown = () => {
        setIsLangDropdownOpen(false);
    };

    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem('lang', localeKey);
        setLocale(localeKey);
        closeLangDropdown();
        setIsMenuOpen(false);

        router.post('/change-lang', { locale: localeKey }, {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            i18n.changeLanguage(savedLang);
            setLocale(savedLang);
        }
    }, []);

    const clearActiveLinks = () => {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.classList.remove('text-black'));
    };

    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    clearActiveLinks();
                    const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('text-black');
                        activeLink.classList.remove('text-slate-500');
                    }
                }
                else {
                    const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.remove('text-black');
                        activeLink.classList.add('text-slate-500');
                    }
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isLangDropdownOpen && !event.target.closest('.lang-dropdown-container')) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isLangDropdownOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className="fixed w-full top-0 left-0 flex items-center bg-white justify-between border-b border-solid border-b-white px-4 md:px-10 py-4 shadow-md shadow-black/5 z-50">
                <div className="flex items-center gap-4 text-[#1c150d]">
                    <img className="w-10 md:w-12 lg:w-16" src="storage/OFPPT_Talk/logo.png" alt="copainslogo" />
                    <h2 className="text-[#1c150d] text-sm md:text-base lg:text-lg font-bold leading-tight tracking-[-0.015em]">
                        {import.meta.env.VITE_APP_NAME || "Default Project Name"}
                    </h2>
                </div>

                <div className="hidden md:flex flex-1 justify-end gap-4">
                    <div className="flex items-center gap-6">
                        <a
                            className="nav-link text-slate-500 font-medium hover:text-black transition-colors"
                            onClick={(e) => handleNavigation(e, "home")}
                            href="#home"
                        >
                            {t('home')}
                        </a>
                        <a
                            className="nav-link text-slate-500 font-medium hover:text-black transition-colors"
                            onClick={(e) => handleNavigation(e, "avis")}
                            href="#avis"
                        >
                            {t('reviews')}
                        </a>
                        <a
                            className="nav-link text-slate-500 font-medium hover:text-black transition-colors"
                            onClick={(e) => handleNavigation(e, "contact")}
                            href="#contact"
                        >
                            {t('contact')}
                        </a>

                        <div className="relative lang-dropdown-container">
                            <button
                                className="flex items-center gap-1 text-slate-500 font-medium hover:text-black transition-colors"
                                onClick={toggleLangDropdown}
                            >
                                <Globe size={18} />
                                <span>{availableLocales[locale] || 'Français'}</span>
                                <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isLangDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md py-1 w-36 z-50">
                                    {Object.keys(availableLocales).map((localeKey) => (
                                        <button
                                            key={localeKey}
                                            onClick={() => changeLang(localeKey)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${locale === localeKey ? 'font-medium text-black' : 'text-gray-600'}`}
                                        >
                                            {availableLocales[localeKey]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end">
                        {!auth.user ? (
                            <>
                                <Link href={route('login')}>
                                    <button className="px-4 py-2 text-[#4834d4] hover:bg-[#4834d4] hover:text-white rounded-md transition-colors">
                                        <LogIn className="inline mr-2" size={20} />
                                        {t('login')}
                                    </button>
                                </Link>

                                <Link href={route('register')}>
                                    <button className="px-4 py-2 bg-black text-white rounded-md hover:opacity-90 transition-opacity">
                                        <UserPlus className="inline mr-2" size={20} />
                                        {t('register')}
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="h-8 border-l border-gray-300 dark:border-gray-700"></div>
                                <div className="flex items-center gap-2">
                                    {auth.user.imageSRC ? (
                                        <img
                                            src={'/storage/' + auth.user.imageSRC}
                                            alt={auth.user.nom + " " + auth.user.prenom}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                                            {auth.user.nom.charAt(0) + auth.user.prenom.charAt(0)}
                                        </div>
                                    )}
                                    <div className='hidden md:flex flex-col text-gray-800'>
                                        <span className="text-sm font-medium cursor-default">{auth.user.nom} {auth.user.prenom}</span>
                                        <span className="text-xs opacity-70 cursor-default">{auth.user.fonction}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <div className="relative lang-dropdown-container">
                        <button
                            className="flex items-center gap-1 text-slate-500 p-2 rounded-full hover:bg-gray-100"
                            onClick={toggleLangDropdown}
                        >
                            <Globe size={20} />
                        </button>

                        {isLangDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md py-1 w-36 z-50">
                                {Object.keys(availableLocales).map((localeKey) => (
                                    <button
                                        key={localeKey}
                                        onClick={() => changeLang(localeKey)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${locale === localeKey ? 'font-medium text-black' : 'text-gray-600'}`}
                                    >
                                        {availableLocales[localeKey]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="text-gray-600 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMenu}
                ></div>
            )}

            <div
                className={`md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } pt-20 px-6 overflow-y-auto shadow-lg`}
            >
                <div className="flex flex-col gap-6">
                    <a
                        className="nav-link text-slate-500 font-medium hover:text-black py-3 border-b border-gray-100"
                        onClick={(e) => handleNavigation(e, "home")}
                        href="#home"
                    >
                        {t('home')}
                    </a>
                    <a
                        className="nav-link text-slate-500 font-medium hover:text-black py-3 border-b border-gray-100"
                        onClick={(e) => handleNavigation(e, "avis")}
                        href="#avis"
                    >
                        {t('reviews')}
                    </a>
                    <a
                        className="nav-link text-slate-500 font-medium hover:text-black py-3 border-b border-gray-100"
                        onClick={(e) => handleNavigation(e, "contact")}
                        href="#contact"
                    >
                        {t('contact')}
                    </a>

                    <div className="py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe size={18} className="text-slate-500" />
                            <span className="font-medium text-slate-500">{t('language')}</span>
                        </div>
                        <div className="flex flex-col gap-2 pl-6">
                            {Object.keys(availableLocales).map((localeKey) => (
                                <button
                                    key={localeKey}
                                    onClick={() => changeLang(localeKey)}
                                    className={`text-left py-1 ${locale === localeKey ? 'font-medium text-black' : 'text-gray-600'}`}
                                >
                                    {availableLocales[localeKey]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        {!auth.user ? (
                            <>
                                <Link href={route('login')}>
                                    <button className="w-full px-4 py-3 text-[#4834d4] border border-[#4834d4] hover:bg-[#4834d4] hover:text-white rounded-md flex items-center justify-center">
                                        <LogIn className="mr-2" size={20} />
                                        {t('login')}
                                    </button>
                                </Link>

                                <Link href={route('register')}>
                                    <button className="w-full px-4 py-3 bg-black text-white rounded-md hover:opacity-90 flex items-center justify-center">
                                        <UserPlus className="mr-2" size={20} />
                                        {t('register')}
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 py-4 border-t border-gray-100 mt-4">
                                {auth.user.imageSRC ? (
                                    <img
                                        src={'/storage/' + auth.user.imageSRC}
                                        alt={auth.user.nom + " " + auth.user.prenom}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-lg">
                                        {auth.user.nom.charAt(0) + auth.user.prenom.charAt(0)}
                                    </div>
                                )}
                                <div className='flex flex-col text-gray-800'>
                                    <span className="text-sm font-medium">{auth.user.nom} {auth.user.prenom}</span>
                                    <span className="text-xs opacity-70">{auth.user.fonction}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
