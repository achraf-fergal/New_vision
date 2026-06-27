import { useEffect, useState } from "react";
import { Flag, ThumbsUp, User } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Avis({ Avis, auth, LaureatActivity }) {
    const { t, i18n } = useTranslation();
    const { data, setData, processing, errors, post } = useForm([])
    const [Loading, setLoading] = useState(false)
    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        setLoading(true);
        setData(Avis);
        setLoading(false);
    }, [Avis]);

    const handleMarkHelpful = (avisId) => {
        post(route('avis.helpful', avisId), {
            preserveScroll: true,
        });
    };

    const handleReport = (avisId) => {
        post(route('avis.report', avisId), {
            preserveScroll: true,
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section id="avis" className="w-full mb-44 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl pt-40 px-4 mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    {t('avis_title')}
                </h2>

                {Loading ? (
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
                                {t('avis_empty')}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {t('avis_empty_subtitle')}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((avis) => (
                            <div
                                key={avis.id}
                                className="p-6 bg-card text-card-foreground rounded-lg shadow-lg"
                            >
                                <div className={isRTL ? "text-right" : ""}>
                                    <div className={`flex items-center mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        {avis.user.imageSRC ? (
                                            <img
                                                className={`w-10 h-10 ${isRTL ? "ms-4" : "me-4"} rounded-full object-cover`}
                                                src={'/storage/' + avis.user.imageSRC}
                                                alt={avis.user.nom}
                                                title={avis.user.nom}
                                            />

                                        ) : (
                                            <User className={`w-10 h-10 ${isRTL ? "ms-4" : "me-4"} text-gray-600`} />
                                        )}
                                        <div className="font-semibold">
                                            <div>
                                                {`${avis.user.nom} ${avis.user.prenom}`}
                                                <p className="block text-sm text-gray-500">
                                                    {t('joined_on', { date: formatDate(avis.user.created_at) })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">{avis.avis}</p>
                                    <div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {avis.helpful > avis.report
                                                ? t('helpful_count', { count: avis.helpful })
                                                : t('report_count', { count: avis.report })}
                                        </p>
                                        {
                                            auth.user ? (
                                                <>
                                                    <div className={`flex items-center mt-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                        <button
                                                            className={`flex items-center text-sm hover:text-blue-600 ${i18n.language === 'ar' ? 'ml-4' : 'mr-4'} ${LaureatActivity?.Helpful_Avis.find(elem => elem === avis.id) ? 'text-blue-600' : 'text-gray-600'}`}
                                                            onClick={() => handleMarkHelpful(avis.id)}
                                                            disabled={LaureatActivity?.Helpful_Avis.find(elem => elem === avis.id)}
                                                        >
                                                            <ThumbsUp className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                                            {t('avis.helpful')}
                                                        </button>
                                                        <button
                                                            className={`flex items-center text-sm hover:text-red-600 ${LaureatActivity?.Report_Avis.find(elem => elem === avis.id) ? 'text-red-600' : 'text-gray-600'}`}
                                                            onClick={() => handleReport(avis.id)}
                                                            disabled={LaureatActivity?.Report_Avis.find(elem => elem === avis.id)}
                                                        >
                                                            <Flag className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                                                            {t('avis.report')}
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
