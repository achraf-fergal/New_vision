// import { Users, UserCheck, UserX, Clock, FileDown } from "lucide-react";
// import { Link, useForm } from "@inertiajs/react";
// import Dashboard from "@/Layouts/DashboardGestionnaireLayout";
// import { useTranslation } from 'react-i18next';
// import { t } from "i18next";

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';





// export const generateDashboardPDF = (data, Admin) => {
//     const pdf = new jsPDF();
//     const pageWidth = pdf.internal.pageSize.width;

//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(22);
//     pdf.setTextColor(25, 25, 112);
//     pdf.text("OFPPTConnect", pageWidth / 2, 15, { align: 'center' });

//     try {
//         const logoWidth = 30;
//         const logoHeight = 30;
//         const logoX = 20;
//         const logoY = 10;
//         pdf.addImage("/storage/OFPPT_Talk/Logo_ofppt.png", 'PNG', logoX, logoY - 5, logoWidth, logoHeight);
//     } catch (error) {
//         console.error("Failed to add logo to PDF:", error);
//     }

//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(18);
//     pdf.setTextColor(25, 25, 112);
//     pdf.text(t('Gestionnaire.dashboard.dashboard_report'), pageWidth / 2, 30, { align: 'center' });

//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.setTextColor(100, 100, 100);
//     const date = new Date().toLocaleDateString();
//     pdf.text(`${t('Gestionnaire.dashboard.generated_on')}: ${date}`, 20, 40);
//     pdf.text(`${t('Gestionnaire.dashboard.generated_by')}: ${Admin.nom} ${Admin.prenom}`, 20, 48);

//     pdf.setDrawColor(200, 200, 200);
//     pdf.line(20, 55, pageWidth - 20, 55);

//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(14);
//     pdf.setTextColor(25, 25, 112);
//     pdf.text(t('Gestionnaire.dashboard.summary'), 20, 65);

//     pdf.setFont("helvetica", "normal");
//     pdf.setFontSize(12);
//     pdf.setTextColor(60, 60, 60);

//     const summaryData = [
//         [
//             t('Gestionnaire.dashboard.total_laureates'),
//             data.totalLaureats.toString()
//         ],
//         [
//             t('Gestionnaire.dashboard.accepted'),
//             data.acceptedLaureats.toString()
//         ],
//         [
//             t('Gestionnaire.dashboard.blocked'),
//             data.blockedLaureats.toString()
//         ],
//         [
//             t('Gestionnaire.dashboard.waiting'),
//             data.waitingLaureats.toString()
//         ],
//     ];

//     autoTable(pdf, {
//         startY: 70,
//         head: [['', '']],
//         body: summaryData,
//         theme: 'striped',
//         headStyles: {
//             fillColor: [73, 93, 207],
//             textColor: [255, 255, 255],
//             fontStyle: 'bold'
//         },
//         styles: {
//             halign: 'left',
//             fontSize: 12,
//         },
//         columnStyles: {
//             0: { cellWidth: 120 },
//         },
//     });

//     const finalY = pdf.lastAutoTable.finalY + 15;
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(14);
//     pdf.setTextColor(25, 25, 112);
//     pdf.text(t('Gestionnaire.dashboard.recent_laureates'), 20, finalY);

//     const laureatesHeaders = [
//         t('Gestionnaire.dashboard.name'),
//         t('Gestionnaire.dashboard.email'),
//         t('Gestionnaire.dashboard.registration_date'),
//         t('Gestionnaire.dashboard.status')
//     ];

//     const laureatesData = data.recentLaureatsInscrire.map(laureat => [
//         `${laureat.nom} ${laureat.prenom}`,
//         laureat.email,
//         new Date(laureat.created_at).toLocaleDateString(),
//         laureat.valide
//             ? t('Gestionnaire.dashboard.accepted')
//             : t('Gestionnaire.dashboard.waiting')
//     ]);

//     autoTable(pdf, {
//         startY: finalY + 5,
//         head: [laureatesHeaders],
//         body: laureatesData,
//         theme: 'striped',
//         headStyles: {
//             fillColor: [73, 93, 207],
//             textColor: [255, 255, 255],
//             fontStyle: 'bold'
//         },
//         styles: {
//             halign: 'left',
//             fontSize: 10,
//         },
//     });

//     const pageCount = pdf.internal.getNumberOfPages();

//     for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);

//         pdf.setFont("helvetica", "bold");
//         pdf.setFontSize(10);
//         pdf.setTextColor(150, 150, 150);
//         pdf.text(
//             "OFPPTConnect",
//             20,
//             pdf.internal.pageSize.height - 10
//         );

//         pdf.setFont("helvetica", "italic");
//         pdf.setFontSize(10);
//         pdf.setTextColor(150, 150, 150);
//         pdf.text(
//             t('Gestionnaire.dashboard.page') + ' ' + i + ' / ' + pageCount,
//             pageWidth / 2,
//             pdf.internal.pageSize.height - 10,
//             { align: 'center' }
//         );

//         try {
//             const footerLogoSize = 8;
//             pdf.addImage(
//                 "/storage/OFPPT_Talk/Logo_ofppt.png",
//                 'PNG',
//                 pageWidth - 30,
//                 pdf.internal.pageSize.height - 15,
//                 footerLogoSize,
//                 footerLogoSize
//             );
//         } catch (error) {
//             console.error("Failed to add footer logo:", error);
//         }
//     }

//     pdf.save(`Rapport OFPPTConnect_${date.replace(/\//g, '-')}.pdf`);
// };









// function Index({ Admin, LaureatWaiting, LaureatBlocked, LaureatAccepted, recentLaureatsInscrire }) {
//     const { t } = useTranslation();
//     const { data, setData, errors, post, processing } = useForm({
//         totalLaureats: LaureatWaiting.length + LaureatAccepted.length,
//         acceptedLaureats: LaureatAccepted.length,
//         blockedLaureats: LaureatBlocked.length,
//         waitingLaureats: LaureatWaiting.length,
//         recentLaureatsInscrire: recentLaureatsInscrire
//     });

//     const handleDownloadPDF = () => {
//         generateDashboardPDF(data, Admin);
//     };

//     if (processing) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="py-10 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">

