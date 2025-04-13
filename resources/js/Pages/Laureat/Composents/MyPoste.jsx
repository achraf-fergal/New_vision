import React, { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, MoreVertical, Bookmark, User, Calendar, ArrowLeft, ChevronUp, BarChart2, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useForm, usePage, Link } from "@inertiajs/react";
import axios from "axios";
import CommentSection from "./Comments";
import toast, { Toaster } from "react-hot-toast";

const MyPostDetail = ({ Poste }) => {
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
    const [savedCount, setSavedCount] = useState(Poste.saves_count);
    const [shareCount, setShareCount] = useState(Poste.shares_count);
    const [showStats, setShowStats] = useState(false);
    const [postStats, setPostStats] = useState({
        totalInteractions: 0,
        likePercentage: 0,
        commentPercentage: 0,
        savePercentage: 0,
        sharePercentage: 0
    });

    console.log(Poste)

    useEffect(() => {
        const total = likeCount + commentCount + savedCount + shareCount;
        setPostStats({
            totalInteractions: total,
            likePercentage: total > 0 ? Math.round((likeCount / total) * 100) : 0,
            commentPercentage: total > 0 ? Math.round((commentCount / total) * 100) : 0,
            savePercentage: total > 0 ? Math.round((savedCount / total) * 100) : 0,
            sharePercentage: total > 0 ? Math.round((shareCount / total) * 100) : 0
        });
    }, [likeCount, commentCount, savedCount, shareCount]);

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
            // try {
            //     const res = await axios.post(`/Poste/${Poste.id}/SaveCount`);
            //     setSavedCount(res.data.saved_count || savedCount + 1);
            // } catch (error) {
            //     setSavedCount(savedCount + 1);
            // }
        }
        else {
            post(route('poste.Unsave'), {
                preserveScroll: true
            });
            try {
                const res = await axios.post(`/Poste/${Poste.id}/SaveCount`);
                setSavedCount(res.data.saved_count || Math.max(0, savedCount - 1));
            } catch (error) {
                setSavedCount(Math.max(0, savedCount - 1));
            }
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
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
                toast.success('Poste link copied to clipboard!');
                setDropdownOpen(false);
            });




    };

    const handleStats = () => {
        if (showStats) {
            setShowComments(false);
            setShowStats(false);
        }
        else {
            setShowComments(false);
            setShowStats(true);
        }
    };

    useEffect(() => {
        setCommentCount(Poste.comments_count);
        setSavedCount(Poste.saves_count);
        setShareCount(Poste.shares_count);
    }, [Poste]);


    const StatsPanel = () => (
        <div className="space-y-3 mt-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">Post Statistics</h3>
                    <p className="text-xs text-gray-600">Total: {postStats.totalInteractions} interactions</p>
                </div>
            </div>

            <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <Heart className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm font-medium">Likes</span>
                    </div>
                    <span className="text-sm font-bold">{likeCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${postStats.likePercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right mt-1">{postStats.likePercentage}%</p>
            </div>

            <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium">Comments</span>
                    </div>
                    <span className="text-sm font-bold">{commentCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${postStats.commentPercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right mt-1">{postStats.commentPercentage}%</p>
            </div>

            <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <Bookmark className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm font-medium">Saves</span>
                    </div>
                    <span className="text-sm font-bold">{savedCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${postStats.savePercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right mt-1">{postStats.savePercentage}%</p>
            </div>

            <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <Share2 className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-sm font-medium">Shares</span>
                    </div>
                    <span className="text-sm font-bold">{shareCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${postStats.sharePercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right mt-1">{postStats.sharePercentage}%</p>
            </div>
        </div>
    );


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
                                            Lire la suite
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
                                            Voir moins
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
    );

    return (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 my-4 w-full" onMouseLeave={() => setDropdownOpen(false)}>
            <div className="flex items-center justify-between pt-4 px-4 border-b border-gray-50">
                <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-gray-50">
                        {auth.user.imageSRC ? (
                            <img
                                src={'/storage/' + auth.user.imageSRC}
                                alt={`${auth.user.nom} ${auth.user.prenom}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
                                <User className="text-gray-500 h-6 w-6" />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-800">
                            {auth.user.nom} {auth.user.prenom} <span className="text-blue-600 text-xs">(You)</span>
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDistanceToNow(new Date(Poste.created_at), { addSuffix: true })}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full ${showStats ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'} hover:opacity-90 transition-all duration-300 `}
                        onClick={handleStats}
                    >
                        {showStats ? 'Show Post' : 'View Stats'}
                    </button>

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

                                    <button
                                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center"
                                        onClick={handleDelete}
                                    >
                                        Delete Post
                                    </button>

                                    <button
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center"
                                        onClick={() => copyPosteLink(Poste.id)}
                                    >
                                        Copy link
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`px-6 py-4 transition-all duration-300 `}>
                {showStats ? <StatsPanel /> : <PostContent />}
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
                            setShowStats(false);
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
                        <span className="ml-1.5 text-sm font-medium">{shareCount}</span>
                    </button>
                </div>

                <button
                    className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isBookmarked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={handleBookmark}
                >
                    <Bookmark
                        className={`h-5 w-5 ${isBookmarked ? "fill-blue-600" : ""}`}
                    />
                    <span className="ml-1.5 text-sm font-medium">{savedCount}</span>
                </button>
            </div>

            {linkCopied && (
                <div className="bg-gray-800 text-white text-sm py-2 px-4 rounded-md fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-10 duration-200">
                    Link copied to clipboard!
                </div>
            )}

            {showComments && (
                <div className="overflow-hidden px-6 pb-3">
                    <CommentSection posteId={Poste.id} onGetCommentsCount={(e) => GetCommentsCount(e)} commentCount={commentCount} />
                </div>
            )}
            <Toaster position="bottom-right" />
        </div>
    );
};

export default MyPostDetail;
