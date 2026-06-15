export default function Hero({ setPage }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Transform Raw Product Traits into Premium Amazon Listings
        </h1>
        <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Built tailored for HimShakti range. Turn ingredients, weights, and high-altitude features into high-converting marketing copy instantly.
        </p>
        <button onClick={() => setPage('dashboard')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3 rounded-lg shadow transition">
          Launch Copy Generator
        </button>
      </div>
    </header>
  );
}