//                 <div className="mb-8 flex justify-between items-center">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">
//                             {t('Gestionnaire.dashboard.welcome_back')},
//                             <span className="text-indigo-600 cursor-pointer">
//                                 {" "}{Admin.nom} {Admin.prenom}{" "}
//                             </span>
//                             !
//                         </h1>
//                         <p className="mt-1 text-gray-600">{t('Gestionnaire.dashboard.subtitle')}</p>
//                     </div>
//                     <button
//                         onClick={handleDownloadPDF}
//                         className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
//                     >
//                         <FileDown className="w-5 h-5" />
//                         {t('Gestionnaire.dashboard.download_pdf')}
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-blue-50 rounded-lg">
//                                 <Users className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">{t('Gestionnaire.dashboard.total_laureates')}</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.totalLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">{t('Gestionnaire.dashboard.all_registered')}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-green-50 rounded-lg">
//                                 <UserCheck className="w-6 h-6 text-green-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">{t('Gestionnaire.dashboard.accepted')}</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.acceptedLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">{t('Gestionnaire.dashboard.active_laureates')}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-red-50 rounded-lg">
//                                 <UserX className="w-6 h-6 text-red-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">{t('Gestionnaire.dashboard.blocked')}</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.blockedLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">{t('Gestionnaire.dashboard.restricted_access')}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-yellow-50 rounded-lg">
//                                 <Clock className="w-6 h-6 text-yellow-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">{t('Gestionnaire.dashboard.waiting')}</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.waitingLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">{t('Gestionnaire.dashboard.pending_approval')}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h2 className="text-lg font-semibold text-gray-900">{t('Gestionnaire.dashboard.recent_laureates')}</h2>
//                                 <Link className="text-sm text-blue-600 hover:text-blue-700 hover:underline" href={route("laureat.waiting")}>
//                                     {t('Gestionnaire.dashboard.view_all')}
//                                 </Link>
//                             </div>
//                             <div className="space-y-4">
//                                 {data.recentLaureatsInscrire.map((laureat, index) => (
//                                     <div key={index} className="flex items-start space-x-4">
//                                         <div className={`w-8 h-8 rounded-full
//                                                 ${laureat.valide ? "bg-green-50" : "bg-yellow-50"}
//                                                 flex items-center justify-center`}>
//                                             {
//                                                 laureat.valide ?
//                                                     <UserCheck className="w-4 h-4 text-green-600 " />
//                                                     :
//                                                     <Clock className="w-4 h-4 text-yellow-600 " />
//                                             }
//                                         </div>
//                                         <div className="flex-1">
//                                             <p className="text-sm text-gray-600">
//                                                 <span className="font-bold">{laureat.nom} {laureat.prenom}</span>
//                                                 {t('Gestionnaire.dashboard.registered_at')}
//                                                 <span className="font-semibold">{new Date(laureat.created_at).toLocaleDateString()}</span>
//                                             </p>
//                                             <p className="text-xs text-gray-400 mt-1">{laureat.email}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="h-[230px] bg-white rounded-xl shadow-sm p-6">
//                         <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('Gestionnaire.dashboard.quick_actions')}</h2>
//                         <div className="space-y-4">
//                             <Link className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100" href={route("laureat.accepted")}>
//                                 <span className="text-sm font-medium text-gray-700">{t('Gestionnaire.dashboard.view_accepted')}</span>
//                                 <UserCheck className="w-5 h-5 text-green-600" />
//                             </Link>
//                             <Link className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100" href={route("laureat.blocked")}>
//                                 <span className="text-sm font-medium text-gray-700">{t('Gestionnaire.dashboard.view_blocked')}</span>
//                                 <UserX className="w-5 h-5 text-red-600" />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// Index.layout = page => <Dashboard children={page} title={t('Gestionnaire.dashboard.welcome')} />

// export default Index;








// import { useState, useEffect } from "react";
// import { Users, FileText, TrendingUp, ChevronUp, ArrowUpRight } from "lucide-react";
// import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from "recharts";

// const MonthlyStatsDashboard = () => {
//     const [monthlyData, setMonthlyData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     // Mock admin data
//     const admin = {
//         nom: "Smith",
//         prenom: "John"
//     };

//     useEffect(() => {
//         // Simulate loading data
//         setTimeout(() => {
//             const data = generateMonthlyData();
//             setMonthlyData(data);
//             setIsLoading(false);
//         }, 600);
//     }, []);

//     const generateMonthlyData = () => {
//         // Static monthly data
//         return [
//             { name: "Jan", fullDate: "Jan 2025", registrations: 23, posts: 8, completionRate: 45, target: 35 },
//             { name: "Feb", fullDate: "Feb 2025", registrations: 28, posts: 10, completionRate: 52, target: 35 },
//             { name: "Mar", fullDate: "Mar 2025", registrations: 32, posts: 14, completionRate: 58, target: 35 },
//             { name: "Apr", fullDate: "Apr 2025", registrations: 38, posts: 15, completionRate: 62, target: 35 },
//             { name: "May", fullDate: "May 2025", registrations: 35, posts: 13, completionRate: 48, target: 35 },
//             { name: "Jun", fullDate: "Jun 2025", registrations: 30, posts: 12, completionRate: 53, target: 35 },
//             { name: "Jul", fullDate: "Jul 2025", registrations: 28, posts: 10, completionRate: 47, target: 35 },
//             { name: "Aug", fullDate: "Aug 2025", registrations: 26, posts: 9, completionRate: 51, target: 35 },
//             { name: "Sep", fullDate: "Sep 2025", registrations: 32, posts: 15, completionRate: 60, target: 35 },
//             { name: "Oct", fullDate: "Oct 2025", registrations: 38, posts: 17, completionRate: 65, target: 35 },
//             { name: "Nov", fullDate: "Nov 2025", registrations: 42, posts: 20, completionRate: 70, target: 35 },
//             { name: "Dec", fullDate: "Dec 2025", registrations: 48, posts: 22, completionRate: 75, target: 35 },
//         ];
//     };

//     // Calculate statistics for summary cards
//     const calculateStats = () => {
//         if (monthlyData.length === 0) return { totalRegistrations: 0, totalPosts: 0, registrationGrowth: 0, postGrowth: 0 };

//         const totalRegistrations = monthlyData.reduce((sum, month) => sum + month.registrations, 0);
//         const totalPosts = monthlyData.reduce((sum, month) => sum + month.posts, 0);

//         // Calculate growth (comparing last month to previous month)
//         const lastMonthIndex = monthlyData.length - 1;
//         const prevMonthIndex = monthlyData.length - 2;

//         let registrationGrowth = 0;
//         let postGrowth = 0;

//         if (lastMonthIndex > 0) {
//             const lastMonth = monthlyData[lastMonthIndex];
//             const prevMonth = monthlyData[prevMonthIndex];

