/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {React.ReactNode} props.children
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xl">&times;</button>
        {children}
      </div>
    </div>
  );
}