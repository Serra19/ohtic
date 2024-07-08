import { Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'expo-router';

export default function MoviesScreen() {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state: any) => state.movies.popular.results);
  const loading = useSelector((state: any) => state.movies.popular.loading);
  const searching = useSelector((state: any) => state.search.query);
  const searchResults = useSelector((state: any) => state.search.results.results);

  const [page, setPage] = useState(1);

  const [moviesToShow, setMoviesToShow] = useState(popularMovies);

  useEffect(() => {
    dispatch({ type: "LOAD_POPULAR_MOVIES", page })
  }, []);

  useEffect(() => {
    if (searching) {
      setMoviesToShow(searchResults?.filter((item: any) => item.media_type === "movie"));
    } else {
      setMoviesToShow(popularMovies);
    }
  }, [searchResults])

  const loadNextPage = () => {
    setPage(page + 1);
    dispatch({ type: "LOAD_POPULAR_MOVIES", page })
  }

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="black" />
    }
  }

  return (
    <FlatList
      data={moviesToShow}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Link
            href={{
              pathname: "/movieDetails",
              params: { id: item.id }
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                height: 300,
                flex: 1,
                backgroundColor: "gray",
                margin: 8,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ height: "100%", width: "100%" }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w1280/${item.poster_path}`,
                }}
              ></Image>
            </TouchableOpacity>
          </Link>
        )
      }}
      ListFooterComponent={renderFooter}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
    />
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
