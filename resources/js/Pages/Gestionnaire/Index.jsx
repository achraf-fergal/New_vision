// import { Users, UserCheck, UserX, Clock } from "lucide-react";
// import { Link, useForm } from "@inertiajs/react";
// import Dashboard from "@/Layouts/DashboardGestionnaireLayout";

// function Index({ Admin, LaureatWaiting, LaureatBlocked, LaureatAccepted ,recentLaureatsInscrire  }) {

//     const { data, setData, errors, post, processing } = useForm({
//         totalLaureats: LaureatWaiting.length + LaureatAccepted.length,
//         acceptedLaureats: LaureatAccepted.length,
//         blockedLaureats: LaureatBlocked.length,
//         waitingLaureats: LaureatWaiting.length,
//         recentLaureatsInscrire: recentLaureatsInscrire
//     })


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

//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900">Welcome back,
//                         <span
//                         className="text-indigo-600 cursor-pointer  "
//                         >
//                             {" "}{Admin.nom} {Admin.prenom}{" "}
//                         </span>
//                         !</h1>
//                     <p className="mt-1 text-gray-600">Here&apos;s what&apos;s happening with your laureates today.</p>
//                 </div>


//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-blue-50 rounded-lg">
//                                 <Users className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Total Laureates</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.totalLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">All registered laureates</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-green-50 rounded-lg">
//                                 <UserCheck className="w-6 h-6 text-green-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Accepted</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.acceptedLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">Active laureates</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-red-50 rounded-lg">
//                                 <UserX className="w-6 h-6 text-red-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Blocked</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.blockedLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">Restricted access</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="rounded-xl p-6">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-yellow-50 rounded-lg">
//                                 <Clock className="w-6 h-6 text-yellow-600" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Waiting</p>
//                                 <h3 className="text-2xl font-bold text-gray-900">{data.waitingLaureats}</h3>
//                                 <p className="text-sm text-gray-500 mt-1">Pending approval</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>



//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                     <div className="lg:col-span-2">
//                         <div className="bg-white rounded-xl shadow-sm p-6">
//                             <div className="flex items-center justify-between mb-6">
//                                 <h2 className="text-lg font-semibold text-gray-900">Recent Laureats Inscrire</h2>
//                                 <Link className="text-sm text-blue-600 hover:text-blue-700 hover:underline " href={route("laureat.waiting")} >View all</Link>
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
//                                             <p className="text-sm text-gray-600"><span className="font-bold" >{laureat.nom} {laureat.prenom}</span> Inscrit at  <span className="font-semibold" >{new Date(laureat.created_at).toLocaleDateString()}</span></p>
//                                             <p className="text-xs text-gray-400 mt-1">{laureat.email}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>


//                     <div className="h-[230px] bg-white rounded-xl shadow-sm p-6">
//                         <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
//                         <div className="space-y-4">
//                             <Link className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100" href={route("laureat.accepted")}>
//                                 <span className="text-sm font-medium text-gray-700">View Accepted Laureates</span>
//                                 <UserCheck className="w-5 h-5 text-green-600" />
//                             </Link>
//                             <Link className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100" href={route("laureat.blocked")}>
//                                 <span className="text-sm font-medium text-gray-700">View Blocked Laureates</span>
//                                 <UserX className="w-5 h-5 text-red-600" />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// Index.layout = page => <Dashboard children={page} title="Welcome" />

// export default Index;


