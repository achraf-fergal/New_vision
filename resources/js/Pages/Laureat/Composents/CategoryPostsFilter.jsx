import React, { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, MoreVertical, Bookmark, User, Calendar, ArrowLeft, ChevronUp, BarChart2, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useForm, usePage, Link } from "@inertiajs/react";
import axios from "axios";
import CommentSection from "./Comments";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ar, enUS, fr } from "date-fns/locale";

const PostDetail = ({ Poste }) => {
    const { t, i18n } = useTranslation();
    const { auth } = usePage().props;
    const { Laureat_Activity } = usePage().props;
    const { data, setData, post } = useForm({
        LaureatId: auth.user.id,
        PostId: Poste.id,
    });

    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
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

    const handleBookmark = async () => {
        setIsBookmarked(!isBookmarked);
        if (!isBookmarked) {
            await post(route('poste.save'), {
                preserveScroll: true,
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

    const handleShare = async (id) => {
        await copyPosteLink(id);

        const postUrl = `${window.location.origin}/Poste/${id}`;

        if (navigator.share) {
            navigator.share({
                title: `Post by ${auth.user.nom} ${auth.user.prenom}`,
                text: Poste.content?.substring(0, 100) || 'Check out this post!',
                url: postUrl,
            });
        }
    };

    const copyPosteLink = async (id) => {
        const posteUrl = `${window.location.origin}/Poste/${id}`;


        await post(`/Poste/${id}/ShareCount`);

        navigator.clipboard.writeText(posteUrl)
            .then(() => {
                toast.success(t('link_copied'));
                setDropdownOpen(false);
            });


    };


    useEffect(() => {
        setCommentCount(Poste.comments_count);
    }, [Poste]);




    const PostContent = () => (
        <div className="flex-1">
            <div className="text-base font-medium text-gray-800 ml-1 mb-3">
                {
                    Poste.content &&
                    (
                        Poste.content.length < 100 ? (Poste.content)
                            :
                            (!SeeMore) ?
                                (
                                    <>
                                        {Poste.content.substring(0, 100)}...
                                        <button
                                            className="ml-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                            onClick={() => setSeeMore(!SeeMore)}
                                        >
                                            {t('see_more')}
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {Poste.content}
                                        <button
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-1"
                                            onClick={() => setSeeMore(!SeeMore)}
                                        >
                                            <ChevronUp className="h-4 w-4 mr-1" />
                                            {t('see_less')}
                                        </button>
                                    </>
                                )
                    )
                }
            </div>

            {Poste.photo && (
                <div className="rounded-lg overflow-hidden bg-gray-50 mb-6">
                    <img
                        src={`/storage/` + Poste.photo}
                        alt="Post media"
                        className="w-full object-contain max-h-[500px]"
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 my-4 w-full" onMouseLeave={() => setDropdownOpen(false)}>
            <div className="flex items-center justify-between pt-4 px-4 border-b border-gray-50">
                <div className="flex items-center space-x-3">
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
                    <div>
                        <div className={i18n.language == 'ar' ? 'text-right' : 'text-left'}>
                            <p className="text-base font-semibold text-gray-800">
                                {Poste.user.nom} {Poste.user.prenom}
                                {Poste.user.id === auth.user.id && (
                                    <span className={` text-blue-600 text-xs ${i18n.language == 'ar' ? 'mr-1' : 'ml-1'}`}>({t('you')})</span>
                                )}
                            </p>

                            <p className="text-xs text-gray-500">
                                ({Poste.user.etablissement}) #{t(`branches.${Poste.categorie}`)}
                            </p>
                            <div className={`flex items-center text-xs text-gray-500 mt-0.5 `}>
                                <Calendar className={`h-3 w-3 ${i18n.language=='ar' ? 'ml-1' : 'mr-1'}`} />
                                {formatDistanceToNow(new Date(Poste.created_at), {
                                    addSuffix: true,
                                    locale: i18n.language == 'ar' ? ar : i18n.language === 'en' ? enUS : fr
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <MoreVertical className="h-5 w-5" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
                                <div className="py-1">

                                    {
                                        (Poste.user.id === auth.user.id) &&
                                        <button
                                            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center"
                                            onClick={handleDelete}
                                        >
                                            {t('delete_post')}
                                        </button>
                                    }

                                    <button
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center"
                                        onClick={() => copyPosteLink(Poste.id)}
                                    >
                                        {t('copy_link')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`px-6 py-4 transition-all duration-300 `}>
                <PostContent />
            </div>

            <hr className="mx-6" />

            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center space-x-2">
                    <button
                        className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={handleLike}
                    >
                        <Heart
                            className={`h-5 w-5 ${isLiked ? "fill-red-500 " : ""}`}
                        />
                        <span className="ml-1.5 text-sm font-medium">{likeCount}</span>
                    </button>

                    <button
                        className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                            setShowComments(!showComments);
                        }}
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span className="ml-1.5 text-sm font-medium">
                            {commentCount}
                        </span>
                    </button>

                    <button
                        className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                        onClick={() => handleShare(Poste.id)}
                    >
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>

                <button
                    className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isBookmarked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={handleBookmark}
                >
                    <Bookmark
                        className={`h-5 w-5 ${isBookmarked ? "fill-blue-600" : ""}`}
                    />
                </button>
            </div>


            {showComments && (
                <div className="overflow-hidden px-6 pb-3">
                    <CommentSection posteId={Poste.id} onGetCommentsCount={(e) => GetCommentsCount(e)} commentCount={commentCount} />
                </div>
            )}
            <Toaster position="bottom-right" />
        </div>
    );
};

export default PostDetail;
