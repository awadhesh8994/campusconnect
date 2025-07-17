import { Link } from "react-router-dom";

const LearnMore = () => {
  const features = [
    {
      icon: "🎓",
      title: "Study Notes Hub",
      description:
        "Share and download study notes with your classmates. Upload PDFs, images, and documents to help each other succeed.",
      benefits: [
        "Collaborative learning",
        "Easy file sharing",
        "Preview support",
      ],
    },
    {
      icon: "📅",
      title: "Campus Events",
      description:
        "Never miss important college events. Discover workshops, seminars, cultural activities, and RSVP with ease.",
      benefits: [
        "Event notifications",
        "RSVP tracking",
        "Calendar integration",
      ],
    },
    {
      icon: "💬",
      title: "Real-time Chat",
      description:
        "Connect instantly with your peers through our messaging system. Create study groups and discuss topics in real-time.",
      benefits: ["Instant messaging", "Group chats", "File sharing"],
    },
    {
      icon: "🌟",
      title: "Community Posts",
      description:
        "Share thoughts, ask questions, create polls, and engage with the community through likes, comments, and reactions.",
      benefits: ["Interactive posts", "Polling system", "Community engagement"],
    },
    {
      icon: "📌",
      title: "Personal Profile",
      description:
        "Build your digital presence with a personalized profile that tracks your contributions and achievements.",
      benefits: [
        "Profile customization",
        "Achievement tracking",
        "Contribution history",
      ],
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description:
        "Stay updated with intelligent notifications about events, messages, and community activities.",
      benefits: [
        "Real-time alerts",
        "Customizable settings",
        "Priority filtering",
      ],
    },
  ];

  const stats = [
    { number: "1000+", label: "Active Students" },
    { number: "50+", label: "Colleges Connected" },
    { number: "5000+", label: "Study Notes Shared" },
    { number: "200+", label: "Events Organized" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      message:
        "CampusConnect has transformed how I connect with my peers. The study notes feature is a game-changer!",
      avatar: "P",
    },
    {
      name: "Rahul Gupta",
      role: "Engineering Student",
      message:
        "I never miss any college events now. The notification system is perfect and keeps me updated.",
      avatar: "R",
    },
    {
      name: "Sneha Patel",
      role: "Arts Student",
      message:
        "The community posts feature helps me stay connected with what's happening around campus.",
      avatar: "S",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About CampusConnect
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
              CampusConnect is your all-in-one platform to connect, share, and
              grow within your college community. Whether you're looking to join
              events, chat with peers, share study notes, or participate in
              discussions — CampusConnect brings it all together in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <span className="text-blue-600 font-semibold">
                  🚀 Modern Platform
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <span className="text-purple-600 font-semibold">
                  👥 Community Driven
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <span className="text-green-600 font-semibold">
                  📱 Mobile Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the amazing features that make CampusConnect the
            perfect platform for your college journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to get started with CampusConnect
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
            <p className="text-gray-600">
              Create your account with your college email and join your campus
              community
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">Connect</h3>
            <p className="text-gray-600">
              Find and connect with your classmates, join groups, and start
              conversations
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaborate</h3>
            <p className="text-gray-600">
              Share notes, attend events, participate in discussions, and grow
              together
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Students Say
          </h2>
          <p className="text-xl text-gray-600">
            Hear from our amazing community members
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.message}"
              </p>
              <div className="flex text-yellow-400 mt-4">{"⭐".repeat(5)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose CampusConnect */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Why Choose CampusConnect?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-semibold mb-2">Secure & Safe</h3>
                <p className="text-blue-100">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-blue-100">
                  Lightning-fast performance with 99.9% uptime
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Purpose-Built</h3>
                <p className="text-blue-100">
                  Designed specifically for college students and campus life
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🌟</div>
                <h3 className="font-semibold mb-2">Always Improving</h3>
                <p className="text-blue-100">
                  Regular updates and new features based on user feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Transform Your College Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of students who are already using CampusConnect to
            enhance their college journey. Connect, collaborate, and succeed
            together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              <Link to="/login">🚀 Get Started Now</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto px-6 py-8 text-center border-t border-gray-200">
        <p className="text-gray-600">
          Have questions? Contact us at{" "}
          <a
            href="mailto:support@campusconnect.com"
            className="text-blue-600 hover:underline"
          >
            support@campusconnect.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default LearnMore;
