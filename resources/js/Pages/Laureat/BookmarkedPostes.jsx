import { useState, useEffect } from "react";
import { RefreshCw, Bookmark } from "lucide-react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import PostCard from "./Composents/PostCard";
import axios from "axios";
import Dashboard from "@/Layouts/DashboardLayout";
import { useTranslation } from "react-i18next";
import { t } from "i18next";


const BookmarkedPosts = () => {
    const { auth } = usePage().props;
    const { SavedPostes } = usePage().props;
    const { data, setData, processing } = useForm([]);
    const [nextPage, setNextPage] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setData(SavedPostes);
    }, [SavedPostes]);

    return (
        <div className={`max-w-4xl py-8 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="mb-8 flex items-end">
                <h1 className="text-2xl font-bold text-gray-800">
                    {t('bookmarks_title')}
                </h1>
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
                                    (post) &&
                                    <PostCard
                                        key={post.id}
                                        Poste={post}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={`text-center ${i18n.language === 'ar' ? 'mr-56' : 'ml-56'} py-28`}>
                                <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium mb-2">
                                    {t('bookmarks_empty_state_title')}
                                </h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    {t('bookmarks_empty_state_description')}
                                </p>
                                <Link href={route('dashboard')}>
                                    <button
                                        className="mt-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        {t('bookmarks_empty_state_explore_button')}
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

BookmarkedPosts.layout = page => <Dashboard children={page} title={t('bookmarks_title')} />;

export default BookmarkedPosts;
