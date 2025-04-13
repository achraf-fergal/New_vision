import Dashboard from "@/Layouts/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import PhotoProfile from "./Profile/UpdateProfilePhoto";
import { ArrowLeft } from "lucide-react";
import InformationsPersonnelles from "./Profile/UpdateInfoPerso";
import UpdatePassword from "./Profile/UpdatePassword";

function IndexProfile() {

    const { user } = usePage().props;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
        , []);

    // console.log(user);
    return (
        <>
            <div className="pt-8">
                <div className="flex items-center ">
                    <Link href={route('dashboard')} className="text-gray-500 hover:text-gray-800">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="text-2xl font-bold text-gray-800" />
                        </button>
                    </Link>
                    <h1 className='text-2xl font-bold text-gray-800'>My Profile Details</h1>
                </div>

                <PhotoProfile user={user} />
                <InformationsPersonnelles user={user}/>
                <UpdatePassword user={user} />

            </div >
        </>
    );
}



IndexProfile.layout = page => <Dashboard children={page} title={'Profile'} />

export default IndexProfile;
