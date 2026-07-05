import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Footer from './components/footer';
import { Button, Input, Modal, Toast, Loader } from './components/ui';

export default function App() {
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Auth States
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');

  // Form states for Dashboard
  const [prodName, setProdName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [weight, setWeight] = useState('');
  const [features, setFeatures] = useState('');
  const [outputCopy, setOutputCopy] = useState('');

  // Extracted data array loaded live from backend server
  const [itemsList, setItemsList] = useState([]);

  const API_BASE_URL = 'http://localhost:5000/api/descriptions';
  const AUTH_BASE_URL = 'http://localhost:5000/api/auth';

  // Fetch all items from the backend whenever the app mounts or switches to the list view
  const fetchAllDescriptions = async () => {
    // Block fetching records if user is unauthenticated
    if (!userToken) return;

    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Could not retrieve stored records.");
      const data = await response.json();
      setItemsList(data);
    } catch (err) {
      setToastMessage(err.message || "Network link execution failure.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 'list') {
      fetchAllDescriptions();
    }
  }, [page, userToken]);

  // AUTHENTICATION: handle registration API pipeline
  const handleSignupSubmit = async () => {
    if (!authEmail || !authPassword) {
      setToastMessage("All fields are required for sign up!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${AUTH_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup process failed.");
      
      localStorage.setItem('token', data.token);
      setUserToken(data.token);
      setToastMessage("Account registered successfully! Welcome.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setPage('dashboard');
      setAuthEmail('');
      setAuthPassword('');
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  // AUTHENTICATION: handle sign in credentials pipeline
  const handleLoginSubmit = async () => {
    if (!authEmail || !authPassword) {
      setToastMessage("Please fill in all email credentials!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid user credentials.");
      
      localStorage.setItem('token', data.token);
      setUserToken(data.token);
      setToastMessage("Logged in securely! Welcome back.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setPage('dashboard');
      setAuthEmail('');
      setAuthPassword('');
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  // POST REQUEST: Connects frontend form submission to backend generation endpoint
  const handleGenerate = async () => {
    // Block generations if a token doesn't exist in local application state
    if (!userToken) {
      setToastMessage("Access Denied: Please login to generate descriptions!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setPage('login');
      return;
    }

    if (!prodName) {
      setToastMessage("Product Name is absolutely required!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }

    setLoading(true);
    setOutputCopy('');
    
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prodName, ingredients, weight, features })
      });

      if (!response.ok) throw new Error("Server generation pipeline failed.");
      
      const data = await response.json();
      setOutputCopy(data.outputCopy);
      setToastMessage("Description compiled by server successfully!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  // DELETE REQUEST: Removes a listing from the backend in-memory array
  const handleDeleteItem = async (id) => {
    if (!userToken) {
      setToastMessage("Authentication required to modify records.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setPage('login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error("Failed to clear selected item.");
      
      setToastMessage("Item successfully removed from server logs!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      fetchAllDescriptions(); // Refresh view
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputCopy) return;
    navigator.clipboard.writeText(outputCopy);
    setToastMessage("Description copied to clipboard! 📋");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-[#6355a4]">
      
      <header className="sticky top-0 z-40 bg-[#6355a4] border-b border-white/10">
        <Navbar setPage={setPage} activePage={page} darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>

      <main className={`flex-grow flex flex-col justify-center transition-colors duration-300 ${darkMode ? 'bg-[#000000] text-white' : 'bg-[#ffffff] text-black'}`}>
        
        {page === 'home' && (
          <Hero setPage={() => setPage('login')} darkMode={darkMode} />
        )}

        {page === 'dashboard' && (
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full">
            {!userToken ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-4">Please log in to access the Generator Dashboard</h2>
                <button onClick={() => setPage('login')} className="bg-[#6355a4] hover:bg-[#524493] text-white font-bold px-6 py-2 rounded-xl transition">
                  Go to Login
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                
                {/* Parameter Input Block */}
                <div className={`rounded-2xl p-5 md:p-6 space-y-4 shadow-xl border transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Product Name :</h2>
                  <Input placeholder="Enter product identifier..." value={prodName} onChange={(e) => setProdName(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Key Ingredients :</h2>
                  <Input placeholder="Enter core compositions..." value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Weight :</h2>
                  <Input placeholder="e.g., 250g, 1kg..." value={weight} onChange={(e) => setWeight(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Features :</h2>
                  <Input placeholder="Unique highlights..." value={features} onChange={(e) => setFeatures(e.target.value)} />
                  
                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <button onClick={handleGenerate} className="bg-[#6355a4] hover:bg-[#524493] text-white font-bold px-6 py-2.5 rounded-xl shadow transition duration-200 transform active:scale-95 cursor-pointer text-sm">
                      Generate
                    </button>
                    <Button variant="secondary" onClick={() => setModalOpen(true)}>Specifications</Button>
                  </div>
                  <Loader isLoading={loading} />
                </div>

                {/* Dynamic Output Block with Copy Button */}
                <div className={`rounded-2xl p-5 md:p-6 shadow-xl border min-h-[440px] md:min-h-[490px] flex flex-col justify-between transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
                  <div>
                    <div className="relative flex items-center justify-center max-w-[170px] mx-auto mb-6">
                      <div className="w-full bg-[#6355a4] text-white text-center py-1.5 rounded-lg font-bold text-xs tracking-wider uppercase shadow-sm">
                        Description
                      </div>
                      {outputCopy && (
                        <button 
                          onClick={handleCopy}
                          className="absolute -right-10 bg-[#6355a4] text-white hover:bg-[#524493] p-1.5 rounded-lg transition duration-200 shadow-md cursor-pointer text-xs"
                          title="Copy text"
                        >
                          📋
                        </button>
                      )}
                    </div>

                    {outputCopy ? (
                      <p className={`text-sm font-medium leading-relaxed whitespace-pre-wrap p-5 rounded-xl shadow-inner border font-mono ${darkMode ? 'bg-black border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-800'}`}>{outputCopy}</p>
                    ) : (
                      <div className={`rounded-xl border min-h-[280px] md:min-h-[320px] shadow-inner flex items-center justify-center border-dashed ${darkMode ? 'border-zinc-800 bg-black' : 'border-slate-300 bg-white'}`}>
                        <p className="text-sm text-slate-400 italic">Generated descriptions populate here...</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* List View Pane showing data items dynamically pulled from server */}
        {page === 'list' && (
          <div className="max-w-4xl mx-auto px-6 py-12 w-full">
            {!userToken ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-4">Please log in to view stored descriptions</h2>
                <button onClick={() => setPage('login')} className="bg-[#6355a4] hover:bg-[#524493] text-white font-bold px-6 py-2 rounded-xl transition">
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                <h1 className={`text-2xl font-black mb-8 text-center tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>List of product descriptions created</h1>
                <Loader isLoading={loading} />
                <div className="space-y-4">
                  {itemsList.length === 0 ? (
                    <p className="text-center italic text-sm text-slate-400 py-10">No records found on backend database.</p>
                  ) : (
                    itemsList.map((item) => (
                      <div key={item._id} className={`p-6 rounded-xl shadow-md border flex items-center justify-between transition-all duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
                        <div>
                          <h3 className="text-lg font-bold text-[#6355a4]">{item.prodName}</h3>
                          <p className="text-xs text-slate-400 font-mono mt-1">Weight Bounds: {item.weight || 'N/A'}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteItem(item._id)}
                          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-3xl mx-auto px-6 py-20 text-center w-full">
            <div className={`p-8 rounded-2xl shadow-xl border transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
              <h1 className="text-2xl font-bold mb-4 text-[#6355a4]">About</h1>
              <p className={`text-sm font-medium leading-relaxed transition-colors duration-300 ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                Descripto_AI is an advanced automated copywriting workspace designed to turn complex, granular product listings into highly persuasive and indexing-optimized marketplace assets instantly.
              </p>
            </div>
          </div>
        )}

        {/* Login Page View Pane */}
        {page === 'login' && (
          <div className="max-w-md mx-auto px-6 py-16 text-center w-full">
            <div className={`p-8 rounded-2xl shadow-xl border transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
              <h1 className="text-2xl font-bold mb-6 text-[#6355a4]">Login</h1>
              <div className="space-y-4 text-left mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Email :</label>
                  <Input type="email" placeholder="name@domain.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Password :</label>
                  <Input type="password" placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
                </div>
              </div>
              <button onClick={handleLoginSubmit} className="w-full bg-[#6355a4] hover:bg-[#524493] text-white font-bold py-2.5 rounded-xl shadow border-none tracking-wide text-sm cursor-pointer transition duration-200 transform active:scale-95">
                Sign In
              </button>
              <p className="mt-4 text-xs text-slate-400">
                Don't have an account?{' '}
                <span onClick={() => { setPage('signup'); setAuthEmail(''); setAuthPassword(''); }} className="text-[#6355a4] hover:underline cursor-pointer font-bold">
                  Sign up here
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Signup Page View Pane */}
        {page === 'signup' && (
          <div className="max-w-md mx-auto px-6 py-16 text-center w-full">
            <div className={`p-8 rounded-2xl shadow-xl border transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
              <h1 className="text-2xl font-bold mb-6 text-[#6355a4]">Create Account</h1>
              <div className="space-y-4 text-left mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Email :</label>
                  <Input type="email" placeholder="name@domain.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Password :</label>
                  <Input type="password" placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
                </div>
              </div>
              <button onClick={handleSignupSubmit} className="w-full bg-[#6355a4] hover:bg-[#524493] text-white font-bold py-2.5 rounded-xl shadow border-none tracking-wide text-sm cursor-pointer transition duration-200 transform active:scale-95">
                Register
              </button>
              <p className="mt-4 text-xs text-slate-400">
                Already have an account?{' '}
                <span onClick={() => { setPage('login'); setAuthEmail(''); setAuthPassword(''); }} className="text-[#6355a4] hover:underline cursor-pointer font-bold">
                  Login here
                </span>
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-lg font-bold mb-2 text-black">System Specification Summary</h3>
        <p className="text-sm text-slate-600 mb-4">Modal validation interface verifying system overlay rules.</p>
        <button onClick={() => setModalOpen(false)} className="bg-[#6355a4] text-white px-5 py-2 rounded-xl text-sm font-bold cursor-pointer hover:bg-[#524493] transition">
          Close
        </button>
      </Modal>

      <Toast message={toastMessage} isVisible={toastVisible} />
    </div>
  );
}