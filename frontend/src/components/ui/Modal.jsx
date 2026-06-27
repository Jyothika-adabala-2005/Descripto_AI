/**
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls overlay view mounting structure lifecycle
 * @param {function} props.onClose - Action layer termination routing callback
 * @param {React.ReactNode} props.children - Modal block context markup tree
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-900">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
}