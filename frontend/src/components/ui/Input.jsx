export default function Input({ placeholder, value, onChange, type = 'text' }) {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-white text-black rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6355a4] text-sm font-medium shadow-inner placeholder-slate-400"
    />
  );
}