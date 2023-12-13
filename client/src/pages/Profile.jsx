import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import CategoryCarousel from '../components/Carousels/CategoryCarousel'

import General from '../assets/GeneralImage.jpg'
import History from '../assets/HistoryImage.jpg'
import Games from '../assets/GamesImage.jpg'
import TVMovies from '../assets/TVImage.jpg'
import Literature from '../assets/LitImage.jpg'
import Tech from '../assets/TechImg.png'
import Science from '../assets/ScienceImage.jpg'
import Math from '../assets/MathImage.webp'
import PopCulture from '../assets/PopCultureImage.jpg'
import Music from '../assets/MusicImage.jpg'
import Food from '../assets/FoodImage.jpg'
import Geography from '../assets/GeographyImage.jpg'
import Sports from '../assets/TVImage.jpg'
import './Home.css'


const CarouselCategoryImages = [General, History, Games, TVMovies, Literature, Tech, Science, Math, PopCulture, Music, Food, Geography, Sports];
const Categories = ["General", "History", " Games", "TVMovies", "Literature", " Tech", "Science", "Math", "PopCulture", "Music", " Food", "Geography", "Sports"]

const Profile = () => {
  const { profileId } = useParams();
  console.log("profileId:", profileId);

  const { loading, data } = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: { userId: profileId },
  });

  const user = data?.me || data?.getUser || {};
  console.log("user", user);
  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === user.username
  ) {
    return (<><Navigate to="/me" /><div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          {user.username}
        </h2>
        <p> Score: {user.score}</p>
        <div className="col-12 col-md-10 mb-5">
        </div>
        {/* Quizzes carosel */}
      </div>
    </div></>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("here are the user's quizzes:", user.quizzes.category);

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-8 bg-dark text-light p-3 mb-5">
          {user.username}'s Profile
        </h2>
        <div className="score-section">
          <h2 className="score">Score: {user.score}</h2>
        </div>
        <div className="col-12 col-md-10 mb-5">
        </div>
        {/* Quizzes carosel */}
        <h1 className="homeh1">User Quizzes</h1>
        <div className="carousel-quiz">
          <CategoryCarousel images={CarouselCategoryImages} categories={Categories} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
