import { useState } from "react";

const getStatusTheme = (status) => {
  const map = {
    pending: {
      chipBg: "bg-amber-100",
      chipText: "text-amber-700",
      chipBorder: "border-amber-200",
      accentFrom: "from-amber-50",
      accentTo: "to-orange-50",
      iconBg: "bg-amber-100",
      iconText: "text-amber-700",
      label: "Pending",
    },
    confirmed: {
      chipBg: "bg-indigo-50",
      chipText: "text-indigo-700",
      chipBorder: "border-indigo-200",
      accentFrom: "from-indigo-50",
      accentTo: "to-sky-50",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-700",
      label: "Confirmed",
    },
    preparing: {
      chipBg: "bg-orange-50",
      chipText: "text-orange-700",
      chipBorder: "border-orange-200",
      accentFrom: "from-orange-50",
      accentTo: "to-amber-50",
      iconBg: "bg-orange-100",
      iconText: "text-orange-700",
      label: "Preparing",
    },
    ready: {
      chipBg: "bg-emerald-50",
      chipText: "text-emerald-700",
      chipBorder: "border-emerald-200",
      accentFrom: "from-emerald-50",
      accentTo: "to-emerald-100",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-700",
      label: "Ready",
    },
    out_for_delivery: {
      chipBg: "bg-violet-50",
      chipText: "text-violet-700",
      chipBorder: "border-violet-200",
      accentFrom: "from-violet-50",
      accentTo: "to-sky-50",
      iconBg: "bg-violet-100",
      iconText: "text-violet-700",
      label: "On the Way",
    },
    delivered: {
      chipBg: "bg-emerald-50",
      chipText: "text-emerald-700",
      chipBorder: "border-emerald-200",
      accentFrom: "from-emerald-50",
      accentTo: "to-emerald-100",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-700",
      label: "Delivered",
    },
    cancelled: {
      chipBg: "bg-rose-50",
      chipText: "text-rose-700",
      chipBorder: "border-rose-200",
      accentFrom: "from-rose-50",
      accentTo: "to-slate-50",
      iconBg: "bg-rose-100",
      iconText: "text-rose-700",
      label: "Cancelled",
    },
  };
  return map[status] || map.pending;
};

const safeMoney = (v) =>
  typeof v === "number" && !Number.isNaN(v) ? v.toFixed(2) : "0.00";