//             registrationGrowth = Math.round(((lastMonth.registrations - prevMonth.registrations) / prevMonth.registrations) * 100);
//             postGrowth = Math.round(((lastMonth.posts - prevMonth.posts) / prevMonth.posts) * 100);
//         }

//         return { totalRegistrations, totalPosts, registrationGrowth, postGrowth };
//     };

//     const stats = calculateStats();

//     // Get the last 6 months for focused charts
//     const recentMonths = monthlyData.slice(-6);

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-96">
//                 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//             </div>
//         );
//     }

//     return (
// <div className="space-y-8 max-w-7xl mx-auto p-6 bg-gray-50">
//     <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//             Welcome back, <span className="text-indigo-600">{admin.prenom} {admin.nom}</span>!
//         </h1>
//         <p className="mt-1 text-gray-600">Here's what's happening with your laureates today.</p>
//     </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Registration Card */}
//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 bg-indigo-50 rounded-lg">
//                                 <Users className="w-6 h-6 text-indigo-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900">User Registrations</h3>
//                                 <p className="text-sm text-gray-500">Monthly new laureates</p>
//                             </div>
//                         </div>
//                         <div className="bg-green-50 py-1 px-2 rounded-full flex items-center">
//                             <ChevronUp className="w-4 h-4 text-green-600 mr-1" />
//                             <span className="text-sm font-medium text-green-600">{stats.registrationGrowth}%</span>
//                         </div>
//                     </div>

//                     <div className="h-48">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
//                                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip
//                                     formatter={(value, name) => [value, 'Registrations']}
//                                     labelFormatter={(label) => `Month: ${label}`}
//                                     contentStyle={{ borderRadius: '6px' }}
//                                 />
//                                 <ReferenceLine y={35} stroke="#8884d8" strokeDasharray="3 3" label="Target" />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="registrations"
//                                     stroke="#6366f1"
//                                     strokeWidth={2}
//                                     fillOpacity={1}
//                                     fill="url(#colorRegistrations)"
//                                 />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Registrations</p>
//                             <p className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</p>
//                         </div>
//                         <div className="flex items-center text-indigo-600 text-sm font-medium cursor-pointer">
//                             View detailed report
//                             <ArrowUpRight className="w-4 h-4 ml-1" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Posts Card */}
//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 bg-blue-50 rounded-lg">
//                                 <FileText className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900">Posts Published</h3>
//                                 <p className="text-sm text-gray-500">Monthly content creation</p>
//                             </div>
//                         </div>
//                         <div className="bg-green-50 py-1 px-2 rounded-full flex items-center">
//                             <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
//                             <span className="text-sm font-medium text-green-600">{stats.postGrowth}%</span>
//                         </div>
//                     </div>

//                     <div className="h-48">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip
//                                     formatter={(value, name) => [value, 'Posts']}
//                                     labelFormatter={(label) => `Month: ${label}`}
//                                     contentStyle={{ borderRadius: '6px' }}
//                                 />
//                                 <Bar
//                                     dataKey="posts"
//                                     fill="#3b82f6"
//                                     radius={[4, 4, 0, 0]}
//                                     barSize={30}
//                                 />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Posts</p>
//                             <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
//                         </div>
//                         <div className="flex items-center text-blue-600 text-sm font-medium cursor-pointer">
//                             View detailed report
//                             <ArrowUpRight className="w-4 h-4 ml-1" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Advanced Analytics Section */}
//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Advanced Analytics: 6-Month Performance</h2>

//                 <div className="h-96">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <ComposedChart data={recentMonths} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis
//                                 dataKey="name"
//                                 label={{ value: 'Month', position: 'insideBottomRight', offset: -10 }}
//                             />
//                             <YAxis
//                                 yAxisId="left"
//                                 label={{ value: 'Number of Users/Posts', angle: -90, position: 'insideLeft' }}
//                             />
//                             <YAxis
//                                 yAxisId="right"
//                                 orientation="right"
//                                 domain={[0, 100]}
//                                 label={{ value: 'Completion Rate (%)', angle: 90, position: 'insideRight' }}
//                             />
//                             <Tooltip
//                                 formatter={(value, name) => {
//                                     if (name === "completionRate") return [`${value}%`, "Completion Rate"];
//                                     return [value, name === "registrations" ? "User Registrations" : "Posts Published"];
//                                 }}
//                                 contentStyle={{ borderRadius: '6px' }}
//                             />
//                             <Legend />
//                             <Bar yAxisId="left" dataKey="registrations" name="User Registrations" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
//                             <Bar yAxisId="left" dataKey="posts" name="Posts Published" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
//                             <Line
//                                 yAxisId="right"
//                                 type="monotone"
//                                 dataKey="completionRate"
//                                 name="Completion Rate"
//                                 stroke="#10b981"
//                                 strokeWidth={2}
//                                 dot={{ r: 5 }}
//                                 activeDot={{ r: 8, strokeWidth: 2 }}
//                             />
//                             <ReferenceLine yAxisId="left" y={35} stroke="#8884d8" strokeDasharray="3 3" label="Target" />
//                         </ComposedChart>
//                     </ResponsiveContainer>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-indigo-50 rounded-lg p-4">
//                         <h4 className="text-indigo-700 font-medium mb-1">Registration Insights</h4>
//                         <p className="text-sm text-indigo-800">
//                             {recentMonths.length > 0 ?
//                                 `${recentMonths[recentMonths.length - 1].fullDate} saw ${recentMonths[recentMonths.length - 1].registrations} new registrations,
//                 ${recentMonths[recentMonths.length - 1].registrations > 35 ? 'exceeding' : 'below'} the monthly target.` :
//                                 'No data available.'}
//                         </p>
//                     </div>

//                     <div className="bg-blue-50 rounded-lg p-4">
//                         <h4 className="text-blue-700 font-medium mb-1">Content Production</h4>
//                         <p className="text-sm text-blue-800">
//                             {recentMonths.length > 0 ?
//                                 `Average of ${Math.round(recentMonths.reduce((sum, month) => sum + month.posts, 0) / recentMonths.length)}
//                 posts published per month in the last 6 months.` :
//                                 'No data available.'}
//                         </p>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <h4 className="text-green-700 font-medium mb-1">Completion Rate</h4>
//                         <p className="text-sm text-green-800">
//                             {recentMonths.length > 0 ?
//                                 `${Math.round(recentMonths.reduce((sum, month) => sum + month.completionRate, 0) / recentMonths.length)}%
//                 average completion rate across all user activities.` :
//                                 'No data available.'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MonthlyStatsDashboard;


















