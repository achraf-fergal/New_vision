import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { Check, X } from "lucide-react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import Dashboard from "@/Layouts/DashboardGestionnaireLayout";

function LaureatWaiting({ LaureatWaiting }) {

    const { data, setData, errors, post, processing } = useForm({
        LaureatWaiting: LaureatWaiting
    })

    const [search, setSearch] = useState("");

    const filteredLaureates = data.LaureatWaiting.filter((laureate) =>
        (laureate.nom + " " + laureate.prenom).toLowerCase().includes(search.toLowerCase()) ||
        laureate.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleAccept=(LaureatId)=>{
        post(
            route('laureat.waiting.accept', { LaureatChosed: LaureatId }),
            {
                preserveState: true,
                onSuccess: () => {
                    setData({
                        LaureatWaiting: data.LaureatWaiting.filter((Laureat)=>Laureat.id!==LaureatId)
                    });
                    toast.success("Laureat accepted successfully");
                }

            }
        )
    }

    const handleReject=(LaureatId)=>{
        post(
            route('laureat.waiting.reject', { LaureatChosed: LaureatId }),
            {
                preserveState: true,
                onSuccess: () => {
                    setData({
                        LaureatWaiting: data.LaureatWaiting.filter((Laureat)=>Laureat.id!==LaureatId)
                    });
                    toast.success("Laureat accepted successfully");
                }

            }
        )
    }




    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-lg">
            <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">No Pending Laureates</h3>
            <p className="text-gray-500">No laureates are waiting for approval at the moment.</p>
        </div>

    );

    return (
        <div className=" pb-8 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Waiting Laureates - ({data.LaureatWaiting.length})</h1>
                    <p className="text-gray-600">Review and manage laureates waiting for approval</p>
                </div>

                <div className="relative mb-6">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <TextInput
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl placeholder:text-[#6B6B6B] focus:border-2 focus:border-blue-800  "
                    />
                </div>

                {
                    processing ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                    )
                        : data.LaureatWaiting.length === 0 ?
                            (
                                <EmptyState />
                            )
                            : (
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="px-6 py-4 text-left text-base font-semibold text-gray-900">
                                                        Full Name
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-base font-semibold text-gray-900">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-base font-semibold text-gray-900">
                                                        Date Creation
                                                    </th>
                                                    <th className="px-6 py-4 text-right text-base font-semibold text-gray-900">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {filteredLaureates.length > 0 ? (
                                                    filteredLaureates.map((laureate) => (
                                                        <tr key={laureate.id} className="group hover:bg-gray-50 transition-colors cursor-pointer ">
                                                            <td className="px-6 py-4">
                                                                <div className="font-medium text-gray-900">
                                                                    {laureate.nom} {laureate.prenom}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600">{laureate.email}</td>
                                                            <td className="px-6 py-4 text-gray-600">
                                                                {new Date(laureate.created_at).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <button
                                                                        onClick={() => handleAccept(laureate.id)}
                                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium text-sm hover:bg-green-100 transition-colors group-hover:bg-green-600 group-hover:text-white"
                                                                    >
                                                                        <Check className="w-4 h-4" />
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleReject(laureate.id)}
                                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-12 text-center">
                                                            <div className="text-gray-500">No matching laureates found</div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
            </div>
            <Toaster position="buttom-left" />
        </div>
    );
};

LaureatWaiting.layout = page => <Dashboard children={page} title={'Laureat Waiting'} />;

export default LaureatWaiting;
