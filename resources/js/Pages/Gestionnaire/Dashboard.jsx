import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardGestionnaireLayout from "@/Layouts/DashboardGestionnaireLayout";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Dashboard({
    totalLauriates,
    waitingLauriates,
    acceptedLauriates,
    blockedLauriates,
    recentLauriates,
    user,
}) {
    const { t } = useTranslation();
    const isRTL = localStorage.getItem("lang") === "ar";

    const stats = [
        {
            icon: Users,
            label: t("Gestionnaire.dashboard.total_laureates"),
            value: totalLauriates,
            color: "bg-blue-100",
            textColor: "text-blue-600",
            borderColor: "border-l-blue-500",
        },
        {
            icon: UserCheck,
            label: t("Gestionnaire.dashboard.active_laureates"),
            value: acceptedLauriates,
            color: "bg-green-100",
            textColor: "text-green-600",
            borderColor: "border-l-green-500",
        },
        {
            icon: Clock,
            label: t("Gestionnaire.dashboard.pending_approval"),
            value: waitingLauriates,
            color: "bg-yellow-100",
            textColor: "text-yellow-600",
            borderColor: "border-l-yellow-500",
        },
        {
            icon: UserX,
            label: t("Gestionnaire.dashboard.restricted_access"),
            value: blockedLauriates,
            color: "bg-red-100",
            textColor: "text-red-600",
            borderColor: "border-l-red-500",
        },
    ];

    return (
        <DashboardGestionnaireLayout user={user}>
            <Head title={t("Gestionnaire.dashboard.welcome")} />

            <div dir={isRTL ? "rtl" : "ltr"}>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t("Gestionnaire.dashboard.welcome_back")},{" "}
                        {user.prenom}!
                    </h1>
                    <p className="text-gray-600">
                        {t("Gestionnaire.dashboard.subtitle")}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`${stat.color} rounded-lg p-6 border-l-4 ${stat.borderColor} shadow-sm`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">
                                            {stat.label}
                                        </p>
                                        <p
                                            className={`${stat.textColor} text-3xl font-bold mt-2`}
                                        >
                                            {stat.value}
                                        </p>
                                    </div>
                                    <Icon
                                        className={`${stat.textColor} w-12 h-12 opacity-80`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {t("Gestionnaire.dashboard.quick_actions")}
                        </h2>
                        <div className="space-y-3">
                            <Link
                                href={route("laureat.waiting")}
                                className="block w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium py-2 px-4 rounded transition-colors"
                            >
                                {t("Gestionnaire.dashboard.view_accepted")}
                            </Link>
                            <Link
                                href={route("laureat.accepted")}
                                className="block w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded transition-colors"
                            >
                                {t("Gestionnaire.dashboard.view_accepted")}
                            </Link>
                            <Link
                                href={route("laureat.blocked")}
                                className="block w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded transition-colors"
                            >
                                {t("Gestionnaire.dashboard.view_blocked")}
                            </Link>
                        </div>
                    </div>

                    {/* Recent Laureates */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {t("Gestionnaire.dashboard.recent_laureates")}
                        </h2>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {recentLauriates.length > 0 ? (
                                recentLauriates.map((laureate) => (
                                    <div
                                        key={laureate.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {laureate.nom} {laureate.prenom}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {laureate.email}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded ${
                                                laureate.valide
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {laureate.valide
                                                ? t(
                                                      "Gestionnaire.dashboard.accepted",
                                                  )
                                                : t(
                                                      "Gestionnaire.dashboard.waiting",
                                                  )}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center py-8">
                                    {t("no_posts")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardGestionnaireLayout>
    );
}
