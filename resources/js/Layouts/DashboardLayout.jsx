import React, { useState, useEffect, useRef } from "react";
import { Home, Bookmark, Users, Settings, TrendingUp, Tag, Filter, Bell, LogOut, PlusCircle, Search, Sun, Moon, ChevronDown, ImageUp, UserPen } from "lucide-react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";

import TextInput from "@/Components/TextInput";

function Dashboard({ children, title }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('')
    const { auth } = usePage().props;
    const dropdownRef = useRef(null);


    useEffect(() => {
        const scrollableDiv = document.querySelector("main");

        if (!scrollableDiv) return;

        const handleScroll = () => {
            setIsScrolled(scrollableDiv.scrollTop > 90);
        };

        scrollableDiv.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            scrollableDiv.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const main = document.querySelector('main');
        if (main) {
            main.scrollTo({ top: 0 });
        }
    }, [usePage().url]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const categories = [
        "Technology", "Design", "Marketing",
        "Business", "Health", "Science",
        "Travel", "Food", "Music"
    ];

    useEffect(() => {
        if (!search) {
            setSearch('')
            router.visit(route('dashboard'));
        }
    }, [search])

    return (
        <>
            <Head title={title} />
            <div className='flex h-screen bg-gray-100 text-gray-900'>
                <div className='fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out flex flex-col border-r shadow-lg bg-white border-gray-200 w-64'>
                    <div className="p-4 pt-6 pb-2 flex items-center justify-between">
                        <Link href={route('dashboard')} preserveScroll className="flex items-center gap-2">
                            <img
                                className="w-12 md:w-16"
                                src="/storage/OFPPT_Talk/logo.png"
                                alt="copainslogo"
                            />
                            <h2 className='text-[#1c150d] text-base md:text-lg font-bold leading-tight tracking-[-0.015em]'>
                                Copains d'avant
                            </h2>
                        </Link>
                    </div>

                    <div className="flex-grow overflow-y-auto mt-4">
                        <nav className="px-2 py-2">
                            <ul className="space-y-1">
                                <li key='Home'>
                                    <Link href={route('dashboard')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'Postes' && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <Home className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">Home</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='MyPostes'>
                                    <Link href={route('laureat.postes')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'MyPostes' && 'bg-blue-100 text-blue-800'}  `}
                                        >
                                            <ImageUp className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">My Postes</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='Bookmarks'>
                                    <Link href={route('poste.bookmarked')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'BookMarks' && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <Bookmark className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">Bookmarks</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='Profile'>
                                    <Link href={route('laureat.profile')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'Profile' && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <UserPen className="mr-2 h-4 w-4" />
                                            My Profile
                                        </button>
                                    </Link>
                                </li>
                                <li key='Notifications'>
                                    <button
                                        className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'Notifications' && 'bg-blue-100 text-blue-800'}`}                                >
                                        <Bell className="mr-2 h-4 w-4" />
                                        <span className="flex-grow text-left">Notifications</span>
                                        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-200 text-blue-900'>
                                            12
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        <div className='h-[1px] w-full my-2 bg-gray-200'></div>

                        <div className="px-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">Categories</h3>
                                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-8 w-8 hover:bg-gray-100'>
                                    <Filter className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <span
                                        key={category}
                                        className='inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='p-4 border-t border-gray-200'>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className='inline-flex items-center w-full justify-start font-normal rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 hover:bg-gray-100'
                        >
                            <Moon className="mr-2 h-4 w-4" />
                            Dark Mode
                        </button>

                        <Link
                            method="POST"
                            as="button"
                            className='inline-flex items-center w-full justify-start font-medium rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 text-red-600 hover:bg-red-50 hover:text-red-700'
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Deconnecter
                        </Link>
                    </div>
                </div>

                <div className="flex-1 ml-64">
                    <div
                        className={`fixed top-0 left-64 right-0 flex items-center justify-between px-6 z-40 transition-all duration-300 ${isScrolled
                            ? 'bg-white/70 backdrop-blur-lg h-16 shadow-lg'
                            : 'bg-transparent h-20 '
                            }`}
                    >
                        <div className="flex-1 max-w-2xl relative">
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                            <TextInput
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl border..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);

                                    router.visit(route('laureat.search', { q: e.target.value }), {
                                        preserveState: true,
                                        only: ['Postes', 'Users']
                                    });
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-4">

                            {
                                title === 'Postes' &&
                                <>
                                    <button className={`text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 ${isScrolled && 'shadow-md'}`} onClick={() => setCreatePostOpen(true)}>
                                        <PlusCircle className="h-4 w-4" />
                                        <span>New Publication</span>
                                    </button>
                                    <div className="h-8 border-l border-gray-300 dark:border-gray-700"></div>
                                </>
                            }


                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 transition-colors"
                                >
                                    {
                                        auth.user.imageSRC ?
                                            (
                                                <img
                                                    src={`/storage/` + auth.user.imageSRC}
                                                    alt={auth.user.nom + "" + auth.user.prenom}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            )
                                            :
                                            (
                                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">{auth.user.nom.charAt(0) + "" + auth.user.prenom.charAt(0)}</div>
                                            )
                                    }
                                    <div className='hidden md:flex flex-col text-gray-800'>
                                        <span className="text-sm font-medium">{auth.user.nom} {auth.user.prenom}</span>
                                        <span className="text-xs opacity-70">{auth.user.fonction}</span>
                                    </div>
                                    <ChevronDown className={`h-4 w-4 opacity-70 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-medium text-gray-900">{auth.user.nom} {auth.user.prenom}</p>
                                            <p className="text-xs text-gray-500 truncate">{auth.user.email || auth.user.fonction}</p>
                                        </div>

                                        <Link href={route('laureat.profile')}
                                            preserveScroll
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <UserPen className="mr-2 h-4 w-4" />
                                                My Profile
                                            </div>
                                        </Link>

                                        <button onClick={() => { setDarkMode(!darkMode); setDropdownOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"  >
                                            <div className="flex items-center">
                                                <Moon className="mr-2 h-4 w-4" />
                                                Dark Mode
                                            </div>
                                        </button>
                                        <div className="h-px bg-gray-200 my-1"></div>

                                        <Link
                                            method="POST"
                                            as="button"
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            <div className="flex items-center">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Deconnecter
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>


                    <main className="pt-20 p-6 h-screen overflow-y-auto">
                        {React.cloneElement(children, { isScrolled, createPostOpen, setCreatePostOpen, search })}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
