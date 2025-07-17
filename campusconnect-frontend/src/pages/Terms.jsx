import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  FileText,
  Shield,
  UserCheck,
  AlertTriangle,
  Copyright,
  BookOpen,
  Calendar,
  Ban,
  RefreshCw,
  Lock,
  Mail,
  CheckCircle,
  Users,
  Upload,
  MessageSquare,
  Gavel,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const TermsPage = () => {
  const termsData = [
    {
      icon: CheckCircle,
      title: "1. Acceptance of Terms",
      content:
        "By creating an account or using CampusConnect, you agree to comply with these Terms of Use and any applicable laws and regulations.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: UserCheck,
      title: "2. Eligibility",
      content:
        "CampusConnect is designed for use by current college students, faculty, and verified campus members. You must provide accurate information during registration and agree not to impersonate others.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      title: "3. User Responsibilities",
      content: [
        "Use the platform respectfully and responsibly",
        "Not post or share any content that is abusive, harassing, offensive, or illegal",
        "Not upload copyrighted or unauthorized material",
        "Not spam or promote unrelated services or products",
        "Report inappropriate content or users when necessary",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Copyright,
      title: "4. Content Ownership and Usage",
      content: [
        "You retain ownership of the content you post (e.g., study notes, events, posts)",
        "By uploading content, you grant CampusConnect a non-exclusive, royalty-free license to use, host, display, and share your content on the platform",
        "CampusConnect does not guarantee the accuracy, reliability, or legality of user-submitted content",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: BookOpen,
      title: "5. Study Materials & Events",
      content: [
        "Notes and resources shared must be original or shared with permission",
        "Events created should be genuine and relevant to the campus community",
        "CampusConnect reserves the right to remove inappropriate or misleading material",
      ],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Ban,
      title: "6. Account Suspension & Termination",
      content: [
        "CampusConnect reserves the right to suspend or terminate accounts that:",
        "• Violate these Terms",
        "• Harass or harm other users",
        "• Upload fraudulent or malicious content",
      ],
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const limitations = [
    {
      icon: AlertTriangle,
      title: "Service Availability",
      description:
        "Platform provided 'as is' without guarantees of uninterrupted service or uptime.",
    },
    {
      icon: Users,
      title: "User Interactions",
      description:
        "Not responsible for disputes, conflicts, or interactions between platform users.",
    },
    {
      icon: Upload,
      title: "Data Loss",
      description:
        "No liability for loss of user data, content, or any uploaded study materials.",
    },
    {
      icon: MessageSquare,
      title: "Content Accuracy",
      description:
        "No responsibility for accuracy, completeness, or reliability of user-generated content.",
    },
  ];

  const platformFeatures = [
    {
      icon: Users,
      title: "Campus Community",
      description:
        "Connect with classmates through posts, comments, polls, and hashtag filtering",
    },
    {
      icon: BookOpen,
      title: "Study Materials",
      description:
        "Share and access academic resources, notes, and study guides with fellow students",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description:
        "Communicate instantly with Socket.IO powered messaging and group discussions",
    },
    {
      icon: Calendar,
      title: "Campus Events",
      description: "Create, discover, and RSVP to campus events and activities",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Terms of Service
            </span>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Terms of Use
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to CampusConnect, a community platform built for college
            students and faculty to connect, collaborate, and grow. By accessing
            or using our services, you agree to be bound by these Terms of Use.
          </p>
        </div>

        {/* Terms Commitment */}
        <Card className="mb-16 shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <Gavel className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              Fair & Transparent Terms
            </h2>
            <p className="text-xl opacity-95 max-w-4xl mx-auto leading-relaxed">
              These terms ensure a safe, respectful, and productive environment
              for all students and faculty. They're designed to protect your
              rights while maintaining our vibrant campus community.
            </p>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What CampusConnect Offers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to enhance your college experience
              through these core features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Terms */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully. They outline your rights and
              responsibilities as a CampusConnect user.
            </p>
          </div>

          <div className="grid gap-8">
            {termsData.map((term, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${term.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <term.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {term.title}
                      </h3>
                      {Array.isArray(term.content) ? (
                        <ul className="space-y-2 text-gray-600">
                          {term.content.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 leading-relaxed">
                          {term.content}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              While we strive to provide the best service, here are the
              limitations of our liability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {limitations.map((limitation, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <limitation.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {limitation.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {limitation.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Changes to Terms */}
        <Card className="mb-16 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-blue-600" />
              Changes to Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We may update these Terms from time to time to reflect changes in
              our services, legal requirements, or to improve user experience.
              Here's how we handle updates:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Notification
                </h4>
                <p className="text-blue-700 text-sm">
                  We'll notify users of significant changes via email and
                  platform announcements
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Effective Date
                </h4>
                <p className="text-purple-700 text-sm">
                  Changes become effective after the specified notice period
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  Acceptance
                </h4>
                <p className="text-green-700 text-sm">
                  Continued use of the platform means you accept the updated
                  terms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Connection */}
        <Card className="mb-16 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Your use of CampusConnect is also governed by our Privacy Policy,
              which outlines how we collect, use, and protect your information.
              Both documents work together to ensure your rights and safety.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  Your Privacy is Protected
                </span>
              </div>
              <p className="text-green-700 text-sm">
                We never sell your data and only use your information to enhance
                your campus experience. Review our Privacy Policy for complete
                details.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              If you have questions about these terms or need clarification
              about your rights and responsibilities, our support team is here
              to help you navigate your campus community experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="h-5 w-5 mr-2" />
                View Privacy Policy
              </Button>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@campusconnect.com</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  By using CampusConnect, you acknowledge that you have read,
                  understood, and agree to these Terms of Use.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;
