import React from "react";
import { LayoutDashboard, History, Target, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth.jsx";
import { useLocation, Link } from "react-router";
import { m, AnimatePresence } from "motion/react";
import { M3 } from "@/lib/theme";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "History", path: "/history", icon: History },
  { name: "Budgets", path: "/budgets", icon: Target },
];

export default function Navigation() {
  const { signOut } = useAuth();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const activeIndex = navItems.findIndex((item) => item.path === location.pathname);

  return (
    <>
      {/* Mobile Top Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="md:hidden fixed top-4 right-4 z-[60] flex items-center justify-center rounded-full transition-all duration-200 shadow-md"
        style={{
          width: 40,
          height: 40,
          background: M3.surfaceContainerHigh,
          color: M3.onSurfaceVariant,
          border: `1px solid ${M3.outlineVariant}`,
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = M3.primaryAlpha14)}
        onMouseLeave={(e) => (e.currentTarget.style.background = M3.surfaceContainerHigh)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={isDark ? "sun-m" : "moon-m"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ display: "flex" }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </m.span>
        </AnimatePresence>
      </button>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:right-auto md:w-64 md:h-screen flex flex-row md:flex-col justify-between md:justify-start items-center md:items-stretch px-2 py-2 md:p-4 gap-1 md:gap-2"
        style={{
          background: M3.surfaceContainer,
          borderRight: `1px solid ${M3.outlineAlpha22}`,
          borderTop: `1px solid ${M3.outlineAlpha22}`,
        }}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center px-3 py-1 mb-0 md:mb-3">
          <img
            src={isDark ? "/sperack-logo-dark.svg" : "/sperack-logo-light.svg"}
            alt="Sperack"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Nav items */}
        <div className="relative flex flex-row md:flex-col gap-1 w-full md:w-auto flex-1 justify-around md:justify-start">
          {/* Active sliding pill + dot indicator (pure CSS transform transition, no forced reflow) */}
          <div
            className="nav-sliding-indicator rounded-xl md:rounded-full"
            style={{
              "--nav-idx": activeIndex,
              background: M3.primaryContainer,
              opacity: activeIndex >= 0 ? 1 : 0,
            }}
          >
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full hidden md:block"
              style={{ background: M3.primary }}
            />
          </div>

          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <m.div
                key={item.path}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.25, ease: "easeOut" }}
                className="relative flex-1 md:flex-none"
              >
                <Link
                  to={item.path}
                  className="relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 py-2 md:px-4 md:py-3 md:h-11 rounded-xl md:rounded-full transition-colors duration-200 group w-full"
                  style={{
                    color: isActive ? M3.onPrimaryContainer : M3.onSurfaceVariant,
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = M3.primaryAlpha14;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <item.icon size={24} className="md:w-5 md:h-5" />
                  <span className="text-[10px] md:text-sm font-medium">{item.name}</span>
                </Link>
              </m.div>
            );
          })}

          {/* Sign out mobile inline */}
          <button
            onClick={signOut}
            className="md:hidden relative flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl transition-all duration-200 flex-1 z-10"
            style={{ color: M3.error }}
          >
            <LogOut size={24} />
            <span className="text-[10px] font-medium">Log out</span>
          </button>
        </div>

        {/* Desktop bottom actions */}
        <div className="mt-auto hidden md:flex flex-col gap-1">

          {/* ── Theme Toggle ───────────────────────────────────────────── */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 w-full justify-start"
            style={{ color: M3.onSurfaceVariant, background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = M3.primaryAlpha14)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {/* Animated icon */}
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{ display: "flex" }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </m.span>
            </AnimatePresence>

            {/* Label */}
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={isDark ? "light-label" : "dark-label"}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.16 }}
                className="text-sm font-medium"
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </m.span>
            </AnimatePresence>

            {/* ── Neumorphic glow toggle ─────────────────────────────── */}
            <div
              className="ml-auto flex-shrink-0"
              style={{
                position: "relative",
                width: 64,
                height: 28,
                borderRadius: 999,
                background: "#16181f",
                /* inset neumorphic depression */
                boxShadow: "inset 2px 2px 5px #0a0b0e, inset -1px -1px 3px #22262f",
                transition: "box-shadow 0.35s ease",
              }}
            >
              {/* ON label in glow zone */}
              <AnimatePresence initial={false}>
                {!isDark && (
                  <m.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      right: 9,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      color: "#00BFFF",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    ON
                  </m.span>
                )}
              </AnimatePresence>

              {/* Thumb */}
              <m.div
                animate={{ x: isDark ? 2 : 34 }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                style={{
                  position: "absolute",
                  top: 3,
                  width: 28,
                  height: 22,
                  borderRadius: 999,
                  background: "linear-gradient(145deg, #32363f, #22252d)",
                  boxShadow: "2px 2px 5px #0d0e12, -1px -1px 3px #3a3e4a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Dot-grid texture */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  {[0, 4, 8, 12].map(cx =>
                    [2, 6, 10].map(cy => (
                      <circle key={`${cx}-${cy}`} cx={cx + 2} cy={cy} r={0.9}
                        fill="#4a4e5a" />
                    ))
                  )}
                </svg>
              </m.div>
            </div>
          </button>


          {/* Sign out */}
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 w-full justify-start"
            style={{ color: M3.error }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#B3261E22")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </nav>
    </>
  );
}
