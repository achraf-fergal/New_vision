// import React, { useState, useEffect, useRef } from "react";
// import { Home, Bookmark, Users, Settings, TrendingUp, Tag, Filter, Bell, LogOut, PlusCircle, Search, Sun, Moon, ChevronDown, ImageUp, UserPen, Check, X, MessageSquare, Heart, UserPlus, Calendar, MessageSquareQuote, Trash2, Globe, Menu } from "lucide-react";
// import { Head, Link, router, useForm, usePage } from "@inertiajs/react";

// import TextInput from "@/Components/TextInput";
// import { formatDistanceToNow } from "date-fns";
// import { useTranslation } from "react-i18next";

// function Dashboard({ children, title }) {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [createPostOpen, setCreatePostOpen] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [search, setSearch] = useState('');
//     const [notificationsOpen, setNotificationsOpen] = useState(false);
//     const [deleteAccountConfirmOpen, setDeleteAccountConfirmOpen] = useState(false);
//     const { auth } = usePage().props;
//     const dropdownRef = useRef(null);
//     const deleteConfirmRef = useRef(null);
//     const searchTimeout = useRef(null);

//     const [ActiveFilter, setActiveFilter] = useState('');

//     const props = usePage().props;

//     const Filieres = usePage().props.Filieres || [];
//     console.log(Filieres);
//     const { Notifications } = usePage().props;
//     const { data, setData, post, errors, processing } = useForm(
//         Notifications || []
//     );

//     useEffect(() => {
//         const scrollableDiv = document.querySelector("main");

//         if (!scrollableDiv) return;

//         const handleScroll = () => {
//             setIsScrolled(scrollableDiv.scrollTop > 90);
//         };

//         scrollableDiv.addEventListener("scroll", handleScroll);

//         handleScroll();

//         return () => {
//             scrollableDiv.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const main = document.querySelector('main');
//         if (main) {
//             main.scrollTo({ top: 0 });
//         }
//     }, [usePage().url]);

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//             if (deleteConfirmRef.current && !deleteConfirmRef.current.contains(event.target)) {
//                 setDeleteAccountConfirmOpen(false);
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [dropdownRef, deleteConfirmRef]);

//     useEffect(() => {
//         setData(Notifications || []);
//     }, [Notifications]);

//     const getNotificationIcon = (type) => {
//         switch (type) {
//             case 'comment_poste':
//                 return <MessageSquare className="h-4 w-4 text-blue-500" />;
//             case 'like_poste':
//                 return <Heart className="h-4 w-4 text-red-500" />;
//             case 'follow_request':
//                 return <UserPlus className="h-4 w-4 text-green-500" />;
//             case 'event':
//                 return <Calendar className="h-4 w-4 text-purple-500" />;
//             default:
//                 return <Bell className="h-4 w-4 text-gray-500" />;
//         }
//     };

//     const FunctionsNotification = (notification, type) => {
//         if (type === "MaskAsRead" && notification.read_at) {
//             if (notification.data.type === 'event') return;
//             router.visit(`/Poste/${notification.data.poste_id}`);
//             setNotificationsOpen(false);
//             return;
//         }

//         post(route('notification.methodes', { id: notification?.id, type: type }), {
//             preserveScroll: true,
//             onSuccess: () => {
//                 if (type === "MaskAsRead") {
//                     if (notification.data.type === 'event') return;
//                     router.visit(`/Poste/${notification.data.poste_id}`);
//                     setNotificationsOpen(false);
//                 }
//                 setNotificationsOpen(false);
//             }
//         });
//     };

//     const [wasSearching, setWasSearching] = useState(false);

//     const handleSearch = (e) => {
//         const value = e.target.value;
//         setSearch(value);
//         if (value) {
//             setWasSearching(true);
//         }

//         clearTimeout(searchTimeout.current);
//         searchTimeout.current = setTimeout(() => {
//             if (value) {
//                 router.visit(route('laureat.search', { q: value }), {
//                     preserveState: true,
//                     only: ['Postes', 'Users']
//                 });
//             } else if (wasSearching) {
//                 router.visit(route('dashboard'));
//                 setWasSearching(false);
//             }
//         }, 700);
//     };

//     useEffect(() => {
//         if (!search) {
//             setSearch('');
//             router.visit(route('dashboard'));
//         }
//     }, [search]);

//     useEffect(() => {
//         setNotificationsOpen(false);
//     }, [usePage().url]);

//     const handleFilterChange = (filter) => {
//         const newFilter = ActiveFilter === filter ? '' : filter;
//         setActiveFilter(newFilter);

//         router.visit(
//             route('laureat.categorie', newFilter),
//         );

//         if (!newFilter) router.visit(route('dashboard'));
//     };

//     const handleDeleteAccount = () => {
//         if (confirm(t('confirm_delete_account'))) {
//             post(route('account.delete'), {
//                 onSuccess: () => {
//                     router.visit(route('login'));
//                 }
//             });
//         }
//     };










//     const { t, i18n } = useTranslation();

//     const isRTL = i18n.language === 'ar';

//     const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
//     const availableLocales = {
//         'fr': 'Français',
//         'en': 'English',
//         // 'ar': 'العربية'
//     };

//     const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);



//     useEffect(() => {
//         const savedLang = localStorage.getItem('lang');
//         if (savedLang) {
//             i18n.changeLanguage(savedLang);
//         }
//     }, []);



