import { Navigate, useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import CategoryCarousel from '../components/Carousels/CategoryCarousel'

import General from '../assets/GeneralImage.jpg'
import History from '../assets/HistoryImage.jpg'
import Games from '../assets/GamesImage.jpg'
import TVMovies from '../assets/TVImage.jpg'
import Literature from '../assets/LitImage.jpg'
import Tech from '../assets/TechImage.jpg'
import Science from '../assets/ScienceImage.jpg'
import Math from '../assets/MathImage.jpg'
import PopCulture from '../assets/PopCultureImage.jpg'
import Music from '../assets/MusicImage.jpg'
import Food from '../assets/FoodImage.jpg'
import Geography from '../assets/GeographyImage.jpg'
import Sports from '../assets/TVImage.jpg'
import './Home.css'



const CarouselCategoryImages = [General, History, Games, TVMovies, Literature, Tech, Science, Math, PopCulture, Music, Food, Geography, Sports];
const Categories = ["General", "History", " Games", "TVMovies", "Literature", " Tech", "Science", "Math", "PopCulture", "Music", " Food", "Geography", "Sports"];

const imageImports = {
  General,
  History,
  Games,
  TVMovies,
  Literature,
  Tech,
  Science,
  Math,
  PopCulture,
  Music,
  Food,
  Geography,
  Sports
};

const Profile = () => {
  const { profileId } = useParams();
  console.log("profileId:", profileId);

  const { loading, data } = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: { userId: profileId },
  });


  console.log("data", data);

  const user = data?.me || data?.getUser || {};
  console.log("user", user);
  console.log("data", data);
  const quizArray = user?.quizzes || [];
  console.log("here are the user's quizzes:", quizArray);

  // Extracting categories from quizArray
  
  const quizIds = quizArray.map((quiz) =>
  quiz._id);

  const quizCategories = quizArray.map((quiz) =>
    quiz.category);
  console.log("Categories of user's quizzes:", quizCategories);

  const importedImageArray = quizCategories.map(category => imageImports[category]);
  console.log("importedImageArray", importedImageArray);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === user.username
  ) { 
    console.log("lookat me",user);
    return (<><Navigate to="/me" /><div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          {user.username}
        </h2>
        <p> Score: {user.score}</p>
        <div className="col-12 col-md-10 mb-5">
        <h1 className="homeh1">User Quizzes</h1>
        </div>
        <CategoryCarousel images={importedImageArray} categories={quizCategories} quizIds={quizIds} />
      </div>
    </div></>
    );
  }else
  {return (
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
          <CategoryCarousel images={importedImageArray} categories={quizCategories} quizIds={quizIds} />
        </div>
      </div>
    </div>
  );
};}

export default Profile;