// import { useState, useEffect } from "react";
// import { Users, FileText, TrendingUp, ChevronUp, ArrowUpRight, Save, Share2, MessageSquare, ThumbsUp } from "lucide-react";
// import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine, PieChart, Pie, Cell } from "recharts";
// import Dashboard from "@/Layouts/DashboardGestionnaireLayout";

// const GraduateNetworkDashboard = ({Admin}) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [userData, setUserData] = useState({
//         totalUsers: 0,
//         newUsersPerMonth: [],
//         usersByPromotion: [],
//         usersByFiliere: []
//     });
//     const [souvenirData, setSouvenirData] = useState({
//         totalSouvenirs: 0,
//         souvenirsPerMonth: [],
//         souvenirsByCategory: [],
//         engagementMetrics: {}
//     });

//     useEffect(() => {
//         // In a real application, this would be replaced with API calls
//         // to fetch data from your Laravel backend
//         setTimeout(() => {
//             // Generate sample data based on the database schema
//             const mockData = generateMockData();
//             setUserData(mockData.userData);
//             setSouvenirData(mockData.souvenirData);
//             setIsLoading(false);
//         }, 800);
//     }, []);

//     const generateMockData = () => {
//         const currentYear = new Date().getFullYear();
//         const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//         // Generate mock user data
//         const usersByPromotion = [
//             { name: `${currentYear}`, value: 45 },
//             { name: `${currentYear - 1}`, value: 65 },
//             { name: `${currentYear - 2}`, value: 85 },
//             { name: `${currentYear - 3}`, value: 72 },
//             { name: `${currentYear - 4}`, value: 53 }
//         ];

//         const filieres = ["Informatique", "Génie Civil", "Électronique", "Mécanique", "Commerce"];
//         const usersByFiliere = filieres.map(filiere => ({
//             name: filiere,
//             value: Math.floor(Math.random() * 50) + 20
//         }));

//         const newUsersPerMonth = months.map((month, idx) => {
//             // More registrations at start of academic year (Sep-Oct)
//             const seasonalFactor = idx >= 8 && idx <= 9 ? 2 :
//                 idx >= 0 && idx <= 1 ? 1.5 : 1;
//             const registrations = Math.floor((Math.random() * 15 + 10) * seasonalFactor);

//             return {
//                 name: month,
//                 newUsers: registrations,
//                 validatedUsers: Math.floor(registrations * 0.7), // 70% validation rate
//                 target: 25
//             };
//         });

//         // Generate mock souvenir data
//         const categories = ["Événement", "Projet", "Stage", "Sortie", "Formation"];
//         const souvenirsByCategory = categories.map(category => ({
//             name: category,
//             value: Math.floor(Math.random() * 40) + 10
//         }));

//         const souvenirsPerMonth = months.map((month, idx) => {
//             // More activity during academic year, less during summer
//             const seasonalFactor = idx >= 6 && idx <= 7 ? 0.6 : 1.2;
//             const posts = Math.floor((Math.random() * 20 + 15) * seasonalFactor);

//             return {
//                 name: month,
//                 souvenirs: posts,
//                 target: 30
//             };
//         });

//         // Engagement metrics for souvenirs
//         const engagementMetrics = {
//             likes: souvenirsPerMonth.reduce((sum, month) => sum + month.souvenirs * 5, 0), // avg 5 likes per post
//             comments: souvenirsPerMonth.reduce((sum, month) => sum + month.souvenirs * 2, 0), // avg 2 comments per post
//             saves: souvenirsPerMonth.reduce((sum, month) => sum + month.souvenirs * 1.5, 0), // avg 1.5 saves per post
//             shares: souvenirsPerMonth.reduce((sum, month) => sum + month.souvenirs * 0.8, 0) // avg 0.8 shares per post
//         };

//         return {
//             userData: {
//                 totalUsers: usersByPromotion.reduce((sum, promo) => sum + promo.value, 0),
//                 newUsersPerMonth,
//                 usersByPromotion,
//                 usersByFiliere
//             },
//             souvenirData: {
//                 totalSouvenirs: souvenirsPerMonth.reduce((sum, month) => sum + month.souvenirs, 0),
//                 souvenirsPerMonth,
//                 souvenirsByCategory,
//                 engagementMetrics
//             }
//         };
//     };

//     // Calculate growth rates
//     const calculateGrowth = (data, key) => {
//         if (!data || data.length < 2) return 0;
//         const lastMonth = data[data.length - 1][key];
//         const prevMonth = data[data.length - 2][key];
//         return prevMonth ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100) : 0;
//     };

//     const userGrowth = calculateGrowth(userData.newUsersPerMonth, 'newUsers');
//     const souvenirGrowth = calculateGrowth(souvenirData.souvenirsPerMonth, 'souvenirs');

//     // Get the last 6 months for focused charts
//     const recentUserMonths = userData.newUsersPerMonth?.slice(-6) || [];
//     const recentSouvenirMonths = souvenirData.souvenirsPerMonth?.slice(-6) || [];

//     // Colors for charts
//     const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-96">
//                 <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-8 max-w-7xl mx-auto p-6">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                     Welcome back, <span className="text-indigo-600">{Admin.prenom} {Admin.nom}</span>!
//                 </h1>
//                 <p className="mt-1 text-gray-600">Here's what's happening with your laureates today.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* User Registration Card */}
//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 bg-indigo-50 rounded-lg">
//                                 <Users className="w-6 h-6 text-indigo-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900">Inscriptions Utilisateurs</h3>
//                                 <p className="text-sm text-gray-500">Nouveaux lauréats par mois</p>
//                             </div>
//                         </div>
//                         <div className="bg-green-50 py-1 px-2 rounded-full flex items-center">
//                             <ChevronUp className="w-4 h-4 text-green-600 mr-1" />
//                             <span className="text-sm font-medium text-green-600">{userGrowth}%</span>
//                         </div>
//                     </div>