//     const changeLang = (localeKey) => {
//         i18n.changeLanguage(localeKey);
//         localStorage.setItem('lang', localeKey);
//         toggleLangDropdown();

//         router.post('/change-lang', { locale: localeKey }, {
//             preserveScroll: true,
//         });
//     };


//     return (
//         <>
//             <Head title={title} />
//             <div className='flex h-screen bg-gray-100 text-gray-900'>
//                 <div className='fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out flex flex-col border-r shadow-lg bg-white border-gray-200 w-64'>
//                     <div className="p-4 pt-6 pb-2 flex items-center justify-between">
//                         <Link href={route('dashboard')} preserveScroll className="flex items-center gap-2">
//                             <img
//                                 className="w-12 md:w-16"
//                                 src="/storage/OFPPT_Talk/logo.png"
//                                 alt="OFPPTConnect"
//                             />
//                             <h2 className='text-[#1c150d] text-base md:text-lg font-bold leading-tight tracking-[-0.015em]'>
//                                 {import.meta.env.VITE_APP_NAME}
//                             </h2>
//                         </Link>
//                     </div>


//                     <div className="flex-grow overflow-y-auto mt-4">
//                         <nav className="px-2 py-2">
//                             <ul className="space-y-1">
//                                 <li key='Home'>
//                                     <Link href={route('dashboard')} preserveScroll >
//                                         <button
//                                             className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'Postes' && 'bg-blue-100 text-blue-800'}`}
//                                         >
//                                             <Home className="mr-2 h-4 w-4" />
//                                             <span className="flex-grow text-left">{t('home')}</span>
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li key='MyPostes'>
//                                     <Link href={route('laureat.postes')} preserveScroll >
//                                         <button
//                                             className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('my_posts') && 'bg-blue-100 text-blue-800'}  `}
//                                         >
//                                             <ImageUp className="mr-2 h-4 w-4" />
//                                             <span className="flex-grow text-left">{t('my_posts')}</span>
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li key='Bookmarks'>
//                                     <Link href={route('poste.bookmarked')} preserveScroll >
//                                         <button
//                                             className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('bookmarks_title') && 'bg-blue-100 text-blue-800'}`}
//                                         >
//                                             <Bookmark className="mr-2 h-4 w-4" />
//                                             <span className="flex-grow text-left">{t('bookmarks')}</span>
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li key='Profile'>
//                                     <Link href={route('laureat.profile')} preserveScroll >
//                                         <button
//                                             className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('profile.title') && 'bg-blue-100 text-blue-800'}`}
//                                         >
//                                             <UserPen className="mr-2 h-4 w-4" />
//                                             {t('my_profile')}
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li key='Avis'>
//                                     <Link href={route('laureat.avis')} preserveScroll >
//                                         <button
//                                             className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('avis.title') && 'bg-blue-100 text-blue-800'}`}
//                                         >
//                                             <MessageSquareQuote className="mr-2 h-4 w-4" />
//                                             <span className="flex-grow text-left">{t('my_reviews')}</span>
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li key='Notifications'>
//                                     <Link href={route('laureat.notifications')} preserveScroll >
//                                         <button
//                                             className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('notifications') && 'bg-blue-100 text-blue-800'}`}
//                                         >
//                                             <Bell className="mr-2 h-4 w-4" />
//                                             <span className="flex-grow text-left">{t('notifications')}</span>
//                                             {
//                                                 Notifications?.filter(elem => elem.read_at == null).length > 0 && (
//                                                     <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-200 text-blue-900'>
//                                                         {Notifications?.filter(elem => elem.read_at == null).length > 99 ? '+99' : Notifications?.filter(elem => elem.read_at === null).length}
//                                                     </span>
//                                                 )}
//                                         </button>
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </nav>

//                         <div className='h-[1px] w-full my-2 bg-gray-200'></div>

//                         <div className="px-4 py-2">
//                             <div className="flex items-center justify-between mb-2">
//                                 <h3 className="text-sm font-medium">{t('filieres')} </h3>
//                                 <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-8 w-8 ${ActiveFilter ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 '} `} onClick={() => handleFilterChange('')}>
//                                     <Filter className="h-4 w-4" />
//                                 </button>
//                             </div>

//                             <div className="flex flex-wrap gap-2">
//                                 {Filieres.map((filiere) => (
//                                     <span
//                                         key={filiere}
//                                         onClick={() => handleFilterChange(filiere)}
//                                         className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer  hover:bg-blue-100 hover:text-blue-800 ${ActiveFilter === filiere ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} `}
//                                     >
//                                         {t('branches.' + filiere)}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className='p-4 border-t border-gray-200'>
//                         <div className="relative mb-2">
//                             <button
//                                 onClick={toggleLangDropdown}
//                                 className='inline-flex items-center w-full justify-start font-normal rounded-md h-10 px-4 py-2 text-sm transition-colors hover:bg-gray-100'
//                             >
//                                 <Globe className="mr-2 h-4 w-4" />
//                                 <span className="flex-grow text-left">{availableLocales[i18n.language] || 'Français'}</span>
//                                 <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
//                             </button>

