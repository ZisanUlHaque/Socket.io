const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      review: 'The real-time tracking is incredible! I could see exactly when my order was being prepared and when the delivery driver picked it up. The food arrived hot and fresh.',
      order: 'Margherita Pizza & Garlic Bread'
    },
    {
      name: 'Mike Chen',
      role: 'Busy Professional',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      review: 'As someone who orders food multiple times a week, the live updates save me so much time. No more wondering where my food is - I know exactly!',
      order: 'Sushi Platter & Miso Soup'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      review: 'The photos of the food are amazing and match exactly what I received. The delivery was super fast and the live chat with the kitchen was helpful.',
      order: 'Chicken Tikka Masala & Naan'
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 mb-4">
            <span className="text-lg">⭐</span>
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Loved by food lovers
            <span className="block text-green-600">everywhere</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our customers say about their
            real-time food ordering experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
                <span className="ml-2 text-sm text-slate-600">({testimonial.rating}.0)</span>
              </div>

              {/* Review */}
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.review}"
              </blockquote>

              {/* Order */}
              <div className="text-sm text-slate-500 mb-6 italic">
                Ordered: {testimonial.order}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-2">4.8★</div>
            <div className="text-sm text-slate-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-2">2,500+</div>
            <div className="text-sm text-slate-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-2">15min</div>
            <div className="text-sm text-slate-600">Avg Delivery Time</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
            <div className="text-sm text-slate-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;