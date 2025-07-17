import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  Cookie,
  Trash2,
  AlertCircle,
  CheckCircle,
  Settings,
  FileText,
  Clock,
  Users,
  Key,
  Server,
  Smartphone,
} from "lucide-react";

const PrivacyPage = () => {
  const dataTypes = [
    {
      icon: UserCheck,
      title: "Profile Information",
      description:
        "Name, email, profile picture, bio, and college/university details",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Database,
      title: "Community Content",
      description:
        "Posts, comments, polls, hashtags (#placement, #notes, #events), and reactions",
      color: "from-green-500 to-green-600",
    },
    {
      icon: FileText,
      title: "Study Materials",
      description:
        "Uploaded notes, documents (PDF/DOC), and file metadata you share",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "Chat Messages",
      description: "Real-time one-to-one and group chat messages via Socket.IO",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Calendar,
      title: "Event Data",
      description:
        "Created events, RSVP responses, and event participation history",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Smartphone,
      title: "Technical Data",
      description:
        "Device info, IP address, usage patterns, and platform interactions",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const protections = [
    {
      icon: Lock,
      title: "Data Encryption",
      description:
        "All data is encrypted in transit and at rest using industry-standard protocols.",
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description:
        "Our servers are hosted in secure, certified data centers with 24/7 monitoring.",
    },
    {
      icon: Key,
      title: "Access Controls",
      description:
        "Strict access controls ensure only authorized personnel can access your data.",
    },
    {
      icon: Shield,
      title: "Regular Audits",
      description:
        "We conduct regular security audits and vulnerability assessments.",
    },
  ];

  const rights = [
    {
      icon: Eye,
      title: "Access Your Data",
      description: "Request a copy of all personal data we have about you",
    },
    {
      icon: Settings,
      title: "Update Information",
      description: "Correct or update your personal information at any time",
    },
    {
      icon: Trash2,
      title: "Delete Account",
      description: "Request deletion of your account and associated data",
    },
    {
      icon: FileText,
      title: "Data Portability",
      description: "Export your data in a commonly used format",
    },
  ];

  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Privacy Policy
            </span>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Your Privacy Matters
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to protecting your privacy while you connect with
            fellow students, share study notes, participate in campus events,
            and engage in our vibrant college community.
          </p>

          {/* <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastUpdated}</span>
          </div> */}
        </div>

        {/* Privacy Commitment */}
        <Card className="mb-16 shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <Lock className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
            <p className="text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
              Your campus community thrives on trust. We collect only what's
              necessary to connect you with classmates, facilitate study
              collaboration, and enhance your college experience—nothing more.
            </p>
          </CardContent>
        </Card>

        {/* Data We Collect */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here's what information we collect to help you connect with
              classmates, share knowledge, and engage in campus life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataTypes.map((data, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${data.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <data.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {data.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How We Use Data */}
        <Card className="mb-16 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Database className="h-6 w-6 text-blue-600" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Campus Community Features
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Enable posting, commenting, polls, hashtag filtering, and
                      connecting with classmates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Study Notes Sharing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Facilitate uploading, downloading, and organizing academic
                      resources among students.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Real-time Chat
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Power Socket.IO based messaging for seamless student
                      collaboration and communication.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Campus Events
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Manage event creation, RSVP tracking, and help you
                      discover campus activities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Platform Security
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Protect against spam, maintain JWT-based authentication,
                      and ensure safe campus interactions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Academic Support
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Enhance study collaboration, track note contributions, and
                      improve peer-to-peer learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Protect Your Data
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We implement multiple layers of security to keep your information
              safe and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protections.map((protection, index) => (
              <Card
                key={index}
                className="text-center shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                    <protection.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {protection.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {protection.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Rights & Control
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              You have complete control over your personal information. Here's
              what you can do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rights.map((right, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <right.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {right.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {right.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Sharing */}
        <Card className="mb-16 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              Data Sharing & Third Parties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  We Never Sell Your Data
                </span>
              </div>
              <p className="text-green-700 text-sm">
                We do not and will never sell your personal information to third
                parties.
              </p>
            </div>

            {/* <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">We may share information only in these limited circumstances:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>MERN Stack Services:</strong> MongoDB hosting, Socket.IO infrastructure, and file storage providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Campus Safety:</strong> When required to protect student safety or comply with educational institution policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Legal Requirements:</strong> Only when legally required or to prevent harmful activities on campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>With Your Permission:</strong> Public posts in community feed are visible to other students as intended</span>
                </li>
              </ul>
            </div> */}
          </CardContent>
        </Card>

        {/* Cookies & Analytics */}
        <Card className="mb-16 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Cookie className="h-6 w-6 text-blue-600" />
              Cookies & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We use cookies and local storage to enhance your campus
              experience, remember your login via JWT tokens, and maintain
              real-time chat connections through Socket.IO.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Essential Cookies
                </h4>
                <p className="text-blue-700 text-sm">
                  JWT authentication tokens and basic functionality
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Socket.IO Storage
                </h4>
                <p className="text-purple-700 text-sm">
                  Real-time chat connection data and message delivery
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  Preference Data
                </h4>
                <p className="text-green-700 text-sm">
                  Hashtag filters, post sorting preferences, and UI settings
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              You can manage these settings through your browser, but some
              features like real-time chat may not work without essential
              storage.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-16 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-600" />
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We retain your information only as long as needed to support your
              campus community experience and academic collaboration.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Active Student Accounts
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Data retained while actively participating in campus
                    community and reasonable period after graduation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Study Notes & Academic Content
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Uploaded study materials may be retained longer to benefit
                    the student community, with your permission
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Chat & Communication
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Real-time messages stored temporarily; archived
                    conversations deleted after account closure
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        {/* <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're here to help! If you have questions about this privacy policy or how we handle your campus data, 
              our student-focused privacy team is ready to assist you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail className="h-5 w-5 mr-2" />
                Contact Privacy Team
              </Button>
              <Button variant="outline" size="lg">
                <Settings className="h-5 w-5 mr-2" />
                Privacy Settings
              </Button>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">privacy@campusconnect.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  This policy may be updated periodically. We'll notify you of significant changes.
                </span>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default PrivacyPage;
