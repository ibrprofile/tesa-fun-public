
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Button from '@/components/common/Button';
import { Eye, EyeOff, Mail, Lock, User, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    console.log(isLogin ? "Login with:" : "Register with:", formValues);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-16 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 page-transition-in">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Form */}
              <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="text-center md:text-left mb-8">
                  <h1 className="text-2xl font-bold mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Your Account'}
                  </h1>
                  <p className="text-foreground/70">
                    {isLogin 
                      ? 'Sign in to your TESA Fun account' 
                      : 'Join TESA Fun and start selling virtual goods'}
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                            First Name
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                              <User size={18} />
                            </span>
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={formValues.firstName}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                            Last Name
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                              <User size={18} />
                            </span>
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={formValues.lastName}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium mb-1">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                            <Calendar size={18} />
                          </span>
                          <input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            value={formValues.birthDate}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                        <Mail size={18} />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                        <Lock size={18} />
                      </span>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formValues.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                        placeholder="********"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground/50 hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {!isLogin && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                          <Lock size={18} />
                        </span>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formValues.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                          placeholder="********"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 border-border rounded bg-secondary/50 focus:ring-primary"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/80">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-foreground/60">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="w-full py-2 px-4 border border-border rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="w-full py-2 px-4 border border-border rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="#0077FF">
                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 16.549h-1.672c-.63 0-.823-.503-1.949-1.657-1.012-1.012-1.414-1.126-1.655-1.126-.336 0-.436.096-.436.566v1.51c0 .394-.203.63-.752.63-1.126 0-2.252-.096-3.486-1.34-1.725-1.792-2.737-4.2-2.737-4.53 0-.244.096-.473.566-.473h1.657c.415 0 .566.185.724.63.63 1.947 1.676 3.674 2.106 3.674.16 0 .236-.08.236-.503V11.14c-.048-1.012-.57-1.1-.57-1.462 0-.185.16-.37.415-.37h2.609c.352 0 .473.185.473.63v2.609c0 .28.12.377.2.377.159 0 .3-.097.6-.397.932-1.037 1.6-2.609 1.6-2.609.08-.185.27-.47.652-.47h1.676c.5 0 .607.244.5.532-.188.875-1.998 3.418-1.998 3.418-.16.244-.224.36 0 .632.16.213.7.632 1.05 1.012.692.76 1.21 1.394 1.35 1.838.16.395-.08.595-.507.595z"/>
                      </svg>
                      VK
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-sm text-foreground/70">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </div>
              
              {/* Right Side - Image/Info */}
              <div className="hidden md:block w-1/2 bg-gradient-to-br from-primary/20 to-primary p-12 flex flex-col justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    {isLogin ? 'Welcome Back to TESA Fun' : 'Join the TESA Fun Community'}
                  </h2>
                  <p className="mb-6 text-white/80">
                    {isLogin 
                      ? 'Access your account to manage your virtual goods store and connect with customers.'
                      : 'Create your own virtual goods store and start selling digital products today.'}
                  </p>
                  <div className="flex flex-col space-y-4 items-center">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg w-full max-w-xs text-left">
                      <h3 className="font-medium text-white mb-1">Create Your Store</h3>
                      <p className="text-sm text-white/70">Set up your own store and start selling virtual goods immediately.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg w-full max-w-xs text-left">
                      <h3 className="font-medium text-white mb-1">Secure Transactions</h3>
                      <p className="text-sm text-white/70">Our platform ensures safe and secure transactions between buyers and sellers.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg w-full max-w-xs text-left">
                      <h3 className="font-medium text-white mb-1">Connect with Customers</h3>
                      <p className="text-sm text-white/70">Use our built-in messaging system to communicate with your customers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
