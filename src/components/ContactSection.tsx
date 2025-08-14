import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", color: "blue-600" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "blue-600" },
  { icon: Twitter, label: "Twitter", href: "#", color: "blue-600" },
  { icon: Mail, label: "Email", href: "mailto:joyvaghela66@gmail.com", color: "blue-600" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "joyvaghela66@gmail.com", color: "blue-600" },
  { icon: Phone, label: "Phone", value: "+91 9173808700", color: "blue-600" },
  { icon: MapPin, label: "Location", value: "Vadodara,Gujrat, India", color: "blue-600" },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6 animate-fade-up">
            Let's Connect
          </h2>
          <p className="text-xl text-blue-700 animate-scale-in">
            Ready to create something amazing together?
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-4 animate-scale-in" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Send a Message
              </h3>
              <p className="text-blue-600">
                Have a project in mind? Let's discuss how we can bring your ideas to life!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700">Your Name</label>
                <div className="relative">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 placeholder:text-blue-400 focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700">Your Email</label>
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 placeholder:text-blue-400 focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700">Your Message</label>
                <div className="relative">
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 placeholder:text-blue-400 focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full relative overflow-hidden font-bold text-lg py-6 rounded-2xl transition-all duration-500 ${
                  submitted 
                    ? 'bg-green-500 text-white' 
                    : isSubmitting 
                    ? 'bg-blue-400 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-bounce">🎉</span>
                    Message Sent Successfully!
                    <span className="animate-bounce">🎉</span>
                  </span>
                ) : isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-2xl animate-bounce">📧</span>
                    Sending Message...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <span className="animate-bounce">📤</span>
                  </span>
                )}
              </Button>
            </form>

            {/* Success Animation */}
            {submitted && (
              <div className="text-center">
                <div className="inline-block animate-bounce text-6xl mb-4">🎊</div>
                <p className="text-green-600 font-bold">
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Cards */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Get in Touch
              </h3>
              
              {contactInfo.map((contact, index) => (
                <div
                  key={contact.label}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <contact.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-600/70">{contact.label}</div>
                      <div className="font-semibold text-lg text-blue-700">{contact.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-center text-blue-700">Follow My Journey</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <social.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 group-hover:animate-bounce" />
                    <div className="font-semibold text-blue-700">{social.label}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-green-600">Available for Projects</span>
              </div>
              <p className="text-sm text-blue-600/70">
                Currently accepting new opportunities and collaborations
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <h4 className="font-bold mb-4 text-center text-blue-700">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-blue-600">24h</div>
                  <div className="text-xs text-blue-600/70">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600">100%</div>
                  <div className="text-xs text-blue-600/70">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};