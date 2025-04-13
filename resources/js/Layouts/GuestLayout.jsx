import { Link } from "@inertiajs/react";
import {
    Clock,
    LogOut,
    UserCheck,
    UserX,
    UserCog,
    BookOpen,
    Home,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center bg-white p-2 rounded-md shadow-md"
            >
                {sidebarOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                {/* Logo */}
                <div className="flex items-center justify-center p-4 border-b border-gray-200">
                    <Link
                    // href={route("gestionnaire.dashboard")}
                    className="flex items-center gap-2">
                        <img
                            className="w-10 h-10"
                            src="/storage/OFPPT_Talk/logo.png"
                            alt="Copains d'avant logo"
                        />
                        <h2 className="text-[#1c150d] text-lg font-bold">
                            Copains d'avant
                        </h2>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="mt-6 px-4">
                    <Link
                        // href={route("gestionnaire.dashboard")}
                        className={`flex items-center gap-3 py-3 px-4 rounded-md mb-2 transition-colors ${title === "Dashboard" ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Accueil</span>
                    </Link>

                    <Link
                        // href={route("laureat.souvenirs")}
                        className={`flex items-center gap-3 py-3 px-4 rounded-md mb-2 transition-colors ${title === "Souvenirs" ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <BookOpen className="w-5 h-5" />
                        <span className="font-medium">Souvenirs</span>
                    </Link>

                    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">
                        Gestion des utilisateurs
                    </h3>

                    <Link
                        // href={route("laureat.waiting")}
                        className={`flex items-center gap-3 py-3 px-4 rounded-md mb-2 transition-colors ${title === "Laureat Waiting" ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">En Attente</span>
                    </Link>

                    <Link
                        // href={route("laureat.accepted")}
                        className={`flex items-center gap-3 py-3 px-4 rounded-md mb-2 transition-colors ${title === "Laureat accepted" ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <UserCheck className="w-5 h-5" />
                        <span className="font-medium">Acceptés</span>
                    </Link>

                    <Link
                        // href={route("laureat.blocked")}
                        className={`flex items-center gap-3 py-3 px-4 rounded-md mb-2 transition-colors ${title === "Laureat Blocked" ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <UserX className="w-5 h-5" />
                        <span className="font-medium">Bloqués</span>
                    </Link>

                    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">
                        Paramètres
                    </h3>

                    <Link
                        // href={route("profile.edit")}
                        className={`flex items-center gap-3 py-3 px-4 rounded-md mb-2 transition-colors ${title === "profile" ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <UserCog className="w-5 h-5" />
                        <span className="font-medium">Profil</span>
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
                    <Link
                        // href={route("gestionnaire.logout")}
                        method="POST"
                        as="button"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Déconnecter</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <div className="p-6 min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;