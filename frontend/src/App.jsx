import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Footer from './components/footer';
import { Button, Input, Modal, Toast, Loader } from './components/ui';

export default function App() {
  const [page, setPage] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [prodName, setProdName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [weight, setWeight] = useState('');
  const [features, setFeatures] = useState('');
  const [outputCopy, setOutputCopy] = useState('');

  const handleGenerate = () => {
    setLoading(true);
    setOutputCopy('');
    setTimeout(() => {
      setLoading(false);
      setOutputCopy(`Professional Marketplace Description:\n\nIntroducing our premium ${prodName || 'Product'}. Expertly processed featuring high-quality ${ingredients || 'raw traits'}. Available in convenient ${weight || 'standard'} sizing. Optimized configuration metrics ensure absolute listing efficiency.`);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#4a4747] text-white font-sans antialiased">
      
      <header className="sticky top-0 z-40 bg-[#6355a4] border-b border-[#4f428c] flex items-center justify-between px-8 py-2 shadow-md">
        <Navbar setPage={setPage} activePage={page} />
      </header>

      <main className="flex-grow">
        {page === 'home' && (
          <Hero setPage={setPage} />
        )}

        {/* Dashboard matching your purple split-pane layout wireframe */}
        {page === 'dashboard' && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Left Input Pane */}
              <div className="bg-[#b3a3ebd9] text-slate-900 rounded-lg p-6 space-y-4 shadow-xl border border-[#c1b4f0]">
                <h2 className="text-xl font-bold mb-4 border-b border-[#9e8dd4] pb-1">Product Name :</h2>
                <div className="space-y-4">
                  <Input placeholder="Enter product identifier..." value={prodName} onChange={(e) => setProdName(e.target.value)} />
                  
                  <h2 className="text-xl font-bold border-b border-[#9e8dd4] pb-1">Key Ingredients :</h2>
                  <Input placeholder="Enter core compositions..." value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                  
                  <h2 className="text-xl font-bold border-b border-[#9e8dd4] pb-1">Weight :</h2>
                  <Input placeholder="e.g., 250g, 1kg..." value={weight} onChange={(e) => setWeight(e.target.value)} />
                  
                  <h2 className="text-xl font-bold border-b border-[#9e8dd4] pb-1">Features :</h2>
                  <Input placeholder="High-altitude, organic..." value={features} onChange={(e) => setFeatures(e.target.value)} />
                </div>
                
                <div className="pt-4 flex items-center space-x-4">
                  <button 
                    onClick={handleGenerate}
                    className="bg-[#6355a4] hover:bg-[#524493] text-white font-bold px-6 py-2 rounded border border-[#4f428c] shadow transition cursor-pointer"
                  >
                    Generate
                  </button>
                  <Button variant="secondary" onClick={() => setModalOpen(true)}>View Specifications</Button>
                </div>
                <Loader isLoading={loading} />
              </div>

              {/* Right Output Pane */}
              <div className="bg-[#b3a3ebd9] text-slate-900 rounded-lg p-6 shadow-xl border border-[#c1b4f0] min-h-[460px] flex flex-col justify-between">
                <div>
                  <div className="bg-slate-200 border border-slate-300 text-center py-1.5 rounded font-bold text-sm tracking-wide shadow-sm max-w-[140px] mx-auto mb-6">
                    Description
                  </div>
                  {outputCopy ? (
                    <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap bg-white p-5 rounded border border-slate-200 text-slate-800 shadow-inner">{outputCopy}</p>
                  ) : (
                    <div className="bg-white rounded border border-slate-200 min-h-[300px] shadow-inner flex items-center justify-center">
                      <p className="text-sm text-slate-400 italic">Generated descriptions populate here...</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* List layout matching the preview list cards */}
        {page === 'list' && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-2xl font-black mb-8 text-center tracking-wide">List of product descriptions created</h1>
            <div className="space-y-6">
              <div className="bg-[#b3a3ebd9] text-slate-900 p-6 rounded-xl shadow-lg border border-[#c1b4f0]">
                <h3 className="text-lg font-bold text-[#4f428c]">product-1</h3>
              </div>
              <div className="bg-[#b3a3ebd9] text-slate-900 p-6 rounded-xl shadow-lg border border-[#c1b4f0]">
                <h3 className="text-lg font-bold text-[#4f428c]">product-2</h3>
              </div>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <div className="bg-[#b3a3ebd9] text-slate-900 p-8 rounded-xl shadow-xl border border-[#c1b4f0]">
              <h1 className="text-2xl font-bold mb-4 text-[#4f428c]">About</h1>
              <p className="text-sm font-medium leading-relaxed">
                Descripto_ai is an advanced automated copywriting platform engineered to bridge the gap between raw product data and structured marketplace listings. By automating copy structures, users optimize efficiency and maintain listing consistency effortlessly.
              </p>
            </div>
          </div>
        )}

        {page === 'login' && (
          <div className="max-w-md mx-auto px-6 py-20 text-center">
            <div className="bg-[#b3a3ebd9] text-slate-900 p-8 rounded-xl shadow-xl border border-[#c1b4f0]">
              <h1 className="text-2xl font-bold mb-6 text-[#4f428c]">Login</h1>
              <div className="space-y-4 text-left mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email :</label>
                  <Input type="email" placeholder="name@domain.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password :</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <button className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-6 py-2 rounded shadow border border-slate-300 tracking-wide text-sm cursor-pointer transition">
                Login
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-lg font-bold text-slate-900 mb-2">System Specification Summary</h3>
        <p className="text-sm text-slate-600 mb-4">Modal validation interface verifying system overlay rules.</p>
        <button onClick={() => setModalOpen(false)} className="bg-[#6355a4] text-white px-4 py-2 rounded text-sm font-bold cursor-pointer">
          Close
        </button>
      </Modal>

      <Toast message="Description layout logged successfully!" isVisible={toastVisible} />
    </div>
  );
}