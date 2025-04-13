// import { useEffect, useState } from "react";
// import { User } from "lucide-react";
// import { useForm } from "@inertiajs/react";

// export default function Avis({ Avis , auth }) {

//     const { data, setData, processing, errors, post } = useForm([])

//     useEffect(() => {
//         setData(Avis);

//     }
//         , [Avis]
//     );

//     console.log(data);

//     return (
//         <section id="avis" className="w-full mb-44 sm:px-6 lg:px-8 ">
//                 <div className="w-full max-w-8xl pt-40 px-4 mx-auto">
//                     <h2 className="text-3xl font-bold mb-12 text-center">
//                         Avis des lauréats
//                     </h2>

//                     {
//                         (processing) ? (
//                             <div className="flex justify-center items-center mt-36">
//                                 <div className="flex justify-center items-center min-h-[300px]">
//                                     <div
//                                         className="w-10 h-10 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
//                                 </div>
//                             </div>
//                         )
//                             : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {data.map((avis) => (
//                                     <div
//                                         key={avis.id}
//                                         className="p-6 bg-card text-card-foreground rounded-lg shadow-lg "
//                                     >
//                                         <div>
//                                             <div className="flex items-center mb-4">
//                                                 {avis.laureat.imageSRC ? (
//                                                     <img
//                                                         className="w-10 h-10 me-4 rounded-full"
//                                                         src={avis.laureat.imageSRC}
//                                                         alt={avis.laureat.nom}
//                                                         title={avis.laureat.nom}
//                                                     />
//                                                 ) : (
//                                                     <User className="w-10 h-10 me-4 text-gray-600" />
//                                                 )}
//                                                 <div className="font-semibold">
//                                                     <div>
//                                                         {`${avis.laureat.nom} ${avis.laureat.prenom}`}
//                                                         <p className="block text-sm text-gray-500">
//                                                             Rejoint le {new Date(avis.laureat.created_at).toLocaleDateString()}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <p className="text-muted-foreground mb-4">{avis.avis}</p>
//                                             <div>
//                                                 <p className="mt-1 text-xs text-gray-500">
//                                                     {avis.helpful > avis.report
//                                                         ? `${avis.helpful} people found this helpful`
//                                                         : `${avis.report} people reported this avis`}
//                                                 </p>
//                                                 {
//                                                     auth.user ? (
//                                                         <>
//                                                             <div className="flex items-center mt-3">
//                                                                 <button
//                                                                     // onClick={() => handleAction(avis.id, "helpful")}
//                                                                     id="helpful"
//                                                                     className="pe-2 text-xs font-medium text-gray-600 transition-all"
//                                                                     aria-label="Mark as helpful"
//                                                                 >
//                                                                     Helpful
//                                                                 </button>
//                                                                 |
//                                                                 <button
//                                                                     // onClick={() => handleAction(avis.id, "report")}
//                                                                     id="report"
//                                                                     className="ps-2 text-sm font-medium text-blue-600 hover:underline transition-all"
//                                                                     aria-label="Report abuse"
//                                                                 >
//                                                                     Report abuse
//                                                                 </button>
//                                                             </div>
//                                                         </>
//                                                     )
//                                                     :""
//                                                 }
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             )}
//                 </div>
//         </section>
//     );
// }



import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function Avis({ Avis, auth }) {
    const { data, setData, processing, errors, post } = useForm([])

    useEffect(() => {
        setData(Avis);
    }, [Avis]);

    console.log(data);

    return (
        <section id="avis" className="w-full mb-44 sm:px-6 lg:px-8 ">
                <div className="w-full max-w-8xl pt-40 px-4 mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    Avis des lauréats
                </h2>

                {processing ? (
                    <div className="flex justify-center items-center mt-36">
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div
                                className="w-10 h-10 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
                        </div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="text-center">
                            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-xl text-gray-600">
                                Aucun avis disponible pour le moment
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Les lauréats n'ont pas encore partagé leurs témoignages
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((avis) => (
                            <div
                                key={avis.id}
                                className="p-6 bg-card text-card-foreground rounded-lg shadow-lg "
                            >
                                <div>
                                    <div className="flex items-center mb-4">
                                        {avis.laureat.imageSRC ? (
                                            <img
                                                className="w-10 h-10 me-4 rounded-full"
                                                src={avis.laureat.imageSRC}
                                                alt={avis.laureat.nom}
                                                title={avis.laureat.nom}
                                            />
                                        ) : (
                                            <User className="w-10 h-10 me-4 text-gray-600" />
                                        )}
                                        <div className="font-semibold">
                                            <div>
                                                {`${avis.laureat.nom} ${avis.laureat.prenom}`}
                                                <p className="block text-sm text-gray-500">
                                                    Rejoint le {new Date(avis.laureat.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">{avis.avis}</p>
                                    <div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {avis.helpful > avis.report
                                                ? `${avis.helpful} people found this helpful`
                                                : `${avis.report} people reported this avis`}
                                        </p>
                                        {
                                            auth.user ? (
                                                <>
                                                    <div className="flex items-center mt-3">
                                                        <button
                                                            // onClick={() => handleAction(avis.id, "helpful")}
                                                            id="helpful"
                                                            className="pe-2 text-xs font-medium text-gray-600 transition-all"
                                                            aria-label="Mark as helpful"
                                                        >
                                                            Helpful
                                                        </button>
                                                        |
                                                        <button
                                                            // onClick={() => handleAction(avis.id, "report")}
                                                            id="report"
                                                            className="ps-2 text-sm font-medium text-blue-600 hover:underline transition-all"
                                                            aria-label="Report abuse"
                                                        >
                                                            Report abuse
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
