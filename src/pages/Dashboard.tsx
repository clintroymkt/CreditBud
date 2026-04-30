import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { ShieldAlert, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Smartphone, Building2 } from 'lucide-react';
import { MONTHLY_DATA, WEEKLY_DATA, CATEGORY_SPENDING, MOCK_TRANSACTIONS } from '../data/mockData';

interface DashboardProps {
  onNavigate?: (tab: 'dashboard' | 'transactions' | 'finascore' | 'sources') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const latestTransactions = MOCK_TRANSACTIONS.slice(0, 5);
  const [chartView, setChartView] = useState<'week' | 'month'>('week');

  const chartData = chartView === 'week' ? WEEKLY_DATA : MONTHLY_DATA;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Your financial pulse at a glance</p>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="flex flex-col gap-4">
        {/* FinaScore Card */}
        <div 
          onClick={() => onNavigate?.('finascore')}
          className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between cursor-pointer hover:border-primary-300 transition-colors"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">FinaScore Pulse</span>
            <ShieldAlert className="w-5 h-5 text-primary-600" />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-5xl font-black text-slate-800">712</span>
            <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm font-semibold uppercase">
              <TrendingUp className="w-4 h-4" />
              <span>Great</span>
            </div>
          </div>
        </div>

        {/* Balance/Cash Flow Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Net Cash Flow (Nov)</span>
            <Wallet className="w-5 h-5 text-primary-600" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-800 tracking-tight">$1,800.00</span>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-primary-600 text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                <span>$5,100 In</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-sm font-semibold">
                <ArrowDownRight className="w-4 h-4" />
                <span>$3,300 Out</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sources */}
        <div 
          onClick={() => onNavigate?.('sources')}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between cursor-pointer hover:border-primary-300 transition-colors"
        >
           <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Active Sources</span>
          </div>
          <div className="mt-4 space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary-50 text-primary-600 flex items-center justify-center">
                     <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Acme Bank</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">Synced</span>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary-50 text-primary-600 flex items-center justify-center">
                     <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">MTN MoMo SMS</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">Active</span>
             </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="flex flex-col gap-6">
        {/* Cash Flow Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Income vs Spending</h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setChartView('week')}
                className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider transition-colors ${chartView === 'week' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setChartView('month')}
                className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider transition-colors ${chartView === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={32} />
                <Bar dataKey="spending" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Recent Transactions</h3>
             <button 
               onClick={() => onNavigate?.('transactions')}
               className="text-xs font-bold text-primary-600 uppercase tracking-wider hover:underline"
             >
               View All
             </button>
           </div>
           <div className="space-y-4">
             {latestTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded shrink-0 bg-slate-100 flex items-center justify-center">
                      {tx.type === 'credit' ? <ArrowDownRight className="w-4 h-4 text-emerald-600" /> : <ArrowUpRight className="w-4 h-4 text-slate-500" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{tx.description}</p>
                      <p className="text-[10px] text-slate-400">{tx.category} • {tx.source === 'bank' ? 'Bank' : 'MoMo SMS'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                    </p>
                    <p className="text-[10px] text-slate-400">{new Date(tx.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</p>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
