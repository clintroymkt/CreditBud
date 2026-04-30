import { Building2, Smartphone, FileText, CheckCircle2, AlertCircle, ArrowRight, Lock } from 'lucide-react';

export function DataSources() {
  return (
    <div className="space-y-6 pb-8">
      <div>
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Sources</h1>
         <p className="text-sm text-slate-500 mt-1">Connect banks and upload records to build your FinaScore.</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Bank Connection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-start gap-4 transition-shadow hover:shadow-md">
           <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
             <Building2 className="w-6 h-6" />
           </div>
           <div>
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                Bank Accounts
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
             </h3>
             <p className="text-[10px] uppercase font-bold text-slate-400 mt-2 line-clamp-2">Connected securely via Open Banking OAuth.</p>
           </div>
           <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-full mt-2">
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-700">Acme Bank Checking</span>
                 <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] uppercase tracking-wider">Synced</span>
              </div>
              <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Last sync: 2 hours ago</p>
           </div>
           <button className="text-xs font-bold uppercase tracking-wider text-primary-600 hover:text-primary-700 mt-auto flex items-center gap-1 group">
             Manage Connections
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Mobile Money SMS Parser (Simulated for Web) */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-500/30 flex flex-col items-start gap-4 transition-shadow hover:shadow-md relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Smartphone className="w-24 h-24" />
           </div>
           <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center relative z-10">
             <Smartphone className="w-6 h-6" />
           </div>
           <div className="relative z-10">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                Mobile Money
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
             </h3>
             <p className="text-[10px] uppercase font-bold text-slate-400 mt-2">Local device SMS parsing for MoMo, M-Pesa, etc.</p>
           </div>
           
           <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 w-full mt-2 relative z-10">
              <div className="flex items-center gap-2 text-emerald-800 mb-2">
                 <Lock className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-wider">Privacy Guaranteed</span>
              </div>
               <p className="text-[10px] font-medium text-emerald-700/80 leading-relaxed uppercase tracking-wider">
                  SMS are parsed locally. Only financial data is extracted.
               </p>
           </div>
           <button className="text-xs font-bold uppercase tracking-wider text-primary-600 hover:text-primary-700 mt-auto flex items-center gap-1 group relative z-10">
             Add Provider
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* PDF Statement Upload */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
           <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
             <FileText className="w-6 h-6" />
           </div>
           <div>
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Upload Statements</h3>
             <p className="text-[10px] uppercase font-bold text-slate-400 mt-2">Upload PDF statements securely.</p>
           </div>
           <div className="mt-auto w-full">
              <div className="w-full py-4 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 bg-white group-hover:border-primary-400 group-hover:bg-primary-50 transition-colors">
                 <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Drag & Drop PDF</span>
                 <span className="text-[10px] font-medium text-slate-400 uppercase">or click to browse</span>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
