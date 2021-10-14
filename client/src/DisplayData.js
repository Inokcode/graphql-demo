import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';
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

// const CREATE_USER_MUTATION = gql`
//   mutation CreateUser($input: CreateUserInput!) {
//     createUser(input: $input) {
//       name
//       id
//     }
//   }
// `;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearched, setMovieSearched] = useState('');
  //
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  //
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  // create user states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState('');

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
    console.log(movieError);
  }
  return (
    <div>
      <div>
        {/*  */}
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        {/*  */}
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
        {/*  */}
      </div>
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
          {movieError && <h1> There was an error fetching the data </h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
