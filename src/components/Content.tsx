import { Header } from './Header';
import { MovieCard } from './MovieCard';

type RatingProps = {
  Value: string;
}

type MovieProps = {
  Title: string;
  Poster: string;
  Ratings: RatingProps[];
  Runtime: string;
}

type ContentProps = {
  title: string;
  movies: MovieProps[];
}

export function Content({ title, movies }: ContentProps) {
  return (
    <div className="container">
        <Header title={title} />

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}