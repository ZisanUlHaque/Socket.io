const OrderCard = ({ order, onViewDetails, onAccept, onReject, onUpdateStatus }) => {
  const items = order.items || [];

  const safeTotal = () => {
    if (typeof order.totalAmount === 'number') return order.totalAmount;
    if (typeof order.total === 'number') return order.total;
    return items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  const getStatusMeta = (status) => {
    const map = {
      pending: {
        border: 'border-l-amber-400',
        bg: 'bg-amber-50/70',
        pillBg: 'bg-amber-100',
        pillText: 'text-amber-800',
        label: 'Pending',
      },
      confirmed: {
        border: 'border-l-sky-500',
        bg: 'bg-sky-50/70',
        pillBg: 'bg-sky-100',
        pillText: 'text-sky-800',
        label: 'Confirmed',
      },
      preparing: {
        border: 'border-l-orange-500',
        bg: 'bg-orange-50/70',
        pillBg: 'bg-orange-100',
        pillText: 'text-orange-800',
        label: 'Preparing',
      },
      ready: {
        border: 'border-l-emerald-500',
        bg: 'bg-emerald-50/70',
        pillBg: 'bg-emerald-100',
        pillText: 'text-emerald-800',
        label: 'Ready',
      },
      out_for_delivery: {
        border: 'border-l-violet-500',
        bg: 'bg-violet-50/70',
        pillBg: 'bg-violet-100',
        pillText: 'text-violet-800',
        label: 'On the way',
      },
      delivered: {
        border: 'border-l-emerald-600',
        bg: 'bg-emerald-50/90',
        pillBg: 'bg-emerald-100',
        pillText: 'text-emerald-800',
        label: 'Delivered',
      },
      cancelled: {
        border: 'border-l-rose-500',
        bg: 'bg-rose-50/80',
        pillBg: 'bg-rose-100',
        pillText: 'text-rose-800',
        label: 'Cancelled',
      },
    };
    return map[status] || {
      border: 'border-l-slate-400',
      bg: 'bg-slate-50/80',
      pillBg: 'bg-slate-100',
      pillText: 'text-slate-700',
      label: status?.replace('_', ' ') || 'Unknown',
    };
  };

  const meta = getStatusMeta(order.status);

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffMs = now - orderTime;
    if (Number.isNaN(diffMs)) return 'Unknown';
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 h ago';
    if (diffHours < 24) return `${diffHours} h ago`;

    return new Date(dateString).toLocaleDateString();
  };

  const getNextStatuses = (currentStatus) => {
    const transitions = {
      confirmed: ['preparing'],
      preparing: ['ready'],
      ready: ['out_for_delivery'],
      out_for_delivery: ['delivered'],
    };
    return transitions[currentStatus] || [];
  };

  const nextStatuses = getNextStatuses(order.status);
  const total = safeTotal();

  return (
    <div
      className={`glass-card group relative flex h-full flex-col border-l-[6px] ${meta.border} ${meta.bg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      {/* subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="relative mb-5 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-800">
              #{order.orderId?.slice(-6) || '------'}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] ${meta.pillBg} ${meta.pillText}`}
            >
              {meta.label}
            </span>
          </div>
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            ⏱ {getTimeAgo(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-extrabold text-transparent">
            ${total.toFixed(2)}
          </p>
          <p className="text-xs font-medium text-slate-400">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="relative mb-5 space-y-2 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-2">
          <span className="min-w-[1.25rem] text-center text-slate-400">👤</span>
          <div>
            <p className="text-sm font-semibold leading-tight text-slate-700">
              {order.customerName}
            </p>
            <p className="text-xs text-slate-500">{order.customerPhone}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="min-w-[1.25rem] text-center text-slate-400">📍</span>
          <p className="line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
            {order.customerAddress}
          </p>
        </div>
      </div>

      {/* Items Preview */}
      <div className="mb-6 flex-1">
        <div className="space-y-2">
          {items.slice(0, 2).map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-white/60 px-2 py-1.5 text-sm"
            >
              <span className="font-medium text-slate-700">
                <span className="mr-2 font-bold text-indigo-600">
                  {item.quantity}x
                </span>
                {item.name}
              </span>
              <span className="text-xs font-mono text-slate-500">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          {items.length > 2 && (
            <p className="mt-2 rounded-md bg-slate-50 py-1 text-center text-xs font-bold text-slate-400">
              + {items.length - 2} more items
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="relative mt-auto space-y-3">
        {/* Pending Order Actions */}
        {order.status === 'pending' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onAccept(order)}
              className="rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 active:scale-95"
            >
              ✓ Accept
            </button>
            <button
              onClick={() => onReject(order)}
              className="rounded-xl border border-rose-100 bg-white py-2.5 text-sm font-bold text-rose-500 transition-all hover:border-rose-200 hover:bg-rose-50 active:scale-95"
            >
              Reject
            </button>
          </div>
        )}

        {/* Status Update Dropdown */}
        {nextStatuses.length > 0 && (
          <div className="relative">
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                onUpdateStatus(order.orderId, e.target.value);
                e.target.value = '';
              }}
              className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
            >
              <option value="" disabled>
                Update status…
              </option>
              {nextStatuses.map((status) => (
                <option key={status} value={status}>
                  Make{' '}
                  {status
                    .replace('_', ' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-xs text-slate-500">
              ▼
            </div>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(order)}
          className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-slate-800 hover:-translate-y-[1px] active:scale-95"
        >
          View Details
        </button>
      </div>

      {/* Estimated Time Badge */}
      {order.estimatedTime &&
        !['delivered', 'cancelled'].includes(order.status) && (
          <div className="mt-4 flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-700 shadow-sm">
              ⏱️ {order.estimatedTime} min remaining
            </span>
          </div>
        )}
    </div>
  );
};

export default OrderCard;