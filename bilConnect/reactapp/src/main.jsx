import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import LoginPage from './Login';
import UserProfilePage from './UserPage.jsx';
import DetailedPostPage from './PostDetailsPage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const post = [
    {
        id: 1,
        image: 'https://i.pinimg.com/originals/76/a5/7c/76a57c8ed11414ecdd3e2b66d3ed2c12.jpg',
        title: 'Post 1',
        price: '220TL',
        description: 'CS223 Kitabı',
    },
    {
        id: 2,
        image: 'https://m.media-amazon.com/images/I/91quawUTiVL._AC_UF1000,1000_QL80_.jpg',
        title: 'Post 2',
        price: '400TL',
        description: 'CS319 KITABI',
    },
    {
        id: 3,
        image: 'https://sanayigazetesi.com.tr/wp-content/uploads/2022/12/mbbo-coach-usa-coach-premium-teaser.jpg',
        title: 'ESKİŞEHİR GEZİSİ',
        price: '200TL',
        quota: '40',
        traveltime: '17.12.2023',
        destination: 'ESKİŞEHİR',
    },
    {
        id: 4,
        image: 'https://www.cihatayaz.com/wp-content/uploads/2016/06/hevesli-kitap-okumak.jpg',
        title: 'KİTAP DONATION',
        description: 'DONATION',
    },
];
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'false';
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {!isAuthenticated && (
          <Route
            path="/"
               element={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1c1c1c' }}>
                    <LoginPage />
              </div>
            }
          />
                )}  
                {!isAuthenticated && (
                    <Route
                        path="/main"
                        element={
                            <div style={{ backgroundColor: 'white' }}>
                                <App posts={ post }/>
                            </div>
                        }
                    />)}
                {!isAuthenticated && (<Route path="/user-profile"
                    element={
                        <div>
                            <UserProfilePage />
                        </div>
                    }
                />)}
                {!isAuthenticated && (<Route path="/post/:id" element={<DetailedPostPage posts={post} />} />)}
      </Routes>
    </Router>
  </React.StrictMode>
);
