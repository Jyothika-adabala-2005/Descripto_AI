import { useState } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Card from './components/card';
import Footer from './components/footer';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased overflow-x-hidden">
      <Navbar setPage={setPage} activePage={page} />

      <main className="flex-grow">
        {page === 'home' && (
          <div>
            <Hero setPage={setPage} />
            <section className="max-w-6xl mx-auto px-6 py-20">
              <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12 tracking-tight">
                Engineered Features & Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card 
                  badge="AI Optimization" 
                  title="Contextual Copy Generation" 
                  description="Leverages structural large language models to instantly output high-converting marketplace product descriptions." 
                />
                <Card 
                  badge="SEO Strategy" 
                  title="Keyword Extraction Matrix" 
                  description="Systematically crawls your raw data inputs to match optimal digital indexing parameters automatically." 
                />
                <Card 
                  badge="Tone Controls" 
                  title="Dynamic Persona Processing" 
                  description="Shifts linguistic outputs fluidly across premium, informational, or traditional marketing voices." 
                />
              </div>
            </section>
          </div>
        )}

        {page === 'about' && (
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
              Platform Overview
            </span>
            <h1 className="text-4xl font-black text-slate-900 mt-4 mb-6 tracking-tight">About Descripto_ai</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Descripto_ai is an advanced automated copywriting platform engineered to bridge the gap between raw product data and structured marketplace listings. By automating copy structures, users optimize efficiency and maintain listing consistency effortlessly.
            </p>
          </div>
        )}

        {page === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-24 text-center">
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
              Workspace
            </span>
            <h1 className="text-4xl font-black text-slate-900 mt-4 mb-4 tracking-tight">Generator Dashboard</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              The generative console interface will compile system prompt blocks smoothly within this dashboard container.
            </p>
          </div>
        )}

        {page === 'login' && (
          <div className="max-w-md mx-auto px-6 py-28 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
                Secure Access
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-4 mb-3 tracking-tight">User Portal</h1>
              <p className="text-slate-600 mb-6 font-medium">Authorized users will securely login here.</p>
              <div className="w-full bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-400 py-4 rounded-xl mb-4 font-mono">
                System interface modules will be updated soon.
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}