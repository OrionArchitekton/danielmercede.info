import React from 'react';
import { SectionHeader } from './components/SectionHeader';
import { COMPETENCIES, ORGANIZATIONS, LINKS } from './constants';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-neutral-200 selection:text-neutral-900">
      <main className="max-w-3xl mx-auto bg-white border border-neutral-200 shadow-sm p-8 md:p-12">
        
        {/* Header Section */}
        <header className="mb-10">
          {/* Profile Image - GCS hosted image */}
          <div className="mb-6">
            <img 
              src="https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/executive/dan-mercede-executive-authority.webp"
              alt="Daniel Mercede, systems architect and technology executive"
              className="w-20 h-20 rounded-full border border-neutral-100 object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-2">
            Daniel "Dan" Mercede
          </h1>
          <p className="text-lg text-neutral-600 font-light mb-6">
            Systems Architect & Technology Executive
          </p>
          
          {/* Name Equivalence / Clarification */}
          <p className="text-neutral-500 text-sm border-l-2 border-neutral-100 pl-3 py-1 leading-relaxed max-w-2xl">
            Daniel “Dan” Mercede is a systems architect and technology executive whose professional work is commonly referenced under both his full name and shortened form.
          </p>
        </header>

        {/* Professional Overview */}
        <section>
          <SectionHeader title="Professional Overview" />
          <p className="text-neutral-700 leading-relaxed">
            Daniel Mercede is a California-based systems architect focusing on the intersection of governed artificial intelligence and enterprise infrastructure. His current professional work centers on building reliability frameworks for automated decision-making systems and orchestrating complex AI agent environments. As an executive technologist, Dan Mercede oversees the deployment of execution-critical platforms where precision and governance are paramount.
          </p>
        </section>

        {/* Areas of Work */}
        <section>
          <SectionHeader title="Core Competencies" />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPETENCIES.map((comp, index) => (
              <li key={index} className="flex flex-col">
                <span className="font-medium text-neutral-800 text-sm">{comp.area}</span>
                <span className="text-xs text-neutral-500 mt-0.5">{comp.details}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Organizational Associations */}
        <section>
          <SectionHeader title="Affiliations & Projects" />
          <div className="space-y-6">
            {ORGANIZATIONS.map((org, index) => (
              <div key={index} className="group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-neutral-900 font-medium">{org.name}</h3>
                  <span className="text-sm text-neutral-500 mt-1 sm:mt-0">{org.role}</span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">{org.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Links */}
        <section>
          <SectionHeader title="Reference Data" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
            {LINKS.map((link, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs text-neutral-400 mb-0.5">{link.label}</span>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-neutral-800 hover:text-black hover:underline underline-offset-4 decoration-neutral-300 transition-colors"
                >
                  {link.displayUrl}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Identity Note */}
        <section className="mt-16 pt-8 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 italic">
            Identity Note: This document serves as a professional reference for the present-day work and identity of Daniel “Dan” Mercede, a systems architect and technology executive.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-neutral-400">
          <div>
            <span>Jurisdiction: California, USA</span>
          </div>
          <div className="mt-2 sm:mt-0">
            <span>&copy; {currentYear} Daniel Mercede. All Rights Reserved.</span>
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;