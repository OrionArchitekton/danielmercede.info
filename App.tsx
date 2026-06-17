import React from 'react';
import { SectionHeader } from './components/SectionHeader';
import { COMPETENCIES, ORGANIZATIONS, LINKS, getImageMeta } from './constants';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const profileSrc = "/dan-mercede-executive-authority-avatar.webp";
  const profileMeta = getImageMeta(profileSrc);

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-neutral-200 selection:text-neutral-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-3xl mx-auto bg-white border border-neutral-200 shadow-sm p-8 md:p-12"
      >

        {/* Header Section */}
        <header className="mb-10">
          {/* Profile Image - GCS hosted image */}
          <div className="mb-6">
            <img
              src={profileSrc}
              alt={profileMeta.alt}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border border-neutral-100 object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-2">
            Daniel "Dan" Mercede
          </h1>
          <p className="text-lg text-neutral-600 font-light mb-6">
            Founder & AI Systems Architect, Technology Executive
          </p>

          {/* Name Equivalence / Clarification */}
          <p className="text-neutral-500 text-sm border-l-2 border-neutral-100 pl-3 py-1 leading-relaxed max-w-2xl">
            Daniel "Dan" Mercede is a runtime governance architect and technology executive whose professional work is commonly referenced under both his full name and shortened form.
          </p>
        </header>

        {/* Professional Overview */}
        <section>
          <SectionHeader title="Professional Overview" />
          <p className="text-neutral-700 leading-relaxed">
            Daniel Mercede is a California-based runtime governance architect who designs governed AI operating systems that enforce auditability, policy control, and human oversight at runtime. His current professional work centers on building execution control planes for enterprise AI — systems that fail closed, generate audit-grade receipts, and enforce authority gates. As an executive technologist, Dan Mercede oversees the deployment of production-grade platforms where runtime governance is non-negotiable.
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
                <span className="text-xs text-neutral-500 mb-0.5">{link.label}</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 hover:text-black hover:underline underline-offset-4 decoration-neutral-300 transition-colors"
                >
                  {link.displayUrl}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Identity Note */}
        <section className="mt-16 pt-8 border-t border-neutral-100">
          <p className="text-xs text-neutral-500 italic">
            Identity Note: This document serves as a professional reference for the present-day work and identity of Daniel “Dan” Mercede, a runtime governance architect and technology executive.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col gap-4 text-xs text-neutral-500">
          <div className="flex flex-col items-center gap-1 pt-2">
            <a
              href="https://www.orionintelligenceagency.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 font-medium hover:text-black hover:underline underline-offset-4 transition-colors"
            >
              Book a Runtime Governance Readiness Scan <span aria-hidden="true">&rarr;</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="text-neutral-500 text-[10px] tracking-wide">
              Gap map &bull; Failure heatmap &bull; Enforcement checklist &bull; 30/60/90 plan
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <span>Jurisdiction: California, USA</span>
            </div>
            <div className="mt-2 sm:mt-0">
              <span>&copy; {currentYear} Daniel Mercede. All Rights Reserved.</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;