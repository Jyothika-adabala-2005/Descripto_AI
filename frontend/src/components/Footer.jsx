export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-8 px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
        <p>&copy; 2026 <span className="text-slate-200 font-bold">Descripto_ai</span>. All architecture systems operational.</p>
        <p className="text-xs text-slate-500 bg-slate-900 border border-slate-800/80 px-4 py-1.5 rounded-full font-mono">
          Engine: React v19 & Tailwind v4
        </p>
      </div>
    </footer>
  );
}