import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';



export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl font-semibold">Loading CampusConnect...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Animation/Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {/* Campus Card */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white transform rotate-3 hover:rotate-6 transition-transform duration-300 shadow-2xl">
                  <div className="text-4xl mb-3">🏫</div>
                  <h3 className="font-bold text-lg mb-2">Campus Life</h3>
                  <p className="text-sm opacity-90">Connect with your university community</p>
                </div>

                {/* Events Card */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white transform -rotate-3 hover:-rotate-6 transition-transform duration-300 shadow-2xl mt-8">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-bold text-lg mb-2">Events</h3>
                  <p className="text-sm opacity-90">Plan and discover campus events</p>
                </div>

                {/* Notes Card */}
                <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white transform rotate-2 hover:rotate-4 transition-transform duration-300 shadow-2xl -mt-4">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="font-bold text-lg mb-2">Study Notes</h3>
                  <p className="text-sm opacity-90">Share and access study materials</p>
                </div>

                {/* Resources Card */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white transform -rotate-2 hover:-rotate-4 transition-transform duration-300 shadow-2xl">
                  <div className="text-4xl mb-3">🔧</div>
                  <h3 className="font-bold text-lg mb-2">Resources</h3>
                  <p className="text-sm opacity-90">Access tools and materials</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400 rounded-full opacity-10 animate-bounce"></div>
            </div>

            {/* Right Side - Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Your Campus
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Community Hub
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect, share, and thrive in your academic journey with fellow students, event planners, and resource sharers.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">For Students</h3>
                    <p className="text-gray-600">Access study materials, join study groups, and stay updated with campus activities. Your academic success starts here.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">For Event Planners</h3>
                    <p className="text-gray-600">Organize memorable campus events, manage RSVPs, and connect with participants. Make every event count.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">For Resource Sharers</h3>
                    <p className="text-gray-600">Share your knowledge, upload study materials, and help fellow students succeed. Build your academic legacy.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/community">
  <button className="px-8 py-4 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
    Join Community
  </button>
</Link>

                <Link to="/learn-more">
  <button className="px-8 py-4 bg-gray-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all cursor-pointer">
    Learn More
  </button>
</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Strong Headline */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest from Our 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Community</span>
            </h2>
            <p className="text-xl text-gray-600">Discover what your fellow students are sharing, planning, and discussing</p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Create Post Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Be the First to Share!</h3>
              <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">Start the conversation and help build our campus community</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div 
                  key={post._id} 
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Footer/>
    </div>
  );
}