/**
 * @param {Object} props
 * @param {string} props.message - Output confirmation string block
 * @param {boolean} props.isVisible - Execution status conditional flag render state
 */
export default function Toast({ message, isVisible }) {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-sm animate-bounce">
      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      <p className="font-medium">{message}</p>
    </div>
  );
}