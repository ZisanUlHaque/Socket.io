import { useNavigate } from 'react-router';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const deliveryFee = cart.length ? 5 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      onRemoveItem(item.id);
    } else {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
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
            Start by adding a few sweet dishes to your order. Your favourites
            will show up here.
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
    <section className="bg-[#FFF8EC]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              <span>🐝</span>
              <span>{cart.length} item{cart.length > 1 ? 's' : ''} in cart</span>
            </div>
            <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              Your BeeBite cart
            </h1>
          </div>
          <button
            onClick={onClearCart}
            className="text-sm font-semibold text-rose-500 hover:text-rose-600"
          >
            Clear cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Cart items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Image */}
                  <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl bg-amber-50 sm:h-24 sm:w-28">
                    {item.image?.startsWith('http') ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">{item.image || '🍽️'}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 md:text-lg">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="mt-1 text-xs text-slate-600 md:text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-lg font-bold text-slate-400 hover:text-rose-500"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>

                    {/* Price per item */}
                    <p className="text-sm font-semibold text-orange-600">
                      ${item.price.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        each
                      </span>
                    </p>

                    {/* Quantity + line total */}
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-slate-700 hover:bg-slate-200"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-slate-700 hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right text-sm font-bold text-slate-900 md:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white/95 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Order summary
                </h2>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                  Secure checkout
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span className="font-semibold">
                    {deliveryFee ? `$${deliveryFee.toFixed(2)}` : 'Free'}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 text-base font-bold text-slate-900 flex justify-between">
                  <span>Total</span>
                  <span className="text-orange-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full rounded-full bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-[1px]"
              >
                Proceed to checkout
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="mt-3 w-full rounded-full bg-slate-100 py-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
              >
                Continue shopping
              </button>

              <p className="mt-3 text-[11px] text-slate-500">
                Prices include all taxes. Delivery time is usually 20–30
                minutes from now.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;