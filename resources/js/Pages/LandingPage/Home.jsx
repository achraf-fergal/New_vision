'use client'

import { Heart, ShoppingBag, Users, Zap, MessageCircle, TrendingUp } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden">

      {/* Navigation */}


      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            Connect. Create.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Sell
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The all-in-one platform where your community meets your store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-semibold text-lg text-white hover:shadow-xl transition hover:scale-105">
              Get Started Free
            </button>

          </div>
          <div className="pt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <p className="text-slate-600 mt-2">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-600">$2M+</div>
              <p className="text-slate-600 mt-2">Sold This Month</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <p className="text-slate-600 mt-2">Products Listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600">Everything you need to grow your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <MessageCircle className="h-6 w-6" />,
                title: 'Social First',
                color: 'from-cyan-500 to-blue-600',
                dot: 'text-cyan-400',
                border: 'hover:border-cyan-500',
                items: ['Share posts, stories, and reels', 'Real-time likes, comments, shares', 'Build audience and loyal followers', 'Direct messaging with customers'],
              },
              {
                icon: <ShoppingBag className="h-6 w-6" />,
                title: 'Store Integrated',
                color: 'from-blue-500 to-cyan-600',
                dot: 'text-blue-400',
                border: 'hover:border-blue-500',
                items: ['Sell directly from your feed', 'Stunning product galleries', 'Secure checkout & payments', 'Inventory & order tracking'],
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: 'Community Driven',
                color: 'from-purple-500 to-pink-600',
                dot: 'text-purple-400',
                border: 'hover:border-purple-500',
                items: ['Create groups around interests', 'Collaborative content creation', 'Reward loyal members', 'Host live events & Q&As'],
              },
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: 'Smart Analytics',
                color: 'from-green-500 to-emerald-600',
                dot: 'text-green-400',
                border: 'hover:border-green-500',
                items: ['Real-time engagement insights', 'Customer behavior trends', 'Data-driven recommendations', 'Export reports & metrics'],
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-xl border border-slate-300 bg-white p-8 ${card.border} transition shadow-sm`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                </div>
                <ul className="space-y-3 text-slate-600">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`${card.dot} font-bold mt-1`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose New Vision?</h2>
            <p className="text-xl text-slate-600">The complete solution for modern creators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="h-8 w-8 text-blue-600" />, bg: 'bg-blue-100 border-blue-300', title: 'Lightning Fast', desc: 'Optimized performance that keeps up with your growth' },
              { icon: <Heart className="h-8 w-8 text-cyan-600" />, bg: 'bg-cyan-100 border-cyan-300', title: 'Creator Focused', desc: 'Tools built specifically for content creators and sellers' },
              { icon: <ShoppingBag className="h-8 w-8 text-purple-600" />, bg: 'bg-purple-100 border-purple-300', title: 'Easy Monetization', desc: 'Turn your audience into revenue with minimal effort' },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full border ${item.bg} mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">Ready to Join New Vision?</h2>
          <p className="text-xl text-slate-600">Start building your community and selling today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">

             <a href="/login"lassName="rounded-lg border border-slate-300 px-8 py-4 font-semibold text-lg hover:bg-slate-100 transition">
             <button className="rounded-lg border border-slate-300 px-8 py-4 font-semibold text-lg hover:bg-slate-100 transition">
            Contact Sales
             
            </button></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="mx-auto max-w-7xl">

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <span className="text-sm font-bold">NV</span>
              </div>
              <span className="font-semibold">New Vision</span>
            </div>
            <p className="text-slate-600 text-sm">© 2024 New Vision. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}