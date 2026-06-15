export default function Card({ badge, title, description }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <span className="inline-block text-xs font-semibold tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full mb-4 uppercase">
          {badge}
        </span>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}