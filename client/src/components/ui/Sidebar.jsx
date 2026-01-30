import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  BarChart3,
  Receipt,
  Menu,
  X,
  Wallet,
  Clock,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Family Members", path: "/family" },
  { icon: PlusCircle, label: "Add Expense", path: "/add-expense" },
  { icon: Receipt, label: "All Expenses", path: "/all-expenses" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Clock,label: "Spending History", path: "/spending-history" },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-card border border-border shadow-md"
      >
        <Menu className="w-6 h-6 text-foreground" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isMobileOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 lg:translate-x-0 lg:z-30"
        style={{ translateX: "var(--sidebar-x, 0)" }}
      >
        <div className="lg:translate-x-0" style={{ transform: "translateX(0)" }}>
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">FamBudget</h1>
                <p className="text-xs text-muted-foreground">Family Tracker</p>
              </div>
            </Link>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 p-2 lg:hidden"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"+
                    `${isActive? "bg-primary text-primary-foreground shadow-md hover:shadow-lg": "text-muted-foreground hover:text-foreground hover:bg-accent"}`
                    }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Desktop Sidebar (always visible) */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-30">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">FamBudget</h1>
              <p className="text-xs text-muted-foreground">Family Tracker</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"+
                  `${isActive
                    ? " bg-primary text-primary-foreground shadow-md hover:shadow-xl"
                    : " text-muted-foreground hover:text-foreground hover:bg-accent"}`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="bg-accent rounded-xl p-4">
            <p className="text-sm font-medium text-accent-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground mt-1">
              Upload invoices to auto-extract expenses!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
