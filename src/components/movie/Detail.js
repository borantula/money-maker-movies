import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddRemoveListButtons from "./AddRemoveListButtons";
import "./Detail.css";

const MovieDetail = ({ movie, backLink }) => {
  const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  // const backdropPath = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const year = movie.release_date.split("-")[0];

  return (
    <div className="movie-detail">
      <Card>
        <CardContent>
          <div className="text-left">{backLink}</div>
          <Grid container>
            <Grid item xs="12" sm="6">
              <img
                className="movie-item__poster"
                src={posterPath}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs="12" sm="6" className="text-left">
              <h1 className="movie-detail__title">{movie.title}</h1>
              <h4>{movie.tagline ? movie.tagline : "&nbsp;"}</h4>
              <div className="movie-detail__list-btn">
                <AddRemoveListButtons movie={movie} />
              </div>
              <div className="movie-detail__meta">
                <Typography variant="title" gutterBottom>
                  Year: {year}
                </Typography>
                <Typography variant="title" gutterBottom>
                  Budget: ${movie.budget && movie.budget.toLocaleString("en")}
                </Typography>
                <Typography variant="title" gutterBottom>
                  Revenue: ${movie.budget && movie.revenue.toLocaleString("en")}
                </Typography>
                <Typography variant="title" gutterBottom>
                  Runtime: {movie.runtime} min.
                </Typography>

                {movie.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See on IMDB
                  </a>
                )}
              </div>

              <div className="movie-detail__desc">{movie.overview}</div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieDetail;
