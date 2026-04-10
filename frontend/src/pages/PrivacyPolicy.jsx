import React from 'react';
import { motion } from 'framer-motion';
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6 lg:px-12">
      <SEO 
        title="Privacy Policy"
        description="Privacy Policy for Sanskar English Medium School. Learn how we collect, use, and protect your information."
        keywords="privacy policy, data protection, school privacy, student data"
      />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <motion.h1 
          className="text-4xl font-bold text-podar-blue mb-8 border-b-4 border-podar-yellow pb-2 inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Privacy Policy
        </motion.h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">1. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. This includes information you provide to us directly, such as when you fill out an admission form, and information we get from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">2. How We Use Information</h2>
            <p>
              We use the information we collect to maintain, protect, and improve our services, to develop new ones, and to protect our school and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">3. Information We Share</h2>
            <p>
              We do not share personal information with companies, organizations, and individuals outside of <span className="font-bold text-[#0E4D92]">Sanskar English Medium School</span> unless one of the following circumstances applies:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>With your consent</li>
              <li>For external processing (e.g., payment processors)</li>
              <li>For legal reasons</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-podar-dark-blue mb-3">4. Information Security</h2>
            <p>
              We work hard to protect our school and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
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

export default PrivacyPolicy;
