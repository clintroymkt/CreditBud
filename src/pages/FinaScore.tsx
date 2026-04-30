import { useState, useRef } from 'react';
import { ShieldAlert, TrendingUp, ChevronRight, Activity, Smartphone, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FINASCORE_HISTORY } from '../data/mockData';
import { ReportTemplate } from '../components/ReportTemplate';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export function FinaScoreView() {
  const currentScore = 712;
  const maxScore = 850;
  const scorePercent = (currentScore / maxScore) * 100;
  
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);
    try {
      // Temporarily make the element visible for html2canvas to render reliably
      const element = reportRef.current;
      element.style.left = '0';
      element.style.top = '0';
      element.style.zIndex = '-9999';

      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        skipFonts: false,
        cacheBust: true,
      });

      element.style.left = '-9999px';
      element.style.top = '-9999px';

      // The standard A4 size used in the template is 794 x 1123
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 794, 1123);
      pdf.save('CreditBud_FinaScore_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">FinaScore</h1>
         <p className="text-sm text-slate-500 mt-1">Your unified financial identity and creditworthiness.</p>
      </div>

      {/* Main Score Hero */}
      <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm flex flex-col items-center text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">FinaScore Pulse</span>
        
        <div className="relative flex items-center justify-center mb-4">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="552.92" strokeDashoffset="140" className="text-primary-600" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-800">{currentScore}</span>
            <span className="text-sm font-semibold text-emerald-600 uppercase">Great</span>
          </div>
        </div>
        
        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
          Your score is in the top 15% of active mobile money users in your region.
        </p>

        <div className="mt-6 flex items-center justify-center w-full">
           <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100/50">
             <TrendingUp className="w-4 h-4 text-emerald-600" />
             <span className="text-sm font-bold text-emerald-700">Excellent trajectory. Up 17 points this month.</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
         {/* History Chart */}
         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
           <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-800">Score History</h3>
           <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={FINASCORE_HISTORY} margin={{top: 10, right: 0, left: -20, bottom: 0}}>
                 <defs>
                   <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                   </linearGradient>
                 </defs>
                 <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10}/>
                 <YAxis domain={['dataMin - 20', 'dataMax + 20']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}/>
                 <Tooltip 
                    cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: 'none' }}
                 />
                 <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
         </div>

         {/* Factors */}
         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
             <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-800">Score Core Factors</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                         Payment Discipline
                      </span>
                      <span className="text-emerald-600 font-semibold">Excellent</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[95%] rounded-full"></div>
                   </div>
                   <p className="text-xs text-slate-500">Utilities and transport via MoMo are always paid on time.</p>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                         Income Stability
                      </span>
                      <span className="text-emerald-600 font-semibold">Good</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[80%] rounded-full"></div>
                   </div>
                   <p className="text-xs text-slate-500">Regular salary detected, with side-hustle variability.</p>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 flex items-center gap-2">
                         <AlertCircle className="w-4 h-4 text-amber-500" />
                         Savings Rate
                      </span>
                      <span className="text-amber-600 font-semibold">Needs Work</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[45%] rounded-full"></div>
                   </div>
                   <p className="text-xs text-slate-500">Only 5% of monthly inflows are held for &gt;30 days.</p>
                </div>
             </div>
         </div>
      </div>

      {/* Share/Actions CTA */}
      <div className="bg-primary-600 rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm text-white border border-primary-700 relative overflow-hidden">
         <div className="relative z-10">
            <h4 className="text-lg font-bold">Need a Micro-Loan?</h4>
            <p className="text-sm text-primary-100 mt-1">Share your verifiable FinaScore directly with our partnered lenders for instant, collateral-free credit.</p>
         </div>
         <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className="w-full bg-white text-primary-600 px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative z-10"
         >
            {isGenerating ? (
              <>
                 <div className="w-5 h-5 border-2 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
                 GENERATING PDF...
              </>
            ) : (
              <>
                 <Download className="w-5 h-5" />
                 SHARE FINASCORE
              </>
            )}
         </button>
         <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-500/50 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      
      {/* Hidden PDF Template */}
      <div className="overflow-hidden h-0 w-0 absolute">
         <ReportTemplate ref={reportRef} currentScore={currentScore} />
      </div>

    </div>
  );
}
