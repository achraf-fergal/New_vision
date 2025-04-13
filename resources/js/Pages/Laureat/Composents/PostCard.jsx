import { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, MoreVertical, Bookmark, User, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import CommentSection from "./Comments";
import { toast, Toaster } from "react-hot-toast";

const PostCard = ({ Poste }) => {
    const { auth } = usePage().props;
    const { Laureat_Activity } = usePage().props;
    const { data, setData, post } = useForm({
        LaureatId: auth.user.id,
        PostId: Poste.id,
    });

    const [SeeMore, setSeeMore] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [likeCount, setLikeCount] = useState(Poste.likes_count);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [commentCount, setCommentCount] = useState(Poste.comments_count);

    const GetCommentsCount = (e) => {
        setCommentCount(e);
    }


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
            console.log('Liked')
        }
        else {
            post(route('poste.Unlike'), {
                preserveScroll: true
            });
            const res = await axios.post(`/Poste/${Poste.id}/Likes`);
            setLikeCount(res.data.likes_count);
            console.log('Unliked')
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
        if (confirm('Are you sure you want to delete this post?')) {
            post(route('poste.delete'), {
                preserveScroll: true
            });
        }
    };


    useEffect(() => {
        setCommentCount(Poste.comments_count);
    }, [Poste])


    const copyPosteLink = () => {
        const posteUrl = `${window.location.origin}/Poste/${Poste.id}`;

        console.log(window.location);

        navigator.clipboard.writeText(posteUrl)
            .then(() => {
                toast.success('Poste link copied to clipboard!');
                setDropdownOpen(false);
            })
    };





    const tags = ['dev', 'info', 'design'];

    return (
        <div className="w-full rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4"
            onMouseLeave={() => setDropdownOpen(false)}
            onClick={() => (dropdownOpen ? setDropdownOpen(false) : null)}
        >
            <div className="flex items-center justify-between pt-4 px-4 border-b border-gray-50">
                <div className="flex items-center space-x-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border bg-gray-50">
                        {Poste.laureat.imageSRC ? (
                            <img
                                src={'/storage/' + Poste.laureat.imageSRC}
                                alt={`${Poste.laureat.nom} ${Poste.laureat.prenom}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
                                <User className="text-gray-500 h-6 w-6" />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            {Poste.laureat.nom} {Poste.laureat.prenom}
                            {
                                Poste.laureat.id === auth.user.id && (
                                    <span className=" ml-1 text-blue-600 text-xs">(You)</span>
                                )
                            }

                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDistanceToNow(new Date(Poste.created_at), { addSuffix: true })}
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
                        <>
                            <div
                                className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200"
                            >
                                <div className="py-1">
                                    {
                                        auth.user.id === Poste.laureat.id && (

                                            <button
                                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center"
                                                onClick={handleDelete}
                                            >
                                                Delete Poste
                                            </button>
                                        )
                                    }

                                    <button
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center"
                                        onClick={copyPosteLink}
                                    >
                                        Copy link
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Link href={`/Poste/${Poste.id}`}>
                <div className="px-4 py-3 cursor-pointer"
                >
                    <div className="text-base font-medium text-gray-800 ml-1 mb-3">
                        {
                            Poste.content && (
                                Poste.content.length < 80 ?
                                    (Poste.content)
                                    :
                                    (!SeeMore) ?
                                        (
                                            <>
                                                {Poste.content.substring(0, 80)},
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
                                                    className=" text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-1"
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
                        <div className="rounded-lg overflow-hidden bg-gray-50 mb-3 w-full h-96 flex justify-center items-center">
                            <img
                                src={`/storage/` + Poste.photo}
                                alt="Post media"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        // <video className="rounded-lg overflow-hidden bg-gray-50 mb-3 w-full h-96 flex justify-center items-center" controls>
                        //     <source src={`/storage/` + Poste.photo}   type="video/mp4" />
                        // </video>
                    )}

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-2">
                            {tags.map((tag) => (
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
            </Link>
            <hr className="mx-4 " />
            <div className="flex items-center justify-between px-4 py-3 ">
                <div className="flex items-center space-x-1">
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
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span className="ml-1.5 text-sm font-medium">
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
                    <Bookmark
                        className={`h-5 w-5 ${isBookmarked ? "fill-blue-600" : ""}`}
                    />
                </button>
            </div>

            {showComments && (
                <div className="overflow-hidden px-4 py-3">
                    <CommentSection posteId={Poste.id} onGetCommentsCount={(e) => GetCommentsCount(e)} commentCount={commentCount} />
                </div>
            )}
            <Toaster
                position="bottom-right"
            />
        </div>
    );
};

export default PostCard;
