import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased overflow-x-hidden">
      <Navbar setPage={setPage} />

      <main className="flex-grow">
        {page === 'home' && (
          <div>
            <Hero setPage={setPage} />
            <section className="max-w-5xl mx-auto px-6 py-16">
              <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">Optimized Copywriting Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card 
                  badge="AI Core" 
                  title="Gemini Ultra Engine" 
                  description="Leverages modern large-scale generation utilities to formulate high-converting product features automatically." 
                />
                <Card 
                  badge="SEO" 
                  title="Amazon Keyword Injection" 
                  description="Systematically targets critical marketplace indexing phrases to enhance search visibility for HimShakti products." 
                />
                <Card 
                  badge="Flow" 
                  title="Dynamic Persona Mapping" 
                  description="Instantly shifts writing tone matching Premium, Traditional, or Health-Focused brand vectors." 
                />
              </div>
            </section>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">About Descripto_ai</h1>
            <p className="text-slate-600 leading-relaxed">
              Descripto_ai is an automated copywriting workspace specialized for local high-altitude brands. It processes complex crop characteristics and streamlines catalog operations.
            </p>
          </div>
        )}

        {page === 'dashboard' && (
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Workspace Dashboard</h1>
            <p className="text-slate-600 leading-relaxed">
              The description generation interface will load its model configurations here. You can compile your saved data blocks smoothly.
            </p>
          </div>
        )}

        {page === 'login' && (
          <div className="max-w-md mx-auto px-6 py-20 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Portal</h1>
              <p className="text-sm text-slate-500 mb-6">Enter system verification keys below.</p>
              <button onClick={() => setPage('dashboard')} className="w-full bg-slate-900 text-white py-2 rounded font-medium hover:bg-slate-800 transition">
                Proceed as Representative
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}