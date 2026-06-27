export default function Footer() {
  return (
    <footer className="bg-[#6355a4] text-white border-t border-white/10 py-6 px-8 mt-auto text-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-semibold">
        <p>&copy; 2026 <span className="font-black">Descripto_AI</span>. All systems running optimally.</p>
        <p className="text-xs bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">React & Tailwind Architecture</p>
      </div>
    </footer>
  );
}