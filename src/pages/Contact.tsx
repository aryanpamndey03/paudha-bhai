
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sun, Moon, Globe, Mic, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);

  const translations = {
    en: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      community: "Community",
      aiChat: "AI Chat",
      getInTouch: "Get in Touch",
      contactDesc: "Have questions about our plants or need gardening advice? We'd love to hear from you!",
      email: "Email",
      sendEmail: "Send us an email",
      phone: "Phone",
      callDirect: "Call us directly",
      location: "Location",
      weServe: "We serve across",
      meetTeam: "Meet Our Team",
      founder: "Founder & Plant Expert",
      coFounder: "Co-Founder & Operations Head",
      cto: "Chief Technology Officer",
      marketingHead: "Head of Marketing & Growth",
      voiceAssistant: "Voice Assistant"
    },
    hi: {
      home: "होम",
      shop: "दुकान",
      about: "हमारे बारे में",
      contact: "संपर्क",
      community: "समुदाय",
      aiChat: "AI चैट",
      getInTouch: "संपर्क में रहें",
      contactDesc: "हमारे पौधों के बारे में प्रश्न हैं या बागवानी की सलाह चाहिए? हम आपसे सुनना पसंद करेंगे!",
      email: "ईमेल",
      sendEmail: "हमें एक ईमेल भेजें",
      phone: "फ़ोन",
      callDirect: "हमें सीधे कॉल करें",
      location: "स्थान",
      weServe: "हम सेवा करते हैं",
      meetTeam: "हमारी टीम से मिलें",
      founder: "संस्थापक और पौधे विशेषज्ञ",
      coFounder: "सह-संस्थापक और संचालन प्रमुख",
      cto: "मुख्य प्रौद्योगिकी अधिकारी",
      marketingHead: "विपणन और विकास प्रमुख",
      voiceAssistant: "आवाज सहायक"
    },
    es: {
      home: "Inicio",
      shop: "Tienda",
      about: "Acerca de",
      contact: "Contacto",
      community: "Comunidad",
      aiChat: "Chat IA",
      getInTouch: "Ponte en Contacto",
      contactDesc: "¿Tienes preguntas sobre nuestras plantas o necesitas consejos de jardinería? ¡Nos encantaría saber de ti!",
      email: "Correo",
      sendEmail: "Envíanos un correo",
      phone: "Teléfono",
      callDirect: "Llámanos directamente",
      location: "Ubicación",
      weServe: "Servimos en",
      meetTeam: "Conoce a Nuestro Equipo",
      founder: "Fundador y Experto en Plantas",
      coFounder: "Co-Fundador y Jefe de Operaciones",
      cto: "Director de Tecnología",
      marketingHead: "Jefe de Marketing y Crecimiento",
      voiceAssistant: "Asistente de Voz"
    },
    fr: {
      home: "Accueil",
      shop: "Boutique",
      about: "À propos",
      contact: "Contact",
      community: "Communauté",
      aiChat: "Chat IA",
      getInTouch: "Prendre Contact",
      contactDesc: "Avez-vous des questions sur nos plantes ou besoin de conseils de jardinage? Nous aimerions avoir de vos nouvelles!",
      email: "E-mail",
      sendEmail: "Envoyez-nous un e-mail",
      phone: "Téléphone",
      callDirect: "Appelez-nous directement",
      location: "Emplacement",
      weServe: "Nous servons à travers",
      meetTeam: "Rencontrez Notre Équipe",
      founder: "Fondateur et Expert en Plantes",
      coFounder: "Co-Fondateur et Chef des Opérations",
      cto: "Directeur Technique",
      marketingHead: "Responsable Marketing et Croissance",
      voiceAssistant: "Assistant Vocal"
    }
  };

  const t = translations[language];

  const teamMembers = [
    {
      name: "Sahil Lenka",
      position: t.founder,
      email: "sahillenka44@gmail.com",
      phone: "+91 7439968486",
      description: "Passionate about plants and helping others discover the joy of gardening. Always ready to share knowledge and help you grow your green family."
    },
    {
      name: "Ram Varshney",
      position: t.coFounder,
      email: "ram.varshney@paudhbhai.com",
      phone: "+91 9557391511",
      description: "Expert in business operations and supply chain management. Ensures smooth delivery of healthy plants to customers across India."
    },
    {
      name: "Aryan Pandey",
      position: t.cto,
      email: "aryan.pandey@paudhbhai.com",
      phone: "+91 6969696969",
      description: "Technology enthusiast driving innovation in plant care solutions. Leads our AI-powered plant assistance and digital platform development."
    },
    {
      name: "Aarav Parikh",
      position: t.marketingHead,
      email: "aarav.parikh@paudhbhai.com",
      phone: "+91 9058374838",
      description: "Creative marketing strategist helping plant lovers discover our products. Passionate about building communities and spreading plant awareness."
    }
  ];

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    toast({
      title: "Listening...",
      description: "Speak your navigation command"
    });

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);
      
      // Simple voice navigation
      if (command.includes('home') || command.includes('होम')) {
        window.location.href = '/';
      } else if (command.includes('shop') || command.includes('दुकान')) {
        window.location.href = '/shop';
      } else if (command.includes('about') || command.includes('बारे')) {
        window.location.href = '/about';
      } else if (command.includes('community') || command.includes('समुदाय')) {
        window.location.href = '/community';
      } else if (command.includes('chat') || command.includes('चैट')) {
        window.location.href = '/ai-chat';
      } else {
        toast({
          title: "Command not recognized",
          description: `Try saying: "Go to home", "Open shop", "About page", etc.`
        });
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Could not capture voice input. Please try again.",
        variant: "destructive"
      });
    };
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
              <Link to="/" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.home}</Link>
              <Link to="/shop" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.shop}</Link>
              <Link to="/about" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.about}</Link>
              <Link to="/contact" className="text-foreground hover:text-green-600 transition-colors font-medium">{t.contact}</Link>
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
                className={`w-9 h-9 p-0 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                title={t.voiceAssistant}
              >
                {isListening ? <Volume2 className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
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
            </div>
          </div>
        </div>
      </header>

      {/* Contact Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">{t.getInTouch}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.contactDesc}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border shadow-lg">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t.sendEmail}</p>
                <a 
                  href="mailto:sahillenka44@gmail.com" 
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  sahillenka44@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center border shadow-lg">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t.phone}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t.callDirect}</p>
                <a 
                  href="tel:+917439968486" 
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  +91 7439968486
                </a>
              </CardContent>
            </Card>

            <Card className="text-center border shadow-lg">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t.location}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{t.weServe}</p>
                <p className="text-green-600 font-medium">India</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t.meetTeam}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.position}</p>
                  <p className="text-muted-foreground text-sm mb-6">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="flex items-center justify-center text-green-600 hover:text-green-700 text-sm"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </a>
                    <a 
                      href={`tel:${member.phone}`} 
                      className="flex items-center justify-center text-green-600 hover:text-green-700 text-sm"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {member.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
