import { Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { Book, Bookmark, Edit2, Heart, MessageSquare, Users } from "lucide-react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const UserInfoCard = ({ User, isScrolled }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { Laureat_Activity, Comments_Count, Poste } = usePage().props;

    const { data, setData } = useForm({
        ...User,
        posts: 0,
        CountLikedPostes: 0,
        CountSavedPostes: 0,
        comments: 0
    });

    const GetStatistiqueLaureat = async () => {
        await axios.post(`/laureat/statistique/${User.id}`);
        setData('comments', Comments_Count);
        setData('posts', Laureat_Activity[0]?.MyPostes_Count || 0);
        setData('CountLikedPostes', Laureat_Activity[0]?.Count_LikedPoste || 0);
        setData('CountSavedPostes', Laureat_Activity[0]?.Count_SavedPoste || 0);
    };

    useEffect(() => {
        GetStatistiqueLaureat();
    }, [Poste, Laureat_Activity, Comments_Count]);

    const stats = [
        { icon: <Book size={16} />, label: t('publications'), value: data.posts },
        { icon: <Heart size={16} />, label: t('liked_posts'), value: data.CountLikedPostes },
        { icon: <Bookmark size={16} />, label: t('bookmarks'), value: data.CountSavedPostes },
        { icon: <MessageSquare size={16} />, label: t('comments'), value: data.comments }
    ];

    return (
        <div
            className={`w-full max-w-sm border border-gray-100 rounded-xl shadow-sm bg-white transition-all duration-300 ${isScrolled ? 'fixed top-20' : 'relative'} overflow-hidden ${isRTL ? 'rtl' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="p-6 pb-4">
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-4`}>
                    <div className="relative">
                        {data.imageSRC ? (
                            <img
                                src={'storage/' + data.imageSRC}
                                alt={`${data.nom} ${data.prenom}`}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-sm">
                                {data.nom.charAt(0)}{data.prenom.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                        <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'ml-4' : null}`}>{data.nom} {data.prenom}</h3>
                        <p className={`text-sm text-gray-500 ${isRTL ? 'ml-4' : null} `}>{data.fonction}</p>
                    </div>
                </div>
            </div>

            {data.bio && (
                <div className="px-6 pb-4">
                    <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-center'}`}>{data.bio}</p>
                </div>
            )}

            <div className="px-6 py-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${isRTL ? 'text-right' : ''}`}
                        >
                            <div className={`flex items-center gap-2 text-gray-500 mb-1 `}>
                                {stat.icon}
                                <span className="text-xs">{stat.label}</span>
                            </div>
                            <span className="font-bold text-gray-900">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Link
                        href={route('laureat.profile')}
                        className="flex-1"
                    >
                        <button className={`w-full flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors text-white bg-blue-600 hover:bg-blue-700 h-10 px-4 py-2 shadow-sm `}>
                            <Edit2 size={14} />
                            {t('edit_profile')}
                        </button>
                    </Link>
                    <Link href={route('laureat.postes')}>
                        <button className={`flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 shadow-sm `}>
                            {t('show_my_posts')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;
