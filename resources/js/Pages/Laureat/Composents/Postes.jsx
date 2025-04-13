
import { useState, useEffect } from "react";
// import PostCard from "./PostCard";
import { RefreshCw } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import PostCard from "./PostCard";
import axios from "axios";

const PostFeed = ({ Postes, message }) => {
    const Pos = usePage().props;
    const { data, setData, post, errors, get } = useForm([]);
    const [Loading, setLoading] = useState(false);
    const [processing, setprocessing] = useState(true);
    const [nextPage, setNextPage] = useState(Postes.next_page_url);
    const [More, setMore] = useState(Postes.next_page_url !== null);

    useEffect(() => {
        setData(Postes.data);
        setprocessing(false);
    }
        , []);

    useEffect(() => {
        setData(Pos.Postes.data);
    }
        , [Pos]);



    const loadMore = async () => {
        if (!nextPage) return;
        setLoading(true);
        await axios.get(nextPage)
            .then((response) => {
                setData([...data, ...response.data.data]);
                setNextPage(response.data.next_page_url);
                setMore(response.data.next_page_url !== null);
            })
            .finally(() => {
                setLoading(false);
            }
            );
    };





    return (
        <div className="w-full space-y-6">
            {processing ? (
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
            )
                : (
                    <>
                        {data.length > 0 ? (
                            <div className="space-y-6 w-full mb-6 ">
                                {data.map((post) => (
                                    <PostCard key={post.id} Poste={post} />
                                ))}

                                {More ?
                                    (
                                        <div className="flex justify-center py-4">
                                            <button
                                                onClick={loadMore}
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 w-full sm:w-auto"
                                            >
                                                <RefreshCw className={`h-4 w-4 mr-2 ${Loading && 'animate-spin duration-700'}`} />
                                                Load more
                                            </button>
                                        </div>
                                    )
                                    : (
                                        <div className="text-center mb-10">
                                            <p className="text-gray-500">No more publications</p>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <div className="text-center mt-40">
                                <h3 className="text-lg font-medium mb-2">No publications yet</h3>
                                <p className="text-sm text-gray-500">
                                    Be the first to create a publication!
                                </p>
                            </div>
                        )}
                    </>
                )}
        </div>
    );
};

export default PostFeed;