//                     <div className="h-48">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart data={userData.newUsersPerMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
//                                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                                     </linearGradient>
//                                     <linearGradient id="colorValidatedUsers" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//                                         <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip
//                                     formatter={(value, name) => [value, name === "newUsers" ? 'Total Inscriptions' : 'Comptes Validés']}
//                                     labelFormatter={(label) => `Mois: ${label}`}
//                                     contentStyle={{ borderRadius: '6px' }}
//                                 />
//                                 <Legend />
//                                 <ReferenceLine y={25} stroke="#8884d8" strokeDasharray="3 3" />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="newUsers"
//                                     name="Total Inscriptions"
//                                     stroke="#6366f1"
//                                     strokeWidth={2}
//                                     fillOpacity={1}
//                                     fill="url(#colorNewUsers)"
//                                 />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="validatedUsers"
//                                     name="Comptes Validés"
//                                     stroke="#10b981"
//                                     strokeWidth={2}
//                                     fillOpacity={1}
//                                     fill="url(#colorValidatedUsers)"
//                                 />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Utilisateurs</p>
//                             <p className="text-2xl font-bold text-gray-900">{userData.totalUsers}</p>
//                         </div>
//                         <div className="flex items-center text-indigo-600 text-sm font-medium cursor-pointer">
//                             Voir rapport détaillé
//                             <ArrowUpRight className="w-4 h-4 ml-1" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Souvenirs Card */}
//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 bg-blue-50 rounded-lg">
//                                 <FileText className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900">Souvenirs Publiés</h3>
//                                 <p className="text-sm text-gray-500">Activité mensuelle</p>
//                             </div>
//                         </div>
//                         <div className="bg-green-50 py-1 px-2 rounded-full flex items-center">
//                             <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
//                             <span className="text-sm font-medium text-green-600">{souvenirGrowth}%</span>
//                         </div>
//                     </div>

//                     <div className="h-48">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={souvenirData.souvenirsPerMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip
//                                     formatter={(value, name) => [value, 'Souvenirs']}
//                                     labelFormatter={(label) => `Mois: ${label}`}
//                                     contentStyle={{ borderRadius: '6px' }}
//                                 />
//                                 <ReferenceLine y={30} stroke="#3b82f6" strokeDasharray="3 3" />
//                                 <Bar
//                                     dataKey="souvenirs"
//                                     fill="#3b82f6"
//                                     radius={[4, 4, 0, 0]}
//                                     barSize={30}
//                                 />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Souvenirs</p>
//                             <p className="text-2xl font-bold text-gray-900">{souvenirData.totalSouvenirs}</p>
//                         </div>
//                         <div className="flex items-center text-blue-600 text-sm font-medium cursor-pointer">
//                             Voir rapport détaillé
//                             <ArrowUpRight className="w-4 h-4 ml-1" />
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {/* Advanced Analytics Section */}
//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Analyse sur 6 Mois: Utilisateurs et Contenu</h2>

//                 <div className="h-96">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <ComposedChart data={recentUserMonths} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis
//                                 dataKey="name"
//                                 label={{ value: 'Mois', position: 'insideBottomRight', offset: -10 }}
//                             />
//                             <YAxis
//                                 yAxisId="left"
//                                 label={{ value: 'Nombre d\'utilisateurs', angle: -90, position: 'insideLeft' }}
//                             />
//                             <YAxis
//                                 yAxisId="right"
//                                 orientation="right"
//                                 label={{ value: 'Nombre de souvenirs', angle: 90, position: 'insideRight' }}
//                             />
//                             <Tooltip
//                                 formatter={(value, name) => {
//                                     if (name === "newUsers") return [value, "Nouveaux Utilisateurs"];
//                                     if (name === "validatedUsers") return [value, "Utilisateurs Validés"];
//                                     return [value, "Souvenirs Publiés"];
//                                 }}
//                                 contentStyle={{ borderRadius: '6px' }}
//                             />
//                             <Legend />
//                             <Bar yAxisId="left" dataKey="newUsers" name="Nouveaux Utilisateurs" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={15} />
//                             <Bar yAxisId="left" dataKey="validatedUsers" name="Utilisateurs Validés" fill="#10b981" radius={[4, 4, 0, 0]} barSize={15} />
//                             <Line
//                                 yAxisId="right"
//                                 type="monotone"
//                                 data={recentSouvenirMonths}
//                                 dataKey="souvenirs"
//                                 name="Souvenirs Publiés"
//                                 stroke="#ef4444"
//                                 strokeWidth={2}
//                                 dot={{ r: 5 }}
//                                 activeDot={{ r: 8, strokeWidth: 2 }}
//                             />
//                         </ComposedChart>
//                     </ResponsiveContainer>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-indigo-50 rounded-lg p-4">
//                         <h4 className="text-indigo-700 font-medium mb-1">Tendance Utilisateurs</h4>
//                         <p className="text-sm text-indigo-800">
//                             {recentUserMonths.length > 0 ?
//                                 `${recentUserMonths[recentUserMonths.length - 1].newUsers} nouvelles inscriptions ce mois-ci,
//                                 dont ${recentUserMonths[recentUserMonths.length - 1].validatedUsers}
//                                 utilisateurs validés (${Math.round((recentUserMonths[recentUserMonths.length - 1].validatedUsers /
//                                     recentUserMonths[recentUserMonths.length - 1].newUsers) * 100)}%).` :
//                                 'Aucune donnée disponible.'}
//                         </p>
//                     </div>

//                     <div className="bg-blue-50 rounded-lg p-4">
//                         <h4 className="text-blue-700 font-medium mb-1">Production de Contenu</h4>
//                         <p className="text-sm text-blue-800">
//                             {recentSouvenirMonths.length > 0 ?
//                                 `En moyenne ${Math.round(recentSouvenirMonths.reduce((sum, month) => sum + month.souvenirs, 0) / recentSouvenirMonths.length)}
//                                 souvenirs publiés par mois ces 6 derniers mois.` :
//                                 'Aucune donnée disponible.'}
//                         </p>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <h4 className="text-green-700 font-medium mb-1">Filières Principales</h4>
//                         <p className="text-sm text-green-800">
//                             {userData.usersByFiliere.length > 0 ?
//                                 `Les filières les plus représentées sont ${userData.usersByFiliere[0].name}
//                                 (${userData.usersByFiliere[0].value} utilisateurs) et
//                                 ${userData.usersByFiliere[1].name} (${userData.usersByFiliere[1].value} utilisateurs).` :
//                                 'Aucune donnée disponible.'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// GraduateNetworkDashboard.layout = page => <Dashboard children={page} />

// export default GraduateNetworkDashboard;




// import { useState, useEffect } from "react";
// import { Users, FileText, TrendingUp, ChevronUp, ArrowUpRight } from "lucide-react";
// import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from "recharts";
// import Dashboard from "@/Layouts/DashboardGestionnaireLayout";
// import axios from "axios";
// import { useForm } from "@inertiajs/react";
// import { t } from "i18next";

