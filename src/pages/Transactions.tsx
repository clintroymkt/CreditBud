import { useState } from 'react';
import { MOCK_TRANSACTIONS, Transaction } from '../data/mockData';
import { Filter, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Transactions() {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTx = MOCK_TRANSACTIONS.filter((tx) => {
    const matchesFilter = filter === 'all' || tx.type === filter;
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 lg:h-[calc(100vh-64px)] flex flex-col">
      <div>
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Activity</h1>
         <p className="text-sm text-slate-500 mt-1">Unified view of your banks, wallets, and cash.</p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="relative flex-1 w-full">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search transactions..." 
             className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex gap-2 w-full overflow-x-auto pb-2 hide-scrollbar">
           {['all', 'credit', 'debit'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-colors border ${
                 filter === f 
                   ? 'bg-slate-900 text-white border-slate-900' 
                   : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
               }`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredTx.length > 0 ? (
            <div className="divide-y divide-slate-100">
               {filteredTx.map(tx => (
                 <div key={tx.id} className="flex px-4 py-4 items-center justify-between hover:bg-slate-50/50 transition-colors">
                   <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-10 h-10 rounded shrink-0 flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {tx.type === 'credit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{tx.description}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                           <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{new Date(tx.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                           <span className="text-[10px] text-slate-300">•</span>
                           <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider truncate">{tx.category}</span>
                        </div>
                      </div>
                   </div>
                   <div className="text-right shrink-0 ml-4">
                      <span className={`text-sm font-bold whitespace-nowrap ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                      </span>
                   </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
               <Filter className="w-8 h-8 mb-4 opacity-20" />
               <p>No transactions found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
