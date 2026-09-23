import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth.jsx';
import { toast } from 'sonner';
import { Loader2, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';

const M3 = {
  surface: "#1C1B1F",
  surfaceContainerHigh: "#2B2930",
  surfaceContainerHighest: "#36343B",
  primary: "#D0BCFF",
  onSurface: "#E6E1E5",
  onSurfaceVariant: "#CAC4D0",
  outline: "#49454F",
  error: "#F2B8B5",
};

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase injects the recovery session from the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword(password);
      toast.success('Password updated! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error(error.message || 'Failed to update password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-sans" style={{ background: M3.surface }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: M3.primary }} />
        <p className="text-sm" style={{ color: M3.onSurfaceVariant }}>Verifying reset link…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans" style={{ background: M3.surface }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] p-10 shadow-2xl"
        style={{
          background: M3.surfaceContainerHigh,
          borderRadius: '24px',
          border: `1px solid ${M3.outline}`,
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full mb-6"
          style={{ background: M3.surfaceContainerHighest }}
        >
          <KeyRound size={22} style={{ color: M3.primary }} />
        </div>

        <h1 className="text-[1.75rem] font-bold mb-1 tracking-tight" style={{ color: M3.onSurface }}>
          New Password
        </h1>
        <p className="text-sm mb-8" style={{ color: M3.onSurfaceVariant }}>
          Choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium block" style={{ color: M3.onSurfaceVariant }}>
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 rounded-xl transition-all text-sm"
              style={{
                background: M3.surfaceContainerHighest,
                border: `1px solid ${M3.outline}`,
                color: M3.onSurface,
                outline: 'none',
              }}
              placeholder="Min. 8 characters"
              onFocus={(e) => e.target.style.border = `1px solid ${M3.primary}`}
              onBlur={(e) => e.target.style.border = `1px solid ${M3.outline}`}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium block" style={{ color: M3.onSurfaceVariant }}>
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-3 rounded-xl transition-all text-sm"
              style={{
                background: M3.surfaceContainerHighest,
                border: `1px solid ${M3.outline}`,
                color: M3.onSurface,
                outline: 'none',
              }}
              placeholder="Repeat password"
              onFocus={(e) => e.target.style.border = `1px solid ${M3.primary}`}
              onBlur={(e) => e.target.style.border = `1px solid ${M3.outline}`}
              required
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-full text-sm font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ background: M3.primary, color: "#21005D" }}
              onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.opacity = '1')}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#21005D" }} />
              ) : (
                'Update password'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
