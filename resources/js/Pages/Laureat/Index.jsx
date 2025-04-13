import Dashboard from "@/Layouts/DashboardLayout";
import { Head, usePage } from "@inertiajs/react";
import UserInfoCard from "./Composents/UserCard";
import PostFeed from "./Composents/Postes";
import { useEffect } from "react";
import CreatePostDialog from "./Composents/CreatePoste";

function Index({ User, Postes, isScrolled, createPostOpen, setCreatePostOpen, Comments_Count }) {
    // const { url } = usePage();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);



    return (
        <>
            <div className="py-8">
                <div className="mb-8 flex items-end">
                    <h1 className="text-2xl font-bold text-gray-800">All Postes</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-8">
                        <PostFeed Postes={Postes} />
                    </div>

                    <div className="hidden lg:block lg:col-span-4">
                        <UserInfoCard isScrolled={isScrolled} User={User} />
                    </div>
                </div>
                {
                    createPostOpen && (
                        <>
                            <CreatePostDialog
                                Open={createPostOpen}
                                Close={() => setCreatePostOpen(false)}
                            />
                        </>
                    )
                }
            </div>


        </>
    );
}



Index.layout = page => <Dashboard children={page} title={'Postes'} />

export default Index;
