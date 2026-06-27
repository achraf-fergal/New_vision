import { useState, useEffect, useRef } from "react";
import { Search, User } from "lucide-react";
import Dashboard from "@/Layouts/DashboardLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import SearchPoste from "./Composents/SearchPoste";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { t } from "i18next";

const SearchResults = ({ search }) => {
    const { t } = useTranslation();
    const { auth } = usePage().props;

    console.log(search)

    const { data, setData, processing, post } = useForm({
        posts: [],
    });
    const [loading, setLoading] = useState(false);

    const searchTimeoutRef = useRef(null);

    const performSearch = async (search) => {
        if (!search.trim()) {
            setData({ posts: [] });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(route('laureat.search.combined', {
                search: search,
                limit: 10
            }));

            setData({
                posts: response.data.posts || [],
            });
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const [filters, setfilters] = useState("posts");

    const filtersType = [
        { id: "posts", label: t('search.filters.posts') },
    ];

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            performSearch(search);
        }, 400);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [search]);

    return (
        <>
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                        {filtersType.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setfilters(filter.id)}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${filters === filter.id
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-y-auto mt-4">
                {processing || loading ?
                    (<div className="flex justify-center items-center py-12 mt-40">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>)
                    :
                    (
                        filters === 'posts' && (
                            data.posts.length > 0 ?
                                (
                                    data.posts.map((elem, index) =>
                                        <SearchPoste key={index} poste={elem} />
                                    )
                                )
                                :
                                (
                                    <div className="flex flex-col items-center justify-center py-16 mt-16">
                                        <div className="rounded-full p-4 bg-gray-100">
                                            <Search className="h-10 w-10 text-gray-400" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-medium text-gray-900">{t('search.no_results.title')}</h3>
                                        <p className="mt-1 text-gray-500">{t('search.no_results.description')}</p>
                                    </div>
                                )
                        )
                    )
                }
            </div>
        </>
    );
};

SearchResults.layout = page => <Dashboard children={page} title={t('search.title')} />;
export default SearchResults;