// const GraduateNetworkDashboard = ({ Admin,
//     usersResponse,
//     souvenirsResponse,
//     monthlyUsersResponse,
//     monthlySouvenirsResponse,
//     filieresResponse,
//     promotionsResponse,
//     categoriesResponse,
//     engagementResponse
// }) => {
//     // const [isLoading, setIsLoading] = useState(true);
//     const { data: userData, setData: setUserData, post, processing: isLoading } = useForm({
//         totalUsers: 0,
//         newUsersPerMonth: [],
//         usersByPromotion: [],
//         usersByFiliere: []
//     });
//     const [souvenirData, setSouvenirData] = useState({
//         totalSouvenirs: 0,
//         souvenirsPerMonth: [],
//         souvenirsByCategory: [],
//         engagementMetrics: {}
//     });

//     const generateUserReport = async () => {
//         try {
//             const response = await axios.get('/admin/reports/users', {
//                 responseType: 'blob'
//             });

//             console.log(response.data);

//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'rapport_utilisateurs.pdf');
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//         } catch (error) {
//             console.error("Error generating user report:", error);
//         }
//     };


//     const generateSouvenirReport = async () => {
//         try {
//             const response = await axios.get('/admin/reports/souvenirs', {
//                 responseType: 'blob'
//             });

//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'rapport_souvenirs.pdf');
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//         } catch (error) {
//             console.error("Error generating souvenir report:", error);
//         }
//     };


//     useEffect(() => {

//         setUserData({
//             totalUsers: usersResponse,
//             newUsersPerMonth: monthlyUsersResponse,
//             usersByPromotion: promotionsResponse,
//             usersByFiliere: filieresResponse
//         });

//         setSouvenirData({
//             totalSouvenirs: souvenirsResponse,
//             souvenirsPerMonth: monthlySouvenirsResponse,
//             souvenirsByCategory: categoriesResponse,
//             engagementMetrics: engagementResponse
//         });

//     }, []);

//     console.log(userData)
//     const calculateGrowth = (data, key) => {
//         if (!data || data.length < 2) return 0;
//         const lastMonth = data[data.length - 1][key];
//         const prevMonth = data[data.length - 2][key];
//         return prevMonth ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100) : 0;
//     };

//     const userGrowth = calculateGrowth(userData.newUsersPerMonth, 'count');
//     const souvenirGrowth = calculateGrowth(souvenirData.souvenirsPerMonth, 'count');

//     const recentUserMonths = userData.newUsersPerMonth?.slice(-6) || [];
//     const recentSouvenirMonths = souvenirData.souvenirsPerMonth?.slice(-6) || [];

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-96">
//                 <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//             </div>
//         );
//     }


//     const CustomTooltip = ({ active, payload, label }) => {
//         console.log(payload);
//         if (active && payload && payload.length) {
//             const souvenirData = payload.find((entry) => entry.dataKey === 'count');
//             return (
//                 <div className="bg-white p-4 rounded shadow text-sm text-gray-700 border border-gray-200">
//                     <p className="font-semibold">Mois: {label}</p>
//                     {souvenirData && (
//                         <p className="mt-4 text-red-600 " >Souvenirs Publiés: {souvenirData.value}</p>
//                     )}
//                 </div>
//             );
//         }
//         return null;
//     };


//     return (
//         <div className="space-y-8 max-w-8xl mx-auto p-6">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                     Welcome back, <span className="text-indigo-600">{Admin.prenom} {Admin.nom}</span>!
//                 </h1>
//                 <p className="mt-1 text-gray-600">Here's what's happening with your laureates today.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 bg-indigo-50 rounded-lg">
//                                 <Users className="w-6 h-6 text-indigo-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900">Inscriptions Utilisateurs</h3>
//                                 <p className="text-sm text-gray-500">Nouveaux lauréats par mois</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="h-48">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart data={userData.newUsersPerMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
//                                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                                     </linearGradient>
//                                     <linearGradient id="colorValidatedUsers" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//                                         <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="month" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip
//                                     formatter={(value, name) => [value, name === "Total Inscriptions" ? 'Total Inscriptions' : 'Comptes Validés']}
//                                     labelFormatter={(label) => `Mois: ${label}`}
//                                     contentStyle={{ borderRadius: '6px' }}
//                                 />
//                                 <Legend />
//                                 <ReferenceLine y={25} stroke="#8884d8" strokeDasharray="3 3" />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="count"
//                                     name="Total Inscriptions"
//                                     stroke="#6366f1"
//                                     strokeWidth={2}
//                                     fillOpacity={1}
//                                     fill="url(#colorNewUsers)"
//                                 />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="validated_count"
//                                     name="Comptes Validés"
//                                     stroke="#10b981"
//                                     strokeWidth={2}
//                                     fillOpacity={1}
//                                     fill="url(#colorValidatedUsers)"
//                                 />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Utilisateurs</p>
//                             <p className="text-2xl font-bold text-gray-900">{userData.totalUsers}</p>
//                         </div>
//                         <div className="flex items-center text-indigo-600 text-sm font-medium cursor-pointer"
//                             onClick={generateUserReport}>
//                             Voir rapport détaillé
//                             <ArrowUpRight className="w-4 h-4 ml-1" />
//                         </div>

//                     </div>
//                 </div>

//                 <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 bg-blue-50 rounded-lg">
//                                 <FileText className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900">Souvenirs Publiés</h3>
//                                 <p className="text-sm text-gray-500">Activité mensuelle</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="h-48">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={souvenirData.souvenirsPerMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="month" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip
//                                     formatter={(value, name) => [value, 'Souvenirs']}
//                                     labelFormatter={(label) => `Mois: ${label}`}
//                                     contentStyle={{ borderRadius: '6px' }}
//                                 />
//                                 <ReferenceLine y={30} stroke="#3b82f6" strokeDasharray="3 3" />
//                                 <Bar
//                                     dataKey="count"
//                                     fill="#3b82f6"
//                                     radius={[4, 4, 0, 0]}
//                                     barSize={30}
//                                 />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="mt-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Souvenirs</p>
//                             <p className="text-2xl font-bold text-gray-900">{souvenirData.totalSouvenirs}</p>
//                         </div>
//                         <div className="flex items-center text-blue-600 text-sm font-medium cursor-pointer"
//                             onClick={generateSouvenirReport}>
//                             Voir rapport détaillé
//                             <ArrowUpRight className="w-4 h-4 ml-1" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Analyse sur 6 Mois: Utilisateurs et Contenu</h2>

//                 <div className="h-96">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <ComposedChart data={recentUserMonths} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis
//                                 dataKey="month"
//                                 label={{ value: 'Mois', position: 'insideBottomRight', offset: -10 }}
//                             />
//                             <YAxis
//                                 yAxisId="left"
//                                 label={{ value: 'Nombre d\'utilisateurs', angle: -90, position: 'insideLeft' }}
//                             />
//                             <YAxis
//                                 yAxisId="right"
//                                 orientation="right"
//                                 label={{ value: 'Nombre de souvenirs', angle: 90, position: 'insideRight' }}
//                             />
//                             <Tooltip content={<CustomTooltip />} />


