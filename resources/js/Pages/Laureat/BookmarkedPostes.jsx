import { useState, useEffect } from "react";
import { RefreshCw, Bookmark } from "lucide-react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import PostCard from "./Composents/PostCard";
import axios from "axios";
import Dashboard from "@/Layouts/DashboardLayout";

const BookmarkedPosts = () => {
    const { auth } = usePage().props;
    const { SavedPostes } = usePage().props;
    const { data, setData, processing } = useForm([]);
    const [nextPage, setNextPage] = useState(null);
    const [hasMore, setHasMore] = useState(false);

    


    useEffect(() => {
        setData(SavedPostes);
    }, [SavedPostes]);

    console.log(SavedPostes);

    return (
        <div className="max-w-4xl py-8">
            <div className="mb-8 flex items-end">
                <h1 className="text-2xl font-bold text-gray-800">Bookmarked Posts</h1>
            </div>

            <div className="w-full space-y-6">
                {processing && data.length === 0 ? (
                    <>
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="w-full space-y-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </div>
                                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                    <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {data.length > 0 ? (
                            <div className="space-y-6 w-full mb-6">
                                {data.map((post) => (
                                    console.log(post),
                                    <PostCard
                                        key={post.id}
                                        Poste={post}
                                    // onUnbookmark={() => {
                                    //     // Optionally remove the post from the list when unbookmarked
                                    //     setData(data.filter(p => p.id !== post.id));
                                    // }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center ml-56 py-28">
                                <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium mb-2">No bookmarked posts yet</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    When you bookmark posts, they will appear here so you can easily find them later.
                                </p>
                                <Link href={route('dashboard')} >
                                    <button
                                        className="mt-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Explore posts
                                    </button>
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

BookmarkedPosts.layout = page => <Dashboard children={page} title={'BookMarks'} />;

export default BookmarkedPosts;




// import { useState, useEffect } from "react";
// import { useForm, usePage } from "@inertiajs/react";
// import {
//     RefreshCw,
//     BookmarkX,
//     Heart,
//     MessageSquare,
//     Share2,
//     MoreVertical,
//     User,
//     Calendar,
//     ChevronDown,
//     ChevronUp
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import axios from "axios";
// import Dashboard from "@/Layouts/DashboardLayout";

// const SavedPostsFeed = ({ SavedPostes }) => {
//     const { auth } = usePage().props;
//     const { Laureat_Activity } = usePage().props;
//     const { data, setData, post, processing } = useForm([]);

//     const [loading, setLoading] = useState(false);
//     const [nextPage, setNextPage] = useState(SavedPostes?.next_page_url || null);
//     const [hasMore, setHasMore] = useState(SavedPostes?.next_page_url !== null);

//     useEffect(() => {
//         setData(SavedPostes || []);
//     }, []);

//     const loadMore = async () => {
//         if (!nextPage) return;
//         setLoading(true);
//         await axios.get(nextPage)
//             .then((response) => {
//                 setData([...data, ...response.data.data]);
//                 setNextPage(response.data.next_page_url);
//                 setHasMore(response.data.next_page_url !== null);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const handleRemoveFromSaved = async (postId) => {
//         try {
//             await axios.post(route('poste.Unsave'), {
//                 LaureatId: auth.user.id,
//                 PostId: postId
//             });

//             // Remove post from the data array
//             setData(data.filter(post => post.id !== postId));
//         } catch (error) {
//             console.error("Error removing post from saved:", error);
//         }
//     };

//     const SavedPostItem = ({ post }) => {
//         const [seeMore, setSeeMore] = useState(false);
//         const [isLiked, setIsLiked] = useState(false);
//         const [showComments, setShowComments] = useState(false);
//         const [likeCount, setLikeCount] = useState(post.likes_count);
//         const [commentCount] = useState(Math.floor(Math.random() * 20));
//         const [dropdownOpen, setDropdownOpen] = useState(false);

//         // useEffect(() => {
//         //     const find_Laureat = Laureat_Activity.find(elem => elem.Laureat_id === auth.user.id);
//         //     if (find_Laureat) {
//         //         const CheckLikedPost = find_Laureat.Liked_Poste.find(elem => elem === post.id);
//         //         setIsLiked(CheckLikedPost ? true : false);
//         //     }
//         // }, [Laureat_Activity]);

//         const handleLike = async () => {
//             setIsLiked(!isLiked);
//             if (!isLiked) {
//                 post(route('poste.like'), {
//                     data: {
//                         LaureatId: auth.user.id,
//                         PostId: post.id,
//                     },
//                     preserveScroll: true
//                 });
//                 const res = await axios.post(`Poste/${post.id}/Likes`);
//                 setLikeCount(res.data.likes_count);
//             } else {
//                 post(route('poste.Unlike'), {
//                     data: {
//                         LaureatId: auth.user.id,
//                         PostId: post.id,
//                     },
//                     preserveScroll: true
//                 });
//                 const res = await axios.post(`Poste/${post.id}/Likes`);
//                 setLikeCount(res.data.likes_count);
//             }
//         };

//         const toggleComments = () => {
//             setShowComments(!showComments);
//         };

//         const tags = ['dev', 'info', 'design'];

//         return (
//             <div className="w-full rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4 relative">
//                 <button
//                     onClick={() => handleRemoveFromSaved(post.id)}
//                     className="absolute top-4 right-14 inline-flex items-center justify-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors z-20"
//                     title="Remove from saved"
//                 >
//                     <BookmarkX className="h-5 w-5" />
//                 </button>

//                 <div className="flex items-center justify-between p-4 border-b border-gray-50">
//                     <div className="flex items-center space-x-3">
//                         <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-gray-50">
//                             {post.laureat.imageSRC ? (
//                                 <img
//                                     src={post.laureat.imageSRC}
//                                     alt={`${post.laureat.nom} ${post.laureat.prenom}`}
//                                     className="h-full w-full object-cover"
//                                 />
//                             ) : (
//                                 <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
//                                     <User className="text-gray-500 h-6 w-6" />
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <p className="text-sm font-semibold text-gray-800">
//                                 {post.laureat.nom} {post.laureat.prenom}
//                             </p>
//                             <div className="flex items-center text-xs text-gray-500 mt-0.5">
//                                 <Calendar className="h-3 w-3 mr-1" />
//                                 {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="relative">
//                         <button
//                             className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
//                             onClick={() => setDropdownOpen(!dropdownOpen)}
//                         >
//                             <MoreVertical className="h-5 w-5" />
//                         </button>

//                         {dropdownOpen && (
//                             <>
//                                 <div
//                                     className="fixed inset-0 z-10"
//                                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 />
//                                 <div
//                                     className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200"
//                                 >
//                                     <div className="py-1">
//                                         <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center">
//                                             Report
//                                         </button>
//                                         <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center">
//                                             Hide
//                                         </button>
//                                         <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left flex items-center">
//                                             Copy link
//                                         </button>
//                                     </div>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="px-4 py-3">
//                     <div className="text-base font-medium text-gray-800 mb-3">
//                         {
//                             post.content.length < 80 ?
//                                 (post.content)
//                                 :
//                                 (!seeMore) ?
//                                     (
//                                         <>
//                                             {post.content.substring(0, 80)},
//                                             <button
//                                                 className="ml-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
//                                                 onClick={() => setSeeMore(!seeMore)}
//                                             >
//                                                 Lire la suite
//                                             </button>
//                                         </>
//                                     )
//                                     :
//                                     (
//                                         <>
//                                             {post.content}
//                                             <button
//                                                 className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-1"
//                                                 onClick={() => setSeeMore(!seeMore)}
//                                             >
//                                                 <ChevronUp className="h-4 w-4 mr-1" />
//                                                 Voir moins
//                                             </button>
//                                         </>
//                                     )
//                         }
//                     </div>

//                     {post.photo && (
//                         <div className="rounded-lg overflow-hidden bg-gray-50 mb-3">
//                             <img
//                                 src={post.photo}
//                                 alt="Post media"
//                                 className="w-full h-auto object-cover max-h-96"
//                             />
//                         </div>
//                     )}

//                     {tags.length > 0 && (
//                         <div className="flex flex-wrap gap-2 my-2">
//                             {tags.map((tag) => (
//                                 <div
//                                     key={tag}
//                                     className="inline-flex items-center rounded-full bg-gray-50 hover:bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 cursor-pointer transition-colors"
//                                 >
//                                     #{tag}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//                 <hr className="mx-4 " />
//                 <div className="flex items-center justify-between px-4 py-3 ">
//                     <div className="flex items-center space-x-1">
//                         <button
//                             className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
//                             onClick={handleLike}
//                         >
//                             <Heart
//                                 className={`h-5 w-5 ${isLiked ? "fill-red-500 " : ""}`}
//                             />
//                             <span className="ml-1.5 text-sm font-medium">{likeCount}</span>
//                         </button>

//                         <button
//                             className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
//                             onClick={toggleComments}
//                         >
//                             <MessageSquare className="h-5 w-5" />
//                             <span className="ml-1.5 text-sm font-medium">{commentCount}</span>
//                         </button>

//                         <button
//                             className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-50 transition-colors"
//                         >
//                             <Share2 className="h-5 w-5" />
//                         </button>
//                     </div>
//                 </div>

//                 {showComments && (
//                     <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
//                         <div className="text-sm text-gray-500 text-center py-4">
//                             Comments section will be rendered here
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="w-full space-y-6">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">Saved Posts</h2>
//             </div>

//             {processing ? (
//                 <>
//                     {[1, 2, 3].map((_, index) => (
//                         <div key={index} className="w-full space-y-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
//                             <div className="flex items-center space-x-2">
//                                 <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//                                 <div className="space-y-2">
//                                     <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
//                                     <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
//                                 </div>
//                             </div>
//                             <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
//                             <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
//                             <div className="flex items-center justify-between">
//                                 <div className="flex space-x-2">
//                                     <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
//                                     <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
//                                     <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
//                                 </div>
//                                 <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </>
//             ) : (
//                 <>
//                     {data.length > 0 ? (
//                         <div className="space-y-6 w-full mb-6">
//                             {data.map((post) => (
//                                 <SavedPostItem key={post.id} post={post} />
//                             ))}

//                             {hasMore ? (
//                                 <div className="flex justify-center py-4">
//                                     <button
//                                         onClick={loadMore}
//                                         className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 w-full sm:w-auto"
//                                     >
//                                         <RefreshCw className={`h-4 w-4 mr-2 ${loading && 'animate-spin duration-700'}`} />
//                                         Load more
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div className="text-center mb-10">
//                                     <p className="text-gray-500">No more saved posts</p>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="text-center mt-40">
//                             <h3 className="text-lg font-medium mb-2">No saved posts yet</h3>
//                             <p className="text-sm text-gray-500">
//                                 Bookmarked posts will appear here
//                             </p>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// SavedPostsFeed.layout = page => <Dashboard children={page} title={'BookMarks'} />;

// export default SavedPostsFeed;
