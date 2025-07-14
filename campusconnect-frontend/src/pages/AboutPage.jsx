import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Star, 
  BookOpen,
  Zap,
  Shield,
  Heart,
  Award,
  Target,
  Lightbulb,
  Globe,
  Mail,
  Phone,
  Github,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: Users,
      title: "Community Building",
      description: "Connect with fellow students, form study groups, and build lasting friendships across campus.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Real-time Communication",
      description: "Share thoughts, ask questions, and engage in meaningful discussions with your peers.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Discover campus events, create your own gatherings, and never miss out on what's happening.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      title: "Academic Support",
      description: "Share resources, collaborate on projects, and support each other's academic journey.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Enjoy a moderated, secure platform designed specifically for student communities.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Stay connected with instant notifications and live updates from your campus community.",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const stats = [
    { label: "Active Students", value: "10K+", icon: Users },
    { label: "Posts Shared", value: "50K+", icon: MessageCircle },
    { label: "Events Created", value: "2K+", icon: Calendar },
    { label: "Universities", value: "100+", icon: MapPin }
  ];

  const founder = {
    name: "Awadhesh Kumar",
    role: "Founder & Developer",
    bio: "CS Graduate passionate about connecting students and building communities. Started CampusConnect with a vision to bring students together and create meaningful campus experiences.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    social: { twitter: "https://x.com/awadhesh8994", linkedin: "https://www.linkedin.com/in/awadhesh-kumar-615088265/", github: "https://github.com/awadhesh8994" }
  };

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in the power of authentic connections and supportive communities."
    },
    {
      icon: Target,
      title: "Student-Focused",
      description: "Every feature is designed with student needs and experiences in mind."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve to provide the best tools for campus connection."
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description: "We create spaces where every student feels welcome and valued."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">About CampusConnect</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Connecting Campus Communities
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            CampusConnect is more than just a social platform—it's a digital home where students 
            come together to share, learn, and grow. We're building the future of campus community engagement.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <Target className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
              To empower students worldwide by creating meaningful connections, fostering collaboration, 
              and building vibrant campus communities that extend beyond graduation.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CampusConnect?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the features that make CampusConnect the perfect platform for your campus community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at CampusConnect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The visionary behind CampusConnect, dedicated to building stronger campus communities.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Card className="max-w-md shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Avatar className="h-32 w-32 mx-auto mb-6 ring-4 ring-blue-100">
                  <AvatarImage src={"/profile-img_11zon-compressed-compressed.jpeg"} alt={founder.name} />
                  <AvatarFallback className="text-2xl">{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <Badge variant="default" className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {founder.role}
                </Badge>
                <p className="text-gray-600 mb-6 leading-relaxed">{founder.bio}</p>
                
                <div className="flex justify-center gap-3">
                  {founder.social.twitter && (
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 hover:bg-blue-50">
                      <Twitter className="h-5 w-5 text-blue-600" />
                    </Button>
                  )}
                  {founder.social.linkedin && (
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 hover:bg-blue-50">
                      <Linkedin className="h-5 w-5 text-blue-600" />
                    </Button>
                  )}
                  {founder.social.github && (
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 hover:bg-blue-50">
                      <Github className="h-5 w-5 text-blue-600" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact/CTA Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Connect?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already building amazing communities on CampusConnect. 
              Your campus community is waiting for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@campusconnect.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;