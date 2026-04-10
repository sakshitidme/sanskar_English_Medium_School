import React from 'react';
import { motion } from 'framer-motion';
import SEO from "../components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6 lg:px-12">
      <SEO 
        title="Terms of Use"
        description="Terms of Use for Sanskar English Medium School website. User conduct, intellectual property, and acceptance of terms."
        keywords="terms of use, terms and conditions, legal, website usage"
      />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <motion.h1 
          className="text-4xl font-bold text-podar-blue mb-8 border-b-4 border-podar-yellow pb-2 inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Terms of Use
        </motion.h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the <span className="font-bold text-[#0E4D92]">Sanskar English Medium School</span> website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">2. Description of Service</h2>
            <p>
              The site provides users with access to a collection of resources, including school news, admission information, events, and gallery. You understand and agree that the Service is provided "AS-IS".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">3. User Conduct</h2>
            <p>
              You agree to use the website only for lawful purposes. You are prohibited from posting on or transmitting through the Site any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">4. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of <span className="font-bold text-[#0E4D92]">Sanskar English Medium School</span> and is protected by copyright laws.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8 pt-4 border-t">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
