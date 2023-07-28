import {Movie, MovieRating} from '../../types/movies.type';

export const movieDetails: Movie & { Error?: any } = {
    Title: 'Oppenheimer',
    Year: '2023',
    Rated: 'R',
    Released: '21 Jul 2023',
    Runtime: '180 min',
    Genre: 'Biography, Drama, History',
    Director: 'Christopher Nolan',
    Writer: 'Christopher Nolan, Kai Bird, Martin Sherwin',
    Actors: 'Cillian Murphy, Emily Blunt, Matt Damon',
    Plot: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    Language: 'English',
    Country: 'United States, United Kingdom',
    Awards: '1 nomination',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
    Ratings: [
        {
            Source: 'Internet Movie Database',
            Value: '8.8/10',
        },
        {
            Source: 'Metacritic',
            Value: '89/100',
        },
    ],
    Metascore: '89',
    imdbRating: '8.8',
    imdbVotes: '155,886',
    imdbID: 'tt15398776',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: '$82,455,420',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
};