const OrderDetail = ({ order, onClose, socket, onShowNotification }) => {
  const [estimatedTime, setEstimatedTime] = useState(order.estimatedTime || 30);
  const theme = getStatusTheme(order.status);
  const items = order.items || [];
  const history = order.statusHistory || [];

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSetTime = () => {
    if (!socket) {
      onShowNotification("Not connected to server", "error");
      return;
    }

    const val = parseInt(estimatedTime, 10);
    if (Number.isNaN(val) || val < 5) {
      onShowNotification("Please enter at least 5 minutes", "error");
      return;
    }

    socket.emit(
      "setEstimatedTime",
      { orderId: order.orderId, estimatedTime: val },
      (response) => {
        if (response?.success) {
          onShowNotification(
            `Time updated to ${val} minutes`,
            "success"
          );
        } else {
          onShowNotification(
            response?.message || "Failed to update time",
            "error"
          );
        }
      }
    );
  };

  const getStatusBadge = (status) => {
    const badgeTheme = getStatusTheme(status);
    return (
      <span
        className={`px-4 py-1.5 rounded-full text-sm font-bold border ${badgeTheme.chipBg} ${badgeTheme.chipText} ${badgeTheme.chipBorder} shadow-sm`}
      >
        {badgeTheme.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Order Details
            </h2>
            <p className="mt-0.5 font-mono text-xs text-slate-500">
              {order.orderId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <div className="custom-scrollbar space-y-8 overflow-y-auto p-8">
          {/* Status & Time */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Order Status
              </p>
              {getStatusBadge(order.status)}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Order Time
              </p>
              <p className="flex items-center gap-2 text-lg font-bold text-slate-800">
                📅 {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Customer Information */}
          <div
            className={`rounded-2xl border border-indigo-100/60 bg-gradient-to-br ${theme.accentFrom} ${theme.accentTo} p-6`}
          >
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.iconBg} ${theme.iconText} text-sm`}
              >
                👤
              </span>
              Customer Details
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Name
                </p>
                <p className="text-lg font-bold text-slate-700">
                  {order.customerName}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact
                </p>
                <p className="text-lg font-bold text-slate-700">
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    {order.customerPhone}
                  </a>
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Delivery Address
                </p>
                <p className="rounded-xl border border-white/60 bg-white/70 p-3 font-medium leading-relaxed text-slate-700">
                  {order.customerAddress}
                </p>
              </div>
              {order.specialNotes && (
                <div className="md:col-span-2">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Special Notes
                  </p>
                  <p className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm font-medium text-amber-800">
                    <span className="text-xl">📝</span>
                    {order.specialNotes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 text-sm">
                🛍️
              </span>
              Order Items
            </h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-5 transition-colors hover:bg-slate-50/70"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-2xl shadow-inner">
                        {item.image?.startsWith("http") ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          item.image || "🍔"
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="min-w-[24px] rounded-md bg-slate-800 px-2 py-0.5 text-center text-xs font-bold text-white">
                            {item.quantity}x
                          </span>
                          <span className="font-bold text-slate-800">
                            {item.name}
                          </span>
                        </div>
                        {item.specialInstructions && (
                          <p className="mt-1 ml-1 border-l-2 border-slate-200 pl-1 text-sm italic text-slate-500">
                            "{item.specialInstructions}"
                          </p>
                        )}
                        <p className="mt-1 ml-1 text-xs font-bold text-slate-400">
                          @ ${safeMoney(item.price)}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-slate-800">
                      ${safeMoney(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-slate-200 bg-slate-50/80 p-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ${safeMoney(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax (10%)</span>
                  <span className="font-medium">
                    ${safeMoney(order.tax)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">
                    ${safeMoney(order.deliveryFee)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-xl font-bold text-slate-800">
                  <span>Total Due</span>
                  <span className="text-indigo-600">
                    ${safeMoney(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl border border-emerald-100/60 bg-emerald-50/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 text-sm">
                💳
              </span>
              Payment Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Method
                </p>
                <p className="flex items-center gap-2 text-base font-bold text-slate-700 capitalize">
                  {order.paymentMethod === "card" ? "💳" : "💵"}{" "}
                  {order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>
                <p
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-bold capitalize ${
                    order.paymentStatus === "paid"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.paymentStatus === "paid" ? "✓ Paid" : "⏳ Pending"}
                </p>
              </div>
            </div>
          </div>

          {/* Estimated Time Control */}
          {!["delivered", "cancelled"].includes(order.status) && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-sm">
                  ⏱️
                </span>
                Delivery Estimate
              </h3>
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                  <button
                    onClick={() =>
                      setEstimatedTime((prev) => Math.max(5, prev - 5))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                  >
                    -
                  </button>
                  <div className="w-24 text-center">
                    <span className="text-2xl font-bold text-slate-800">
                      {estimatedTime}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      MINS
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setEstimatedTime((prev) => prev + 5)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleSetTime}
                  className="w-full flex-1 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-[1px] hover:bg-slate-800 active:scale-95"
                >
                  Update Estimate
                </button>
              </div>
            </div>
          )}

          {/* Status History */}
          {history.length > 0 && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-600 text-sm">
                  📜
                </span>
                History
              </h3>
              <div className="relative ml-3 space-y-8 border-l-2 border-slate-200 pb-2">
                {[...history].reverse().map((h, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-500 ring-1 ring-slate-200 border-4 border-white shadow-sm" />
                    <div>
                      <p className="text-base font-bold capitalize text-slate-800">
                        {h.status.replace("_", " ")}
                      </p>
                      <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                        {formatDate(h.timestamp)}
                      </p>
                      {h.note && (
                        <div className="mt-2 inline-block rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-sm">
                          {h.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 bg-slate-50/80 p-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;