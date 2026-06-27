export default function Navbar({ setPage, activePage, darkMode, setDarkMode }) {
  return (
    <nav className="bg-[#6355a4] text-white flex flex-col sm:flex-row items-center justify-between text-sm font-semibold tracking-wide py-4 px-6 md:px-8 w-full gap-4 sm:gap-0 select-none">
      <div className="text-xl font-black tracking-wider text-white cursor-pointer" onClick={() => setPage('home')}>
        Descripto_AI
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 md:space-x-8 sm:gap-2">
        <button onClick={() => setPage('home')} className={`transition duration-200 cursor-pointer ${activePage === 'home' ? 'text-black font-bold scale-105 underline underline-offset-4' : 'text-white hover:text-indigo-100'}`}>Home</button>
        <button onClick={() => setPage('about')} className={`transition duration-200 cursor-pointer ${activePage === 'about' ? 'text-black font-bold scale-105 underline underline-offset-4' : 'text-white hover:text-indigo-100'}`}>About</button>
        <button onClick={() => setPage('dashboard')} className={`transition duration-200 cursor-pointer ${activePage === 'dashboard' ? 'text-black font-bold scale-105 underline underline-offset-4' : 'text-white hover:text-indigo-100'}`}>DashBoard</button>
        <button onClick={() => setPage('list')} className={`transition duration-200 cursor-pointer ${activePage === 'list' ? 'text-black font-bold scale-105 underline underline-offset-4' : 'text-white hover:text-indigo-100'}`}>List</button>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="transition duration-200 cursor-pointer text-xl hover:scale-110 active:scale-95 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button 
          onClick={() => setPage('login')} 
          className="bg-white text-[#6355a4] font-bold px-5 py-2 rounded-xl transition duration-200 hover:bg-indigo-50 shadow-sm cursor-pointer text-xs uppercase tracking-wider"
        >
          Login
        </button>
      </div>
    </nav>
  );
}