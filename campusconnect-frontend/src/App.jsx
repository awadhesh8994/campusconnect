import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import StudyNotes from './pages/StudyNotes';
import LearnMore from './pages/LearnMore';
import CommunityPage from './pages/CommunityPage'; 
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage'; 
import MyEvents from './pages/MyEvents';


export default function App() {
  const currentUser = JSON.parse(localStorage.getItem('user'));


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatList currentUser={currentUser} />} />
<Route path="/chat/:userId" element={<Chat currentUser={currentUser} />} />
        
        <Route path="/notes" element={<StudyNotes />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/community" element={<CommunityPage currentUser={currentUser} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/my" element={<MyEvents />} />
        <Route path="/events/:id" element={<EventDetail />} />
        


      </Routes>
    </Router>
  );
}
