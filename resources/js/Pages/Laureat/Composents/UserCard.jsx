import { Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { Book, Edit, Edit2, MessageSquare, User, Users } from "lucide-react";
import React, { useEffect } from "react";


const UserInfoCard = ({ User, isScrolled }) => {
    const { Laureat_Activity } = usePage().props;
    const { Comments_Count } = usePage().props;
    const { Poste } = usePage().props;
    const { data, setData, processing, post, errors } = useForm({
        ...User,
        posts: 0,
        followers: 0,
        following: 0,
        comments: 0
    })

    const GetStatistiqueLaureat = async () => {
        const response = await axios.post(`/laureat/statistique/${User.id}`);
        setData('comments', Comments_Count);
        setData('posts', Laureat_Activity[0].MyPostes_Count || 0);
        // console.log(response)
    }

    useEffect(() => {
        GetStatistiqueLaureat();
    }, [Poste, Laureat_Activity, Comments_Count])


    // console.log(Comments_Count)

    return (
        <div className={`w-[400px] border border-gray-200 rounded-lg shadow-lg bg-white transition-all duration-300 ${isScrolled ? 'fixed top-20 ' : 'relative'}`}>
            <div className="p-6 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-2">
                    <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                        {data.imageSRC ? (
                            <img
                                src={'storage/' + data.imageSRC}
                                alt={data.nom}
                                className="aspect-square h-full w-full"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center text-xl font-bold justify-center rounded-full bg-blue-500 text-white">
                                {data.nom.charAt(0)}{data.prenom.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold leading-none">{data.nom} {data.prenom}</h3>
                        <p className="text-sm text-gray-500">{data.fonction}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-4">
                <p className="text-sm text-center mb-6">{data.bio}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col items-center p-2 rounded-md bg-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <Book width={16} height={16} />
                            <span>Publications</span>
                        </div>
                        <span className="font-bold">{data.posts}</span>
                    </div>

                    <div className="flex flex-col items-center p-2 rounded-md bg-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <Users width={16} height={16} />
                            <span>Followers</span>
                        </div>
                        <span className="font-bold">{data.followers}</span>
                    </div>

                    <div className="flex flex-col items-center p-2 rounded-md bg-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <Users width={16} height={16} />
                            <span>Following</span>
                        </div>
                        <span className="font-bold">{data.following}</span>
                    </div>

                    <div className="flex flex-col items-center p-2 rounded-md bg-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <MessageSquare width={16} height={16} />
                            <span>Comments</span>
                        </div>
                        <span className="font-bold">{data.comments}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link href={route('laureat.profile')}
                        className="w-full"
                    >
                        <button
                            className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-white  bg-blue-600 hover:bg-blue-700 h-10 px-4 py-2"
                        >
                            <Edit2 width={14} height={14} className="mx-2" />
                            Edit Profile
                        </button>
                    </Link>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2"
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;
