import { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, MoreVertical, Bookmark, User, Calendar, ChevronDown, ChevronUp, BookmarkPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import CommentSection from "./Comments";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { ar, enUS } from 'date-fns/locale';
import { fr } from 'date-fns/locale';


const PostCard = ({ Poste }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { auth, Laureat_Activity } = usePage().props;

    const { data, setData, post } = useForm({
        LaureatId: auth.user.id,
        PostId: Poste.id,
    });

    const [seeMore, setSeeMore] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [likeCount, setLikeCount] = useState(Poste.likes_count);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [commentCount, setCommentCount] = useState(Poste.comments_count);

    useEffect(() => {
        const findLaureat = Laureat_Activity.find(elem => elem.Laureat_id === auth.user.id);
        if (findLaureat) {
            setIsLiked(findLaureat.Liked_Poste.includes(Poste.id));
            setIsBookmarked(findLaureat.saved_Poste.includes(Poste.id));
        }
    }, [Laureat_Activity]);

    const handleLike = async () => {
        setIsLiked(!isLiked);
        const routeToUse = isLiked ? 'poste.Unlike' : 'poste.like';

        post(route(routeToUse), {
            preserveScroll: true,
            onSuccess: async () => {
                const res = await axios.post(`/Poste/${Poste.id}/Likes`);
                setLikeCount(res.data.likes_count);
            }
        });
    };

    const handleBookmark = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsBookmarked(!isBookmarked);
        const routeToUse = isBookmarked ? 'poste.Unsave' : 'poste.save';

        post(route(routeToUse), {
            preserveScroll: true
        });
    };

    const handleDelete = async () => {

        if (confirm(t('confirm_delete_post'))) {
            post(route('poste.delete'), {
                onSuccess: () => router.visit('/dashboard')
            });
        }
    };

    const copyPostLink = () => {
        const postUrl = `${window.location.origin}/Poste/${Poste.id}`;
        navigator.clipboard.writeText(postUrl)
            .then(() => {
                toast.success(t('link_copied'));
                setDropdownOpen(false);
            });
    };
    const [lang, setlang] = useState('')

    useEffect(() => {
        const fetchLang = async () => {
            try {
                const response = await axios.post('https://ws.detectlanguage.com/0.2/detect',
                    { q: Poste.content },
                    {
                        headers: {
                            'Authorization': `Bearer ${import.meta.env.VITE_DETECTLANGUAGE_API_KEY}`,
                        },
                    }
                );

                const language = response.data.data.detections[0].language;
                setlang(language);
            } catch (error) {
                setlang('und');
            }
        };

        fetchLang();

    }
        , []);

    const getContentPreview = () => {
        if (!Poste.content) return null;

        console.log(lang)

        if (Poste.content.length < 80 || seeMore) {
            return (
                <>
                    {Poste.content}
                    {Poste.content.length > 80 && (
                        <button
                            className={`text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-1 `}
                            onClick={(e) => {
                                e.preventDefault();
                                setSeeMore(!seeMore);
                            }}
                        >
                            {seeMore ? (
                                <>
                                    <ChevronUp className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    {t('see_less')}
                                </>
                            ) : (
                                <>
                                    <ChevronDown className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    {t('see_more')}
                                </>
                            )}
                        </button>
                    )}
                </>
            );
        }

        return (
            <>
                {Poste.content.substring(0, 80)}...
                <button
                    className="ml-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    onClick={(e) => {
                        e.preventDefault();
                        setSeeMore(true);
                    }}
                >
                    {t('see_more')}
                </button>
            </>
        );
    };

    return (
        <div
            className={`w-full rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4 ${isRTL ? 'rtl' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
            onMouseLeave={() => setDropdownOpen(false)}
            onClick={() => dropdownOpen && setDropdownOpen(false)}
        >
            <div className={`flex items-center justify-between pt-4 px-4 border-b border-gray-50`}>
                <div className={`flex items-center  space-x-3`}>
                    <div className={`relative h-12 w-12 overflow-hidden rounded-full border bg-gray-50 ${isRTL && 'ml-2'} `}>
                        {Poste.user.imageSRC ? (
                            <img
                                src={'/storage/' + Poste.user.imageSRC}
                                alt={`${Poste.user.nom} ${Poste.user.prenom}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
                                <User className="text-gray-500 h-6 w-6" />
                            </div>
                        )}
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="text-sm font-semibold text-gray-800">
                            {Poste.user.nom} {Poste.user.prenom}
                            {Poste.user.id === auth.user.id && (
                                <span className={`${isRTL ? 'mr-1' : 'ml-1'} text-blue-600 text-xs`}>({t('you')})</span>
                            )}
                        </p>
                        <p className="text-xs text-gray-500" >
                            ({Poste.user.etablissement}) #{t(`branches.${Poste.categorie}`)}
                        </p>
                        <div className={`flex items-center text-xs text-gray-500 mt-0.5`}>
                            <Calendar className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />

                            {formatDistanceToNow(new Date(Poste.created_at), { addSuffix: true, locale: (i18n.language === 'ar' ? ar :i18n.language === 'en' ? enUS :  fr) })}
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <MoreVertical className="h-5 w-5" />
                    </button>

                    {dropdownOpen && (
                        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} z-20 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200`}>
                            <div className="py-1">
                                {auth.user.id === Poste.user.id && (
                                    <button
                                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center"
                                        onClick={handleDelete}
                                    >
                                        {t('delete_post')}
                                    </button>
                                )}
                                <button
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center"
                                    onClick={copyPostLink}
                                >
                                    {t('copy_link')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Link href={`/Poste/${Poste.id}`}>
                <div className="px-4 py-3 cursor-pointer">
                    <div className={`text-base font-medium text-gray-800 mb-3 ${lang == 'ar' || lang == 'fa' ? 'text-right' : 'text-left'}`}  dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                        {getContentPreview()}
                    </div>

                    {Poste.photo && (
                        <div className="rounded-lg overflow-hidden bg-gray-50 mb-3 w-full h-96 flex justify-center items-center">
                            {Poste.photo.endsWith('.mp4') ? (
                                <video className="w-full h-full object-contain" controls>
                                    <source src={`/storage/` + Poste.photo} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={`/storage/` + Poste.photo}
                                    alt="Post media"
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    )}
                </div>
            </Link>
            <hr className="mx-4" />
            <div className={`flex items-center justify-between px-4 py-3 `} dir="ltr" >
                <div className={`flex items-center space-x-1`}>
                    <button
                        className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={handleLike}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />

                        <span className={`ml-1.5 text-sm font-medium`}>{likeCount}</span>

                    </button>

                    <button
                        className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageSquare className="h-5 w-5" />

                        <span className={`ml-1.5 text-sm font-medium`}>
                            {commentCount}
                        </span>

                    </button>

                    <button
                        className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>

                <button
                    className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isBookmarked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={handleBookmark}
                >
                    <BookmarkPlus className={`h-5 w-5 ${isBookmarked ? "fill-blue-600" : ""}`} />
                </button>
            </div>

            {showComments && (
                <div className="overflow-hidden px-4 py-3">
                    <CommentSection
                        posteId={Poste.id}
                        onGetCommentsCount={setCommentCount}
                        commentCount={commentCount}
                    />
                </div>
            )}

            <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />
        </div>
    );
};

export default PostCard;
