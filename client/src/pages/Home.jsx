import { useQuery } from '@apollo/client';
import Quizardly from '../assets/quizardly.png'

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


const Home = () => {
    
    return (
    <div className="hero" id="home">
        <div className="hero-overlay">
            
            <h1 className="homeh1">Quizardly </h1>
            <img src={Quizardly} alt="Narvin" className="hero-image"/>
            <h1 className="homeh1">User Quizzes</h1>
            <div className="carousel-cat">
            <QuizCategoryCarousel images={CarouselCategoryImages} categories={Categories}/>
            </div>
            <h1 className="homeh1">Quizzes by Category</h1>
            <div className="carousel-quiz">
            <CategoryCarousel images={CarouselCategoryImages} categories={Categories}/>
            </div>
           
                
                
                </div>
                
            </div>
            
               
               
    )
        

      
   
}




export default Home