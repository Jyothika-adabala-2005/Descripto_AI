export default function Hero({ setPage }) {
  return (
    <header className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white py-28 px-6 text-center border-b border-slate-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          Generate Optimized <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Marketplace Descriptions</span> Instantly
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
          Transform raw product parameters, baseline traits, and sizing metrics into structured marketing copy utilizing advanced content automation architectures.
        </p>
        <button 
          onClick={() => setPage('dashboard')} 
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-950/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        >
          Launch Workspace Console
        </button>
      </div>
    </header>
  );
}