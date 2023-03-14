CREATE DATABASE movies;
\c movies;

CREATE TABLE person (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    profession varchar(255)
);

CREATE TABLE movie (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text,
    year integer,
    country varchar(255),
    director_id bigint REFERENCES person,
    screenplay_id bigint REFERENCES person,
    producer_id bigint REFERENCES person,
    cinematographer_id bigint REFERENCES person,
    composer_id bigint REFERENCES person,
    artist_id bigint REFERENCES person,
    editor_id bigint REFERENCES person
);

CREATE TABLE movie_genre (
    movie_id bigint REFERENCES movie,
    genre varchar(255),
    PRIMARY KEY (movie_id, genre)
);

CREATE TABLE movie_person (
    movie_id bigint REFERENCES movie,
    person_id bigint REFERENCES person,
    role varchar(255),
    PRIMARY KEY (movie_id, person_id, role)
);

CREATE TABLE movie_country_audience (
    movie_id bigint REFERENCES movie,
    country varchar(255),
    count bigint,
    PRIMARY KEY (movie_id, country)
);