//                             <Legend />
//                             <Bar yAxisId="left" dataKey="count" name="Nouveaux Utilisateurs" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={15} />
//                             <Bar yAxisId="left" dataKey="validated_count" name="Utilisateurs Validés" fill="#10b981" radius={[4, 4, 0, 0]} barSize={15} />
//                             <Line
//                                 yAxisId="right"
//                                 type="monotone"
//                                 data={recentSouvenirMonths}
//                                 dataKey="count"
//                                 name="Souvenirs Publiés"
//                                 stroke="#ef4444"
//                                 strokeWidth={2}
//                                 dot={{ r: 5 }}
//                                 activeDot={{ r: 8, strokeWidth: 2 }}
//                             />
//                         </ComposedChart>
//                     </ResponsiveContainer>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-indigo-50 rounded-lg p-4">
//                         <h4 className="text-indigo-700 font-medium mb-1">Tendance Utilisateurs</h4>
//                         <p className="text-sm text-indigo-800">
//                             {recentUserMonths.length > 0 ?
//                                 `${recentUserMonths[recentUserMonths.length - 1].count} nouvelles inscriptions ce mois-ci,
//                                 dont ${recentUserMonths[recentUserMonths.length - 1].validated_count}
//                                 utilisateurs validés (${Math.round((recentUserMonths[recentUserMonths.length - 1].validated_count /
//                                     recentUserMonths[recentUserMonths.length - 1].count) * 100)}%).` :
//                                 'Aucune donnée disponible.'}
//                         </p>
//                     </div>

//                     <div className="bg-blue-50 rounded-lg p-4">
//                         <h4 className="text-blue-700 font-medium mb-1">Production de Contenu</h4>
//                         <p className="text-sm text-blue-800">
//                             {recentSouvenirMonths.length > 0 ?
//                                 `En moyenne ${Math.round(recentSouvenirMonths.reduce((sum, month) => sum + month.count, 0) / recentSouvenirMonths.length)}
//                                 souvenirs publiés par mois ces 6 derniers mois.` :
//                                 'Aucune donnée disponible.'}
//                         </p>
//                     </div>

//                     <div className="bg-green-50 rounded-lg p-4">
//                         <h4 className="text-green-700 font-medium mb-1">Filières Principales</h4>
//                         <p className="text-sm text-green-800">
//                             {userData.usersByFiliere.length > 0 ?
//                                 `Les filières les plus représentées sont ${userData.usersByFiliere[0].filiere}
//                                 (${userData.usersByFiliere[0].count} utilisateurs) et
//                                 ${userData.usersByFiliere[1].filiere} (${userData.usersByFiliere[1].count} utilisateurs).` :
//                                 'Aucune donnée disponible.'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// GraduateNetworkDashboard.layout = page => <Dashboard children={page} title={t("Gestionnaire.dashboard.welcome")} />

// export default GraduateNetworkDashboard;