//                             {isLangDropdownOpen && (
//                                 <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} w-full mt-1 bg-white shadow-md rounded-md py-1 z-50`}>
//                                     {Object.keys(availableLocales).map((localeKey) => (
//                                         <button
//                                             key={localeKey}
//                                             onClick={() => changeLang(localeKey)}
//                                             className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${localeKey === i18n.language ? 'font-medium text-black' : 'text-gray-600'}`}
//                                         >
//                                             {availableLocales[localeKey]}
//                                         </button>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* <button
//                             onClick={() => setDarkMode(!darkMode)}
//                             className='inline-flex items-center w-full justify-start font-normal rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 hover:bg-gray-100'
//                         >
//                             <Moon className="mr-2 h-4 w-4" />
//                             {t('dark_mode')}
//                         </button> */}

//                         <button
//                             onClick={() => setDeleteAccountConfirmOpen(true)}
//                             className='inline-flex items-center w-full justify-start font-normal rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 hover:bg-red-100 text-red-500 hover:text-red-600'
//                         >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             {t('delete_account')}
//                         </button>

//                         <Link
//                             href={route('logout')}
//                             method="post"
//                             className="w-full"
//                         >
//                             <button
//                                 className='inline-flex items-center w-full justify-start font-medium rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 text-red-600 hover:bg-red-50 hover:text-red-700'
//                             >
//                                 <LogOut className="mr-2 h-4 w-4" />
//                                 {t('logout')}
//                             </button>
//                         </Link>
//                     </div>
//                 </div>

//                 <div className="flex-1 ml-0 lg:ml-64">
//                     <div
//                         className={`fixed top-0 left-0 lg:left-64 right-0 flex items-center justify-between px-4 lg:px-6 z-40 transition-all duration-300 ${isScrolled
//                             ? 'bg-white/70 backdrop-blur-lg h-14 lg:h-16 shadow-lg'
//                             : 'bg-transparent h-16 lg:h-20 '
//                             }`}
//                     >
//                         <button
//                             className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
//                             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         >
//                             <Menu className="h-5 w-5" />
//                         </button>

//                         <div className="flex-1 max-w-xl lg:max-w-2xl relative mx-2 lg:mx-0">
//                             <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
//                             <TextInput
//                                 type="text"
//                                 placeholder={t('search_placeholder')}
//                                 className="w-full pl-10 pr-4 py-2 rounded-xl border text-sm lg:text-base"
//                                 value={search}
//                                 onChange={handleSearch}
//                             />
//                         </div>

//                         <div className="flex items-center gap-2 lg:gap-4">
//                             {
//                                 title === 'Postes' &&
//                                 <button className={`text-white font-medium py-2 px-2 lg:px-4 rounded-lg transition-all flex items-center justify-center gap-0 lg:gap-2 bg-blue-600 hover:bg-blue-700 ${isScrolled && 'shadow-md'}`} onClick={() => setCreatePostOpen(true)}>
//                                     <PlusCircle className="h-4 w-4" />
//                                     <span className="hidden sm:inline text-sm lg:text-base">{t('new_publication')}</span>
//                                 </button>
//                             }

//                             <div className="relative">
//                                 <button
//                                     onClick={() => setNotificationsOpen(!notificationsOpen)}
//                                     className="relative flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full hover:bg-gray-100 transition-colors"
//                                     aria-label="Notifications"
//                                 >
//                                     <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
//                                     {Notifications?.filter(elem => elem.read_at == null).length > 0 && (
//                                         <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-4 lg:w-6 lg:h-5 text-xs font-bold text-white bg-blue-600 rounded-full ring-2 ring-white">
//                                             {Notifications?.filter(elem => elem.read_at === null).length > 99 ? '+99' : Notifications?.filter(elem => elem.read_at === null).length}
//                                         </span>
//                                     )}
//                                 </button>

//                                 {notificationsOpen && (
//                                     <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50"
//                                         onMouseLeave={() => setNotificationsOpen(!notificationsOpen)}
//                                     >
//                                         <div className="px-3 sm:px-4 py-3 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 flex items-center justify-between">
//                                             <p className="text-sm sm:text-base font-semibold text-gray-900">{t('notifications')}</p>
//                                             {Notifications?.filter(elem => elem.read_at == null).length > 0 && (
//                                                 <button
//                                                     className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors font-medium flex items-center gap-1"
//                                                     onClick={() => FunctionsNotification(null, 'MaskAllAsRead')}
//                                                 >
//                                                     <Check className="h-3 w-3" />
//                                                     <span className="hidden sm:inline">{t('notification.mark_all_read')}</span>
//                                                 </button>
//                                             )}
//                                         </div>

//                                         <div className="max-h-80 sm:max-h-96 overflow-y-auto cursor-pointer">
//                                             {Notifications?.length > 0 ? (
//                                                 <div className="divide-y divide-gray-100">
//                                                     {Notifications?.map((notification) => (
//                                                         <div
//                                                             key={notification.id}
//                                                             className={`px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read_at ? 'bg-blue-50' : ''}`}
//                                                         >
//                                                             <div className="flex items-start gap-2 sm:gap-3">
//                                                                 <div className="flex-shrink-0"
//                                                                     onClick={() => FunctionsNotification(notification, 'MaskAsRead')}
//                                                                 >
//                                                                     {notification.sender[0]?.imageSRC ? (
//                                                                         <img
//                                                                             src={'/storage/' + notification.sender[0]?.imageSRC}
//                                                                             alt="User avatar"
//                                                                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white"
//                                                                         />
//                                                                     ) : (
//                                                                         <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${notification.data.type === 'comment_poste' ? 'bg-blue-100' :
//                                                                             notification.data.type === 'like_poste' ? 'bg-red-100' :
//                                                                                 notification.data.type === 'follow_request' ? 'bg-green-100' : 'bg-purple-100'
//                                                                             }`}>
//                                                                             {getNotificationIcon(notification.data.type)}
//                                                                         </div>
//                                                                     )}
//                                                                 </div>

