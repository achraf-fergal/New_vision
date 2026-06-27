import { useEffect, useState } from "react";
import { FiSearch, FiUserPlus } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { Edit, Trash2, UserCheck } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import TextInput from "@/Components/TextInput";
import Dashboard from "@/Layouts/DashboardGestionnaireLayout";
import SelectInput from "@/Components/SelectInput";
import { t } from "i18next";
import i18n from "../i18n";

function AdminManagement({ admins }) {
    const { t } = useTranslation();
    const { data, setData, errors, post, delete: destroy, processing, reset, clearErrors } = useForm({
        nom: '',
        prenom: '',
        email: '',
        role: 'admin',
        cin: '',
        telephone: ''
    });

    const { auth } = usePage().props;
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredAdmins = admins.filter((admin) =>
        (admin.nom + " " + admin.prenom).toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (adminId) => {
        if (confirm(t('Gestionnaire.admin.delete_confirm'))) {
            post(
                route('gestionnaire.destroy', adminId),
                {
                    preserveState: true,
                    onSuccess: () => {
                        toast.success(t('Gestionnaire.admin.delete_success'));
                    },
                    onError: () => {
                        toast.error(t('Gestionnaire.admin.delete_self_error'));
                    }
                }
            );
        }
    };
    const handleValide = (admin) => {
        post(
            route('gestionnaire.toggleValide', admin.id),
            {
                preserveState: true,
                onSuccess: () => {
                    toast.success(
                        admin.valide
                            ? t('Gestionnaire.admin.invalidate_success')
                            : t('Gestionnaire.admin.validate_success')
                    );
                },
                onError: () => {
                    toast.error(
                        admin.valide
                            ? t('Gestionnaire.admin.invalidate_error')
                            : t('Gestionnaire.admin.validate_error')
                    );
                }
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            route('gestionnaire.store'),
            {
                preserveState: true,
                onSuccess: (response) => {
                    reset();
                    clearErrors();
                    setShowAddModal(false);
                    toast.success(t('Gestionnaire.admin.create_success'));
                },
                onError: () => {
                    toast.error(t('Gestionnaire.admin.create_error'));
                }
            }
        );
    };

    useEffect(() => {
        clearErrors();
    }, [i18n.language]);

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-lg">
            <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">{t('Gestionnaire.admin.no_admins')}</h3>
            <p className="text-gray-500">{t('Gestionnaire.admin.no_admins_message')}</p>
        </div>
    );

    return (
        <div className="py-10 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {t('Gestionnaire.admin.title')} ({admins.length})
                        </h1>
                        <p className="text-gray-600">{t('Gestionnaire.admin.subtitle')}</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <FiUserPlus className="w-5 h-5" />
                        {t('Gestionnaire.admin.add_button')}
                    </button>
                </div>

                <div className="relative mb-6">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <TextInput
                        type="text"
                        placeholder={t('Gestionnaire.admin.search_placeholder')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl placeholder:text-[#6B6B6B] focus:border-2 focus:border-blue-800"
                    />
                </div>

                {processing && !showAddModal ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : admins.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.matricule_role')}
                                        </th>
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.full_name')}
                                        </th>
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.cin')}
                                        </th>
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.email')}
                                        </th>
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.telephone')}
                                        </th>
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.valide')}
                                        </th>
                                        <th className="px-4 py-4 text-left text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.created_date')}
                                        </th>
                                        <th className="px-4 py-4 text-center text-base font-semibold text-gray-900">
                                            {t('Gestionnaire.admin.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredAdmins.length > 0 ? (
                                        filteredAdmins.map((admin) => (
                                            <tr key={admin.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4 text-gray-600">
                                                    {admin.matricule} - {admin.role} {admin.id === auth.user.id && `(${t('Gestionnaire.admin.me')})`}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-gray-900">
                                                        {admin.nom} {admin.prenom}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">{admin.CIN}</td>
                                                <td className="px-4 py-4 text-gray-600">{admin.email}</td>
                                                <td className="px-4 py-4 text-gray-600">{admin.telephone}</td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {admin.valide ? (
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                                                            {t('Gestionnaire.admin.is_valide')}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                                                            {t('Gestionnaire.admin.is_notvalide')}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {new Date(admin.created_at).toLocaleDateString()}
                                                </td>
                                                {admin.id !== auth.user.id && (
                                                    <td className="py-4 text-center">
                                                        <button
                                                            onClick={() => handleDelete(admin.id)}
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                            {t('Gestionnaire.admin.delete')}
                                                        </button>
                                                        <button
                                                            onClick={() => handleValide(admin)}
                                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ml-2
                                                                ${admin.valide
                                                                    ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 group-hover:bg-yellow-600 group-hover:text-white'
                                                                    : 'bg-green-50 text-green-700 hover:bg-green-100 group-hover:bg-green-600 group-hover:text-white'
                                                                }`}
                                                        >
                                                            {admin.valide ? t('Gestionnaire.admin.is_valide') : t('Gestionnaire.admin.is_notvalide')}
                                                        </button>
                                                    </td>
                                                )}
                                                {admin.id === auth.user.id && (
                                                    <td className="py-4 text-center">
                                                        <button
                                                            onClick={() => router.visit(route('profile.edit'))}
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            {t('Gestionnaire.admin.update')}
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <div className="text-gray-500">{t('Gestionnaire.admin.no_matching')}</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('Gestionnaire.admin.add_modal_title')}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Gestionnaire.admin.last_name')}
                                    </label>
                                    <TextInput
                                        type="text"
                                        placeholder={t('Gestionnaire.admin.last_name_placeholder')}
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        className="w-full rounded-lg"
                                    />
                                    {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Gestionnaire.admin.first_name')}
                                    </label>
                                    <TextInput
                                        type="text"
                                        placeholder={t('Gestionnaire.admin.first_name_placeholder')}
                                        value={data.prenom}
                                        onChange={(e) => setData('prenom', e.target.value)}
                                        className="w-full rounded-lg"
                                    />
                                    {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Gestionnaire.admin.email')}
                                    </label>
                                    <TextInput
                                        type="text"
                                        placeholder={t('Gestionnaire.admin.email_placeholder')}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Gestionnaire.admin.telephone')}
                                    </label>
                                    <TextInput
                                        type="text"
                                        placeholder={t('Gestionnaire.admin.telephone_placeholder')}
                                        value={data.telephone}
                                        onChange={(e) => setData('telephone', e.target.value)}
                                        className="w-full rounded-lg"
                                    />
                                    {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Gestionnaire.admin.cin')}
                                    </label>
                                    <TextInput
                                        type="text"
                                        placeholder={t('Gestionnaire.admin.cin_placeholder')}
                                        value={data.cin}
                                        onChange={(e) => setData('cin', e.target.value)}
                                        className="w-full rounded-lg"
                                    />
                                    {errors.cin && <p className="mt-1 text-sm text-red-600">{errors.cin}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Gestionnaire.admin.role')}
                                    </label>
                                    <SelectInput
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full rounded-lg"
                                    >
                                        <option value="" disabled={(data.role) ? true : false}>
                                            {t('Gestionnaire.admin.choose_role')}
                                        </option>
                                        <option value="admin">{t('Gestionnaire.admin.role_admin')}</option>
                                        <option value="superadmin">{t('Gestionnaire.admin.role_superadmin')}</option>
                                    </SelectInput>
                                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    {t('Gestionnaire.admin.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                                >
                                    {processing ? t('Gestionnaire.admin.creating') : t('Gestionnaire.admin.create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Toaster position="bottom-left" />
        </div>
    );
}

AdminManagement.layout = page => <Dashboard children={page} title={t('Gestionnaire.admin.title')} />;

export default AdminManagement;
