import React, { useState } from 'react';
import { Shield, FileText, Building, Users, Phone, Mail, MapPin, CheckCircle, Award, Briefcase, CreditCard, Receipt, IdCard } from 'lucide-react';

// Registrations & Certifications data
const registrations = [
  { name: 'Labour', icon: <Users className="w-6 h-6" /> },
  { name: 'Police Licence (PSARA)', icon: <Shield className="w-6 h-6" /> },
  { name: "Employee's State Insurance (ESI)", icon: <Briefcase className="w-6 h-6" /> },
  { name: "Employees Provident Fund (EPF)", icon: <Award className="w-6 h-6" /> },
  { name: 'Labour Identification Number (LIN)', icon: <IdCard className="w-6 h-6" /> },
  { name: 'Goods & Service Tax (GST)', icon: <Receipt className="w-6 h-6" /> },
  { name: 'Profession Tax', icon: <FileText className="w-6 h-6" /> },
  { name: 'Permanent Account Number (PAN)', icon: <CreditCard className="w-6 h-6" /> },
];

function About() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 1️⃣ Hero Title Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.01] bg-grid-16"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              About Us
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-indigo-200 dark:text-indigo-300 max-w-4xl mx-auto leading-relaxed">
              Global Commitment towards Best Security Services
            </p>
          </div>
        </div>
      </section>

      {/* 2️⃣ About Company Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Our Company</span>
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                We Are A Leading Security Manpower Consultant From Bengaluru, With A Deep-Rooted Work Culture And Reputation. We Have Grown To Be The Most Sought After Service Providers For Various Sectors.
              </p>
              <p>
                We Fulfil Our Client's Requirements With Utmost Care By Providing The Assistance Of An Ideal Professional For Their Needs. Global Security Services Has Marked Its Presence In Most Of The Industries By Now Through Extending Its Unique Assistance With Great Care.
              </p>
            </div>
          </div>
          
          {/* Image Placeholder */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-20 h-20 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Security Services Image</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 dark:bg-yellow-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 dark:bg-blue-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Registrations & Certifications Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              {/* <Certificate className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" /> */}
              <span className="text-sm font-semibold text-green-600 dark:text-green-300">Certifications</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Global Security Services Is Registered With Various Government Departments.
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
            {registrations.map((registration, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {registration.icon}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {registration.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Enquiry Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-full mb-6">
            <Mail className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-300">Contact</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Enquire Now
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up animation-delay-200">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                  <span>+91 98765 43210</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                  <span>info@globalsecurity.com</span>
                </div>
                
                <div className="flex items-start text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-gray-900 dark:text-white">SUKUMAR APARTMENT</span>
                    <span className="block">GROUND FLOOR</span>
                    <span className="block">SUBHAS PALLY, BENACHITY</span>
                    <span className="block">DURGAPUR – 713213</span>
                    <span className="mt-2 block text-sm text-gray-700 dark:text-gray-300">UDYAM-WB-23-0002303</span>
                    <span className="block text-sm text-gray-700 dark:text-gray-300">GSTIN/UIN: 19AAQFP0656F1ZY</span>
                    <span className="block text-sm text-gray-700 dark:text-gray-300">State Name: West Bengal, Code: 19</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enquiry Form */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-400">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Tell us about your security requirements..."
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  
                  {submitSuccess && (
                    <div className="flex items-center text-green-600 dark:text-green-400 animate-fade-in-up">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Message sent successfully!</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;