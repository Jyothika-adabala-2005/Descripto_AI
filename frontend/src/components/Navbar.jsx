export default function Navbar({ setPage }) {
  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold tracking-wider cursor-pointer" onClick={() => setPage('home')}>
        Descripto_ai
      </div>
      <div className="flex space-x-6 text-sm font-medium">
        <button onClick={() => setPage('home')} className="hover:text-indigo-400 transition">Home</button>
        <button onClick={() => setPage('about')} className="hover:text-indigo-400 transition">About</button>
        <button onClick={() => setPage('dashboard')} className="hover:text-indigo-400 transition">Dashboard</button>
        <button onClick={() => setPage('login')} className="bg-indigo-600 px-4 py-1.5 rounded hover:bg-indigo-500 transition">Login</button>
      </div>
    </nav>
  );
}