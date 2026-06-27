import React, { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, MoreVertical, Bookmark, User, Calendar, ArrowLeft, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useForm, usePage, Link } from "@inertiajs/react";
import axios from "axios";
import CommentSection from "./Composents/Comments";
import Dashboard from "@/Layouts/DashboardLayout";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ar, enUS, fr } from 'date-fns/locale';

const PostDetail = ({ Poste }) => {
    const { auth } = usePage().props;
    const { Laureat_Activity } = usePage().props;
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const { data, setData, post } = useForm({
        LaureatId: auth.user.id,
        PostId: Poste.id,
    });

    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(true);
    const [likeCount, setLikeCount] = useState(Poste.likes_count);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [commentCount, setCommentCount] = useState(Poste.comments_count);
    const [linkCopied, setLinkCopied] = useState(false);
    const [SeeMore, setSeeMore] = useState(false);

    const GetCommentsCount = (e) => {
        setCommentCount(e);
    };

    useEffect(() => {
        const find_Laureat = Laureat_Activity.find(elem => elem.Laureat_id === auth.user.id);
        if (find_Laureat) {
            const CheckLikedPost = find_Laureat.Liked_Poste.find(elem => elem === Poste.id);
            if (CheckLikedPost) {
                setIsLiked(true);
            }
            else {
                setIsLiked(false);
            }
            const CheckBookmarkedPost = find_Laureat.saved_Poste.find(elem => elem === Poste.id);
            if (CheckBookmarkedPost) {
                setIsBookmarked(true);
            }
            else {
                setIsBookmarked(false);
            }
        }
    }, [Laureat_Activity]);

    const handleLike = async () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            post(route('poste.like'), {
                preserveScroll: true
            });
            const res = await axios.post(`/Poste/${Poste.id}/Likes`);
            setLikeCount(res.data.likes_count);
        }
        else {
            post(route('poste.Unlike'), {
                preserveScroll: true
            });
            const res = await axios.post(`/Poste/${Poste.id}/Likes`);
            setLikeCount(res.data.likes_count);
        }
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        if (!isBookmarked) {
            post(route('poste.save'), {
                preserveScroll: true
            });
        }
        else {
            post(route('poste.Unsave'), {
                preserveScroll: true
            });
        }
    };

    const handleDelete = async () => {
        if (confirm(t('confirm_delete_post'))) {
            await post(route('poste.delete'), {
                onSuccess: () => {
                    window.location.href = route('dashboard');
                }
            });
        }
    };

    const copyPosteLink = () => {
        const posteUrl = `${window.location.origin}/Poste/${Poste.id}`;
        navigator.clipboard.writeText(posteUrl)
            .then(() => {
                toast.success(t('link_copied'));
                setDropdownOpen(false);
                setLinkCopied(true);
            })
    };

    const handleShare = () => {
        const postUrl = `${window.location.origin}/posts/${Poste.id}`;
        if (navigator.share) {
            navigator.share({
                title: t('post_shareTitle', { name: `${Poste.user.nom} ${Poste.user.prenom}` }),
                text: post.content?.substring(0, 100) || t('post_defaultShareText'),
                url: postUrl,
            })
                .catch(err => {
                    console.error('Share failed:', err);
                    copyPosteLink();
                });
        } else {
            copyPosteLink();
        }
    };

    useEffect(() => {
        setCommentCount(Poste.comments_count);
    }, [Poste]);

    const [lang , setlang] = useState('');

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


    return (
        <div dir={isRTL ? "rtl" : "ltr"} className="pt-8">
            <div className={`flex items-center `}>
                <Link href={route('dashboard')} className="text-gray-500 hover:text-gray-800">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ArrowLeft className={`text-2xl font-bold text-gray-800 ${isRTL ? 'transform rotate-180' : ''} `} />
                    </button>
                </Link>
                <h1 className={`text-2xl font-bold text-gray-800 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                    {t('post_details')}
                </h1>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-gray-100 my-4" onMouseLeave={() => setDropdownOpen(false)}>
                <div className={`flex items-center justify-between pt-4 px-4 border-b border-gray-50`}>
                    <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`} onClick={() => setDropdownOpen(false)}>
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-gray-50">
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
                            <p className="text-base font-semibold text-gray-800">
                                {Poste.user.nom} {Poste.user.prenom}
                                {Poste.user.id === auth.user.id && (
                                    <span className={` text-blue-600 text-xs ${isRTL ? 'mr-1' : 'ml-1'}`}>({t('you')})</span>
                                )}
                            </p>

                            <p className="text-xs text-gray-500">
                                ({Poste.user.etablissement}) #{t(`branches.${Poste.categorie}`)}
                            </p>
                            <div className={`flex items-center text-xs text-gray-500 mt-0.5 `}>
                                <Calendar className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                {formatDistanceToNow(new Date(Poste.created_at), {
                                    addSuffix: true,
                                    locale: i18n.language == 'ar' ? ar : i18n.language === 'en' ? enUS : fr
                                })}
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
                            <div
                                className={`absolute ${isRTL ? 'left-0' : 'right-0'} z-20 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200`}
                            >
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
                                        onClick={copyPosteLink}
                                    >
                                        {t('copy_link')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`px-6 py-4 ${lang == 'ar' ? 'text-right' : 'text-left'}`}  dir={lang === 'ar' ? 'rtl' : 'ltr'} onClick={() => setDropdownOpen(false)}>
                    <div className={`text-base font-medium text-gray-800 mb-3 ${isRTL ? 'mr-1' : 'ml-1'}`}>
                        {Poste.content && (
                            Poste.content.length < 100 ? (Poste.content)
                                : (!SeeMore) ? (
                                    <>
                                        {Poste.content.substring(0, 100)},
                                        <button
                                            className={`${isRTL ? 'mr-1' : 'ml-1'} text-blue-600 hover:text-blue-700 font-medium text-sm`}
                                            onClick={() => setSeeMore(!SeeMore)}
                                        >
                                            {t('see_more')}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {Poste.content}
                                        <button
                                            className={`text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-1`}
                                            onClick={() => setSeeMore(!SeeMore)}
                                        >
                                            <ChevronUp className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                            {t('see_less')}
                                        </button>
                                    </>
                                )
                        )}
                    </div>

                    {Poste.photo && (
                        <div className="rounded-lg overflow-hidden bg-gray-50 mb-6">
                            <img
                                src={`/storage/` + Poste.photo}
                                alt={t('post_media')}
                                className="w-full object-contain max-h-[500px]"
                            />
                        </div>
                    )}

                    {Poste.tags && Poste.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-3">
                            {Poste.tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="inline-flex items-center rounded-full bg-gray-50 hover:bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 cursor-pointer transition-colors"
                                >
                                    #{tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <hr className="mx-6" />

                <div className={`flex items-center justify-between px-6 py-3 ${isRTL ? 'flex-row-reverse' : ''}`} onClick={() => setDropdownOpen(false)}>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                            className={`
                                ${isRTL ? 'flex-row-reverse space-x-1 ' : null}
                                inline-flex items-center justify-center rounded-full p-2 transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={handleLike}
                        >
                            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 " : ""}`} />
                            <span className={` text-sm font-medium ${isRTL ? 'mr-1.5' : 'ml-1.5'}`}>{likeCount}</span>
                        </button>

                        <button
                            className={`
                                ${isRTL ? 'flex-row-reverse space-x-1 ' : null}
                                inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors`}
                            onClick={() => setShowComments(!showComments)}
                        >
                            <MessageSquare className="h-5 w-5" />
                            <span className={` text-sm font-medium ${isRTL ? 'mr-1.5' : 'ml-1.5'}`}>
                                {commentCount}
                            </span>
                        </button>

                        <button
                            className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={handleShare}
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>

                    <button
                        className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isBookmarked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={handleBookmark}
                    >
                        <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-blue-600" : ""}`} />
                    </button>
                </div>

                {showComments && (
                    <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-xl">
                        <CommentSection
                            posteId={Poste.id}
                            onGetCommentsCount={(e) => GetCommentsCount(e)}
                            commentCount={commentCount}
                            isRTL={isRTL}
                        />
                    </div>
                )}
            </div>
            <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />
        </div>
    );
};

PostDetail.layout = page => <Dashboard children={page} />;

export default PostDetail;
