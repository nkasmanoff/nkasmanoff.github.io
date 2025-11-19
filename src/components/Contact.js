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
    <section id="contact" className="py-32">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Get in Touch</h2>
        <p className="mb-10 text-muted-foreground">
          You can email me directly at nkasmanoff@gmail.com or use the form below.
        </p>
        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="bg-background" 
              required
            />
          </div>
          <div>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              className="bg-background" 
              required
            />
          </div>
          <div>
            <Textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message" 
              className="bg-background min-h-[150px]" 
              required
            />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
