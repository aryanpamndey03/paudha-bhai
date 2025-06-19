import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, Mic, Volume2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from '@/components/UserMenu';

const Index = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);

  const translations = {
    en: {
      home: "Home",
      shop: "Shop", 
      about: "About",
      contact: "Contact",
      community: "Community",
      aiChat: "AI Chat",
      heroTitle: "Welcome to Paudha Bhai",
      heroSubtitle: "Your trusted companion for all things plants! Discover, grow, and nurture your green paradise with expert guidance and premium quality plants.",
      searchPlaceholder: "Search for plants...",
      shopNow: "Shop Now",
      exploreCollection: "Explore Our Collection",
      featuredPlants: "Featured Plants",
      whyChooseUs: "Why Choose Paudha Bhai?",
      expertGuidance: "Expert Guidance",
      expertGuidanceDesc: "Get personalized advice from our plant experts to help your garden thrive.",
      qualityPlants: "Quality Plants",
      qualityPlantsDesc: "We source only the healthiest plants to ensure your garden's success.",
      communitySupport: "Community Support",
      communitySupportDesc: "Join our vibrant community of plant lovers and share your gardening journey.",
      voiceAssistant: "Voice Assistant"
    },
    hi: {
      home: "होम",
      shop: "दुकान",
      about: "हमारे बारे में", 
      contact: "संपर्क",
      community: "समुदाय",
      aiChat: "AI चैट",
      heroTitle: "पौधा भाई में आपका स्वागत है",
      heroSubtitle: "पौधों की दुनिया में आपका भरोसेमंद साथी! विशेषज्ञ मार्गदर्शन और प्रीमियम गुणवत्ता वाले पौधों के साथ अपना हरा स्वर्ग खोजें, उगाएं और पोषित करें।",
      searchPlaceholder: "पौधे खोजें...",
      shopNow: "अभी खरीदें",
      exploreCollection: "हमारा संग्रह देखें",
      featuredPlants: "चुनिंदा पौधे",
      whyChooseUs: "पौधा भाई क्यों चुनें?",
      expertGuidance: "विशेषज्ञ मार्गदर्शन",
      expertGuidanceDesc: "अपने बगीचे को फलने-फूलने में मदद के लिए हमारे पौधों के विशेषज्ञों से व्यक्तिगत सलाह लें।",
      qualityPlants: "गुणवत्तापूर्ण पौधे",
      qualityPlantsDesc: "हम आपके बगीचे की सफलता सुनिश्चित करने के लिए केवल स्वास्थ्यप्रद पौधों का स्रोत करते हैं।",
      communitySupport: "समुदायिक सहयोग",
      communitySupportDesc: "पौधों के प्रेमियों के हमारे जीवंत समुदाय में शामिल हों और अपनी बागवानी यात्रा साझा करें।",
      voiceAssistant: "आवाज सहायक"
    },
    es: {
      home: "Inicio",
      shop: "Tienda",
      about: "Acerca de",
      contact: "Contacto", 
      community: "Comunidad",
      aiChat: "Chat IA",
      heroTitle: "Bienvenido a Paudha Bhai",
      heroSubtitle: "¡Tu compañero de confianza para todo lo relacionado con plantas! Descubre, cultiva y nutre tu paraíso verde con orientación experta y plantas de calidad premium.",
      searchPlaceholder: "Buscar plantas...",
      shopNow: "Comprar Ahora",
      exploreCollection: "Explorar Nuestra Colección",
      featuredPlants: "Plantas Destacadas",
      whyChooseUs: "¿Por Qué Elegir Paudha Bhai?",
      expertGuidance: "Orientación Experta",
      expertGuidanceDesc: "Obtén consejos personalizados de nuestros expertos en plantas para ayudar a que tu jardín prospere.",
      qualityPlants: "Plantas de Calidad",
      qualityPlantsDesc: "Solo obtenemos las plantas más saludables para asegurar el éxito de tu jardín.",
      communitySupport: "Apoyo Comunitario",
      communitySupportDesc: "Únete a nuestra vibrante comunidad de amantes de las plantas y comparte tu viaje de jardinería.",
      voiceAssistant: "Asistente Vocal"
    },
    fr: {
      home: "Accueil",
      shop: "Boutique",
      about: "À propos",
      contact: "Contact",
      community: "Communauté", 
      aiChat: "Chat IA",
      heroTitle: "Bienvenue chez Paudha Bhai",
      heroSubtitle: "Votre compagnon de confiance pour tout ce qui concerne les plantes ! Découvrez, cultivez et nourrissez votre paradis vert avec des conseils d'experts et des plantes de qualité premium.",
      searchPlaceholder: "Rechercher des plantes...",
      shopNow: "Acheter Maintenant",
      exploreCollection: "Explorer Notre Collection",
      featuredPlants: "Plantes en Vedette",
      whyChooseUs: "Pourquoi Choisir Paudha Bhai ?",
      expertGuidance: "Orientation d'Expert",
      expertGuidanceDesc: "Obtenez des conseils personnalisés de nos experts en plantes pour aider votre jardin à prospérer.",
      qualityPlants: "Plantes de Qualité",
      qualityPlantsDesc: "Nous ne nous approvisionnons qu'avec les plantes les plus saines pour assurer le succès de votre jardin.",
      communitySupport: "Soutien Communautaire",
      communitySupportDesc: "Rejoignez notre communauté dynamique d'amateurs de plantes et partagez votre parcours de jardinage.",
      voiceAssistant: "Assistant Vocal"
    }
  };

  const t = translations[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
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
      
      if (command.includes('shop') || command.includes('दुकान') || command.includes('tienda') || command.includes('boutique')) {
        navigate('/shop');
      } else if (command.includes('about') || command.includes('हमारे बारे में') || command.includes('acerca') || command.includes('à propos')) {
        navigate('/about');
      } else if (command.includes('contact') || command.includes('संपर्क') || command.includes('contacto')) {
        navigate('/contact');
      } else if (command.includes('community') || command.includes('समुदाय') || command.includes('comunidad') || command.includes('communauté')) {
        navigate('/community');
      } else if (command.includes('ai chat') || command.includes('chatbot') || command.includes('chat ia')) {
        navigate('/ai-chat');
      } else if (command.includes('search') || command.includes('खोज') || command.includes('buscar') || command.includes('rechercher')) {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      } else {
        setSearchTerm(command);
        navigate(`/shop?search=${encodeURIComponent(command)}`);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
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
              <Link to="/" className="text-foreground hover:text-green-600 transition-colors font-medium">{t.home}</Link>
              <Link to="/shop" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.shop}</Link>
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

              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t.heroSubtitle}
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  className="pl-12 pr-24 py-6 text-lg rounded-full border-2 shadow-lg" 
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t.shopNow}
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full shadow-lg hover:bg-green-50 dark:hover:bg-green-950/20">
                  {t.exploreCollection}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">{t.featuredPlants}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
                name: "Monstera Deliciosa",
                price: "₹1,800"
              },
              {
                image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop&crop=center", 
                name: "Snake Plant",
                price: "₹1,280"
              },
              {
                image: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=400&fit=crop&crop=center",
                name: "Fiddle Leaf Fig", 
                price: "₹2,600"
              }
            ].map((plant, index) => (
              <div key={index} className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{plant.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">{plant.price}</p>
                  <Link to="/shop">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      {t.shopNow}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">{t.whyChooseUs}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.expertGuidance}</h3>
              <p className="text-muted-foreground">{t.expertGuidanceDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.qualityPlants}</h3>
              <p className="text-muted-foreground">{t.qualityPlantsDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.communitySupport}</h3>
              <p className="text-muted-foreground">{t.communitySupportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/lovable-uploads/5d45b831-8bef-4a01-941e-60e75e8bc270.png" 
                alt="Paudha Bhai" 
                className="h-16 w-auto mb-4"
              />
              <p className="text-muted-foreground">
                Your trusted companion for all things plants!
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-muted-foreground hover:text-green-600">{t.home}</Link>
                <Link to="/shop" className="block text-muted-foreground hover:text-green-600">{t.shop}</Link>
                <Link to="/about" className="block text-muted-foreground hover:text-green-600">{t.about}</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-green-600">{t.contact}</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Community</h3>
              <div className="space-y-2">
                <Link to="/community" className="block text-muted-foreground hover:text-green-600">{t.community}</Link>
                <Link to="/ai-chat" className="block text-muted-foreground hover:text-green-600">{t.aiChat}</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: hello@paudhaBhai.com</p>
                <p>Phone: +91 12345 67890</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Paudha Bhai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
