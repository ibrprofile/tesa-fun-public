
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import AddProductForm from '@/components/Products/AddProductForm';
import { useLanguage } from '@/context/LanguageContext';

const AddProduct = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-32 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 page-transition-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('add_product_title')}</h1>
            <p className="text-foreground/70">
              {t('add_product_subtitle')}
            </p>
          </div>
          
          <AddProductForm />
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