//                                                                 <div className="flex-grow min-w-0">
//                                                                     <div className="flex items-start justify-between">
//                                                                         <div onClick={() => FunctionsNotification(notification, 'MaskAsRead')} className="flex-grow min-w-0">
//                                                                             <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{
//                                                                                 notification.data.type === 'event' ?
//                                                                                     t(notification.data.message)
//                                                                                     : notification.data.type === 'comment_poste' ?
//                                                                                         t('comment_post', { name: notification.data.message.split(" ")[0] + " " + notification.data.message.split(" ")[1], comment: notification.data.message.split(" ")[6] })
//                                                                                         :
//                                                                                         t('liked_post', { name: notification.data.message.split(" ")[0] + " " + notification.data.message.split(" ")[1] })
//                                                                             }</p>
//                                                                             <p className="text-xs text-gray-500 mt-1">{formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}</p>
//                                                                         </div>
//                                                                         <div className="flex items-center gap-1 ml-2">
//                                                                             {!notification.read_at && (
//                                                                                 <button
//                                                                                     onClick={() => FunctionsNotification(notification, 'MaskAsRead')}
//                                                                                     className="p-1 rounded-full hover:bg-blue-100 transition-colors"
//                                                                                     aria-label="Mark as read"
//                                                                                 >
//                                                                                     <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
//                                                                                 </button>
//                                                                             )}
//                                                                             <button
//                                                                                 onClick={() => FunctionsNotification(notification, 'DeleteNotifications')}
//                                                                                 className="p-1 rounded-full hover:bg-red-100 transition-colors"
//                                                                                 aria-label="Delete notification"
//                                                                             >
//                                                                                 <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 hover:text-red-500" />
//                                                                             </button>
//                                                                         </div>
//                                                                     </div>

//                                                                     <div className="flex mt-2">
//                                                                         <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${notification.data.type === 'comment_poste' ? 'bg-blue-100 text-blue-700' :
//                                                                             notification.data.type === 'like_poste' ? 'bg-red-100 text-red-700' :
//                                                                                 notification.data.type === 'follow_request' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
//                                                                             }`}>
//                                                                             {getNotificationIcon(notification.data.type)}
//                                                                             <span className="ml-1 capitalize hidden sm:inline">{t(notification.data.type)}</span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ) : (
//                                                 <div className="px-4 py-8 sm:py-12 text-center">
//                                                     <Bell className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300" />
//                                                     <p className="mt-2 text-sm font-medium text-gray-500">{t('notification.empty')}</p>
//                                                     <p className="text-xs text-gray-400">{t('notification.get_Notification')}</p>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
//                                             <button className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                                                 onClick={() => router.visit('/Notificatons')}
//                                             >
//                                                 {t('notification.See_all_notifications')}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="hidden sm:block h-6 lg:h-8 border-l border-gray-300 dark:border-gray-700"></div>

//                             <div className="relative" ref={dropdownRef}>
//                                 <button
//                                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                                     className="flex items-center gap-1 lg:gap-2 rounded-lg p-1 hover:bg-gray-100 transition-colors"
//                                 >
//                                     {
//                                         auth.user.imageSRC ?
//                                             (
//                                                 <img
//                                                     src={`/storage/${auth.user.imageSRC}`}
//                                                     alt={`${auth.user.nom} ${auth.user.prenom}`}
//                                                     className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
//                                                 />
//                                             ) : (
//                                                 <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xs lg:text-sm">
//                                                     {auth.user.nom.charAt(0)}{auth.user.prenom.charAt(0)}
//                                                 </div>
//                                             )
//                                     }

//                                     <div className='hidden lg:flex flex-col text-gray-800'>
//                                         <span className="text-sm font-medium">{auth.user.nom} {auth.user.prenom}</span>
//                                         <span className="text-xs opacity-70">{auth.user.fonction}</span>
//                                     </div>
//                                     <ChevronDown className={`h-3 w-3 lg:h-4 lg:w-4 opacity-70 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
//                                 </button>

//                                 {dropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-50">
//                                         <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
//                                             <p className="text-sm font-medium text-gray-900">{auth.user.nom} {auth.user.prenom} {auth.user.fonction && `(${auth.user.fonction})`}</p>
//                                             <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
//                                         </div>

//                                         <Link href={route('laureat.profile')}
//                                             preserveScroll
//                                             className="block px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                             onClick={() => setDropdownOpen(false)}
//                                         >
//                                             <div className="flex items-center">
//                                                 <UserPen className="mr-2 h-4 w-4" />
//                                                 {t('my_profile')}
//                                             </div>
//                                         </Link>

