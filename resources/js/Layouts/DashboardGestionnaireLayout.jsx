import { Head, Link } from "@inertiajs/react";
import { Clock, LogOut, UserCheck, UserCog, UserX } from "lucide-react";

const Dashboard = ({ children , title }) => {
    return (
        <>
            <Head title={title} />
            <nav className="fixed w-full top-0 left-0 flex items-center bg-white justify-between border-b border-solid border-b-white px-4 md:px-10 py-4 shadow-md shadow-black/5 z-50">
                <div className="flex items-center gap-4 text-[#1c150d] cursor-pointer">
                    <Link href={route("gestionnaire.dashboard")} className="flex items-center gap-2">
                        <img
                            className="w-12 md:w-16"
                            src="/storage/OFPPT_Talk/logo.png"
                            alt="copainslogo"
                        />
                        <h2 className="text-[#1c150d] text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">
                            Copains d'avant
                        </h2>
                    </Link>
                </div>
                <div className="flex-1 flex justify-center items-center gap-9">
                    <Link
                        href={route("laureat.waiting")}
                        className={`flex items-center gap-2 text-sm font-semibold transition duration-300 hover:text-black ${title==="Laureat Waiting" ?'text-black':'text-gray-500'}`}
                    >
                        <Clock className="w-4 h-4" />
                        Users Waiting
                    </Link>
                    <Link
                        href={route("laureat.accepted")}
                        className={`flex items-center gap-2 text-sm font-semibold transition duration-300 hover:text-black ${title==="Laureat accepted" ?'text-black':'text-gray-500'} `}
                    >
                        <UserCheck className="w-4 h-4" />
                        Users Accepted
                    </Link>
                    <Link
                        href={route("laureat.blocked")}
                        className={`flex items-center gap-2 text-sm font-semibold transition duration-300 hover:text-black ${title==="Laureat Blocked" ?'text-black':'text-gray-500'}`}
                    >
                        <UserX className="w-4 h-4" />
                        Users Blocked
                    </Link>
                    <Link
                        href={route("profile.edit")}
                        className={`flex items-center gap-2  text-sm font-semibold transition duration-300 hover:text-black ${title==="profile" ?'text-black':'text-gray-500'}`}
                    >
                        <UserCog className="w-4 h-4" />
                        Profile
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href={route("gestionnaire.logout")}
                        method="POST"
                        as="button"
                        className="flex items-center gap-2 text-sm font-semibold transition duration-300 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white rounded-md"
                    >
                        <LogOut className="w-4 h-4" />
                        Deconnecter
                    </Link>
                </div>
            </nav>

            <div className="pt-28 min-h-screen bg-gray-100">
                {children}
            </div>
        </>
    );
};


export default Dashboard;


