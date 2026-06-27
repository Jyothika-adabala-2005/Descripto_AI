export default function Hero({ setPage, darkMode }) {
  return (
    <div className="w-full flex flex-col">
      
      {/* Block 1: Large Solid Purple Heading Container */}
      <div className="w-full bg-[#6355a4] text-white py-20 px-6 md:px-12 text-center shadow-md select-none">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-wide uppercase">
            Generate Optimized Descriptions Instantly
          </h1>
          <p className="text-sm md:text-base text-indigo-100 max-w-xl mx-auto mb-8 font-medium">
            Transform raw data and parameters into high-converting marketplace copy instantly.
          </p>
          <button 
            onClick={() => setPage('dashboard')}
            className="bg-white text-[#6355a4] font-extrabold px-8 py-3 rounded-xl shadow-lg transition duration-200 transform active:scale-95 hover:bg-indigo-50 cursor-pointer text-xs uppercase tracking-wider"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Block 2: Feature Boxes Container Panel */}
      <div className={`w-full py-16 px-4 md:px-8 transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          
          {/* SEO Feature Box */}
          <div className={`p-6 rounded-2xl shadow-sm border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#6355a4]/10 flex items-center justify-center text-xl mb-4 text-[#6355a4]">
                🔍
              </div>
              <h3 className={`text-base font-bold mb-2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                SEO-Friendly Content
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Create descriptions with relevant keywords to improve product visibility in search engines.
              </p>
            </div>
          </div>

          {/* Fast Generation Feature Box */}
          <div className={`p-6 rounded-2xl shadow-sm border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#6355a4]/10 flex items-center justify-center text-xl mb-4 text-[#6355a4]">
                ⚡
              </div>
              <h3 className={`text-base font-bold mb-2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Fast Generation
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Receive high-quality descriptions within a few seconds without layout latency.
              </p>
            </div>
          </div>

          {/* One-Click Copy Feature Box */}
          <div className={`p-6 rounded-2xl shadow-sm border text-left flex flex-col justify-between min-h-[180px] transition-all duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#6355a4]/10 flex items-center justify-center text-xl mb-4 text-[#6355a4]">
                📋
              </div>
              <h3 className={`text-base font-bold mb-2 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                One-Click Copy
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Copy the generated description instantly with a single click inside the console workspace.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}