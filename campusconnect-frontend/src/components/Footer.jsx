export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">CC</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                CampusConnect
              </h2>
            </div>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              Connecting your campus community through shared knowledge, exciting events, and meaningful connections.
            </p>
            </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-indigo-300 transition-colors duration-200 flex items-center space-x-2">
                  <span className="text-sm">🏠</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/events" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2">
                  <span className="text-sm">🎉</span>
                  <span>Events</span>
                </a>
              </li>
              <li>
                <a href="/study-notes" className="text-gray-300 hover:text-pink-300 transition-colors duration-200 flex items-center space-x-2">
                  <span className="text-sm">📚</span>
                  <span>Study Notes</span>
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-300 hover:text-teal-300 transition-colors duration-200 flex items-center space-x-2">
                  <span className="text-sm">🔍</span>
                  <span>Search</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Help */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-indigo-300 transition-colors duration-200 flex items-center space-x-2">
                  <span className="text-sm">ℹ️</span>
                  <span>About Us</span>
                </a>
              </li>
              
              
              
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-teal-300 transition-colors duration-200 flex items-center space-x-2">
                  <span className="text-sm">🔒</span>
                  <span>Privacy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-6">Get the latest updates about campus events and new features</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CampusConnect. All rights reserved. Made with ❤️ for students.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-300 text-sm transition-colors duration-200">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors duration-200">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-pink-300 text-sm transition-colors duration-200">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}