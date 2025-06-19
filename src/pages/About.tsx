
import React from 'react';
import { Leaf, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
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
              <Link to="/" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">Home</Link>
              <Link to="/shop" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">Shop</Link>
              <Link to="/about" className="text-foreground hover:text-green-600 transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-green-600 transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* About Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-6">About Paudha Bhai</h1>
              <p className="text-lg text-muted-foreground mb-6">
                We are passionate about bringing the beauty of nature into your homes and lives. 
                Founded with a mission to make gardening accessible to everyone, we provide high-quality 
                plants and expert guidance to help you create your perfect green space.
              </p>
              <p className="text-lg text-muted-foreground">
                Our carefully curated collection features plants that are not only beautiful but also 
                easy to care for, making them perfect for both beginners and experienced plant enthusiasts.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center"
                alt="Plant nursery"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our core values and commitment to excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border shadow-lg">
              <CardContent className="p-8">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Quality First</h3>
                <p className="text-muted-foreground">We source only the healthiest, highest quality plants for our customers.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border shadow-lg">
              <CardContent className="p-8">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Expert Support</h3>
                <p className="text-muted-foreground">Our team of plant experts is always ready to help you succeed.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border shadow-lg">
              <CardContent className="p-8">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Excellence</h3>
                <p className="text-muted-foreground">We strive for excellence in everything we do, from plant care to customer service.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border shadow-lg">
              <CardContent className="p-8">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">Passion</h3>
                <p className="text-muted-foreground">Our love for plants and nature drives everything we do.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Paudha Bhai started as a small passion project when our founder, Sahil Lenka, 
            discovered the joy of indoor gardening during the pandemic. What began as a personal 
            collection of plants in a small apartment quickly grew into a mission to share the 
            benefits of plant parenthood with others.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Today, we're proud to serve thousands of happy customers across India, helping them 
            transform their spaces with beautiful, healthy plants. Our commitment to quality, 
            education, and customer satisfaction has made us a trusted name in the plant community.
          </p>
          <p className="text-lg text-muted-foreground">
            We believe that everyone deserves to experience the joy, peace, and health benefits 
            that come with having plants in their lives. That's why we're here to make your 
            plant journey as successful and enjoyable as possible.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
