const Features = () => {
  const features = [
    {
      title: 'Real-Time Order Tracking',
      description: 'Watch your order progress from kitchen to doorstep with live updates and estimated delivery times.',
      icon: '📍',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      color: 'blue'
    },
    {
      title: 'Fresh Ingredients Only',
      description: 'We partner with local farms and suppliers to ensure every dish uses the freshest, highest quality ingredients.',
      icon: '🥬',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
      color: 'green'
    },
    {
      title: 'Expert Chefs',
      description: 'Our professional chefs bring years of experience and passion to every dish they prepare.',
      icon: '👨‍🍳',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
      color: 'orange'
    },
    {
      title: 'Lightning Fast Delivery',
      description: 'Our dedicated delivery team ensures your food arrives hot and fresh within 30 minutes or less.',
      icon: '🚀',
      image: 'https://images.unsplash.com/photo-1556909114-4c36e03d48a8?w=300&h=200&fit=crop',
      color: 'purple'
    },
    {
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security to keep your transactions safe and secure.',
      icon: '🔒',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      color: 'red'
    },
    {
      title: '24/7 Customer Support',
      description: 'Our friendly support team is always ready to help with any questions or concerns you might have.',
      icon: '💬',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=300&h=200&fit=crop',
      color: 'indigo'
    }
  ];

  const colorClasses = {
    blue: 'bg-orange-50 border-orange-200 text-orange-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700'
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 mb-4">
            <span className="text-lg">✨</span>
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Everything you need for
            <span className="block text-slate-600">perfect food delivery</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge technology with traditional cooking excellence
            to deliver an unparalleled food ordering experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} className="group bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg ${colorClasses[feature.color]}`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to experience the difference?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their food orders every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-slate-900/25 transition-all hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1">
                <span>🍽️</span>
                <span>Start Ordering Now</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-lg transition-all hover:border-slate-300 hover:shadow-xl hover:-translate-y-1">
                <span>📞</span>
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;