import { useState, useEffect } from "react";
import { BookIcon, RefreshCw } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import PostCard from "./PostCard";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PostFeed = ({ Postes, message, ActiveFilter }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { props: Pos } = usePage();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [hasMore, setHasMore] = useState(false);


    useEffect(() => {
        if (Postes && Postes.data) {
            setData(Postes.data);
            setNextPage(Postes.next_page_url);
            setHasMore(Postes.next_page_url !== null);
        } else {
            setData([]);
            setNextPage(null);
            setHasMore(false);
        }
        setProcessing(false);
    }, [Postes]);


    useEffect(() => {
        if (Pos.Postes?.data) {
            const serverPageData = Pos.Postes.data;

            setData(prevData => {
                const serverPostsMap = new Map(serverPageData.map(post => [post.id, post]));

                const topPortionFromSever = serverPageData.map(serverPost => serverPostsMap.get(serverPost.id) || serverPost);


                const olderExistingPosts = prevData.filter(prevPost => !serverPostsMap.has(prevPost.id));

                return [...topPortionFromSever, ...olderExistingPosts];
            });

            setNextPage(Pos.Postes.next_page_url);
            setHasMore(Pos.Postes.next_page_url !== null);
        }

    }, [Pos.Postes]);

    const loadMore = async () => {
        if (!nextPage || loading) return;
        setLoading(true);

        try {
            const response = await axios.get(nextPage);
            setData(prev => [...prev, ...response.data.data]);
            setNextPage(response.data.next_page_url);
            setHasMore(response.data.next_page_url !== null);
        } catch (error) {
            console.error("Failed to load more posts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`w-full space-y-6 ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {processing ? (
                <>
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="w-full space-y-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                                    <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                                </div>
                            </div>
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                            <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-2 rtl:space-x-reverse">
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
                                <PostCard key={post.id} Poste={post} />
                            ))}

                            {hasMore && (
                                <div className="flex justify-center py-4">
                                    <button
                                        onClick={loadMore}
                                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 w-full sm:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}
                                        disabled={loading}
                                    >
                                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''} ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                        {loading ? t('loading') : t('load_more')}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center mt-40">
                            <BookIcon className="w-16 h-16 mx-auto my-4 text-gray-400" />
                            <h3 className="text-lg font-medium mb-2">{t('no_posts')}</h3>
                            <p className="text-sm text-gray-500">
                                {t('be_first_to_post')}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostFeed;
