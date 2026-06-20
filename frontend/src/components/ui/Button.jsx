/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary']
 * @param {function} [props.onClick]
 */
export default function Button({ children, variant = 'primary', onClick }) {
  const baseStyle = "px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer transform active:scale-95";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200",
    danger: "bg-rose-600 hover:bg-rose-500 text-white"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
}