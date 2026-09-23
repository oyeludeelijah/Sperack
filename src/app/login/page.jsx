import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth.jsx';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

// M3 Dark tokens
const M3 = {
  surface: "#1C1B1F",
  surfaceContainer: "#211F26",
  surfaceContainerHigh: "#2B2930",
  surfaceContainerHighest: "#36343B",
  primary: "#D0BCFF",
  primaryContainer: "#4F378B",
  onPrimaryContainer: "#EADDFF",
  onSurface: "#E6E1E5",
  onSurfaceVariant: "#CAC4D0",
  outline: "#49454F",
};

// Google "G" SVG icon
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.03 17.64 11.827 17.64 9.2Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { signIn, signUp, signInWithGoogle, sendPasswordResetEmail, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!email) { toast.error('Please enter your email.'); return; }
      setIsSubmitting(true);
      try {
        await sendPasswordResetEmail(email);
        toast.success('Password reset email sent! Check your inbox.');
        setMode('login');
      } catch (error) {
        toast.error(error.message || 'Failed to send reset email.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        toast.success('Welcome back!');
        navigate('/');
      } else {
        await signUp(email, password);
        toast.success('Account created! Welcome to Sperack.');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(error.message || 'Google sign in failed.');
      setIsGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: M3.surface }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: M3.primary }} />
      </div>
    );
  }

  const heading = mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Get Started' : 'Reset Password';
  const subheading = mode === 'forgot'
    ? 'Enter your email and we\'ll send a reset link.'
    : 'Welcome to Sperack — Let\'s get started';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-8 font-sans" style={{ background: M3.surface }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] md:max-w-[1000px] flex flex-col md:flex-row overflow-hidden shadow-2xl"
        style={{
          background: M3.surfaceContainerHigh,
          borderRadius: '24px',
          minHeight: '600px',
          border: `1px solid ${M3.outlineAlpha44}`
        }}
      >
        {/* Left Side - Dark Card with Glow (Hidden on Mobile) */}
        <div className="relative w-full md:w-1/2 overflow-hidden flex-col justify-between p-12 hidden md:flex" style={{ background: '#141316' }}>
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          <h1 className="text-[2.5rem] font-medium text-white leading-[1.1] z-10 tracking-tight">
            Take control<br />
            of your financial<br />
            future today.
          </h1>

          {/* Purple Gradient Beams at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 flex items-end justify-center z-0 overflow-hidden opacity-80">
             <div className="absolute bottom-[-10%] left-[10%] w-[20%] h-[80%] bg-gradient-to-t from-[#7C4DFF] to-transparent blur-[20px] mix-blend-screen" />
             <div className="absolute bottom-[-20%] left-[30%] w-[25%] h-[100%] bg-gradient-to-t from-[#651FFF] to-transparent blur-[30px] mix-blend-screen" />
             <div className="absolute bottom-[-5%] left-[50%] w-[15%] h-[70%] bg-gradient-to-t from-[#B388FF] to-transparent blur-[15px] mix-blend-screen" />
             <div className="absolute bottom-[-15%] right-[10%] w-[30%] h-[90%] bg-gradient-to-t from-[#4F378B] to-transparent blur-[40px] mix-blend-screen" />
             {/* Base glow */}
             <div className="absolute bottom-[-20%] left-0 w-full h-[60%] bg-[#7C4DFF] blur-[80px] opacity-40 mix-blend-screen" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-14 relative" style={{ background: M3.surfaceContainerHigh }}>
          <div className="w-full max-w-[360px] mx-auto">
            {/* Logo */}
            <div className="mb-6 flex items-center">
              <img
                src="/sperack-icon-dark.svg"
                alt="Sperack"
                style={{ width: 40, height: 40 }}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-[2rem] font-bold mb-1 tracking-tight" style={{ color: M3.onSurface }}>
                {heading}
              </h2>
              <p className="text-sm" style={{ color: M3.onSurfaceVariant }}>
                {subheading}
              </p>
            </div>

            {/* Google Sign In (not shown on forgot password view) */}
            {mode !== 'forgot' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-5"
                  style={{
                    background: M3.surfaceContainerHighest,
                    border: `1px solid ${M3.outline}`,
                    color: M3.onSurface,
                  }}
                  onMouseEnter={(e) => !isGoogleLoading && (e.currentTarget.style.borderColor = M3.primary)}
                  onMouseLeave={(e) => !isGoogleLoading && (e.currentTarget.style.borderColor = M3.outline)}
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <GoogleIcon />
                  )}
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: M3.outline }} />
                  <span className="text-[12px]" style={{ color: M3.onSurfaceVariant }}>or</span>
                  <div className="flex-1 h-px" style={{ background: M3.outline }} />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium block" style={{ color: M3.onSurfaceVariant }}>
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl transition-all text-sm"
                  style={{
                    background: M3.surfaceContainerHighest,
                    border: `1px solid ${M3.outline}`,
                    color: M3.onSurface,
                    outline: 'none',
                  }}
                  placeholder="hi@sperack.com"
                  onFocus={(e) => e.target.style.border = `1px solid ${M3.primary}`}
                  onBlur={(e) => e.target.style.border = `1px solid ${M3.outline}`}
                  required
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium block" style={{ color: M3.onSurfaceVariant }}>
                      {mode === 'login' ? 'Password' : 'Create new password'}
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[12px] transition-colors"
                        style={{ color: M3.primary }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
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
                    placeholder="**********"
                    onFocus={(e) => e.target.style.border = `1px solid ${M3.primary}`}
                    onBlur={(e) => e.target.style.border = `1px solid ${M3.outline}`}
                    required
                  />
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3.5 px-4 rounded-full text-sm font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: M3.primary,
                    color: "#21005D",
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.opacity = '1')}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#21005D" }} />
                  ) : (
                    mode === 'login' ? 'Login to account' :
                    mode === 'signup' ? 'Create new account' :
                    'Send reset link'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center space-y-3">
              {mode === 'forgot' ? (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[13px] transition-colors"
                  style={{ color: M3.onSurfaceVariant }}
                >
                  Back to{' '}
                  <span className="font-semibold underline underline-offset-2" style={{ color: M3.primary }}>
                    Login
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-[13px] transition-colors"
                  style={{ color: M3.onSurfaceVariant }}
                >
                  {mode === 'login' ? "Don't have an account? " : "Already have account? "}
                  <span className="font-semibold underline underline-offset-2" style={{ color: M3.primary }}>
                    {mode === 'login' ? 'Sign up' : 'Login'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
