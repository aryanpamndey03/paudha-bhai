
import React, { useState } from 'react';
import { MessageCircle, Heart, Camera, Send, User, Clock, ThumbsUp, Reply, Globe, Mic, Volume2, Sun, Moon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Community = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null, category: 'General' });
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c5b87b75?w=40&h=40&fit=crop&crop=face',
      title: 'My Monstera leaves are turning yellow',
      content: 'I noticed my Monstera leaves are turning yellow from the bottom. The soil feels moist. Any suggestions?',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      timestamp: '2 hours ago',
      likes: 12,
      likedBy: [],
      replies: [
        { id: 1, user: 'Garden Expert', content: 'This looks like overwatering. Let the soil dry out between waterings.', timestamp: '1 hour ago' },
        { id: 2, user: 'Plant Mom', content: 'I had the same issue. Reduce watering frequency and it should recover!', timestamp: '30 mins ago' }
      ],
      category: 'Plant Care',
      language: 'en'
    },
    {
      id: 2,
      user: 'राजेश कुमार',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      title: 'छोटी बालकनी में सुंदर बगीचा',
      content: 'आखिरकार मैंने अपनी बालकनी का बगीचा पूरा किया! जगह को अधिकतम करने के लिए वर्टिकल प्लांटर्स का उपयोग किया। आपको क्या लगता है?',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      timestamp: '5 hours ago',
      likes: 24,
      likedBy: [],
      replies: [
        { id: 3, user: 'Green Thumb', content: 'बहुत खूबसूरत! मुझे भी ऐसा कुछ करना है।', timestamp: '4 hours ago' }
      ],
      category: 'Garden Design',
      language: 'hi'
    },
    {
      id: 3,
      user: 'María González',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      title: 'Ayuda para identificar esta enfermedad',
      content: 'Encontré estas manchas en las hojas de mis rosas. ¿Es enfermedad de mancha negra? ¿Cómo debo tratarla?',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      timestamp: '1 day ago',
      likes: 18,
      likedBy: [],
      replies: [
        { id: 4, user: 'Expert Jardín', content: 'Sí, parece mancha negra. Usa fungicida y mejora la circulación de aire.', timestamp: '20 hours ago' }
      ],
      category: 'Disease Identification',
      language: 'es'
    },
    {
      id: 4,
      user: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      title: 'Mes lavandes ne fleurissent pas',
      content: 'J\'ai planté des lavandes au printemps mais elles ne fleurissent toujours pas. Le sol est bien drainé. Des conseils?',
      image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400&h=300&fit=crop',
      timestamp: '2 days ago',
      likes: 15,
      likedBy: [],
      replies: [],
      category: 'Plant Care',
      language: 'fr'
    }
  ]);

  const translations = {
    en: {
      home: "Home",
      shop: "Shop", 
      about: "About",
      contact: "Contact",
      community: "Community",
      aiChat: "AI Chat",
      communityTitle: "Plant Community",
      communityDesc: "Connect with fellow plant enthusiasts, share your experiences, and get help with your gardening questions",
      shareExperience: "Share Your Experience",
      postTitle: "Post Title",
      writePost: "Write your post...",
      addPhoto: "Add Photo",
      publishPost: "Publish Post",
      discussionForum: "Discussion Forum",
      plantCare: "Plant Care",
      gardenDesign: "Garden Design", 
      diseaseId: "Disease Identification",
      allCategories: "All Categories",
      likes: "likes",
      replies: "replies",
      reply: "Reply",
      voiceAssistant: "Voice Assistant",
      writeReply: "Write a reply...",
      postReply: "Post Reply",
      cancel: "Cancel",
      selectCategory: "Select Category",
      general: "General"
    },
    hi: {
      home: "होम",
      shop: "दुकान",
      about: "हमारे बारे में", 
      contact: "संपर्क",
      community: "समुदाय",
      aiChat: "AI चैट",
      communityTitle: "पौधों का समुदाय",
      communityDesc: "साथी पौधे प्रेमियों से जुड़ें, अपने अनुभव साझा करें, और अपने बागवानी प्रश्नों में मदद पाएं",
      shareExperience: "अपना अनुभव साझा करें",
      postTitle: "पोस्ट शीर्षक",
      writePost: "अपनी पोस्ट लिखें...",
      addPhoto: "फोटो जोड़ें",
      publishPost: "पोस्ट प्रकाशित करें",
      discussionForum: "चर्चा मंच",
      plantCare: "पौधों की देखभाल",
      gardenDesign: "बगीचा डिज़ाइन",
      diseaseId: "रोग पहचान",
      allCategories: "सभी श्रेणियां",
      likes: "पसंद",
      replies: "उत्तर",
      reply: "उत्तर दें",
      voiceAssistant: "आवाज सहायक",
      writeReply: "उत्तर लिखें...",
      postReply: "उत्तर पोस्ट करें",
      cancel: "रद्द करें",
      selectCategory: "श्रेणी चुनें",
      general: "सामान्य"
    },
    es: {
      home: "Inicio",
      shop: "Tienda",
      about: "Acerca de",
      contact: "Contacto", 
      community: "Comunidad",
      aiChat: "Chat IA",
      communityTitle: "Comunidad de Plantas",
      communityDesc: "Conéctate con otros entusiastas de las plantas, comparte experiencias y obtén ayuda con tus preguntas de jardinería",
      shareExperience: "Comparte tu Experiencia",
      postTitle: "Título del Post",
      writePost: "Escribe tu publicación...",
      addPhoto: "Agregar Foto",
      publishPost: "Publicar Post",
      discussionForum: "Foro de Discusión",
      plantCare: "Cuidado de Plantas",
      gardenDesign: "Diseño de Jardín",
      diseaseId: "Identificación de Enfermedades",
      allCategories: "Todas las Categorías",
      likes: "me gusta",
      replies: "respuestas",
      reply: "Responder",
      voiceAssistant: "Asistente de Voz",
      writeReply: "Escribir respuesta...",
      postReply: "Publicar Respuesta",
      cancel: "Cancelar",
      selectCategory: "Seleccionar Categoría",
      general: "General"
    },
    fr: {
      home: "Accueil",
      shop: "Boutique",
      about: "À propos",
      contact: "Contact",
      community: "Communauté", 
      aiChat: "Chat IA",
      communityTitle: "Communauté des Plantes",
      communityDesc: "Connectez-vous avec d'autres passionnés de plantes, partagez vos expériences et obtenez de l'aide pour vos questions de jardinage",
      shareExperience: "Partagez votre Expérience",
      postTitle: "Titre du Post",
      writePost: "Écrivez votre publication...",
      addPhoto: "Ajouter Photo",
      publishPost: "Publier le Post",
      discussionForum: "Forum de Discussion",
      plantCare: "Soin des Plantes",
      gardenDesign: "Design de Jardin",
      diseaseId: "Identification des Maladies",
      allCategories: "Toutes les Catégories",
      likes: "j'aime",
      replies: "réponses",
      reply: "Répondre",
      voiceAssistant: "Assistant Vocal",
      writeReply: "Écrire une réponse...",
      postReply: "Publier Réponse",
      cancel: "Annuler",
      selectCategory: "Sélectionner Catégorie",
      general: "Général"
    }
  };

  const t = translations[language];

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
      
      if (command.includes('home') || command.includes('होम') || command.includes('inicio') || command.includes('accueil')) {
        window.location.href = '/';
      } else if (command.includes('shop') || command.includes('दुकान') || command.includes('tienda') || command.includes('boutique')) {
        window.location.href = '/shop';
      } else if (command.includes('about') || command.includes('हमारे बारे में') || command.includes('acerca') || command.includes('à propos')) {
        window.location.href = '/about';
      } else if (command.includes('contact') || command.includes('संपर्क') || command.includes('contacto')) {
        window.location.href = '/contact';
      } else if (command.includes('ai chat') || command.includes('chatbot') || command.includes('chat ia')) {
        window.location.href = '/ai-chat';
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handlePublishPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        title: newPost.title,
        content: newPost.content,
        image: newPost.image,
        timestamp: 'Just now',
        likes: 0,
        likedBy: [],
        replies: [],
        category: newPost.category,
        language: language
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', image: null, category: 'General' });
      toast({
        title: "Post published!",
        description: "Your post has been shared with the community.",
      });
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes('You');
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(user => user !== 'You')
            : [...post.likedBy, 'You']
        };
      }
      return post;
    }));
  };

  const handleReply = (postId) => {
    if (replyText.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [...post.replies, {
              id: post.replies.length + 1,
              user: 'You',
              content: replyText,
              timestamp: 'Just now'
            }]
          };
        }
        return post;
      }));
      setReplyText('');
      setShowReplyBox(null);
      toast({
        title: "Reply posted!",
        description: "Your reply has been added to the discussion.",
      });
    }
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
              <Link to="/community" className="text-foreground hover:text-green-600 transition-colors font-medium">{t.community}</Link>
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
            </div>
          </div>
        </div>
      </header>

      {/* Community Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t.communityTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.communityDesc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Post Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                  {t.shareExperience}
                </h2>
                <div className="space-y-4">
                  <Input
                    placeholder={t.postTitle}
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                  <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectCategory} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">{t.general}</SelectItem>
                      <SelectItem value="Plant Care">{t.plantCare}</SelectItem>
                      <SelectItem value="Garden Design">{t.gardenDesign}</SelectItem>
                      <SelectItem value="Disease Identification">{t.diseaseId}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder={t.writePost}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                  />
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    {t.addPhoto}
                  </Button>
                  <Button onClick={handlePublishPost} className="w-full bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    {t.publishPost}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{t.discussionForum}</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCategories}</SelectItem>
                  <SelectItem value="care">{t.plantCare}</SelectItem>
                  <SelectItem value="design">{t.gardenDesign}</SelectItem>
                  <SelectItem value="disease">{t.diseaseId}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{post.user}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.timestamp}
                              <span className="mx-2">•</span>
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                                {post.category}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="text-xs">{post.language.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-medium mb-2">{post.title}</h4>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                        
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                          />
                        )}
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`text-muted-foreground hover:text-red-500 ${post.likedBy.includes('You') ? 'text-red-500' : ''}`}
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart className={`h-4 w-4 mr-1 ${post.likedBy.includes('You') ? 'fill-current' : ''}`} />
                              {post.likes} {t.likes}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-blue-500"
                              onClick={() => setShowReplyBox(showReplyBox === post.id ? null : post.id)}
                            >
                              <Reply className="h-4 w-4 mr-1" />
                              {post.replies.length} {t.replies}
                            </Button>
                          </div>
                        </div>

                        {/* Replies */}
                        {post.replies.length > 0 && (
                          <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-3">
                            {post.replies.map((reply) => (
                              <div key={reply.id} className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-sm">{reply.user}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Box */}
                        {showReplyBox === post.id && (
                          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <Textarea
                              placeholder={t.writeReply}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={2}
                              className="mb-3"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleReply(post.id)} className="bg-green-600 hover:bg-green-700">
                                <Send className="h-3 w-3 mr-1" />
                                {t.postReply}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setShowReplyBox(null)}>
                                <X className="h-3 w-3 mr-1" />
                                {t.cancel}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
