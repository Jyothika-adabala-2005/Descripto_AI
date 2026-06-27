/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the button
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary'] - Style configuration
 * @param {function} [props.onClick] - Click trigger handler function
 */
export default function Button({ children, variant = 'primary', onClick }) {
  const baseStyle = "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer transform active:scale-95";
  const variants = {
    primary: "bg-[#9c8ce7] hover:bg-[#8675df] text-white shadow-sm",
    secondary: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200",
    danger: "bg-rose-600 hover:bg-rose-500 text-white"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
}