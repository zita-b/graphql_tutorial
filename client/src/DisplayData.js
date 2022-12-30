import { useState } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client'

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username 
  }
}
`

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
  }
}
`

const GET_MOVIE_BYNAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState('')
  const { data, loading } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, {data: movieSearchedData, error: movieError}] = useLazyQuery(GET_MOVIE_BYNAME)

  if (loading) {
    return <h1>DATA IS LOADING...</h1>
  }

  return (
    <div>
      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
            </div>
          )
        })}

        {movieData && movieData.movies.map((movie) => {
          return <h1>Movie: {movie.name}</h1>
        })}

        <div>
          <input
            type="text"
            placeholder='Interstellar'
            onChange={(event) =>
              {setMovieSearched(event.target.value)}
            }
          />
          <button
            onClick={() => {
              fetchMovie({
                variables: {
                  name: movieSearched,
                },
              });
            }}
          >
            {''}
            Fetch Data
          </button>
          <div>
            {movieSearchedData &&(
              <div>
                {''}
                <h1>Movie: {movieSearchedData.movie.name}</h1>{''}
                <h1>Released: {movieSearchedData.movie.yearOfPublication}</h1>{''}
              </div>
            )}
            {movieError && 
              <h1>There was an error</h1>
            }
          </div>
        </div>
    </div>
  )
}

export default DisplayData
