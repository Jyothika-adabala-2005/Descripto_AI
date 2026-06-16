export default function Navbar({ setPage, activePage }) {
  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-md border-b border-slate-900">
      <div className="text-xl font-black tracking-wider text-indigo-400 cursor-pointer" onClick={() => setPage('home')}>
        Descripto<span className="text-white">_ai</span>
      </div>
      
      <div className="flex items-center space-x-8 text-sm font-semibold tracking-wide">
        <button 
          onClick={() => setPage('home')} 
          className={`transition duration-150 cursor-pointer ${activePage === 'home' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setPage('about')} 
          className={`transition duration-150 cursor-pointer ${activePage === 'about' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
        >
          About
        </button>
        <button 
          onClick={() => setPage('dashboard')} 
          className={`transition duration-150 cursor-pointer ${activePage === 'dashboard' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setPage('login')} 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl transition duration-150 shadow-md transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Login
        </button>
      </div>
    </nav>
  );
}