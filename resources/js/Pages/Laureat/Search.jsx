// import { useEffect, useState } from "react";
// import { Search } from "lucide-react";
// import Dashboard from "@/Layouts/DashboardLayout";
// import { useForm } from "@inertiajs/react";
// import SearchPoste from "./Composents/SearchPoste";
// import axios from "axios";

// const SearchResults = ({search, Postes }) => {
//     const { data, setData, post, get, reset, processing } = useForm(Postes || [])
//     const [activeFilter, setActiveFilter] = useState("all");

//     const filterTypes = [
//         { id: "all", label: "All Results" },
//         { id: "posts", label: "Posts" },
//         { id: "authors", label: "Authors" },
//         { id: "categories", label: "Categories" },
//         { id: "tags", label: "Tags" }
//     ];


//         const GetPostes = async() => {
//             const res = await axios.post(route('laureat.search.getpostes', {search:search }))
//             setData(res.data)
//         }

//         useEffect(()=>{
//             GetPostes();
//         },[search]);

//         console.log(search);


//     return (

//         <>
//             <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
//                         {filterTypes.map(filter => (
//                             <button
//                                 key={filter.id}
//                                 onClick={() => setActiveFilter(filter.id)}
//                                 className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === filter.id
//                                     ? 'bg-blue-100 text-blue-800'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                     }`}
//                             >
//                                 {filter.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>



//             <div className="overflow-y-auto mt-4 ">
//                 {processing ? (
//                     <div className="flex justify-center items-center py-12">
//                         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//                     </div>
//                 ) :
//                     data.length > 0 ? (
//                         <>
//                             {data.map(poste =>
//                                 <SearchPoste poste={poste} />
//                             )
//                             }
//                         </>
//                     ) : (
//                         <div className="flex flex-col items-center justify-center py-16 mt-16 ">
//                             <div className="rounded-full p-4 bg-gray-100">
//                                 <Search className="h-10 w-10 text-gray-400" />
//                             </div>
//                             <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
//                             <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
//                         </div>
//                     )}
//             </div>
//         </>
//     );
// };

// SearchResults.layout = page => <Dashboard children={page} />;
// export default SearchResults;
import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import Dashboard from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import SearchPoste from "./Composents/SearchPoste";

const SearchResults = ({ search, Postes, Laureats }) => {
    const { data, setData, processing, post } = useForm({
        posts: Postes || [],
        Laureats: Laureats || []
    });

    const [filters, setfilters] = useState("posts");
    const [ResultsPostes, setResultsPostes] = useState([]);
    const [ResultsLaureats, setResultsLaureats] = useState([]);
    const [loading, setLoading] = useState(false);

    const filtersType = [
        { id: "posts", label: "Posts" },
        { id: "authors", label: "Authors" },
    ];

    useEffect(() => {
        if (filters === "posts") {
            setResultsPostes([...data.posts]);
        } else if (filters === "authors") {
            setResultsLaureats([...data.Laureats]);
        }
    }, [filters, data]);

    const UserSearchResult = ({ user }) => (
        <div className="p-4 hover:bg-gray-50 border transition-colors rounded-lg mb-2 cursor-pointer">
            <div className="flex items-center gap-3">
                {user.imageSRC ? (
                    <img src={'/storage/' + user.imageSRC} alt={user.nom} className="w-11 h-11 rounded-full" />
                ) : (
                    <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        {user.nom[0] + user.prenom[0]}
                    </div>
                )}
                <div>
                    <h3 className="text-base font-semibold text-gray-900">{user.nom} {user.prenom}</h3>
                    <p className="text-sm text-gray-500">{user.fonction || 'Laureat'}</p>
                    {user.etablissement && <p className="text-xs text-gray-400">{user.etablissement}</p>}
                </div>
            </div>
        </div>
    );

    const GetPostes = async () => {
        setLoading(true);
        try {
            const res = await axios.post(route('laureat.search.getpostes', { search: search }))
            setResultsPostes(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        GetPostes();
    }, [search]);

    console.log(ResultsPostes);

    return (
        <>
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                        {filtersType.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
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
                        (filters === 'posts') && ResultsPostes.length > 0 ?
                            (ResultsPostes.map((elem, index) => {
                                <SearchPoste key={index} poste={elem} />
                            })
                            ) :
                            (filters === 'authors') && ResultsLaureats.length > 0 ?
                                (ResultsLaureats.map((elem, index) => {
                                    <UserSearchResult key={index} laureat={elem} />
                                })
                                )
                                : (
                                    <div className="flex flex-col items-center justify-center py-16 mt-16">
                                        <div className="rounded-full p-4 bg-gray-100">
                                            <Search className="h-10 w-10 text-gray-400" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
                                        <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                                    </div>
                                )
                    )
                }

            </div>
        </>
    );
};

SearchResults.layout = page => <Dashboard children={page} />;
export default SearchResults;
