export default function Navbar({ setPage, activePage, darkMode, setDarkMode }) {
  return (
    <nav className="bg-[#9c8ce7] text-white flex items-center justify-between text-sm font-semibold tracking-wide py-3 px-8 w-full shadow-md">
      <div className="text-lg font-black tracking-wider text-white cursor-pointer" onClick={() => setPage('home')}>
        Descripto_AI
      </div>

      <div className="flex items-center space-x-6">
        <button onClick={() => setPage('home')} className={`transition cursor-pointer ${activePage === 'home' ? 'text-indigo-900 font-bold' : 'text-white hover:text-slate-200'}`}>Home</button>
        <button onClick={() => setPage('about')} className={`transition cursor-pointer ${activePage === 'about' ? 'text-indigo-900 font-bold' : 'text-white hover:text-slate-200'}`}>About</button>
        <button onClick={() => setPage('dashboard')} className={`transition cursor-pointer ${activePage === 'dashboard' ? 'text-indigo-900 font-bold' : 'text-white hover:text-slate-200'}`}>DashBoard</button>
        <button onClick={() => setPage('list')} className={`transition cursor-pointer ${activePage === 'list' ? 'text-indigo-900 font-bold' : 'text-white hover:text-slate-200'}`}>List</button>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="transition cursor-pointer text-white hover:text-slate-200 font-semibold"
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>

        <button 
          onClick={() => setPage('login')} 
          className="bg-white text-[#9c8ce7] font-bold px-5 py-1.5 rounded transition hover:bg-slate-100 cursor-pointer text-xs uppercase tracking-wider"
        >
          Login
        </button>
      </div>
    </nav>
  );
}