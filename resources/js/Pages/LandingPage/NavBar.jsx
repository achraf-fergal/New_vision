import { useEffect } from "react";
import { ChevronDown, LogIn, UserPlus } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function NavBar({ auth }) {

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



    return (
        <>
            <nav className="fixed w-full top-0 left-0 flex items-center bg-white justify-between border-b border-solid border-b-white px-4 md:px-10 py-4 shadow-md shadow-black/5 z-50">
                {/* Logo Section */}
                <div className="flex items-center gap-4 text-[#1c150d]">
                    <img className="w-12 md:w-16" src="storage/OFPPT_Talk/logo.png" alt="copainslogo" />
                    <h2 className="text-[#1c150d] text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">
                        Copains d&apos;avant
                    </h2>
                </div>

                <div className="hidden md:flex flex-1 justify-end gap-4">
                    <div className="flex items-center gap-6">

                        <a
                            className="text-slate-500  font-medium hover:text-black"
                            onClick={(e) => handleNavigation(e, "home")}
                            href="#home"
                        >
                            Accueil
                        </a>
                        <a
                            className="text-slate-500  font-medium hover:text-black"
                            onClick={(e) => handleNavigation(e, "avis")}
                            href="#avis"
                        >
                            Avis
                        </a>
                        <a
                            className="text-slate-500  font-medium hover:text-black"
                            onClick={(e) => handleNavigation(e, "contact")}
                            href="#contact"
                        >
                            Contact
                        </a>
                    </div>


                    <div className="flex gap-4 justify-end">
                        {
                            !auth.user ?
                                <>
                                    <Link href={route('login')}>
                                        <button className="px-4 py-2 text-[#4834d4] hover:bg-[#4834d4] hover:text-white rounded-md">
                                            <LogIn className="inline mr-2" size={20} />
                                            Connexion
                                        </button>
                                    </Link>

                                    <Link href={route('register')}>
                                        <button className="px-4 py-2 bg-black text-white rounded-md hover:opacity-90">
                                            <UserPlus className="inline mr-2" size={20} />
                                            Inscription
                                        </button>
                                    </Link>
                                </>

                                :
                                <>
                                    <div className="h-8 border-l border-gray-300 dark:border-gray-700"></div>
                                    <div className="flex items-center gap-2">
                                        {
                                            auth.user.imageSRC ?
                                                (
                                                    <img
                                                        src={'/storage/'+auth.user.imageSRC}
                                                        alt={auth.user.nom + "" + auth.user.prenom}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                )
                                                :
                                                (
                                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm ">{auth.user.nom.charAt(0) + "" + auth.user.prenom.charAt(0)}</div>
                                                )
                                        }
                                        <div className='hidden md:flex flex-col text-gray-800'>
                                            <span className="text-sm font-medium cursor-default ">{auth.user.nom} {auth.user.prenom}</span>
                                            <span className="text-xs opacity-70 cursor-default ">{auth.user.fonction}</span>
                                        </div>
                                    </div>
                                </>
                        }

                    </div>
                </div>

            </nav>

        </>
    );
}

