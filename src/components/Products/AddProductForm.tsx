
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { categoryAPI } from '@/api';
import { getCurrency, getPaymentMethods, PaymentMethod } from '@/api/currency';

interface Category {
  id: number;
  name: string;
  nameEn: string;
  nameRu: string;
}

interface ProductFormData {
  titleRu: string;
  titleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  price: number;
  quantity: number;
  categoryId: string;
  currencyCode: string;
  paymentMethodId: string;
}

const AddProductForm = () => {
  const { toast } = useToast();
  const { language, t, currencies } = useLanguage();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      titleRu: '',
      titleEn: '',
      descriptionRu: '',
      descriptionEn: '',
      price: 0,
      quantity: 1,
      categoryId: '',
      currencyCode: 'RUB',
      paymentMethodId: '',
    },
  });
  
  // Load categories and payment methods
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load categories
        const categoriesData = await categoryAPI.getCategories();
        const formattedCategories = categoriesData.map(cat => ({
          id: cat.id,
          name: cat.name,
          nameEn: cat.name, // In a real app, these would be separate fields in the API
          nameRu: cat.name
        }));
        setCategories(formattedCategories);
        
        // Load payment methods
        const paymentMethodsData = await getPaymentMethods();
        setPaymentMethods(paymentMethodsData);
      } catch (error) {
        console.error('Failed to load form data:', error);
      }
    };
    
    loadData();
  }, []);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      
      // Convert FileList to array and limit to 10 images
      const filesArray = Array.from(files).slice(0, 10 - screenshotPreviews.length);
      
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          // Update state when all files are processed
          if (newPreviews.length === filesArray.length) {
            setScreenshotPreviews([...screenshotPreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const removeScreenshot = (index: number) => {
    setScreenshotPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: ProductFormData) => {
    // Here we would normally send the data to the server
    // For now, we'll just show a toast message
    console.log("Product data:", data);
    console.log("Logo:", logoPreview);
    console.log("Screenshots:", screenshotPreviews);
    
    toast({
      title: t('product_added'),
      description: t('product_added_desc').replace('{title}', language === 'ru' ? data.titleRu : data.titleEn),
      variant: "default",
    });
    
    // Reset form
    form.reset();
    setLogoPreview(null);
    setScreenshotPreviews([]);
  };
  
  return (
    <div className="glass rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">{t('add_product')}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="titleRu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_name_ru')} *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('product_name_ru')} 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="titleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_name_en')} *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('product_name_en')} 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="descriptionRu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description_ru')} *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('description_ru')} 
                    className="min-h-32" 
                    {...field} 
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description_en')} *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('description_en')} 
                    className="min-h-32" 
                    {...field} 
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('price')} *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currencyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('currency')} *</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('currency')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('quantity')} *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      placeholder="1" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('category')} *</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('category')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {language === 'ru' ? category.nameRu : category.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentMethodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('payment_method')} *</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('payment_method')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map(method => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <Label htmlFor="logo">{t('product_logo')}</Label>
            <div className="mt-1">
              {logoPreview ? (
                <div className="relative w-32 h-32 overflow-hidden rounded-lg mb-2">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setLogoPreview(null)}
                    className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="block w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors flex flex-col items-center justify-center">
                  <Upload size={24} className="text-foreground/50 mb-2" />
                  <span className="text-sm text-foreground/70">{t('upload')}</span>
                  <input 
                    id="logo" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleLogoChange} 
                  />
                </label>
              )}
            </div>
          </div>
          
          <div>
            <Label>{t('screenshots')}</Label>
            <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {screenshotPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img src={preview} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeScreenshot(index)}
                    className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {screenshotPreviews.length < 10 && (
                <label className="block aspect-[4/3] border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors flex flex-col items-center justify-center">
                  <Plus size={24} className="text-foreground/50 mb-1" />
                  <span className="text-xs text-foreground/70">{t('add')}</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    multiple 
                    onChange={handleScreenshotsChange} 
                  />
                </label>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full md:w-auto">
            {t('add_product_button')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
