import { useEffect, useState } from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import HowItWorks from './landing/HowItWorks';
import WhyChooseUs from './landing/WhyChooseUs';
import Features from './landing/Features';
import Stats from './landing/Stats';
import Testimonials from './landing/Testimonials';
import Newsletter from './landing/Newsletter';
import FAQ from './landing/FAQ';
import Footer from './landing/Footer';

const LandingPage = ({ cartCount, socket, connected }) => {
  const [activityFeed, setActivityFeed] = useState([
    {
      id: 1,
      message: 'FoodTrack is ready. Place an order and watch real-time updates arrive instantly.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [liveOrders, setLiveOrders] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleLiveActivity = (event) => {
      if (!event?.message) return;

      setActivityFeed(prev => [
        {
          id: Date.now(),
          message: event.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ].slice(0, 5));

      if (typeof event.totalOrders === 'number') {
        setLiveOrders(event.totalOrders);
      }
    };

    socket.on('liveOrderActivity', handleLiveActivity);

    return () => {
      socket.off('liveOrderActivity', handleLiveActivity);
    };
  }, [socket]);

  return (
    <>
      <Navbar cartCount={cartCount} connected={connected} />
      <Hero connected={connected} liveOrders={liveOrders} activityFeed={activityFeed} />
      <HowItWorks />
      <WhyChooseUs />
      <Features />
      <Stats />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;
