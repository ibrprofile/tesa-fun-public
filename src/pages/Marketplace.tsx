
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import ProductGrid from '@/components/Home/ProductGrid';

const Marketplace = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 page-transition-in">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold mb-3">Virtual Marketplace</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover and purchase unique virtual gifts and digital stars
            </p>
          </div>
          
          <ProductGrid 
            title="All Products" 
            subtitle="Browse our complete collection of virtual items"
          />
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
