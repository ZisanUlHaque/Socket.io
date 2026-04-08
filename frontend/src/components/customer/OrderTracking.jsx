import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";

const OrderTracking = ({ socket, onShowNotification }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveFeed, setLiveFeed] = useState([]);
  const [socketError, setSocketError] = useState(null);

  const pushFeed = (message) => {
    setLiveFeed((prev) =>
      [
        {
          id: Date.now() + Math.random(),
          message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev,
      ].slice(0, 5),
    );
  };

  const getStatusMessage = (status) => {
    const messages = {
      pending: "Waiting for restaurant confirmation…",
      confirmed: "Your order has been confirmed!",
      preparing: "Your food is being prepared",
      ready: "Your order is ready!",
      out_for_delivery: "Driver is on the way",
      delivered: "Delivered! Enjoy your meal!",
      cancelled: "Order was cancelled",
    };
    return messages[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-400",
      confirmed: "bg-sky-500",
      preparing: "bg-orange-500",
      ready: "bg-emerald-500",
      out_for_delivery: "bg-purple-500",
      delivered: "bg-emerald-600",
      cancelled: "bg-rose-500",
    };
    return colors[status] || "bg-slate-500";
  };

  const statusSteps = [
    { key: "pending", label: "Order Placed", icon: "📝" },
    { key: "confirmed", label: "Confirmed", icon: "✅" },
    { key: "preparing", label: "Preparing", icon: "🍳" },
    { key: "ready", label: "Ready", icon: "📦" },
    { key: "out_for_delivery", label: "On the way", icon: "🚗" },
    { key: "delivered", label: "Delivered", icon: "🎉" },
  ];

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex((step) => step.key === order.status);
  };

  const safeMoney = (value) =>
    typeof value === "number" && !Number.isNaN(value)
      ? value.toFixed(2)
      : "0.00";

  const totals = useMemo(() => {
    if (!order) {
      return { subtotal: 0, tax: 0, deliveryFee: 0, totalAmount: 0 };
    }
    const subtotal =
      typeof order.subtotal === "number"
        ? order.subtotal
        : (order.items || []).reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
            0,
          );
    const tax = typeof order.tax === "number" ? order.tax : subtotal * 0.1;
    const deliveryFee =
      typeof order.deliveryFee === "number" ? order.deliveryFee : 5;
    const totalAmount =
      typeof order.totalAmount === "number"
        ? order.totalAmount
        : subtotal + tax + deliveryFee;

    return { subtotal, tax, deliveryFee, totalAmount };
  }, [order]);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    if (!socket) {
      setLoading(false);
      setSocketError("Not connected to server. Please try again later.");
      return;
    }

    // Initial track
    socket.emit("trackOrder", { orderId }, (response) => {
      setLoading(false);
      if (response?.success && response.order) {
        setOrder(response.order);
        pushFeed(`Order loaded: ${getStatusMessage(response.order.status)}`);
      } else {
        onShowNotification(response?.message || "Order not found", "error");
        setTimeout(() => navigate("/"), 2000);
      }
    });

    const handleStatusUpdate = (data) => {
      if (data.orderId !== orderId) return;

      setOrder((prev) => {
        if (data.order) return data.order;
        if (!prev) return prev;
        return {
          ...prev,
          status: data.status || prev.status,
        };
      });

      const msg = getStatusMessage(data.status);
      onShowNotification(`Status updated: ${msg}`, "info");
      pushFeed(`Status updated: ${msg}`);
    };

    const handleOrderAccepted = (data) => {
      if (data.orderId !== orderId) return;

      onShowNotification(
        `Order confirmed! Ready in ${data.estimatedTime} minutes`,
        "success",
      );
      pushFeed(`Order confirmed — ready in ${data.estimatedTime} minutes`);

      socket.emit("trackOrder", { orderId }, (res) => {
        if (res?.success && res.order) setOrder(res.order);
      });
    };

    const handleOrderRejected = (data) => {
      if (data.orderId !== orderId) return;

      onShowNotification(`Order rejected: ${data.reason}`, "error");
      pushFeed(`Order rejected: ${data.reason}`);

      socket.emit("trackOrder", { orderId }, (res) => {
        if (res?.success && res.order) setOrder(res.order);
      });
    };

    const handleOrderCancelled = (data) => {
      if (data.orderId !== orderId) return;

      onShowNotification("Order has been cancelled", "warning");
      pushFeed("Order cancelled successfully");

      socket.emit("trackOrder", { orderId }, (res) => {
        if (res?.success && res.order) setOrder(res.order);
      });
    };

    const handleTimeUpdated = (data) => {
      if (data.orderId !== orderId) return;

      onShowNotification(
        `Updated: Ready in ${data.estimatedTime} minutes`,
        "info",
      );
      pushFeed(`Estimated time adjusted to ${data.estimatedTime} minutes`);

      socket.emit("trackOrder", { orderId }, (res) => {
        if (res?.success && res.order) setOrder(res.order);
      });
    };

    socket.on("statusUpdated", handleStatusUpdate);
    socket.on("orderAccepted", handleOrderAccepted);
    socket.on("orderRejected", handleOrderRejected);
    socket.on("orderCancelled", handleOrderCancelled);
    socket.on("estimatedTimeUpdated", handleTimeUpdated);

    return () => {
      if (!socket) return;
      socket.off("statusUpdated", handleStatusUpdate);
      socket.off("orderAccepted", handleOrderAccepted);
      socket.off("orderRejected", handleOrderRejected);
      socket.off("orderCancelled", handleOrderCancelled);
      socket.off("estimatedTimeUpdated", handleTimeUpdated);
    };
  }, [socket, orderId, navigate, onShowNotification]);

  const handleCancelOrder = () => {
    if (!socket) {
      onShowNotification("Not connected to server", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const reason =
      prompt("Reason for cancellation (optional):") || "No reason provided";

    socket.emit("cancelOrder", { orderId, reason }, (response) => {
      if (response?.success) {
        onShowNotification("Order cancelled successfully", "success");
      } else {
        onShowNotification(
          response?.message || "Failed to cancel order",
          "error",
        );
      }
    });
  };

  const copyOrderId = () => {
    if (!navigator.clipboard) {
      onShowNotification("Clipboard not available", "error");
      return;
    }
    navigator.clipboard
      .writeText(orderId)
      .then(() =>
        onShowNotification("Order ID copied to clipboard!", "success"),
      )
      .catch(() => onShowNotification("Failed to copy Order ID", "error"));
  };

  const currentStepIndex = getCurrentStepIndex();
  const canCancel = order && ["pending", "confirmed"].includes(order.status);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <section className="bg-[#FFF8EC]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-600">
            Loading order details…
          </p>
        </div>
      </section>
    );
  }

  if (socketError && !order) {
    return (
      <section className="bg-[#FFF8EC]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="mb-3 text-5xl">⚠️</div>
          <p className="mb-2 text-lg font-bold text-slate-900">
            Connection issue
          </p>
          <p className="mb-6 text-sm text-slate-600">{socketError}</p>
          <Link to={'/menu'}>
            <button
            
              className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 hover:shadow-lg"
            >
              Back to menu
            </button>
          </Link>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="bg-[#FFF8EC]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="mb-3 text-5xl">❌</div>
          <p className="mb-2 text-lg font-bold text-slate-900">
            Order not found
          </p>
          <p className="mb-6 text-sm text-slate-600">
            We couldn&apos;t find an order with this ID.
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 hover:shadow-lg"
          >
            Back to menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF8EC]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-md">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-semibold text-orange-700">
                <span>🐝</span>
                <span>Order tracking</span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
                Track your order
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span>Order ID:</span>
                <code className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px]">
                  {orderId}
                </code>
                <button
                  onClick={copyOrderId}
                  className="text-orange-600 hover:text-orange-700"
                  title="Copy"
                >
                  📋
                </button>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              ← Back to menu
            </button>
          </div>

          {/* Current status + live feed */}
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div
              className={`rounded-3xl ${getStatusColor(
                order.status,
              )} text-white p-5 shadow-lg`}
            >
              <p className="text-xl font-bold md:text-2xl">
                {getStatusMessage(order.status)}
              </p>
              {order.estimatedTime &&
                !["delivered", "cancelled"].includes(order.status) && (
                  <p className="mt-2 text-sm">
                    Estimated time:{" "}
                    <span className="font-semibold">
                      {order.estimatedTime} minutes
                    </span>
                  </p>
                )}
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-1.5 text-[11px] font-medium">
                <span>{order.items?.length || 0} items</span>
                <span>•</span>
                <span>{order.statusHistory?.length || 0} status updates</span>
              </p>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Live feed
                  </p>
                  <p className="text-xs text-slate-600">
                    Recent status changes
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                  Live
                </span>
              </div>
              <div className="max-h-52 space-y-3 overflow-y-auto pr-1 text-sm">
                {liveFeed.length === 0 ? (
                  <p className="text-xs text-slate-500">Waiting for updates…</p>
                ) : (
                  liveFeed.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white p-3 shadow-sm border border-slate-100"
                    >
                      <p className="text-xs font-medium text-slate-800">
                        {item.message}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {item.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* Progress bar */}
        {order.status !== "cancelled" && (
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-600">
              Order progress
            </h2>
            <div className="relative">
              {/* line */}
              <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${Math.max(
                      0,
                      (currentStepIndex / Math.max(statusSteps.length - 1, 1)) *
                        100,
                    )}%`,
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => (
                  <div
                    key={step.key}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-all ${
                        index <= currentStepIndex
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="mt-1 text-[11px] text-slate-600 max-w-[70px]">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Order items + totals */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-base font-bold text-slate-900">
            Order details
          </h2>
          <div className="mb-4 space-y-3 text-sm">
            {order.items?.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center justify-between border-b border-slate-100 pb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-xl bg-orange-50 flex items-center justify-center">
                    {item.image?.startsWith("http") ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">{item.image || "🍽️"}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.quantity}× {item.name}
                    </p>
                    {item.specialInstructions && (
                      <p className="text-[11px] text-slate-500">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  ${safeMoney((item.price || 0) * (item.quantity || 0))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 space-y-2 border-t border-slate-200 pt-3 text-sm text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${safeMoney(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${safeMoney(totals.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>${safeMoney(totals.deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
              <span>Total</span>
              <span className="text-orange-600">
                ${safeMoney(totals.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery info + cancel */}
        <div className="mb-4 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-base font-bold text-slate-900">
            Delivery information
          </h2>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Customer name</p>
              <p className="font-medium text-slate-900">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Phone</p>
              <p className="font-medium text-slate-900">
                {order.customerPhone}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-slate-500">Address</p>
              <p className="font-medium text-slate-900">
                {order.customerAddress}
              </p>
            </div>
            {order.specialNotes && (
              <div className="md:col-span-2">
                <p className="text-xs text-slate-500">Special notes</p>
                <p className="font-medium text-slate-900">
                  {order.specialNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {canCancel && (
          <div className="text-center">
            <button
              onClick={handleCancelOrder}
              className="rounded-full bg-rose-500 px-7 py-3 text-sm font-semibold text-white shadow-md hover:bg-rose-600 hover:shadow-lg"
            >
              Cancel order
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderTracking;
