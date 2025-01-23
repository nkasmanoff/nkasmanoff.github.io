// components/Contact.js
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:nkasmanoff@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-cyan-400">Get in Touch</h2>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 text-slate-900 dark:text-gray-300 placeholder:text-slate-500 dark:placeholder:text-gray-500" 
            required
          />
        </div>
        <div className="mb-4">
          <Input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 text-slate-900 dark:text-gray-300 placeholder:text-slate-500 dark:placeholder:text-gray-500" 
            required
          />
        </div>
        <div className="mb-4">
          <Textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 text-slate-900 dark:text-gray-300 placeholder:text-slate-500 dark:placeholder:text-gray-500" 
            required
          />
        </div>
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600">Send Message</Button>
      </form>
    </section>
  );
};

export default Contact;