//                                         <div className="relative px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                             <div
//                                                 className="flex items-center justify-between cursor-pointer"
//                                                 onClick={toggleLangDropdown}
//                                             >
//                                                 <div className="flex items-center">
//                                                     <Globe className="mr-2 h-4 w-4" />
//                                                     <span className="truncate">{availableLocales[i18n.language] || 'Français'}</span>
//                                                 </div>
//                                                 <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
//                                             </div>

//                                             {isLangDropdownOpen && (
//                                                 <div className="absolute left-0 right-0 mt-1 mx-2 bg-white shadow-md rounded-md py-1 z-50 border border-gray-100">
//                                                     {Object.keys(availableLocales).map((localeKey) => (
//                                                         <button
//                                                             key={localeKey}
//                                                             onClick={(e) => changeLang(localeKey)}
//                                                             className={`w-full text-left px-3 sm:px-4 py-2 text-sm hover:bg-gray-100 ${localeKey === i18n.language ? 'font-medium text-black' : 'text-gray-600'}`}
//                                                         >
//                                                             {availableLocales[localeKey]}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>

//                                         <button
//                                             onClick={() => { setDeleteAccountConfirmOpen(true); setDropdownOpen(false) }}
//                                             className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-500 hover:bg-red-50"
//                                         >
//                                             <div className="flex items-center">
//                                                 <Trash2 className="mr-2 h-4 w-4" />
//                                                 {t('delete_account')}
//                                             </div>
//                                         </button>

//                                         <div className="h-px bg-gray-200 my-1"></div>

//                                         <Link
//                                             href={route('logout')}
//                                             method="post"
//                                             className="w-full"
//                                         >
//                                             <button
//                                                 className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
//                                             >
//                                                 <div className="flex items-center">
//                                                     <LogOut className="mr-2 h-4 w-4" />
//                                                     {t('logout')}
//                                                 </div>
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     <main className="pt-16 lg:pt-20 p-4 lg:p-6 h-screen overflow-y-auto">
//                         {React.cloneElement(children, { isScrolled, createPostOpen, setCreatePostOpen, search, ActiveFilter })}
//                     </main>
//                 </div>
//             </div>

//             {deleteAccountConfirmOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//                     <div ref={deleteConfirmRef} className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-semibold text-red-600">{t('delete_account')}</h3>
//                             <button
//                                 onClick={() => setDeleteAccountConfirmOpen(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>

//                         <div className="mb-6">
//                             <div className="flex items-center justify-center bg-red-100 p-4 rounded-lg mb-4">
//                                 <Trash2 className="h-10 w-10 text-red-500" />
//                             </div>

//                             <p className="text-gray-700 mb-3">{t('delete_account_warning')}</p>

//                             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
//                                 <p className="text-sm text-gray-700">{t('delete_account_data_warning')}</p>
//                             </div>

//                             <div className="flex justify-end gap-4">
//                                 <button
//                                     onClick={() => setDeleteAccountConfirmOpen(false)}
//                                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                                 >
//                                     {t('cancel')}
//                                 </button>
//                                 <button
//                                     onClick={handleDeleteAccount}
//                                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                                 >
//                                     {t('delete_account')}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default Dashboard;









import React, { useState, useEffect, useRef } from "react";
import { Home, Bookmark, Users, Settings, TrendingUp, Tag, Filter, Bell, LogOut, PlusCircle, Search, Sun, Moon, ChevronDown, ImageUp, UserPen, Check, X, MessageSquare, Heart, UserPlus, Calendar, MessageSquareQuote, Trash2, Globe, Menu } from "lucide-react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";

import TextInput from "@/Components/TextInput";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";

