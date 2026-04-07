const Newsletter = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white mb-6">
              <span className="text-lg">📧</span>
              Stay Connected
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Never miss a delicious
              <span className="block">moment</span>
            </h2>
            <p className="text-xl text-orange-100 leading-relaxed">
              Get exclusive deals, early access to new restaurants, and insider tips
              on the best food in town. Join our community of food lovers today.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-2xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🎁
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exclusive Deals</h3>
              <p className="text-orange-100">Get access to member-only discounts and special offers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🔔
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Early Access</h3>
              <p className="text-orange-100">Be the first to try new restaurants and menu items</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Food Tips</h3>
              <p className="text-orange-100">Receive expert food recommendations and cooking tips</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;