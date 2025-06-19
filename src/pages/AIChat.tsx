import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Camera, Mic, Volume2, Sun, Moon, Globe, Leaf, Bug, Lightbulb, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { pipeline } from '@huggingface/transformers';

const AIChat = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiModel, setAiModel] = useState('text-generation');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(100);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aiPipeline, setAiPipeline] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI plant assistant powered by open-source models running locally in your browser. No API keys required! I can help you identify plant diseases, provide care tips, and answer plant-related questions. How can I help you today?',
      timestamp: new Date(),
      model: 'local-ai'
    }
  ]);
  const messagesEndRef = useRef(null);

  // Enhanced AI response generation with local models
  const generateAIResponse = async (userMessage) => {
    if (!aiPipeline) {
      return generatePlantResponse(userMessage);
    }

    try {
      const plantContext = `You are an expert plant care assistant. Provide helpful, accurate advice about plant care, disease identification, and gardening. Be concise and practical. User question: ${userMessage}`;
      
      let response;
      if (aiModel === 'text-generation') {
        const result = await aiPipeline(plantContext, {
          max_new_tokens: maxTokens,
          temperature: temperature,
          do_sample: true,
        });
        response = result[0].generated_text.replace(plantContext, '').trim();
      } else if (aiModel === 'text2text-generation') {
        const result = await aiPipeline(plantContext, {
          max_length: maxTokens,
          temperature: temperature,
        });
        response = result[0].generated_text;
      } else {
        const result = await aiPipeline(userMessage, {
          max_length: maxTokens,
          temperature: temperature,
        });
        response = result.generated_text;
      }

      return response || generatePlantResponse(userMessage);
    } catch (error) {
      console.error('AI model error:', error);
      return generatePlantResponse(userMessage);
    }
  };

  // Fallback plant knowledge base
  const generatePlantResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    const plantKnowledge = {
      diseases: {
        'yellow leaves': 'Yellow leaves often indicate overwatering, nutrient deficiency, or natural aging. Check soil moisture and reduce watering if soil is soggy.',
        'brown spots': 'Brown spots on leaves can indicate fungal diseases, bacterial infections, or sun damage. Ensure good air circulation and avoid getting water on leaves.',
        'wilting': 'Wilting can be caused by underwatering, overwatering, root rot, or extreme temperatures. Check soil moisture and adjust watering accordingly.'
      },
      care: {
        'watering': 'Most houseplants prefer to dry out slightly between waterings. Check soil with your finger - water when top inch is dry.',
        'light': 'Different plants have different light requirements. Most houseplants prefer bright, indirect light.',
        'fertilizer': 'Feed houseplants monthly during growing season (spring/summer) with diluted liquid fertilizer.'
      }
    };

    // Check for disease-related queries
    for (const [condition, advice] of Object.entries(plantKnowledge.diseases)) {
      if (message.includes(condition)) {
        return advice;
      }
    }
    
    // Check for care-related queries
    if (message.includes('care') || message.includes('how to')) {
      for (const [topic, advice] of Object.entries(plantKnowledge.care)) {
        if (message.includes(topic)) {
          return advice;
        }
      }
    }
    
    return "I'd be happy to help with your plant question! Can you provide more details about your specific situation?";
  };

  // Initialize AI model
  const initializeAIModel = async (modelType) => {
    setIsModelLoading(true);
    try {
      let modelName;
      switch (modelType) {
        case 'text-generation':
          modelName = 'onnx-community/Phi-3-mini-4k-instruct-onnx-web';
          break;
        case 'conversational':
          modelName = 'microsoft/DialoGPT-medium';
          break;
        case 'text2text-generation':
          modelName = 'google/flan-t5-small';
          break;
        default:
          modelName = 'onnx-community/Phi-3-mini-4k-instruct-onnx-web';
      }

      const pipe = await pipeline(modelType, modelName, {
        device: 'webgpu',
        dtype: 'fp16'
      });
      
      setAiPipeline(pipe);
      toast({
        title: "AI Model Loaded",
        description: "Local AI model is ready to help with your plant questions!"
      });
    } catch (error) {
      console.error('Error loading AI model:', error);
      toast({
        title: "Model Loading Failed",
        description: "Falling back to rule-based responses",
        variant: "destructive"
      });
    } finally {
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    initializeAIModel(aiModel);
  }, [aiModel]);

  const translations = {
    en: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      community: "Community",
      aiChat: "AI Chat",
      aiChatTitle: "Open Source AI Plant Assistant",
      aiChatDesc: "Get expert advice powered by open-source AI models running locally in your browser - no API keys required!",
      typeMessage: "Type your message...",
      uploadPhoto: "Upload Photo",
      voiceInput: "Voice Input",
      suggestions: "Quick Suggestions",
      identifyDisease: "Identify plant disease",
      careTips: "Get care tips for my plant",
      troubleshoot: "My plant looks unhealthy",
      voiceAssistant: "Voice Assistant",
      you: "You",
      aiAssistant: "AI Assistant",
      model: "AI Model",
      temperature: "Creativity",
      maxTokens: "Response Length",
      advanced: "Advanced Settings",
      modelLoading: "Loading AI Model..."
    },
    hi: {
      home: "होम",
      shop: "दुकान",
      about: "हमारे बारे में",
      contact: "संपर्क",
      community: "समुदाय",
      aiChat: "AI चैट",
      aiChatTitle: "ओपन सोर्स AI पौधा सहायक",
      aiChatDesc: "आपके ब्राउज़र में स्थानीय रूप से चलने वाले ओपन-सोर्स AI मॉडल द्वारा संचालित विशेषज्ञ सलाह प्राप्त करें - कोई API कुंजी की आवश्यकता नहीं!",
      typeMessage: "अपना संदेश टाइप करें...",
      uploadPhoto: "फोटो अपलोड करें",
      voiceInput: "आवाज इनपुट",
      suggestions: "त्वरित सुझाव",
      identifyDisease: "पौधे की बीमारी की पहचान करें",
      careTips: "मेरे पौधे के लिए देखभाल युक्तियां पाएं",
      troubleshoot: "मेरा पौधा अस्वस्थ दिख रहा है",
      voiceAssistant: "आवाज सहायक",
      you: "आप",
      aiAssistant: "AI सहायक",
      model: "AI मॉडल",
      temperature: "रचनात्मकता",
      maxTokens: "उत्तर की लंबाई",
      advanced: "उन्नत सेटिंग्स",
      modelLoading: "AI मॉडल लोड हो रहा है..."
    },
    es: {
      home: "Inicio",
      shop: "Tienda",
      about: "Acerca de",
      contact: "Contacto",
      community: "Comunidad",
      aiChat: "Chat IA",
      aiChatTitle: "Asistente IA de Código Abierto",
      aiChatDesc: "Obtén consejos expertos impulsados por modelos de IA de código abierto que se ejecutan localmente en tu navegador: ¡no se requieren claves API!",
      typeMessage: "Escribe tu mensaje...",
      uploadPhoto: "Subir Foto",
      voiceInput: "Entrada de Voz",
      suggestions: "Sugerencias Rápidas",
      identifyDisease: "Identificar enfermedad de planta",
      careTips: "Obtener consejos de cuidado para mi planta",
      troubleshoot: "Mi planta se ve poco saludable",
      voiceAssistant: "Asistente de Voz",
      you: "Tú",
      aiAssistant: "Asistente IA",
      model: "Modelo IA",
      temperature: "Creatividad",
      maxTokens: "Longitud de Respuesta",
      advanced: "Configuración Avanzada",
      modelLoading: "Cargando Modelo IA..."
    },
    fr: {
      home: "Accueil",
      shop: "Boutique",
      about: "À propos",
      contact: "Contact",
      community: "Communauté",
      aiChat: "Chat IA",
      aiChatTitle: "Assistant IA Open Source",
      aiChatDesc: "Obtenez des conseils d'experts alimentés par des modèles d'IA open source s'exécutant localement dans votre navigateur - aucune clé API requise !",
      typeMessage: "Tapez votre message...",
      uploadPhoto: "Télécharger Photo",
      voiceInput: "Entrée Vocale",
      suggestions: "Suggestions Rapides",
      identifyDisease: "Identifier la maladie des plantes",
      careTips: "Obtenir des conseils de soins pour ma plante",
      troubleshoot: "Ma plante semble malsaine",
      voiceAssistant: "Assistant Vocal",
      you: "Vous",
      aiAssistant: "Assistant IA",
      model: "Modèle IA",
      temperature: "Créativité",
      maxTokens: "Longueur de Réponse",
      advanced: "Paramètres Avancés",
      modelLoading: "Chargement du Modèle IA..."
    }
  };

  const t = translations[language];

  const openSourceModels = [
    { value: 'text-generation', label: 'Phi-3 Mini (Recommended)', description: 'Fast and efficient for plant advice' },
    { value: 'conversational', label: 'DialoGPT Medium', description: 'Better for conversations' },
    { value: 'text2text-generation', label: 'FLAN-T5 Small', description: 'Good for Q&A format' }
  ];

  const quickSuggestions = [
    { icon: Bug, text: t.identifyDisease },
    { icon: Leaf, text: t.careTips },
    { icon: Lightbulb, text: t.troubleshoot }
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
      description: "Speak now to input your message"
    });

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript;
      setMessage(command);
      setIsListening(false);
      toast({
        title: "Voice Captured",
        description: `Recognized: "${command}"`
      });
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

  const handleSendMessage = async () => {
    if (!message.trim() || isModelLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date(),
      model: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate AI response
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(message);
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
        model: aiModel
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);

    setMessage('');
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
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
              <Link to="/contact" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.contact}</Link>
              <Link to="/community" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">{t.community}</Link>
              <Link to="/ai-chat" className="text-foreground hover:text-green-600 transition-colors font-medium">{t.aiChat}</Link>
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

      {/* AI Chat Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-green-600" />
            {t.aiChatTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.aiChatDesc}
          </p>
          {isModelLoading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span className="text-sm">{t.modelLoading}</span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Settings Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Suggestions */}
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">{t.suggestions}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3 hover:bg-green-50 dark:hover:bg-green-950/20"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                      <span className="text-sm">{suggestion.text}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  AI Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.model}</label>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {openSourceModels.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          <div>
                            <div className="font-medium">{model.label}</div>
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t.advanced}</label>
                  <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                </div>

                {showAdvanced && (
                  <div className="space-y-4 border-t pt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t.temperature}: {temperature}</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t.maxTokens}: {maxTokens}</label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        step="10"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950/20 p-2 rounded">
                  ✨ Models run locally in your browser - no data is sent to external servers!
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-96 lg:h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-3 max-w-[85%] ${
                        msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {msg.type === 'user' ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <Bot className="h-5 w-5" />
                        )}
                      </div>
                      <div
                        className={`px-6 py-4 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-muted border shadow-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <div className="flex items-center justify-between mt-2 opacity-70">
                          <span className="text-xs">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                          {msg.model && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                              {msg.model}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="px-6 py-4 rounded-2xl bg-muted border">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input */}
              <div className="border-t p-6">
                <div className="flex items-end space-x-3">
                  <Button variant="outline" size="sm" className="mb-2">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleVoiceCommand}
                    className={`mb-2 ${isListening ? 'text-red-500 border-red-200' : ''}`}
                  >
                    {isListening ? <Volume2 className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.typeMessage}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      className="min-h-[40px] max-h-[120px] resize-none"
                      rows={1}
                      disabled={isModelLoading}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-green-600 hover:bg-green-700 mb-2"
                    disabled={!message.trim() || isTyping || isModelLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send, Shift+Enter for new line • 
                  {isModelLoading ? ' Loading AI model...' : ' AI running locally in your browser'}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
