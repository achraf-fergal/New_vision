import { useEffect, useState } from "react";
import { Search, X, Filter, Tag, Calendar, ThumbsUp, MessageSquare, BookmarkPlus, ArrowUpRight } from "lucide-react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";


const SearchPoste = ({ poste }) => {
    const { auth } = usePage().props;

    console.log(poste)

    const { data, setData, post, get, reset, processing } = useForm({
        ...poste,
        LaureatId: auth.user.id,
        PostId: poste.id,
    });
    const { Laureat_Activity } = usePage().props;


    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);


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



    useEffect(() => {
        const find_Laureat = Laureat_Activity.find(elem => elem.Laureat_id === auth.user.id);
        if (find_Laureat) {
            const CheckLikedPost = find_Laureat.Liked_Poste.find(elem => elem === poste.id);
            if (CheckLikedPost) {
                setIsLiked(true);
            }
            else {
                setIsLiked(false);
            }
            const CheckBookmarkedPost = find_Laureat.saved_Poste.find(elem => elem === poste.id);
            if (CheckBookmarkedPost) {
                setIsBookmarked(true);
            }
            else {
                setIsBookmarked(false);
            }
        }

    }, [Laureat_Activity]);


    const tags = ['dev', 'info', 'design'];


    return (


        <>
            <div key={poste.id} className="p-4 hover:bg-gray-50 border transition-colors rounded-lg mb-2 cursor-pointer ">

                <div className="flex items-start">

                    <div className="flex-1"
                        onClick={() => {
                            router.visit(`/Poste/${poste.id}`)
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                                {/* {result.category} */}
                                {'Technologie'}
                            </span>
                            <span className="text-gray-500 text-xs flex items-center">
                                <Calendar className="inline h-3 w-3 mr-1" />
                                {
                                    formatDistanceToNow(new Date(poste.created_at), { addSuffix: true, })
                                }
                            </span>
                        </div>

                        <div className="flex items-center mt-4 gap-2">
                            {poste.laureat.imageSRC ? (
                                <img src={'/storage/' + poste.laureat.imageSRC} alt={poste.laureat.nom} className="w-6 h-6 rounded-full" />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xs">{poste.laureat.nom[0] + poste.laureat.prenom[0]}</div>
                            )}
                            <span className=" text-base font-semibold text-gray-900">{poste.laureat.nom} {poste.laureat.prenom}</span>
                            <span className="text-xs font-light text-gray-500">{poste.laureat.fonction}</span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 px-1.5 my-4">
                            {poste.content}
                        </p>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                        <button className={`p-1.5 rounded-full hover:bg-gray-100 ${isBookmarked ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                            onClick={handleBookmark}
                        >
                            <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? 'fill-blue-600' : ''} `} />
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-blue-100"
                            onClick={() => {
                                router.visit(`/Poste/${poste.id}`);
                            }}
                        >
                            <ArrowUpRight className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                        </button>
                    </div>

                </div>

                <div className="flex items-center justify-between pr-2 "
                    onClick={() => {
                        router.visit(`/Poste/${poste.id}`)
                    }}
                >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {tags.map(tag => (
                            <span key={tag} className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-800">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-end  gap-2 mb-3  ">
                        <span className={`text-xs flex items-center  `}>
                            <ThumbsUp className={` inline h-3 w-3 mr-1 ${isLiked ? 'fill-red-600 text-red-600 ' :''} `} />
                            {poste.likes_count}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                            <MessageSquare className="inline h-3 w-3 mr-1" />
                            {poste.comments_count}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPoste;
