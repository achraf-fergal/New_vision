import React, { useEffect, useState } from 'react';
import { Check, User, X } from 'lucide-react';
import Dashboard from '@/Layouts/DashboardLayout';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import 'dayjs/locale/ar'
import 'dayjs/locale/fr'
import 'dayjs/locale/en'

const NotificationsPanel = () => {
    const { t, i18n } = useTranslation();
    const { Notifications } = usePage().props;

    const [Notification, setNotification] = useState(Notifications);

    const handleNotification = (notification, type) => {
        router.post(route('notification.methodes', { id: notification?.id, type: type }), {
            preserveScroll: true,
        });
    }

    useEffect(() => {
        handleNotification(null, 'MaskAllAsRead');
    }, [])

    useEffect(() => {
        if (Notifications.length !== Notification.length) {
            setNotification(Notifications);
        }
    }, [Notifications])

    dayjs.locale(i18n.language)


    return (
        <div className="py-8">
            <div className='flex justify-between items-center pr-6 mb-8'>
                <h1 className="text-2xl font-bold text-gray-800">{t('notification.title')}</h1>
            </div>

            {Notification.length > 0 ? (
                Notification.map((notification) => (

                    (notification.data.type !== 'event') ? (
                        <div key={notification.id} className="px-6 border-t border-gray-200">
                            <div className="py-6 flex">
                                <div className="w-28 text-gray-500 text-sm">
                                    {dayjs(notification.created_at).format(t('avis.date_format'))}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        {notification.sender[0]?.imageSRC ? (
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={'/storage/' + notification.sender[0]?.imageSRC}
                                                alt={notification.sender[0]?.nom + ' ' + notification.sender[0]?.prenom}
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                                                {notification.sender[0]?.nom.charAt(0) + "" + notification.sender[0]?.prenom.charAt(0)}
                                            </div>
                                        )}
                                        <h3 className="text-lg font-medium text-gray-800 mx-2">
                                            {notification.sender[0]?.nom + ' ' + notification.sender[0]?.prenom}
                                        </h3>
                                        <span className="text-gray-500 text-sm">
                                            {(notification.sender[0]?.fonction || '') +
                                                (notification.sender[0]?.fonction ? ' - ' : '') +
                                                notification.sender[0]?.etablissement}
                                        </span>
                                        <span className="text-gray-500 text-sm mx-2">•</span>
                                        <span className="text-gray-500 text-sm">
                                            {dayjs(notification.created_at).format(t('avis.time_format'))}
                                        </span>
                                        <span className="text-blue-500 text-base mx-2">
                                            {!notification.read_at ? t('notification.new') : ''}
                                        </span>
                                        <div className="ml-auto">
                                            <button
                                                className="ml-2 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1"
                                                onClick={() => handleNotification(notification, 'DeleteNotifications')}
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">
                                        {
                                            notification.data.type === "like_poste" ?
                                                t('liked_post', { name: notification.data.message.split(" ")[0] + " " + notification.data.message.split(" ")[1] })
                                                :
                                                t('comment_post', { name: notification.data.message.split(" ")[0] + " " + notification.data.message.split(" ")[1] , comment : notification.data.message.split(" ")[6] })
                                        }
                                    </p>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={notification.id} className="px-6 border-t border-gray-200">
                            <div className="py-6 flex">
                                <div className="w-28 text-gray-500 text-sm">
                                    {dayjs(notification.data.created_at || notification.created_at).format('MMM D, YYYY')}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                                        {t(notification.data.title)}
                                    </h3>
                                    <p className="text-gray-600 mb-2">{t(notification.data.message)}</p>

                                    {notification.data.details && notification.data.details.map((detail, index) => (
                                        <div key={index} className="text-gray-600 mb-2">• {t(detail)}</div>
                                    ))}

                                    {notification.data.action_text && notification.data.action_url && (
                                        <button
                                            className="bg-gray-900 text-white px-4 py-2 rounded font-medium hover:bg-gray-800 mt-4"
                                            onClick={(e) => {
                                                router.get('dashboard')
                                            }}
                                        >
                                            {t(notification.data.action_text)}
                                        </button>
                                    )}
                                </div>
                                <div className="ml-auto">
                                    <button
                                        className="ml-2 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1"
                                        onClick={() => handleNotification(notification, 'DeleteNotifications')}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <div className="text-center mt-36 text-gray-500">
                    <p className="text-lg">{t('notification.empty')}</p>
                </div>
            )}
        </div>
    );
};

NotificationsPanel.layout = (page) => <Dashboard children={page} title={t('notification.title')} />;

export default NotificationsPanel;
