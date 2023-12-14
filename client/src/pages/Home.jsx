import { useLazyQuery, useQuery } from '@apollo/client';
import Quizardly from '../assets/quizardly.png'
import { QUERY_QUIZZES, QUERY_USERS } from '../utils/queries';

import QuizCategoryCarousel from '../components/Carousels/QuizCategory'
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


const CarouselCategoryImages = [General, History, Games, TVMovies, Literature, Tech, Science, Math, PopCulture, Music, Food, Geography, Sports ];
const Categories = ["General", "History"," Games", "TVMovies", "Literature"," Tech", "Science", "Math", "PopCulture", "Music"," Food", "Geography", "Sports" ]

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
  
const Home = () => {
    const { loading, data } = useQuery(QUERY_QUIZZES);
    

    if (loading) {
        return <div>Loading...</div>;
      }
    
      const quizzes = data?.getQuizzes || {};
      console.log("quizzes", quizzes);

      function get_random (list) {
        return list[Math.floor((Math.random()*list.length))];
      }

      const quizIds = quizzes.map((quiz) =>
      quiz._id);
    
      const quizCategories = quizzes.map((quiz) =>
        quiz.category);
        console.log("Categories of  quizzes:", quizCategories);
        console.log("Id of  quizzes:", quizIds);

        const importedImageArray = quizCategories.map(category => `../${imageImports[category]}`);

    return (
    <div className="hero" id="home">
        <div className="hero-overlay">
            
            <h1 className="homeh1">Quizardly </h1>
            <img src={Quizardly} alt="Narvin" className="hero-image"/>
            <h1 className="homeh1">User Quizzes</h1>
            <div className="carousel-cat">
            <CategoryCarousel images={importedImageArray} categories={quizCategories} quizIds={quizIds} />
            </div>
            <h1 className="homeh1">Quizzes by Category</h1>
            <div className="carousel-quiz">

            </div>
           
                
                
                </div>
                
            </div>
            
               
               
    )
        

      
   
}




export default Home