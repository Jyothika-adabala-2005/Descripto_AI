export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 px-6 text-center mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; 2026 Descripto_ai. Internal Tooling Solution for HimShakti.</p>
        <p className="text-xs text-slate-500">Built using React & Tailwind CSS</p>
      </div>
    </footer>
  );
}