import { useState, useEffect } from "react";
import { Users, FileText, TrendingUp, ChevronUp, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from "recharts";
import Dashboard from "@/Layouts/DashboardGestionnaireLayout";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import { t } from "i18next";

const GraduateNetworkDashboard = ({ Admin,
    usersResponse,
    souvenirsResponse,
    monthlyUsersResponse,
    monthlySouvenirsResponse,
    filieresResponse,
    promotionsResponse,
    categoriesResponse,
    engagementResponse
}) => {
    const { data: userData, setData: setUserData, post, processing: isLoading } = useForm({
        totalUsers: 0,
        newUsersPerMonth: [],
        usersByPromotion: [],
        usersByFiliere: []
    });
    const [souvenirData, setSouvenirData] = useState({
        totalSouvenirs: 0,
        souvenirsPerMonth: [],
        souvenirsByCategory: [],
        engagementMetrics: {}
    });

    const generateUserReport = async () => {
        try {
            const response = await axios.get('/admin/reports/users', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', t('dashboard.userReportFilename', 'rapport_utilisateurs.pdf'));
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error generating user report:", error);
        }
    };

    const generateSouvenirReport = async () => {
        try {
            const response = await axios.get('/admin/reports/souvenirs', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', t('dashboard.souvenirReportFilename', 'rapport_souvenirs.pdf')); //
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error generating souvenir report:", error);
        }
    };

    useEffect(() => {
        setUserData({
            totalUsers: usersResponse,
            newUsersPerMonth: monthlyUsersResponse,
            usersByPromotion: promotionsResponse,
            usersByFiliere: filieresResponse
        });

        setSouvenirData({
            totalSouvenirs: souvenirsResponse,
            souvenirsPerMonth: monthlySouvenirsResponse,
            souvenirsByCategory: categoriesResponse,
            engagementMetrics: engagementResponse
        });
    }, []);

    const calculateGrowth = (data, key) => {
        if (!data || data.length < 2) return 0;
        const lastMonth = data[data.length - 1][key];
        const prevMonth = data[data.length - 2][key];
        return prevMonth ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100) : 0;
    };

    const recentUserMonths = userData.newUsersPerMonth?.slice(-6) || [];
    const recentSouvenirMonths = souvenirData.souvenirsPerMonth?.slice(-6) || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const CustomTooltipContent = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const souvenirEntry = payload.find((entry) => entry.dataKey === 'count' && entry.name === t('dashboard.chartSouvenirsPublished', 'Souvenirs Publiés'));


            return (
                <div className="bg-white p-4 rounded shadow text-sm text-gray-700 border border-gray-200">
                    <p className="font-semibold">{t('dashboard.chartMonthLabel', 'Mois')}: {label}</p>
                    {souvenirEntry && (
                        <p className="mt-1" style={{ color: souvenirEntry.stroke }}>
                            {souvenirEntry.name}: {souvenirEntry.value}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 max-w-8xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {t('dashboard.welcome', 'Welcome back, {{prenom}} {{nom}}!', { prenom: Admin.prenom, nom: Admin.nom })}
                </h1>
                <p className="mt-1 text-gray-600">{t('dashboard.welcomeSubtitle', "Here's what's happening with your laureates today.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <Users className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{t('dashboard.userRegistrationsTitle', 'Inscriptions Utilisateurs')}</h3>
                                <p className="text-sm text-gray-500">{t('dashboard.userRegistrationsSubtitle', 'Nouveaux lauréats par mois')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userData.newUsersPerMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorValidatedUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value, name) => [value, name === t('dashboard.chartTotalRegistrations', "Total Inscriptions") ? t('dashboard.chartTotalRegistrations', 'Total Inscriptions') : t('dashboard.chartValidatedAccounts', 'Comptes Validés')]}
                                    labelFormatter={(label) => `${t('dashboard.chartMonthLabel', 'Mois')}: ${label}`}
                                    contentStyle={{ borderRadius: '6px' }}
                                />
                                <Legend />
                                <ReferenceLine y={25} stroke="#8884d8" strokeDasharray="3 3" />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    name={t('dashboard.chartTotalRegistrations', "Total Inscriptions")}
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorNewUsers)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="validated_count"
                                    name={t('dashboard.chartValidatedAccounts', "Comptes Validés")}
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValidatedUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">{t('dashboard.totalUsersLabel', 'Total Utilisateurs')}</p>
                            <p className="text-2xl font-bold text-gray-900">{userData.totalUsers}</p>
                        </div>
                        <div className="flex items-center text-indigo-600 text-sm font-medium cursor-pointer"
                            onClick={generateUserReport}>
                            {t('dashboard.viewDetailedReportButton', 'Voir rapport détaillé')}
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{t('dashboard.souvenirsPublishedTitle', 'Souvenirs Publiés')}</h3>
                                <p className="text-sm text-gray-500">{t('dashboard.souvenirsPublishedSubtitle', 'Activité mensuelle')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={souvenirData.souvenirsPerMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value) => [value, t('dashboard.chartSouvenirsTooltip', 'Souvenirs')]}
                                    labelFormatter={(label) => `${t('dashboard.chartMonthLabel', 'Mois')}: ${label}`}
                                    contentStyle={{ borderRadius: '6px' }}
                                />
                                <ReferenceLine y={30} stroke="#3b82f6" strokeDasharray="3 3" />
                                <Bar
                                    dataKey="count"
                                    name={t('dashboard.chartSouvenirsLegend', 'Souvenirs')}
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">{t('dashboard.totalSouvenirsLabel', 'Total Souvenirs')}</p>
                            <p className="text-2xl font-bold text-gray-900">{souvenirData.totalSouvenirs}</p>
                        </div>
                        <div className="flex items-center text-blue-600 text-sm font-medium cursor-pointer"
                            onClick={generateSouvenirReport}>
                            {t('dashboard.viewDetailedReportButton', 'Voir rapport détaillé')}
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t('dashboard.sixMonthAnalysisTitle', 'Analyse sur 6 Mois: Utilisateurs et Contenu')}</h2>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={recentUserMonths} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                label={{ value: t('dashboard.chartXAxisMonth', 'Mois'), position: 'insideBottomRight', offset: -10 }}
                            />
                            <YAxis
                                yAxisId="left"
                                label={{ value: t('dashboard.chartYAxisUsers', "Nombre d'utilisateurs"), angle: -90, position: 'insideLeft' }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                label={{ value: t('dashboard.chartYAxisSouvenirs', 'Nombre de souvenirs'), angle: 90, position: 'insideRight' }}
                            />
                            <Tooltip content={<CustomTooltipContent />} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="count" name={t('dashboard.chartNewUsers', "Nouveaux Utilisateurs")} fill="#6366f1" radius={[4, 4, 0, 0]} barSize={15} />
                            <Bar yAxisId="left" dataKey="validated_count" name={t('dashboard.chartValidatedUsers', "Utilisateurs Validés")} fill="#10b981" radius={[4, 4, 0, 0]} barSize={15} />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                data={recentSouvenirMonths}
                                dataKey="count"
                                name={t('dashboard.chartSouvenirsPublished', "Souvenirs Publiés")}
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8, strokeWidth: 2 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                        <h4 className="text-indigo-700 font-medium mb-1">{t('dashboard.userTrendTitle', 'Tendance Utilisateurs')}</h4>
                        <p className="text-sm text-indigo-800">
                            {recentUserMonths.length > 0 ?
                                t('dashboard.userTrendDesc', '{{count}} nouvelles inscriptions ce mois-ci, dont {{validated_count}} utilisateurs validés ({{percentage}}%).', {
                                    count: recentUserMonths[recentUserMonths.length - 1].count,
                                    validated_count: recentUserMonths[recentUserMonths.length - 1].validated_count,
                                    percentage: Math.round((recentUserMonths[recentUserMonths.length - 1].validated_count / recentUserMonths[recentUserMonths.length - 1].count) * 100) || 0
                                }) :
                                t('dashboard.noDataAvailable', 'Aucune donnée disponible.')}
                        </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="text-blue-700 font-medium mb-1">{t('dashboard.contentProductionTitle', 'Production de Contenu')}</h4>
                        <p className="text-sm text-blue-800">
                            {recentSouvenirMonths.length > 0 ?
                                t('dashboard.contentProductionDesc', 'En moyenne {{average}} souvenirs publiés par mois ces 6 derniers mois.', {
                                    average: Math.round(recentSouvenirMonths.reduce((sum, month) => sum + month.count, 0) / recentSouvenirMonths.length)
                                }) :
                                t('dashboard.noDataAvailable', 'Aucune donnée disponible.')}
                        </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="text-green-700 font-medium mb-1">{t('dashboard.mainFiliereTitle', 'Filières Principales')}</h4>
                        <p className="text-sm text-green-800">
                            {userData.usersByFiliere.length > 1 ?
                                t('dashboard.mainFiliereDesc', 'Les filières les plus représentées sont {{filiere1}} ({{count1}} utilisateurs) et {{filiere2}} ({{count2}} utilisateurs).', {
                                    filiere1: t('branches.'+userData.usersByFiliere[0].filiere),
                                    count1: userData.usersByFiliere[0].count,
                                    filiere2: t('branches.'+userData.usersByFiliere[1].filiere),
                                    count2: userData.usersByFiliere[1].count
                                }) :
                                (userData.usersByFiliere.length === 1 ?
                                    t('dashboard.mainFiliereDescSingle', 'La filière la plus représentée est {{filiere1}} ({{count1}} utilisateurs).', {
                                        filiere1: userData.usersByFiliere[0].filiere,
                                        count1: userData.usersByFiliere[0].count,
                                    }) :
                                    t('dashboard.noDataAvailable', 'Aucune donnée disponible.'))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

GraduateNetworkDashboard.layout = page => <Dashboard children={page} title={t("Gestionnaire.dashboard.welcome")} />

export default GraduateNetworkDashboard;
