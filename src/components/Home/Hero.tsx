
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            Virtual Marketplace
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance animate-slide-up [animation-delay:0.1s]">
            The Marketplace for <span className="text-primary">Virtual Gifts</span> and Digital Stars
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto text-balance animate-slide-up [animation-delay:0.2s]">
            Create a shop, sell digital goods, and connect with customers through our secure platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:0.3s]">
            <Link to="/marketplace">
              <Button 
                size="lg" 
                icon={<ArrowRight size={18} />} 
                iconPosition="right"
              >
                Explore Marketplace
              </Button>
            </Link>
            
            <Link to="/auth">
              <Button 
                variant="outline" 
                size="lg"
              >
                Create Your Shop
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center animate-fade-in [animation-delay:0.4s]">
          <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-primary mb-1">1K+</h3>
            <p className="text-sm text-foreground/70">Virtual Products</p>
          </div>
          
          <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-primary mb-1">5K+</h3>
            <p className="text-sm text-foreground/70">Happy Users</p>
          </div>
          
          <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-primary mb-1">99%</h3>
            <p className="text-sm text-foreground/70">Successful Trades</p>
          </div>
          
          <div className="p-6 rounded-xl bg-secondary/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-primary mb-1">24/7</h3>
            <p className="text-sm text-foreground/70">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
