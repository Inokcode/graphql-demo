import { useQuery, useLazyQuery, gql } from '@apollo/client';
import React, { useState } from 'react';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovie {
    movies {
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearched, setMovieSearched] = useState('');
  //
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>DATA IS LOADING</h1>;
  }
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }
  if (movieError) {
    console.log(movieError.message);
  }
  return (
    <div>
      {data &&
        data.users.map((user) => (
          <div>
            <h3>Name: {user.name}</h3>
            <h3>Name: {user.username}</h3>
            <h3>Name: {user.age}</h3>
            <h3>Nationality: {user.nationality}</h3>
          </div>
        ))}
      {/*
       */}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => {
            setMovieSearched(e.target.value);
          }}
        />
        {/*  */}
        <button
          onClick={() => {
            fetchMovie({ variables: { name: movieSearched } });
          }}
        >
          Fetch Data
        </button>

        {/*  */}
        <div>
          {movieSearchedData && (
            <div>
              <h3>MovieName: {movieSearchedData.movie.name}</h3>
              <h3>
                year Of Publication: {movieSearchedData.movie.yearOfPublication}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
