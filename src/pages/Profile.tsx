import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import { User, Mail, Calendar, PenSquare, Settings, Package, MessageCircle, Heart, LogOut, Plus } from 'lucide-react';
import Button from '@/components/common/Button';
import ProductCard, { Product } from '@/components/Home/ProductCard';
import { Link } from 'react-router-dom';

// Mock user data
const mockUser = {
  id: 101,
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  birthDate: "1990-05-15",
  storeName: "Digital Stars Shop",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  registrationDate: "2023-06-10T14:30:00"
};

// Mock user products
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Premium Star Package",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000",
    seller: {
      name: mockUser.storeName,
      avatar: mockUser.avatar
    },
    likes: 245,
    views: 1204,
    category: "Stars"
  },
  {
    id: 2,
    title: "Deluxe Gift Box",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000",
    seller: {
      name: mockUser.storeName,
      avatar: mockUser.avatar
    },
    likes: 189,
    views: 876,
    category: "Gifts"
  },
  {
    id: 3,
    title: "VIP Diamond Stars",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000",
    seller: {
      name: mockUser.storeName,
      avatar: mockUser.avatar
    },
    likes: 421,
    views: 2304,
    category: "Stars"
  }
];

type TabType = 'products' | 'favorites' | 'messages' | 'settings';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to the server
    console.log("Saving profile:", userData);
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navbar />
      
      <main className="pt-32 container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 page-transition-in">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-8">
            {/* Profile Header/Banner */}
            <div className="h-48 rounded-xl overflow-hidden glass">
              <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/40"></div>
            </div>
            
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12 px-4 md:px-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background glass">
                  <img 
                    src={userData.avatar} 
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"
                    aria-label="Change profile picture"
                  >
                    <PenSquare size={14} />
                  </button>
                )}
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h1 className="text-2xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-foreground/70 mb-2">{userData.storeName}</p>
                <p className="text-sm text-foreground/60">
                  Member since {new Date(userData.registrationDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long'
                  })}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-auto">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    icon={<PenSquare size={16} />} 
                    iconPosition="left"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="md:col-span-1">
              <div className="glass rounded-xl overflow-hidden">
                <nav className="flex flex-col">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center px-4 py-3 text-left transition-colors ${
                      activeTab === 'products' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <Package size={18} className="mr-3" />
                    <span>My Products</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`flex items-center px-4 py-3 text-left transition-colors ${
                      activeTab === 'favorites' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <Heart size={18} className="mr-3" />
                    <span>Favorites</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex items-center px-4 py-3 text-left transition-colors ${
                      activeTab === 'messages' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <MessageCircle size={18} className="mr-3" />
                    <span>Messages</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center px-4 py-3 text-left transition-colors ${
                      activeTab === 'settings' 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    className="flex items-center px-4 py-3 text-left hover:bg-destructive/10 hover:text-destructive transition-colors mt-auto"
                  >
                    <LogOut size={18} className="mr-3" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile & Settings Form */}
              {activeTab === 'settings' && (
                <div className="glass rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            value={userData.firstName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                            placeholder="John"
                            disabled={!isEditing}
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
                            value={userData.lastName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                            placeholder="Doe"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                    
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
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                          placeholder="your@email.com"
                          disabled={!isEditing}
                        />
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
                          value={userData.birthDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="storeName" className="block text-sm font-medium mb-1">
                        Store Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground/50">
                          <Package size={18} />
                        </span>
                        <input
                          id="storeName"
                          name="storeName"
                          type="text"
                          value={userData.storeName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all"
                          placeholder="Your Store Name"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">My Products</h2>
                    <Button 
                      icon={<Plus size={18} />}
                      iconPosition="left"
                    >
                      Add New Product
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        className="animate-fade-in"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Favorites</h2>
                  <div className="glass rounded-xl p-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-secondary/80 flex items-center justify-center mb-4">
                      <Heart size={24} className="text-foreground/50" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
                    <p className="text-foreground/70 mb-6">
                      You haven't added any products to your favorites yet.
                    </p>
                    <Link to="/marketplace">
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Browse Marketplace
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Messages</h2>
                  <div className="glass rounded-xl p-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-secondary/80 flex items-center justify-center mb-4">
                      <MessageCircle size={24} className="text-foreground/50" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
                    <p className="text-foreground/70 mb-6">
                      Your inbox is empty. Messages from buyers and sellers will appear here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