function Dashboard({ children, title }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [deleteAccountConfirmOpen, setDeleteAccountConfirmOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const dropdownRef = useRef(null);
    const deleteConfirmRef = useRef(null);
    const searchTimeout = useRef(null);

    const [ActiveFilter, setActiveFilter] = useState('');
    const props = usePage().props;
    const Filieres = usePage().props.Filieres || [];
    const { Notifications } = usePage().props;
    const { data, setData, post, errors, processing } = useForm(Notifications || []);

    useEffect(() => {
        const scrollableDiv = document.querySelector("main");
        if (!scrollableDiv) return;

        const handleScroll = () => {
            setIsScrolled(scrollableDiv.scrollTop > 90);
        };

        scrollableDiv.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            scrollableDiv.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const main = document.querySelector('main');
        if (main) {
            main.scrollTo({ top: 0 });
        }
    }, [usePage().url]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (deleteConfirmRef.current && !deleteConfirmRef.current.contains(event.target)) {
                setDeleteAccountConfirmOpen(false);
            }
            if (!event.target.closest('.sidebar') && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, deleteConfirmRef, mobileMenuOpen]);

    useEffect(() => {
        setData(Notifications || []);
    }, [Notifications]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'comment_poste':
                return <MessageSquare className="h-4 w-4 text-blue-500" />;
            case 'like_poste':
                return <Heart className="h-4 w-4 text-red-500" />;
            case 'follow_request':
                return <UserPlus className="h-4 w-4 text-green-500" />;
            case 'event':
                return <Calendar className="h-4 w-4 text-purple-500" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500" />;
        }
    };

    const FunctionsNotification = (notification, type) => {
        if (type === "MaskAsRead" && notification.read_at) {
            if (notification.data.type === 'event') return;
            router.visit(`/Poste/${notification.data.poste_id}`);
            setNotificationsOpen(false);
            return;
        }

        post(route('notification.methodes', { id: notification?.id, type: type }), {
            preserveScroll: true,
            onSuccess: () => {
                if (type === "MaskAsRead") {
                    if (notification.data.type === 'event') return;
                    router.visit(`/Poste/${notification.data.poste_id}`);
                    setNotificationsOpen(false);
                }
                setNotificationsOpen(false);
            }
        });
    };

    const [wasSearching, setWasSearching] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value) {
            setWasSearching(true);
        }

        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            if (value) {
                router.visit(route('laureat.search', { q: value }), {
                    preserveState: true,
                    only: ['Postes', 'Users']
                });
            } else if (wasSearching) {
                router.visit(route('dashboard'));
                setWasSearching(false);
            }
        }, 700);
    };

    useEffect(() => {
        if (!search) {
            setSearch('');
            router.visit(route('dashboard'));
        }
    }, [search]);

    useEffect(() => {
        setNotificationsOpen(false);
    }, [usePage().url]);

    const handleFilterChange = (filter) => {
        const newFilter = ActiveFilter === filter ? '' : filter;
        setActiveFilter(newFilter);
        router.visit(route('laureat.categorie', newFilter));
        if (!newFilter) router.visit(route('dashboard'));
    };

    const handleDeleteAccount = () => {
        if (confirm(t('confirm_delete_account'))) {
            post(route('account.delete'), {
                onSuccess: () => {
                    router.visit(route('login'));
                }
            });
        }
    };

    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const availableLocales = {
        'fr': 'Français',
        'en': 'English',
    };

    const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);

    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            i18n.changeLanguage(savedLang);
        }
    }, []);

    const changeLang = (localeKey) => {
        i18n.changeLanguage(localeKey);
        localStorage.setItem('lang', localeKey);
        toggleLangDropdown();
        router.post('/change-lang', { locale: localeKey }, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={title} />
            <div className='flex h-screen bg-gray-100 text-gray-900'>
                {/* Sidebar - Mobile responsive */}
                <div className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out flex flex-col border-r shadow-lg bg-white border-gray-200 w-64 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 sidebar`}>
                    <div className="p-4 pt-6 pb-2 flex items-center justify-between">
                        <Link href={route('dashboard')} preserveScroll className="flex items-center gap-2">
                            <img
                                className="w-12 md:w-16"
                                src="/storage/OFPPT_Talk/logo.png"
                                alt="OFPPTConnect"
                            />
                            <h2 className='text-[#1c150d] text-base md:text-lg font-bold leading-tight tracking-[-0.015em]'>
                                {import.meta.env.VITE_APP_NAME}
                            </h2>
                        </Link>
                        <button
                            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto mt-4">
                        <nav className="px-2 py-2">
                            <ul className="space-y-1">
                                <li key='Home'>
                                    <Link href={route('dashboard')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === 'Postes' && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <Home className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">{t('home')}</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='MyPostes'>
                                    <Link href={route('laureat.postes')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('my_posts') && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <ImageUp className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">{t('my_posts')}</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='Bookmarks'>
                                    <Link href={route('poste.bookmarked')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('bookmarks_title') && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <Bookmark className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">{t('bookmarks')}</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='Profile'>
                                    <Link href={route('laureat.profile')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('profile.title') && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <UserPen className="mr-2 h-4 w-4" />
                                            {t('my_profile')}
                                        </button>
                                    </Link>
                                </li>
                                <li key='Avis'>
                                    <Link href={route('laureat.avis')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('avis.title') && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <MessageSquareQuote className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">{t('my_reviews')}</span>
                                        </button>
                                    </Link>
                                </li>
                                <li key='Notifications'>
                                    <Link href={route('laureat.notifications')} preserveScroll >
                                        <button
                                            className={`inline-flex items-center w-full justify-start font-medium rounded-lg h-10 px-4 py-2 text-sm transition-all hover:bg-blue-100 hover:text-blue-800 ${title === t('notifications') && 'bg-blue-100 text-blue-800'}`}
                                        >
                                            <Bell className="mr-2 h-4 w-4" />
                                            <span className="flex-grow text-left">{t('notifications')}</span>
                                            {
                                                Notifications?.filter(elem => elem.read_at == null).length > 0 && (
                                                    <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-200 text-blue-900'>
                                                        {Notifications?.filter(elem => elem.read_at == null).length > 99 ? '+99' : Notifications?.filter(elem => elem.read_at === null).length}
                                                    </span>
                                                )}
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className='h-[1px] w-full my-2 bg-gray-200'></div>

                        <div className="px-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">{t('filieres')} </h3>
                                <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-8 w-8 ${ActiveFilter ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 '} `} onClick={() => handleFilterChange('')}>
                                    <Filter className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {Filieres.map((filiere) => (
                                    <span
                                        key={filiere}
                                        onClick={() => handleFilterChange(filiere)}
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer  hover:bg-blue-100 hover:text-blue-800 ${ActiveFilter === filiere ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                                    >
                                        {t('branches.' + filiere)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='p-4 border-t border-gray-200'>
                        <div className="relative mb-2">
                            <button
                                onClick={toggleLangDropdown}
                                className='inline-flex items-center w-full justify-start font-normal rounded-md h-10 px-4 py-2 text-sm transition-colors hover:bg-gray-100'
                            >
                                <Globe className="mr-2 h-4 w-4" />
                                <span className="flex-grow text-left">{availableLocales[i18n.language] || 'Français'}</span>
                                <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isLangDropdownOpen && (
                                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} w-full mt-1 bg-white shadow-md rounded-md py-1 z-50`}>
                                    {Object.keys(availableLocales).map((localeKey) => (
                                        <button
                                            key={localeKey}
                                            onClick={() => changeLang(localeKey)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${localeKey === i18n.language ? 'font-medium text-black' : 'text-gray-600'}`}
                                        >
                                            {availableLocales[localeKey]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setDeleteAccountConfirmOpen(true)}
                            className='inline-flex items-center w-full justify-start font-normal rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 hover:bg-red-100 text-red-500 hover:text-red-600'
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('delete_account')}
                        </button>

                        <Link
                            href={route('logout')}
                            method="post"
                            className="w-full"
                        >
                            <button
                                className='inline-flex items-center w-full justify-start font-medium rounded-md h-10 px-4 py-2 text-sm transition-colors mt-1 text-red-600 hover:bg-red-50 hover:text-red-700'
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                {t('logout')}
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 ml-0 lg:ml-64">
                    <div
                        className={`fixed top-0 left-0 lg:left-64 right-0 flex items-center justify-between px-4 lg:px-6 z-40 transition-all duration-300 ${isScrolled
                            ? 'bg-white/70 backdrop-blur-lg h-14 lg:h-16 shadow-lg'
                            : 'bg-transparent h-16 lg:h-20'
                            }`}
                    >
                        <button
                            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="flex-1 max-w-xl lg:max-w-2xl relative mx-2 lg:mx-0">
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                            <TextInput
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border text-sm lg:text-base"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="flex items-center gap-2 lg:gap-4">
                            {
                                title === 'Postes' &&
                                <button className={`text-white font-medium py-2 px-2 lg:px-4 rounded-lg transition-all flex items-center justify-center gap-0 lg:gap-2 bg-blue-600 hover:bg-blue-700 ${isScrolled && 'shadow-md'}`} onClick={() => setCreatePostOpen(true)}>
                                    <PlusCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline text-sm lg:text-base">{t('new_publication')}</span>
                                </button>
                            }

                            <div className="relative">
                                <button
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    className="relative flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Notifications"
                                >
                                    <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
                                    {Notifications?.filter(elem => elem.read_at == null).length > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-4 lg:w-6 lg:h-5 text-xs font-bold text-white bg-blue-600 rounded-full ring-2 ring-white">
                                            {Notifications?.filter(elem => elem.read_at === null).length > 99 ? '+99' : Notifications?.filter(elem => elem.read_at === null).length}
                                        </span>
                                    )}
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50"
                                        onMouseLeave={() => setNotificationsOpen(false)}
                                    >
                                        <div className="px-3 sm:px-4 py-3 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 flex items-center justify-between">
                                            <p className="text-sm sm:text-base font-semibold text-gray-900">{t('notifications')}</p>
                                            {Notifications?.filter(elem => elem.read_at == null).length > 0 && (
                                                <button
                                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors font-medium flex items-center gap-1"
                                                    onClick={() => FunctionsNotification(null, 'MaskAllAsRead')}
                                                >
                                                    <Check className="h-3 w-3" />
                                                    <span className="hidden sm:inline">{t('notification.mark_all_read')}</span>
                                                </button>
                                            )}
                                        </div>

                                        <div className="max-h-80 sm:max-h-96 overflow-y-auto cursor-pointer">
                                            {Notifications?.length > 0 ? (
                                                <div className="divide-y divide-gray-100">
                                                    {Notifications?.map((notification) => (
                                                        <div
                                                            key={notification.id}
                                                            className={`px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read_at ? 'bg-blue-50' : ''}`}
                                                        >
                                                            <div className="flex items-start gap-2 sm:gap-3">
                                                                <div className="flex-shrink-0"
                                                                    onClick={() => FunctionsNotification(notification, 'MaskAsRead')}
                                                                >
                                                                    {notification.sender[0]?.imageSRC ? (
                                                                        <img
                                                                            src={'/storage/' + notification.sender[0]?.imageSRC}
                                                                            alt="User avatar"
                                                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white"
                                                                        />
                                                                    ) : (
                                                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${notification.data.type === 'comment_poste' ? 'bg-blue-100' :
                                                                            notification.data.type === 'like_poste' ? 'bg-red-100' :
                                                                                notification.data.type === 'follow_request' ? 'bg-green-100' : 'bg-purple-100'
                                                                            }`}>
                                                                            {getNotificationIcon(notification.data.type)}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="flex-grow min-w-0">
                                                                    <div className="flex items-start justify-between">
                                                                        <div onClick={() => FunctionsNotification(notification, 'MaskAsRead')} className="flex-grow min-w-0">
                                                                            <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{
                                                                                notification.data.type === 'event' ?
                                                                                    t(notification.data.message)
                                                                                    : notification.data.type === 'comment_poste' ?
                                                                                        t('comment_post', { name: notification.data.message.split(" ")[0] + " " + notification.data.message.split(" ")[1], comment: notification.data.message.split(" ")[6] })
                                                                                        :
                                                                                        t('liked_post', { name: notification.data.message.split(" ")[0] + " " + notification.data.message.split(" ")[1] })
                                                                            }</p>
                                                                            <p className="text-xs text-gray-500 mt-1">{formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 ml-2">
                                                                            {!notification.read_at && (
                                                                                <button
                                                                                    onClick={() => FunctionsNotification(notification, 'MaskAsRead')}
                                                                                    className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                                                                                    aria-label="Mark as read"
                                                                                >
                                                                                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                                                                                </button>
                                                                            )}
                                                                            <button
                                                                                onClick={() => FunctionsNotification(notification, 'DeleteNotifications')}
                                                                                className="p-1 rounded-full hover:bg-red-100 transition-colors"
                                                                                aria-label="Delete notification"
                                                                            >
                                                                                <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 hover:text-red-500" />
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex mt-2">
                                                                        <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${notification.data.type === 'comment_poste' ? 'bg-blue-100 text-blue-700' :
                                                                            notification.data.type === 'like_poste' ? 'bg-red-100 text-red-700' :
                                                                                notification.data.type === 'follow_request' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                                                                            }`}>
                                                                            {getNotificationIcon(notification.data.type)}
                                                                            <span className="ml-1 capitalize hidden sm:inline">{t(notification.data.type)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="px-4 py-8 sm:py-12 text-center">
                                                    <Bell className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300" />
                                                    <p className="mt-2 text-sm font-medium text-gray-500">{t('notification.empty')}</p>
                                                    <p className="text-xs text-gray-400">{t('notification.get_Notification')}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                onClick={() => router.visit('/Notificatons')}
                                            >
                                                {t('notification.See_all_notifications')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="hidden sm:block h-6 lg:h-8 border-l border-gray-300"></div>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-1 lg:gap-2 rounded-lg p-1 hover:bg-gray-100 transition-colors"
                                >
                                    {
                                        auth.user.imageSRC ?
                                            (
                                                <img
                                                    src={`/storage/${auth.user.imageSRC}`}
                                                    alt={`${auth.user.nom} ${auth.user.prenom}`}
                                                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xs lg:text-sm">
                                                    {auth.user.nom.charAt(0)}{auth.user.prenom.charAt(0)}
                                                </div>
                                            )
                                    }

                                    <div className='hidden lg:flex flex-col text-gray-800'>
                                        <span className="text-sm font-medium">{auth.user.nom} {auth.user.prenom}</span>
                                        <span className="text-xs opacity-70">{auth.user.fonction}</span>
                                    </div>
                                    <ChevronDown className={`h-3 w-3 lg:h-4 lg:w-4 opacity-70 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 sm:w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-50">
                                        <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-medium text-gray-900">{auth.user.nom} {auth.user.prenom} {auth.user.fonction && `(${auth.user.fonction})`}</p>
                                            <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                                        </div>

                                        <Link href={route('laureat.profile')}
                                            preserveScroll
                                            className="block px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <UserPen className="mr-2 h-4 w-4" />
                                                {t('my_profile')}
                                            </div>
                                        </Link>

                                        <div className="relative px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={toggleLangDropdown}
                                            >
                                                <div className="flex items-center">
                                                    <Globe className="mr-2 h-4 w-4" />
                                                    <span className="truncate">{availableLocales[i18n.language] || 'Français'}</span>
                                                </div>
                                                <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                                            </div>

                                            {isLangDropdownOpen && (
                                                <div className="absolute left-0 right-0 mt-1 mx-2 bg-white shadow-md rounded-md py-1 z-50 border border-gray-100">
                                                    {Object.keys(availableLocales).map((localeKey) => (
                                                        <button
                                                            key={localeKey}
                                                            onClick={(e) => changeLang(localeKey)}
                                                            className={`w-full text-left px-3 sm:px-4 py-2 text-sm hover:bg-gray-100 ${localeKey === i18n.language ? 'font-medium text-black' : 'text-gray-600'}`}
                                                        >
                                                            {availableLocales[localeKey]}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => { setDeleteAccountConfirmOpen(true); setDropdownOpen(false) }}
                                            className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                                        >
                                            <div className="flex items-center">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                {t('delete_account')}
                                            </div>
                                        </button>

                                        <div className="h-px bg-gray-200 my-1"></div>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            className="w-full"
                                        >
                                            <button
                                                className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                                            >
                                                <div className="flex items-center">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    {t('logout')}
                                                </div>
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <main className="pt-16 lg:pt-20 p-4 lg:p-6 h-screen overflow-y-auto">
                        {React.cloneElement(children, { isScrolled, createPostOpen, setCreatePostOpen, search, ActiveFilter })}
                    </main>
                </div>
            </div>

            {deleteAccountConfirmOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div ref={deleteConfirmRef} className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-red-600">{t('delete_account')}</h3>
                            <button
                                onClick={() => setDeleteAccountConfirmOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center justify-center bg-red-100 p-4 rounded-lg mb-4">
                                <Trash2 className="h-10 w-10 text-red-500" />
                            </div>

                            <p className="text-gray-700 mb-3">{t('delete_account_warning')}</p>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                                <p className="text-sm text-gray-700">{t('delete_account_data_warning')}</p>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setDeleteAccountConfirmOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    {t('delete_account')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;
