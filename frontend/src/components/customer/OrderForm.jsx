import { useState } from 'react';
import { useNavigate } from 'react-router';

const OrderForm = ({ cart, socket, onShowNotification, onClearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    specialNotes: '',
    paymentMethod: 'cash',
  });
  const [errors, setErrors] = useState({});

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1;
    const deliveryFee = 5.0;
    const total = subtotal + tax + deliveryFee;
    return { subtotal, tax, deliveryFee, total };
  };

  const totals = calculateTotals();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (formData.customerPhone.length < 10) {
      newErrors.customerPhone = 'Enter a valid phone number';
    }

    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Delivery address is required';
    } else if (formData.customerAddress.length < 10) {
      newErrors.customerAddress = 'Please enter a complete address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      onShowNotification('Please fill all required fields correctly', 'error');
      return;
    }

    if (cart.length === 0) {
      onShowNotification('Your cart is empty', 'error');
      return;
    }

    if (!socket) {
      onShowNotification('Not connected to server', 'error');
      return;
    }

    setLoading(true);

    const orderData = {
      ...formData,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      subtotal: totals.subtotal,
      tax: totals.tax,
      deliveryFee: totals.deliveryFee,
      totalAmount: totals.total,
    };

    socket.emit('placeOrder', orderData, (response) => {
      setLoading(false);

      if (response?.success) {
        onShowNotification('Order placed successfully! 🎉', 'success');

        // ✅ Order সফল হলে cart clear হবে (confirm ছাড়া)
        if (onClearCart) {
          onClearCart(true);
        }

        // Track page এ পাঠাই
        setTimeout(() => {
          navigate(`/track/${response.order.orderId}`);
        }, 800);
      } else {
        onShowNotification(
          response?.message || 'Failed to place order',
          'error'
        );
      }
    });
  };

  if (cart.length === 0) {
    return (
      <section className="bg-[#FFF8EC]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="mb-4 text-6xl">🐝</div>
          <h2 className="mb-2 text-3xl font-black text-slate-900">
            Your BeeBite cart is empty
          </h2>
          <p className="mb-8 text-sm text-slate-600 md:text-base">
            Add some sweet dishes before you check out.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-[1px]"
          >
            🍽️ Browse menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF8EC] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-8 text-3xl font-black text-slate-900 md:text-4xl">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT: form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl bg-white/95 p-6 shadow-md md:p-7"
            >
              {/* Customer info */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Customer information
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Full name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400 ${
                        errors.customerName
                          ? 'border-rose-400'
                          : 'border-slate-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-xs text-rose-500">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400 ${
                        errors.customerPhone
                          ? 'border-rose-400'
                          : 'border-slate-300'
                      }`}
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.customerPhone && (
                      <p className="mt-1 text-xs text-rose-500">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Delivery address *
                    </label>
                    <textarea
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400 ${
                        errors.customerAddress
                          ? 'border-rose-400'
                          : 'border-slate-300'
                      }`}
                      placeholder="House, Road, Area, City"
                    />
                    {errors.customerAddress && (
                      <p className="mt-1 text-xs text-rose-500">
                        {errors.customerAddress}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Special instructions (optional)
                    </label>
                    <textarea
                      name="specialNotes"
                      value={formData.specialNotes}
                      onChange={handleChange}
                      rows="2"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
                      placeholder="No onion, extra spicy, ring twice, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Payment method
                </h2>
                <div className="space-y-3">
                  {['cash', 'card', 'online'].map((method) => (
                    <label
                      key={method}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-3 text-sm transition ${
                        formData.paymentMethod === method
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500"
                      />
                      <span className="font-semibold capitalize">
                        {method} on delivery
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
              >
                {loading ? 'Placing order…' : 'Place order'}
              </button>
            </form>
          </div>

          {/* RIGHT: summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-white/95 p-6 shadow-md">
              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Order summary
              </h2>

              <div className="mb-4 max-h-60 space-y-2 overflow-y-auto text-sm">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-slate-700"
                  >
                    <span>
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span>${totals.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-orange-600">
                    ${totals.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                By placing this order you agree to our terms. Average delivery
                time is 20–30 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;