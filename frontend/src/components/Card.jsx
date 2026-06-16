export default function Card({ badge, title, description }) {
  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100/80 transition-all duration-300 flex flex-col justify-between">
      <div>
        <span className="inline-block text-[11px] font-extrabold tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full mb-4 uppercase">
          {badge}
        </span>
        <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}