import axios from 'axios';
import React, { Component } from 'react'
import Movie from '../components/Movie';
import '../styles/Home.css';


export class Home extends Component {
  state = {
    isLoading: true,
    movies: [],
  }
  componentDidMount() {//이 시점에서 영화 가져온다
    // setTimeout(()=>{
    //   this.setState({isLoading:false});
    // }, 6000);
    this.getMovies();
  }

  getMovies = async () =>{
    const {
      data : {
        data : {
          movies
        }
      }
    } =
    await axios.get('https://yts-proxy.now.sh/list_movies.json?genre=animation&sort_by=like_count');//마지막에 ?넣으면 조건 붙일수 있음 ,genre가 animation인것 중에서 좋아요 순으로
    console.log(movies);
    this.setState({
      isLoading: false,
      movies,       //movies: movies, //키:키값 이름이 동일하면 하나만 써주면 됨
    })

  }
  render() {
    const {isLoading, movies} = this.state;//구조 분해 할당
    return (
      
        <section className='container'>
          {isLoading ? 
          <div className='loader'>
            <span className='loader_text'>'Loading...'</span>
          </div>
          :
          <div className='movies'>
            {movies.map((movie, index) => <Movie 
                                              key={index}
                                              id={movie.id}
                                              year={movie.year}
                                              title={movie.title}
                                              summary={movie.summary}
                                              poster={movie.medium_cover_image}
                                              genres={movie.genres}
                                            /> )}

          </div>
          } 
          

        </section>
      
    )
  }
}

export default Home;