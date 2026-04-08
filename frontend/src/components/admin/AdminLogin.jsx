import { useState } from 'react';
import ConnectionStatus from '../common/ConnectionStatus';

const AdminLogin = ({ socket, connected, onLoginSuccess, onShowNotification }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!socket) {
      onShowNotification('Not connected to server. Please wait...', 'error');
      return;
    }

    if (!connected) {
      onShowNotification('Socket disconnected. Try again in a moment.', 'error');
      return;
    }

    if (!password.trim()) {
      const msg = 'Please enter password';
      setInputError(msg);
      onShowNotification(msg, 'error');
      return;
    }

    setLoading(true);
    setInputError('');

    socket.emit('adminLogin', { password }, (response) => {
      setLoading(false);

      if (response.success) {
        onShowNotification('Login successful! Welcome Admin 👨‍💼', 'success');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminPass', password); // auto re‑login এর জন্য
        onLoginSuccess();
      } else {
        const msg = response.message || 'Invalid password';
        setInputError(msg);
        onShowNotification(msg, 'error');
        setPassword('');
      }
    });
  };

  const bgClass = connected
    ? 'from-emerald-50 via-sky-50 to-indigo-100'
    : 'from-slate-200 via-slate-300 to-slate-400';

  const cardBorder = connected ? 'border-emerald-200' : 'border-slate-200';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} flex items-center justify-center px-4`}>
      <ConnectionStatus connected={connected} isFixed={true} />

      <div className="max-w-md w-full">
        <div
          className={`relative overflow-hidden bg-white/95 rounded-3xl shadow-2xl border ${cardBorder} p-8`}
        >
          {/* subtle color strip */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-200/50 blur-2xl" />

          {/* Header */}
          <div className="relative text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-400 via-amber-400 to-yellow-400 text-3xl shadow-lg">
              👨‍💼
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Admin Login</h1>
            <p className="text-sm text-slate-600">Enter password to access dashboard</p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  connected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span className={connected ? 'text-emerald-700' : 'text-rose-600'}>
                {connected ? 'Connected to server' : 'Offline / reconnecting'}
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (inputError) setInputError('');
                }}
                className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition focus:ring-2 focus:ring-orange-400 focus:border-orange-400 ${
                  inputError ? 'border-rose-400' : 'border-slate-300'
                }`}
                placeholder="Enter admin password"
                autoFocus
              />
              {inputError && (
                <p className="mt-1 text-xs text-rose-500">{inputError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !connected}
              className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition transform ${
                connected
                  ? 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-[1px]'
                  : 'bg-slate-400 cursor-not-allowed'
              } text-white active:scale-95 disabled:opacity-60 disabled:shadow-none disabled:translate-y-0`}
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 rounded-2xl bg-orange-50 border border-orange-100 text-center text-xs text-slate-700">
            <p>
              💡 For testing: password is{' '}
              <code className="bg-white px-2 py-1 rounded font-mono text-[11px]">
                admin123
              </code>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-5 text-center">
            <a
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;