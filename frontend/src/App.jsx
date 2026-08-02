import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

import { Button, Input, Modal, Toast, Loader } from './components/ui';

export default function App() {
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [authEmail, setAuthEmail] = useState(localStorage.getItem('userEmail') || '');
  const [authPassword, setAuthPassword] = useState('');
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');

  const [prodName, setProdName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [weight, setWeight] = useState('');
  const [features, setFeatures] = useState('');
  const [tone, setTone] = useState('Professional');
  const [outputCopy, setOutputCopy] = useState('');

  const [itemsList, setItemsList] = useState([]);
  
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API_BASE_URL = `${BASE_URL}/api/descriptions`;
const AUTH_BASE_URL = `${BASE_URL}/api/auth`;
  
  const [viewingItem, setViewingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedCopy, setUpdatedCopy] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const userName = authEmail ? authEmail.split('@')[0] : (localStorage.getItem('userEmail') ? localStorage.getItem('userEmail').split('@')[0] : 'User');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setUserToken(tokenFromUrl);
      setPage('dashboard');
      window.history.replaceState({}, document.title, window.location.pathname);
      setToastMessage("Signed in seamlessly via Google!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }
  }, []);

  const fetchAllDescriptions = async () => {
    if (!userToken) return;

    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
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
      if (!userToken) {
        setPage('login');
      } else {
        fetchAllDescriptions();
      }
    } else if (page === 'dashboard' && !userToken) {
      setPage('login');
    }
  }, [page, userToken]);

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
      localStorage.setItem('userEmail', authEmail);
      setUserToken(data.token);
      setToastMessage("Account registered successfully! Welcome.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setPage('dashboard');
      setAuthPassword('');
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDescription = async (id) => {
    if (!userToken) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ outputCopy: updatedCopy })
      });

      if (!response.ok) throw new Error("Failed to update description.");

      setToastMessage("Description updated successfully! ✨");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setEditingItem(null);
      fetchAllDescriptions();
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

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
      localStorage.setItem('userEmail', authEmail);
      setUserToken(data.token);
      setToastMessage("Logged in securely! Welcome back.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setPage('dashboard');
      setAuthPassword('');
    } catch (err) {
      setToastMessage(err.message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUserToken('');
    setAuthEmail('');
    setItemsList([]);
    setPage('home');
    setToastMessage("Logged out successfully.");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleGenerate = async () => {
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
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ prodName, ingredients, weight, features, tone })
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
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      if (!response.ok) throw new Error("Failed to clear selected item.");
      
      setToastMessage("Item successfully removed from server logs!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      fetchAllDescriptions();
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

  const handleNew = () => {
    setProdName('');
    setIngredients('');
    setWeight('');
    setFeatures('');
    setTone('Professional');
    setOutputCopy('');
    setToastMessage("Form reset! Ready for a new product.");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-[#6355a4]">
      
      <header className="sticky top-0 z-40 bg-[#6355a4] border-b border-white/10">
        <Navbar 
          setPage={setPage} 
          activePage={page} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          userToken={userToken} 
          handleLogout={handleLogout} 
          userEmail={authEmail}
        />
      </header>

      
{userToken && (
  <div className={`w-full px-6 md:px-8 py-2 text-right font-bold text-sm tracking-wide transition-colors duration-300 ${darkMode ? 'bg-black text-[#6355a4]' : 'bg-white text-[#6355a4]'}`}>
    Hi, {userName} 👋
  </div>
)}

      <main className={`flex-grow flex flex-col justify-center transition-colors duration-300 ${darkMode ? 'bg-[#000000] text-white' : 'bg-[#ffffff] text-black'}`}>
        
        {page === 'home' && (
          <Hero setPage={() => setPage(userToken ? 'dashboard' : 'login')} darkMode={darkMode} />
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
                
                <div className={`rounded-2xl p-5 md:p-6 space-y-4 shadow-xl border transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}>
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Product Name :</h2>
                  <Input placeholder="Enter product identifier..." value={prodName} onChange={(e) => setProdName(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Materials Used :</h2>
                  <Input placeholder="Enter core compositions..." value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Weight :</h2>
                  <Input placeholder="e.g., 250g, 1kg..." value={weight} onChange={(e) => setWeight(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Features :</h2>
                  <Input placeholder="Unique highlights..." value={features} onChange={(e) => setFeatures(e.target.value)} />
                  
                  <h2 className="text-lg font-bold border-b border-[#6355a4]/30 pb-1 text-[#6355a4]">Description Tone :</h2>
                  <select 
                    value={tone} 
                    onChange={(e) => setTone(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6355a4] ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-slate-200 text-black'}`}
                  >
                    <option value="Professional">💼 Professional / Premium</option>
                    <option value="Energetic">⚡ Energetic / Bold</option>
                    <option value="Luxury">✨ Luxury / Elegant</option>
                    <option value="Minimalist">🌱 Clean / Minimalist</option>
                    <option value="Humorous">💬 Witty / Casual</option>
                  </select>
                  
                  <div className="pt-4 flex flex-wrap gap-3 items-center">
                    <button 
                      onClick={handleGenerate} 
                      className="bg-[#6355a4] hover:bg-[#524493] text-white font-bold px-6 py-2.5 rounded-xl shadow transition duration-200 transform active:scale-95 cursor-pointer text-sm"
                    >
                      Generate
                    </button>

                    <button 
                      onClick={handleNew} 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow transition duration-200 transform active:scale-95 cursor-pointer text-sm"
                    >
                      ✨ New
                    </button>

                    <Button variant="secondary" onClick={() => setModalOpen(true)}>
                      Specifications
                    </Button>
                  </div>
                  <Loader isLoading={loading} />
                </div>

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
                <h1 className={`text-2xl font-black mb-8 text-center tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
                  List of product descriptions created
                </h1>
                <Loader isLoading={loading} />
                <div className="space-y-4">
                  {itemsList.length === 0 ? (
                    <p className="text-center italic text-sm text-slate-400 py-10">No records found on backend database.</p>
                  ) : (
                    itemsList.map((item) => (
                      <div key={item._id} className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-black'}`}>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-[#6355a4]">{item.prodName}</h3>
                            <p className="text-xs text-slate-400 font-mono mt-1">Weight Bounds: {item.weight || 'N/A'}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setViewingItem(viewingItem === item._id ? null : item._id)}
                              className="bg-[#6355a4] hover:bg-[#524493] text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                            >
                              {viewingItem === item._id ? 'Hide' : 'View'}
                            </button>

                            <button 
                              onClick={() => {
                                setEditingItem(editingItem === item._id ? null : item._id);
                                setUpdatedCopy(item.outputCopy);
                              }}
                              className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                            >
                              {editingItem === item._id ? 'Cancel' : 'Update'}
                            </button>

                            <button 
                              onClick={() => handleDeleteItem(item._id)}
                              className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {viewingItem === item._id && (
                          <div className={`mt-4 p-4 rounded-xl border text-sm font-mono whitespace-pre-wrap ${darkMode ? 'bg-black border-zinc-800 text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                            <p className="text-xs font-bold uppercase mb-2 text-[#6355a4]">Stored Inputs:</p>
                            <p className="text-xs mb-1"><strong>Materials:</strong> {item.ingredients || 'N/A'}</p>
                            <p className="text-xs mb-3"><strong>Features:</strong> {item.features || 'N/A'}</p>
                            <p className="text-xs font-bold uppercase mb-2 text-[#6355a4]">Generated Description:</p>
                            {item.outputCopy}
                          </div>
                        )}

                        {editingItem === item._id && (
                          <div className="mt-4 space-y-3">
                            <textarea 
                              value={updatedCopy}
                              onChange={(e) => setUpdatedCopy(e.target.value)}
                              rows={5}
                              className={`w-full p-3 text-sm rounded-xl border font-mono focus:outline-none focus:ring-2 focus:ring-[#6355a4] ${darkMode ? 'bg-black border-zinc-700 text-white' : 'bg-white border-slate-300 text-black'}`}
                            />
                            <button 
                              onClick={() => handleUpdateDescription(item._id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}

                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-4xl mx-auto px-6 py-16 w-full">
            <div className="p-8 rounded-2xl shadow-xl border border-white/20 bg-[#6355a4] text-white">
              <h1 className="text-3xl font-bold mb-6 text-white">About Descripto_AI</h1>
              <p className="text-base font-normal leading-relaxed text-justify text-white/90">
                Descripto_AI is an intelligent AI-powered platform that transforms basic product information into professional, engaging, and SEO-optimized product descriptions within seconds. Designed for businesses, startups, and online sellers, it helps create compelling content for e-commerce platforms such as Amazon and Flipkart by generating catchy product titles, persuasive sales copy, detailed descriptions, and key product benefits. With multiple writing styles like Premium, Traditional, and Health-Focused, Descripto_AI ensures every description matches your brand's voice while improving product visibility and customer engagement. By combining advanced AI with a simple, user-friendly interface, Descripto_AI eliminates the hassle of manual content writing, saves valuable time, and enables users to create high-quality, marketplace-ready product descriptions effortlessly.
              </p>
            </div>
          </div>
        )}

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
                  <div className="relative flex items-center">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={authPassword} 
                      onChange={(e) => setAuthPassword(e.target.value)} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-sm text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handleLoginSubmit} className="w-full bg-[#6355a4] hover:bg-[#524493] text-white font-bold py-2.5 rounded-xl shadow border-none tracking-wide text-sm cursor-pointer transition duration-200 transform active:scale-95">
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'} 
                className="w-full mt-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-xl text-sm transition tracking-wide cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                🌐 Sign in with Google
              </button>
              <p className="mt-4 text-xs text-slate-400">
                Don't have an account?{' '}
                <span onClick={() => { setPage('signup'); setAuthEmail(''); setAuthPassword(''); setShowPassword(false); }} className="text-[#6355a4] hover:underline cursor-pointer font-bold">
                  Sign up here
                </span>
              </p>
            </div>
          </div>
        )}

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
                  <div className="relative flex items-center">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={authPassword} 
                      onChange={(e) => setAuthPassword(e.target.value)} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-sm text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handleSignupSubmit} className="w-full bg-[#6355a4] hover:bg-[#524493] text-white font-bold py-2.5 rounded-xl shadow border-none tracking-wide text-sm cursor-pointer transition duration-200 transform active:scale-95">
                Register
              </button>
              <p className="mt-4 text-xs text-slate-400">
                Already have an account?{' '}
                <span onClick={() => { setPage('login'); setAuthEmail(''); setAuthPassword(''); setShowPassword(false); }} className="text-[#6355a4] hover:underline cursor-pointer font-bold">
                  Login here
                </span>
              </p>
            </div>
          </div>
        )}
        
      </main>

      <Footer setPage={setPage} />

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