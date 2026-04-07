const Stats = () => {
  const stats = [
    {
      number: '50,000+',
      label: 'Happy Customers',
      description: 'Satisfied food lovers who choose us daily',
      icon: '👥'
    },
    {
      number: '500,000+',
      label: 'Orders Delivered',
      description: 'Meals served with love and care',
      icon: '📦'
    },
    {
      number: '25',
      label: 'Average Minutes',
      description: 'From order to delivery',
      icon: '⚡'
    },
    {
      number: '4.9',
      label: 'Customer Rating',
      description: 'Based on 10,000+ reviews',
      icon: '⭐'
    },
    {
      number: '50+',
      label: 'Partner Restaurants',
      description: 'Local favorites in your area',
      icon: '🏪'
    },
    {
      number: '24/7',
      label: 'Customer Support',
      description: 'Always here to help',
      icon: '💬'
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300 mb-4">
            <span className="text-lg">📊</span>
            Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Numbers that
            <span className="block text-orange-400">speak for themselves</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're proud of the community we've built and the service we provide.
            Here's what our numbers say about our commitment to excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className="group bg-slate-800 rounded-3xl p-8 border border-slate-700 transition-all duration-300 hover:bg-slate-700 hover:border-orange-500/30 hover:-translate-y-1">
              {/* Icon */}
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-orange-500/30 transition-colors">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-xl font-bold text-white mb-3">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-slate-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Banner */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-6xl">🏆</div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">#1 Food Delivery App</h3>
              <p className="text-orange-100">Recognized for excellence in customer service and food quality</p>
            </div>
            <div className="text-4xl">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;