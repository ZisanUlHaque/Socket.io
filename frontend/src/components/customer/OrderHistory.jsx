import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const OrderHistory = ({ socket, onShowNotification }) => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(true);
  const [connectionError, setConnectionError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isSocketReady = !!socket && socket.connected !== false;

  const safeTotal = (order) => {
    if (typeof order.totalAmount === 'number') return order.totalAmount;
    if (typeof order.total === 'number') return order.total;
    if (Array.isArray(order.items)) {
      return order.items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
    }
    return 0;
  };

  const loadOrders = (phone, { silent = false } = {}) => {
    if (!socket) {
      setLoading(false);
      setIsRefreshing(false);
      setConnectionError('Not connected to server');
      return;
    }

    if (!phone) {
      setLoading(false);
      setIsRefreshing(false);
      return;
    }

    if (!silent) {
      setLoading(true);
    }

    setConnectionError(null);

    socket.emit('getMyOrders', { customerPhone: phone }, (response) => {
      setLoading(false);
      setIsRefreshing(false);

      if (response?.success) {
        setOrders(response.orders || []);
        setShowPhoneInput(false);
        localStorage.setItem('customerPhone', phone);
      } else {
        onShowNotification(
          response?.message || 'Failed to load orders',
          'error'
        );
        if (!response?.orders) {
          setOrders([]);
        }
      }
    });
  };

  // initial load from localStorage
  useEffect(() => {
    const savedPhone = localStorage.getItem('customerPhone');
    if (!savedPhone) {
      setLoading(false);
      return;
    }

    setCustomerPhone(savedPhone);

    if (socket) {
      loadOrders(savedPhone);
    } else {
      setLoading(false);
    }
  }, [socket]);

  // realtime updates for this customer's orders
  useEffect(() => {
    if (!socket || !customerPhone) return;

    const orderEvents = [
      'statusUpdated',
      'orderAccepted',
      'orderRejected',
      'orderCancelled',
      'estimatedTimeUpdated',
    ];

    const handleOrderEvent = (data) => {
      // data তে orderId থাকলে শুধু refresh
      if (data?.orderId) {
        setIsRefreshing(true);
        loadOrders(customerPhone, { silent: true });
        onShowNotification(`Order ${data.orderId} updated`, 'info');
      }
    };

    orderEvents.forEach((event) => socket.on(event, handleOrderEvent));

    return () => {
      orderEvents.forEach((event) => socket.off(event, handleOrderEvent));
    };
  }, [socket, customerPhone, onShowNotification]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!customerPhone.trim()) {
      onShowNotification('Please enter your phone number', 'error');
      return;
    }
    if (!socket) {
      onShowNotification('Not connected to server', 'error');
      return;
    }
    loadOrders(customerPhone);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Pending',
      },
      confirmed: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Confirmed',
      },
      preparing: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'Preparing',
      },
      ready: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        label: 'Ready',
      },
      out_for_delivery: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'On the Way',
      },
      delivered: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        label: 'Delivered',
      },
      cancelled: {
        bg: 'bg-rose-100',
        text: 'text-rose-800',
        label: 'Cancelled',
      },
    };
    const badge = badges[status] || badges.pending;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
      >
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredOrders = useMemo(() => {
    if (filterStatus === 'all') return orders;

    return orders.filter((order) => {
      if (filterStatus === 'active') {
        return ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(
          order.status
        );
      }
      if (filterStatus === 'completed') {
        return order.status === 'delivered';
      }
      if (filterStatus === 'cancelled') {
        return order.status === 'cancelled';
      }
      return true;
    });
  }, [orders, filterStatus]);

  const counts = useMemo(
    () => ({
      all: orders.length,
      active: orders.filter((o) =>
        ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(
          o.status
        )
      ).length,
      completed: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    }),
    [orders]
  );

  // ---------- PHONE INPUT VIEW ----------
  if (showPhoneInput) {
    return (
      <section className="bg-[#FFF8EC]">
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-3xl bg-white shadow-xl border border-orange-100 p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                View your orders
              </h2>
              <p className="text-sm text-slate-600">
                Enter the phone number you used while ordering.
              </p>
            </div>

            {connectionError && (
              <p className="mb-3 text-xs text-rose-500 text-center">
                {connectionError}
              </p>
            )}

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading…' : 'View my orders'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full rounded-full bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                ← Back to menu
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // ---------- LOADING ----------
  if (loading) {
    return (
      <section className="bg-[#FFF8EC]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-600">
            Loading your orders…
          </p>
        </div>
      </section>
    );
  }

  // ---------- MAIN LIST ----------
  return (
    <section className="bg-[#FFF8EC]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-semibold text-orange-700">
              <span>🐝</span>
              <span>Orders for {customerPhone}</span>
            </div>
            <h1 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
              Your order history
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsRefreshing(true);
                loadOrders(customerPhone, { silent: true });
              }}
              className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-orange-50"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('customerPhone');
                setShowPhoneInput(true);
                setOrders([]);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Change phone
            </button>
          </div>
        </div>

        {/* filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All orders', count: counts.all },
            { key: 'active', label: 'Active', count: counts.active },
            { key: 'completed', label: 'Completed', count: counts.completed },
            { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                filterStatus === tab.key
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* list */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md border border-dashed border-slate-300">
            <div className="mb-3 text-5xl">📦</div>
            <h3 className="mb-1 text-lg font-bold text-slate-900">
              No orders found
            </h3>
            <p className="mb-5 text-sm text-slate-600">
              You haven&apos;t placed any orders with this number yet.
            </p>
            <button
              onClick={() => navigate('/')}
              className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 hover:shadow-lg"
            >
              Order now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const total = safeTotal(order);
              const firstItem = order.items?.[0];

              return (
                <div
                  key={order.orderId}
                  onClick={() => navigate(`/track/${order.orderId}`)}
                  className="cursor-pointer rounded-3xl bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {/* tiny image preview */}
                      {firstItem && (
                        <div className="h-12 w-12 overflow-hidden rounded-2xl bg-orange-50 flex items-center justify-center">
                          {firstItem.image?.startsWith('http') ? (
                            <img
                              src={firstItem.image}
                              alt={firstItem.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl">
                              {firstItem.image || '🍽️'}
                            </span>
                          )}
                        </div>
                      )}
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 md:text-base">
                            {order.orderId}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Placed {formatDate(order.createdAt)}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          {order.items
                            .map((item) => `${item.quantity}× ${item.name}`)
                            .slice(0, 2)
                            .join(' • ')}
                          {order.items && order.items.length > 2 && (
                            <span>
                              {' '}
                              + {order.items.length - 2} more
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">
                        ${total.toFixed(2)}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {order.items?.length || 0} items
                      </p>
                      {order.estimatedTime &&
                        !['delivered', 'cancelled'].includes(order.status) && (
                          <p className="mt-1 text-[11px] text-slate-600">
                            ETA: {order.estimatedTime} min
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-[11px] text-slate-500">
                      Tap to track this order in real time
                    </span>
                    <span className="text-xs font-semibold text-orange-600">
                      View details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderHistory;