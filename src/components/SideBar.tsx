import { useEffect, useState } from 'react';
import { api } from '../services/api';

import { Button } from './Button';

interface GenreProps {
  id: number;
  title: string;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
}

type RatingProps = {
  Value: string;
}

type MovieProps = {
  Title: string;
  Poster: string;
  Ratings: RatingProps[];
  Runtime: string;
}

type SidebarResponse = {
  movies: MovieProps[];
  selectedGenre: GenreProps;
}

type SidebarProps = {
  genres: GenreProps[];
  onChange: ({ movies, selectedGenre }: SidebarResponse) => void;
}

export function SideBar({ genres, onChange }: SidebarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  async function fetchMoviesAndGenre() {
    const responseMovies = await api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`);

    const responseGenre = await api.get<GenreProps>(`genres/${selectedGenreId}`);

    onChange({ movies: responseMovies.data, selectedGenre: responseGenre.data });
  }

  useEffect(() => {
    fetchMoviesAndGenre();
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}