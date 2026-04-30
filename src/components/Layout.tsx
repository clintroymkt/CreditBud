import { ReactNode } from 'react';
import { Home, LineChart, List, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'dashboard' | 'transactions' | 'finascore' | 'sources';
  onTabChange: (tab: 'dashboard' | 'transactions' | 'finascore' | 'sources') => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const taps = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Activity', icon: List },
    { id: 'finascore', label: 'FinaScore', icon: LineChart },
    { id: 'sources', label: 'Sources', icon: FileText },
  ] as const;

  return (
    <div className="min-h-[100dvh] bg-slate-900 flex justify-center md:p-8">
      <div className="w-full max-w-md bg-slate-50 min-h-[100dvh] md:min-h-0 md:h-[844px] md:rounded-[3rem] md:shadow-2xl md:ring-[12px] md:ring-slate-800 overflow-hidden flex flex-col relative">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 border-[2px] border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">CreditBud</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="text-xs font-bold text-slate-500">CT</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 relative hide-scrollbar">
          <div className="p-5">
            {children}
          </div>
        </main>

        {/* Bottom Nav for Mobile */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between px-8 py-4 z-50">
          {taps.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 transition-colors",
                    isActive ? "text-primary-600" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Icon className={cn("w-6 h-6", isActive ? "fill-primary-50" : "")} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={cn("text-[10px] uppercase tracking-wider", isActive ? "font-bold" : "font-semibold")}>{tab.label}</span>
                </button>
              )
            })}
        </nav>
      </div>
    </div>
  );
}
