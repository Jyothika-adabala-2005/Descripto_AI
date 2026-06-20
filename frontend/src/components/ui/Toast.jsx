/**
 * @param {Object} props
 * @param {string} props.message
 * @param {boolean} props.isVisible
 */
export default function Toast({ message, isVisible }) {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border border-slate-800 text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-sm animate-fade-in">
      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      <p className="font-medium">{message}</p>
    </div>
  );
}