import { useState, useEffect } from "react";
import { Users, FileText, TrendingUp, ChevronUp, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from "recharts";
import Dashboard from "@/Layouts/DashboardGestionnaireLayout";

const MonthlyStatsDashboard = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            const data = generateMonthlyData();
            setMonthlyData(data);
            setIsLoading(false);
        }, 600);
    }, []);

    // Generate sample data for monthly registrations and posts
    const generateMonthlyData = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentYear = new Date().getFullYear();

        return months.map((month, idx) => {
            // Create a realistic data pattern with seasonal trends
            const baseRegistrations = 20 + Math.floor(Math.random() * 15);
            const seasonalFactor = idx >= 8 || idx <= 1 ? 1.5 : idx >= 5 && idx <= 7 ? 0.8 : 1;
            const trendFactor = 1 + (idx * 0.05); // Slight upward trend through the year

            const registrations = Math.floor(baseRegistrations * seasonalFactor * trendFactor);
            const posts = Math.floor(registrations * (0.3 + Math.random() * 0.4)); // Posts are roughly proportional to users
            const completionRate = 40 + Math.floor(Math.random() * 40); // 40-80% completion rate

            return {
                name: month,
                fullDate: `${month} ${currentYear}`,
                registrations,
                posts,
                completionRate,
                target: 35 // Monthly target line
            };
        });
    };

    // Calculate statistics for summary cards
    const calculateStats = () => {
        if (monthlyData.length === 0) return { totalRegistrations: 0, totalPosts: 0, registrationGrowth: 0, postGrowth: 0 };

        const totalRegistrations = monthlyData.reduce((sum, month) => sum + month.registrations, 0);
        const totalPosts = monthlyData.reduce((sum, month) => sum + month.posts, 0);

        // Calculate growth (comparing last month to previous month)
        const lastMonthIndex = monthlyData.length - 1;
        const prevMonthIndex = monthlyData.length - 2;

        let registrationGrowth = 0;
        let postGrowth = 0;

        if (lastMonthIndex > 0) {
            const lastMonth = monthlyData[lastMonthIndex];
            const prevMonth = monthlyData[prevMonthIndex];

            registrationGrowth = Math.round(((lastMonth.registrations - prevMonth.registrations) / prevMonth.registrations) * 100);
            postGrowth = Math.round(((lastMonth.posts - prevMonth.posts) / prevMonth.posts) * 100);
        }

        return { totalRegistrations, totalPosts, registrationGrowth, postGrowth };
    };

    const stats = calculateStats();

    // Get the last 6 months for focused charts
    const recentMonths = monthlyData.slice(-6);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 py-10 sm:px-6 lg:px-8 "  >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary Cards */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <Users className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">User Registrations</h3>
                                <p className="text-sm text-gray-500">Monthly new laureates</p>
                            </div>
                        </div>
                        <div className="bg-green-50 py-1 px-2 rounded-full flex items-center">
                            <ChevronUp className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">{stats.registrationGrowth}%</span>
                        </div>
                    </div>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value, name) => [value, 'Registrations']}
                                    labelFormatter={(label) => `Month: ${label}`}
                                    contentStyle={{ borderRadius: '6px' }}
                                />
                                <ReferenceLine y={35} stroke="#8884d8" strokeDasharray="3 3" label="Target" />
                                <Area
                                    type="monotone"
                                    dataKey="registrations"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorRegistrations)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Registrations</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</p>
                        </div>
                        <div className="flex items-center text-indigo-600 text-sm font-medium">
                            View detailed report
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
                                <h3 className="text-xl font-bold text-gray-900">Posts Published</h3>
                                <p className="text-sm text-gray-500">Monthly content creation</p>
                            </div>
                        </div>
                        <div className="bg-green-50 py-1 px-2 rounded-full flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">{stats.postGrowth}%</span>
                        </div>
                    </div>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value, name) => [value, 'Posts']}
                                    labelFormatter={(label) => `Month: ${label}`}
                                    contentStyle={{ borderRadius: '6px' }}
                                />
                                <Bar
                                    dataKey="posts"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Posts</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
                        </div>
                        <div className="flex items-center text-blue-600 text-sm font-medium">
                            View detailed report
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Analytics Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Advanced Analytics: 6-Month Performance</h2>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={recentMonths} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                label={{ value: 'Month', position: 'insideBottomRight', offset: -10 }}
                            />
                            <YAxis
                                yAxisId="left"
                                label={{ value: 'Number of Users/Posts', angle: -90, position: 'insideLeft' }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 100]}
                                label={{ value: 'Completion Rate (%)', angle: 90, position: 'insideRight' }}
                            />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === "completionRate") return [`${value}%`, "Completion Rate"];
                                    return [value, name === "registrations" ? "User Registrations" : "Posts Published"];
                                }}
                                contentStyle={{ borderRadius: '6px' }}
                            />
                            <Legend />
                            <Bar yAxisId="left" dataKey="registrations" name="User Registrations" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar yAxisId="left" dataKey="posts" name="Posts Published" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="completionRate"
                                name="Completion Rate"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8, strokeWidth: 2 }}
                            />
                            <ReferenceLine yAxisId="left" y={35} stroke="#8884d8" strokeDasharray="3 3" label="Target" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                        <h4 className="text-indigo-700 font-medium mb-1">Registration Insights</h4>
                        <p className="text-sm text-indigo-800">
                            {recentMonths.length > 0 ?
                                `${recentMonths[recentMonths.length - 1].fullDate} saw ${recentMonths[recentMonths.length - 1].registrations} new registrations,
                ${recentMonths[recentMonths.length - 1].registrations > 35 ? 'exceeding' : 'below'} the monthly target.` :
                                'No data available.'}
                        </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="text-blue-700 font-medium mb-1">Content Production</h4>
                        <p className="text-sm text-blue-800">
                            {recentMonths.length > 0 ?
                                `Average of ${Math.round(recentMonths.reduce((sum, month) => sum + month.posts, 0) / recentMonths.length)}
                posts published per month in the last 6 months.` :
                                'No data available.'}
                        </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="text-green-700 font-medium mb-1">Completion Rate</h4>
                        <p className="text-sm text-green-800">
                            {recentMonths.length > 0 ?
                                `${Math.round(recentMonths.reduce((sum, month) => sum + month.completionRate, 0) / recentMonths.length)}%
                average completion rate across all user activities.` :
                                'No data available.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
MonthlyStatsDashboard.layout = page => <Dashboard children={page} title="Welcome" />




export default MonthlyStatsDashboard;
