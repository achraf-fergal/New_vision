import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChevronUp, MoreVertical, Trash } from "lucide-react";
import { Link, useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import axios from "axios";

const CommentSection = ({ posteId, commentCount }) => {
    const { auth } = usePage().props;
    const { data, setData, get, post, errors, processing, delete: DeleteComment } = useForm({
        LaureatId: auth.user.id,
        posteId: posteId,
        comment: '',
    });
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [SeeMore, setSeeMore] = useState(false);

    useEffect(() => {
        handleGetComments();
    }, []);

    console.log(errors)

    const handleGetComments = async () => {
        const res = await axios.post(`/GetComments/${posteId}`);
        setComments(res.data);
        console.log(res.data)
        setLoading(false);
    };

    const handleAddComment = () => {
        post(route('AjouterComment'), {
            onSuccess: () => {
                handleGetComments();
                setData('comment', '')
            }
        })
    };

    const handleDeleteComment = async (commentId) => {
        try {
            // const res = await axios.delete(`/DeleteComment/${commentId}`);
            await DeleteComment(route('DeleteComment', { CommentId: commentId }));
            handleGetComments();
            setActiveDropdown(null);
            // onGetCommentsCount(res.data.comments_count);
            // console.log(res.data);
        }
        catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const toggleDropdown = (commentId) => {
        if (activeDropdown === commentId) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(commentId);
        }
    };

    const isValidURL=(str)=>{
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    }



    return (
        <div className="space-y-4  animate-fade-in"
            onMouseLeave={() => setActiveDropdown(null)}
        >

            <div className="h-[1px] w-full shrink- bg-gray-200" />

            <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Comments ({commentCount})</h4>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    {
                        auth.user.imageSRC ?
                            <img
                                src={'/storage/' + auth.user.imageSRC}
                                alt={auth.user.nom + "" + auth.user.prenom}
                                className="aspect-square h-full w-full"
                            />
                            :
                            <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">{auth.user.nom.charAt(0) + "" + auth.user.prenom.charAt(0)}</div>
                    }
                </div>
                <div className="flex-1 flex items-center space-x-2">
                    <TextInput
                        type="text"
                        name="comment"
                        id="comment"
                        placeholder="Add a comment..."
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                        className="mt-1 block w-full bg-gray-100 "
                    />
                    <button
                        className="h-10 ml-6 rounded-md px-3 bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50"
                        onClick={handleAddComment}
                        disabled={data.comment.trim() === "" || processing}
                    >
                        {
                            processing ? 'Commenting...' : 'Comment'}
                    </button>
                </div>
            </div>

            <div className="space-y-4  max-h-[400px] overflow-y-auto">
                {
                    loading ? (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto">
                            {[1, 2].map((_, index) => (
                                <div key={index} className="flex space-x-2">
                                    <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200 animate-pulse" />
                                    <div className="flex-1 space-y-1">
                                        <div className="bg-gray-100 p-3 rounded-lg w-full">
                                            <div className="flex items-center justify-between">
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                                                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                                            </div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2 animate-pulse" />
                                            <div className="h-4 bg-gray-200 rounded w-1/2 mt-1 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                        :
                        comments.map((comment, index) => (
                            <div key={comment.id} className="flex space-x-2 animate-slide-in" >
                                <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                    {comment.laureat.imageSRC && (
                                        <img
                                            src={'/storage/' + comment.laureat.imageSRC}
                                            alt={comment.laureat.nom + comment.laureat.prenom}
                                            className="aspect-square h-full w-full"
                                        />
                                    )}
                                    <div className="w-full h-full rounded-full bg-gray-500 flex items-center justify-center text-white font-medium text-sm">{comment.laureat.nom.charAt(0) + "" + comment.laureat.prenom.charAt(0)}</div>
                                </div>
                                <div className="flex-1 space-y-1 w-full">
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{comment.laureat.nom} {comment.laureat.prenom}</span>
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500 mr-2">
                                                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                                </span>
                                                {comment.laureat.id === auth.user.id && (
                                                    <div className="relative">
                                                        <button
                                                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                                                            onClick={() => toggleDropdown(comment.id)}
                                                        >
                                                            <MoreVertical size={16} />
                                                        </button>
                                                        {activeDropdown === comment.id && (
                                                            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                                <button
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                    onClick={() => handleDeleteComment(comment.id)}
                                                                >
                                                                    <Trash size={14} className="mr-2" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {
                                            comment.content.length < 140
                                                ?
                                                (
                                                    (isValidURL(comment.content)) ? (
                                                        <a
                                                            href={comment.content}
                                                            target="_blank"
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >{comment.content}</a>
                                                    ) :
                                                        comment.content
                                                )
                                                :
                                                (!SeeMore) ?
                                                    (
                                                        <>
                                                            {comment.content.substring(0, 55)}
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
                                                            <div className="break-words overflow-hidden ">{comment.content}</div>
                                                            <button
                                                                className=" text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-1"
                                                                onClick={() => setSeeMore(!SeeMore)}
                                                            >
                                                                <ChevronUp className="h-4 w-4 mr-1" />
                                                                Voir moins
                                                            </button>
                                                        </>
                                                    )
                                        }

                                    </div>
                                </div>

                            </div>
                        ))
                }
            </div>
        </div >
    );
};

export default CommentSection;
