import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Filter, Search, Globe, Mic, Volume2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CartDrawer from '@/components/CartDrawer';

const Shop = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Extract search term from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location]);

  const translations = {
    en: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      community: "Community",
      aiChat: "AI Chat",
      cart: "Cart",
      shopPlants: "Shop Plants",
      shopDescription: "Discover our amazing collection of healthy plants for your home and garden",
      searchPlants: "Search plants...",
      filter: "Filter",
      showing: "Showing",
      products: "products",
      addToCart: "Add to Cart",
      addedToCart: "Added to cart!",
      addedToWishlist: "Added to wishlist!",
      removedFromWishlist: "Removed from wishlist!",
      voiceAssistant: "Voice Assistant",
      all: "All",
      indoor: "Indoor",
      outdoor: "Outdoor",
      succulent: "Succulent"
    },
    hi: {
      home: "होम",
      shop: "दुकान",
      about: "हमारे बारे में",
      contact: "संपर्क",
      community: "समुदाय",
      aiChat: "AI चैट",
      cart: "कार्ट",
      shopPlants: "पौधे खरीदें",
      shopDescription: "अपने घर और बगीचे के लिए स्वस्थ पौधों का हमारा अद्भुत संग्रह खोजें",
      searchPlants: "पौधे खोजें...",
      filter: "फिल्टर",
      showing: "दिखा रहे हैं",
      products: "उत्पाद",
      addToCart: "कार्त में जोड़ें",
      addedToCart: "कार्त में जोड़ा गया!",
      addedToWishlist: "इच्छा सूची में जोड़ा गया!",
      removedFromWishlist: "इच्छा सूची से हटाया गया!",
      voiceAssistant: "आवाज सहायक",
      all: "सभी",
      indoor: "घरेलू",
      outdoor: "बाहरी",
      succulent: "रसीले"
    },
    es: {
      home: "Inicio",
      shop: "Tienda",
      about: "Acerca de",
      contact: "Contacto",
      community: "Comunidad",
      aiChat: "Chat IA",
      cart: "Carrito",
      shopPlants: "Comprar Plantas",
      shopDescription: "Descubre nuestra increíble colección de plantas saludables para tu hogar y jardín",
      searchPlants: "Buscar plantas...",
      filter: "Filtrar",
      showing: "Mostrando",
      products: "productos",
      addToCart: "Agregar al Carrito",
      addedToCart: "¡Agregado al carrito!",
      addedToWishlist: "¡Agregado a favoritos!",
      removedFromWishlist: "¡Eliminado de favoritos!",
      voiceAssistant: "Asistente Vocal",
      all: "Todos",
      indoor: "Interior",
      outdoor: "Exterior",
      succulent: "Suculenta"
    },
    fr: {
      home: "Accueil",
      shop: "Boutique",
      about: "À propos",
      contact: "Contact",
      community: "Communauté",
      aiChat: "Chat IA",
      cart: "Panier",
      shopPlants: "Acheter des Plantes",
      shopDescription: "Découvrez notre incroyable collection de plantes saines pour votre maison et jardin",
      searchPlants: "Rechercher des plantes...",
      filter: "Filtrer",
      showing: "Affichage",
      products: "produits",
      addToCart: "Ajouter au Panier",
      addedToCart: "Ajouté au panier!",
      addedToWishlist: "Ajouté aux favoris!",
      removedFromWishlist: "Retiré des favoris!",
      voiceAssistant: "Assistant Vocal",
      all: "Tous",
      indoor: "Intérieur",
      outdoor: "Extérieur",
      succulent: "Succulente"
    }
  };

  const t = translations[language];

  const plants = [
    {
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
      name: "Monstera Deliciosa",
      price: "₹1,800",
      originalPrice: "₹2,200",
      rating: 4.8,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=687&auto=format&fit=crop&crop=center",
      name: "Snake Plant",
      price: "₹1,280",
      originalPrice: "₹1,500",
      rating: 4.9,
      category: "Indoor"
    },
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffiddle-leaf-fig&psig=AOvVaw1JPuXIp2Bncl9X67Z051Jp&ust=1750441965722000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMDbvM6G_o0DFQAAAAAdAAAAABAE",
      name: "Fiddle Leaf Fig",
      price: "₹2,600",
      originalPrice: "₹3,000",
      rating: 4.7,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1651940058615-372a3afd6c33?q=80&w=1935&auto=format&fit=crop&crop=center",
      name: "Peace Lily",
      price: "₹1,200",
      originalPrice: "₹1,400",
      rating: 4.6,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=400&fit=crop&crop=center",
      name: "Rubber Plant",
      price: "₹1,500",
      originalPrice: "₹1,800",
      rating: 4.8,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1718857256152-137bce5bd17a?q=80&w=1074&auto=format&fit=crop&crop=center",
      name: "Aloe Vera",
      price: "₹800",
      originalPrice: "₹1,000",
      rating: 4.9,
      category: "Succulent"
    },
    {
      image: "https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?q=80&w=687&auto=format&fit=crop&crop=center",
      name: "Pothos",
      price: "₹900",
      originalPrice: "₹1,100",
      rating: 4.7,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1714507770401-cecd5ff44d1a?q=80&w=1170&auto=format&fit=crop&crop=center",
      name: "ZZ Plant",
      price: "₹1,600",
      originalPrice: "₹1,900",
      rating: 4.8,
      category: "Indoor"
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1670658514057-b9689066af9f?q=80&w=696&auto=format&fit=crop&crop=center",
      name: "Philodendron",
      price: "₹1,300",
      originalPrice: "₹1,550",
      rating: 4.6,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1616189597001-9046fce2594d?q=80&w=735&auto=format&fit=crop&crop=center",
      name: "Jade Plant",
      price: "₹700",
      originalPrice: "₹900",
      rating: 4.5,
      category: "Succulent"
    },
    {
      image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=1074&auto=format&fit=crop&crop=center",
      name: "Spider Plant",
      price: "₹600",
      originalPrice: "₹800",
      rating: 4.7,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1610491536492-cee9f12c860f?q=80&w=627&auto=format&fit=crop&crop=center",
      name: "Boston Fern",
      price: "₹1,100",
      originalPrice: "₹1,300",
      rating: 4.4,
      category: "Indoor"
    },
    {
      image: "https://images.unsplash.com/photo-1696237368688-f677ecefb14f?q=80&w=687&auto=format&fit=crop&crop=center",
      name: "Cactus Mix",
      price: "₹500",
      originalPrice: "₹700",
      rating: 4.8,
      category: "Succulent"
    },
    {
      image: "https://images.unsplash.com/photo-1657922644607-d9df8246e3bc?w=600&auto=format&fit=crop&crop=center",
      name: "Lavender",
      price: "₹1,000",
      originalPrice: "₹1,200",
      rating: 4.9,
      category: "Outdoor"
    }
  ];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || plant.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (plant) => {
    const existingItem = cart.find(item => item.name === plant.name);
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === plant.name 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...plant, quantity: 1 }]);
    }
    toast({
      title: t.addedToCart,
      description: `${plant.name} - ${plant.price}`,
    });
  };

  const handleUpdateQuantity = (name, quantity) => {
    setCart(cart.map(item => 
      item.name === name ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (name) => {
    setCart(cart.filter(item => item.name !== name));
  };

  const handleToggleWishlist = (plant) => {
    const isInWishlist = wishlist.some(item => item.name === plant.name);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.name !== plant.name));
      toast({
        title: t.removedFromWishlist,
        description: plant.name,
      });
    } else {
      setWishlist([...wishlist, plant]);
      toast({
        title: t.addedToWishlist,
        description: plant.name,
      });
    }
  };

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log('Voice command:', command);
      
      // Enhanced plant search in voice commands
      const plantNames = ['monstera', 'snake plant', 'fiddle leaf', 'peace lily', 'rubber plant', 'aloe vera', 'pothos', 'zz plant', 'philodendron', 'jade plant', 'spider plant', 'boston fern', 'cactus', 'lavender'];
      const foundPlant = plantNames.find(plant => command.includes(plant));
      
      if (foundPlant) {
        setSearchTerm(foundPlant);
        toast({
          title: "Voice Search",
          description: `Searching for "${foundPlant}"`,
        });
      } else if (command.includes('home') || command.includes('होम') || command.includes('inicio') || command.includes('accueil')) {
        window.location.href = '/';
      } else if (command.includes('about') || command.includes('हमारे बारे में') || command.includes('acerca') || command.includes('à propos')) {
        window.location.href = '/about';
      } else if (command.includes('contact') || command.includes('संपर्क') || command.includes('contacto')) {
        window.location.href = '/contact';  
      } else if (command.includes('community') || command.includes('समुदाय') || command.includes('comunidad') || command.includes('communauté')) {
        window.location.href = '/community';
      } else if (command.includes('ai chat') || command.includes('chatbot') || command.includes('chat ia')) {
        window.location.href = '/ai-chat';
      } else if (command.includes('search') || command.includes('खोज') || command.includes('buscar') || command.includes('rechercher')) {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/5d45b831-8bef-4a01-941e-60e75e8bc270.png" 
                alt="Paudha Bhai" 
                className="h-24 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300 brightness-110 contrast-125"
              />
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.home}</Link>
              <Link to="/shop" className="text-foreground hover:text-green-600 transition-colors font-medium">{t.shop}</Link>
              <Link to="/about" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.about}</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.contact}</Link>
              <Link to="/community" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.community}</Link>
              <Link to="/ai-chat" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.aiChat}</Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20">
                  <Globe className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="hi">हिं</SelectItem>
                  <SelectItem value="es">ES</SelectItem>
                  <SelectItem value="fr">FR</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceCommand}
                className={`w-9 h-9 p-0 ${isListening ? 'text-red-500' : ''}`}
                title={t.voiceAssistant}
              >
                {isListening ? <Volume2 className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 p-0"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 relative"
                onClick={() => setIsCartOpen(true)}
              >
                {t.cart} ({getTotalCartItems()})
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Shop Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.shopPlants}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.shopDescription}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  className="pl-10 w-64" 
                  placeholder={t.searchPlants}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  {t.filter}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="indoor">{t.indoor}</SelectItem>
                  <SelectItem value="outdoor">{t.outdoor}</SelectItem>
                  <SelectItem value="succulent">{t.succulent}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {t.showing} {filteredPlants.length} {t.products}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant, index) => (
              <Card key={index} className="border shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`absolute top-4 right-4 bg-background/90 backdrop-blur-sm hover:bg-background ${
                        wishlist.some(item => item.name === plant.name) ? 'text-red-500' : ''
                      }`}
                      onClick={() => handleToggleWishlist(plant)}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.some(item => item.name === plant.name) ? 'fill-current' : ''}`} />
                    </Button>
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {plant.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(plant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">({plant.rating})</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-card-foreground">{plant.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">{plant.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{plant.originalPrice}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAddToCart(plant)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t.addToCart}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        language={language}
      />
    </div>
  );
};

export default Shop;
