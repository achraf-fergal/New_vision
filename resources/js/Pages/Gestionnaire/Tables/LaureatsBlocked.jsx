import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { Trash2, Unlock } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import TextInput from "@/Components/TextInput";
import Dashboard from "@/Layouts/DashboardGestionnaireLayout";
import { t } from "i18next";

function LaureatBlocked({ LaureatBlocked }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        LaureatBlocked: LaureatBlocked
    });

    const [search, setSearch] = useState("");

    const filteredLaureates = data.LaureatBlocked.filter((laureate) =>
        (laureate.nom + " " + laureate.prenom).toLowerCase().includes(search.toLowerCase()) ||
        laureate.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleUnblock = (LaureatId) => {
        {
            auth.user.valide ?
                post(
                    route('laureat.blocked.unblock', { LaureatChosed: LaureatId }),
                    {
                        preserveState: true,
                        onSuccess: () => {
                            setData({
                                LaureatBlocked: data.LaureatBlocked.filter((Laureat) => Laureat.id !== LaureatId)
                            });
                            toast.success(t('Gestionnaire.laureat.unblock_success'));
                        }
                    }
                )
                :
                toast.error(t('Gestionnaire.laureat.accepted_error'))
        }
    };

    const handleDeleteAccount = (id) => {
        if (auth.user.valide) {
            if (confirm(t('Gestionnaire.laureat.delete_confirm'))) {
                post(route('gestionnaire.account.delete', id), {
                    preserveState: true,
                    onSuccess: () => {
                        setData({
                            LaureatBlocked: data.LaureatBlocked.filter((Laureat) => Laureat.id !== id)
                        });
                        toast.success(t('Gestionnaire.laureat.delete_success'));
                    }
                });
            }
        }
        else {
            toast.error(t('Gestionnaire.laureat.accepted_error'))
        }

    };

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-lg">
            <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">{t('Gestionnaire.laureat.no_blocked')}</h3>
            <p className="text-gray-500">{t('Gestionnaire.laureat.no_blocked_available')}</p>
        </div>
    );

    return (
        <div className=" py-10 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('Gestionnaire.laureat.blocked_laureates')} ({data.LaureatBlocked.length})
                    </h1>
                    <p className="text-gray-600">{t('Gestionnaire.laureat.view_manage_blocked')}</p>
                </div>

                <div className="relative mb-6">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <TextInput
                        type="text"
                        placeholder={t('Gestionnaire.laureat.search_placeholder')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl placeholder:text-[#6B6B6B] focus:border-2 focus:border-blue-800"
                    />
                </div>

                {processing ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : data.LaureatBlocked.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.laureat.full_name')}
                                        </th>
                                        <th className="px-4 py-2 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.laureat.email')}
                                        </th>
                                        <th className="px-4 py-2 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.laureat.telephone')}
                                        </th>
                                        <th className="px-4 py-2 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.laureat.etablissement')}
                                            <br />
                                            {t('filiere')}
                                        </th>
                                        <th className="px-4 py-2 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.laureat.blocked_date')}
                                        </th>
                                        <th className="px-4 py-2 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.laureat.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredLaureates.length > 0 ? (
                                        filteredLaureates.map((laureate) => (
                                            <tr key={laureate.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-gray-900">
                                                        {laureate.nom} {laureate.prenom}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">{laureate.email}</td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {laureate.telephone}
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {laureate.etablissement}
                                                    <br />
                                                    {t("branches." + laureate.filiere)}
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {new Date(laureate.blocked_at || laureate.updated_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-4 text-left">
                                                    <button
                                                        onClick={() => handleUnblock(laureate.id)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm  transition-colors hover:bg-blue-600 hover:text-white"
                                                    >
                                                        <Unlock className="w-4 h-4" />
                                                        {t('Gestionnaire.laureat.unblock_laureat')}
                                                    </button>

                                                    <button
                                                        onClick={(e) => handleDeleteAccount(laureate.id)}
                                                        className="inline-flex mx-1 items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg font-medium text-sm transition-colors hover:bg-orange-600 hover:text-white"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        {t('Gestionnaire.laureat.delete_laureat')}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-12 text-center">
                                                <div className="text-gray-500">{t('Gestionnaire.laureat.no_matching')}</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <Toaster position="bottom-left" />
        </div>
    );
};

LaureatBlocked.layout = page => <Dashboard children={page} title={t('Gestionnaire.laureat.blocked_title')} />;

export default LaureatBlocked;
