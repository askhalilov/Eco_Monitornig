import { Outlet, Link, useLocation } from 'react-router';
import { Activity, Gauge, Settings, FileText, AlertTriangle, Menu, X, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Root() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: '/', label: 'Панель мониторинга', icon: Activity },
    { path: '/sensors', label: 'Датчики', icon: Gauge },
    { path: '/equipment', label: 'Оборудование', icon: Settings },
    { path: '/reports', label: 'Отчеты', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-40 shadow-md">
        <div className="px-4 md:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-bold text-emerald-800 text-lg md:text-xl nature-gradient-text">
                  ЭкоМониторинг
                </h1>
                <p className="text-xs md:text-sm text-emerald-600 hidden sm:block mt-1">
                  Контроль качества окружающей среды
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              {/* Time - hidden on small mobile */}
              <div className="text-right hidden md:block">
                <p className="text-xs text-emerald-600 mb-1">Текущее время</p>
                <p className="font-mono text-emerald-800 font-semibold text-base">
                  {time.toLocaleTimeString('ru-RU')}
                </p>
              </div>

              {/* Alerts */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
                <AlertTriangle className="text-amber-600" size={18} />
                <span className="text-sm text-amber-900 font-medium">2</span>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 hover:bg-emerald-100 rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="text-emerald-700" size={24} />
                ) : (
                  <Menu className="text-emerald-700" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 glass-effect min-h-[calc(100vh-97px)] border-r border-emerald-100 shadow-md">
          <nav className="p-6">
            <ul className="space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105'
                          : 'text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <Icon size={22} />
                      <span className="font-medium text-base">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`lg:hidden fixed top-[89px] md:top-[97px] left-0 bottom-0 w-80 glass-effect z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-6 h-full overflow-y-auto">
            {/* Time on mobile menu */}
            <div className="mb-6 p-5 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-xs text-emerald-600 mb-2">Текущее время</p>
              <p className="font-mono text-xl text-emerald-800 font-semibold">
                {time.toLocaleTimeString('ru-RU')}
              </p>
            </div>

            <ul className="space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                          : 'text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <Icon size={22} />
                      <span className="font-medium text-base">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Alert info in mobile menu */}
            <div className="mt-6 p-5 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="text-amber-600" size={20} />
                <span className="text-base font-medium text-amber-900">Предупреждения</span>
              </div>
              <p className="text-sm text-amber-700">2 активных уведомления</p>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="animate-fade-in max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}