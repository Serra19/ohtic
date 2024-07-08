import { useLocalSearchParams, router } from "expo-router"
import { useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { MaterialIcons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Colors } from "@/constants/Colors"

export default function DetailsScreen() {
  const params = useLocalSearchParams() as { id: string }

  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme()

  const { id } = params

  const tvSerieDetails = useSelector(
    (state: any) => state.tvSeries.tvSeriesDetails?.[id]
  )

  useEffect(() => {
    dispatch({ type: "LOAD_TVSERIE_DETAILS", id })
  }, [])

  useEffect(() => {
    if (tvSerieDetails) {
      dispatch({ type: "LOAD_TVSERIE_CREDITS", id })
    }
  }, [tvSerieDetails])

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{
          zIndex: 99,
          position: "absolute",
          width: 200,
          height: 200,
          marginTop: insets.top,
          marginHorizontal: 12,
        }}
        onPress={router.back}
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="white"
          style={{
            elevation: 10,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          }}
        />
      </TouchableOpacity>
      <View style={{ width: "100%", height: 300, marginTop: -insets.top }}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w1280/${tvSerieDetails?.backdrop_path}`,
          }}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingHorizontal: 18,
            paddingBottom: 12,
          }}
          resizeMode="cover"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "white",
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              {tvSerieDetails?.name}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ marginTop: 4, marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors[colorScheme ?? "light"].text,
            fontWeight: "bold",
            marginHorizontal: 12,
          }}
        >
          <Text>
            {new Date(tvSerieDetails?.release_date).toLocaleDateString(
              "es-ES",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}{" "}
            |{" "}
          </Text>
          <Text>{tvSerieDetails?.runtime} min | </Text>
          {tvSerieDetails?.genres?.map((genre: any, index: number) => (
            <Text key={index}>
              {genre.name}
              {index !== tvSerieDetails?.genres?.length - 1 && ", "}
            </Text>
          ))}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 12,
          }}
        >
          <Text style={{ color: "gray" }}>{tvSerieDetails?.status}</Text>
          <Text style={{ fontSize: 28, color: "#ffaa00" }}>
            {parseFloat(tvSerieDetails?.vote_average).toFixed(1)}
          </Text>
        </View>
        <Text
          style={{ color: Colors[colorScheme ?? "light"].text, margin: 12 }}
        >
          {tvSerieDetails?.overview}
        </Text>
        <FlatList
          style={{
            flexDirection: "row",
            marginTop: 12,
          }}
          contentContainerStyle={{ alignItems: "center" }}
          horizontal
          data={tvSerieDetails?.production_companies}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 25,
                paddingHorizontal: 8,
                backgroundColor: "white",
                borderRadius: 10,
                marginHorizontal: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              {item.logo_path ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.logo_path}`,
                  }}
                  style={{
                    width: 50,
                    height: 25,
                    marginRight: 12,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <Text
                  style={{
                    color: Colors[colorScheme ?? "light"].text,
                    fontSize: 12,
                  }}
                >
                  {item.name}
                </Text>
              )}
            </View>
          )}
        />
        <Text
          style={{
            marginTop: 12,
            marginHorizontal: 12,
            fontWeight: "bold",
            fontSize: 18,
            color: Colors[colorScheme ?? "light"].text,
          }}
        >
          Créditos
        </Text>
        <FlatList
          style={{ marginTop: 12, paddingLeft: 12 }}
          data={tvSerieDetails?.credits?.cast}
          horizontal
          renderItem={({ item }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: "white",
                marginRight: 12,
              }}
            >
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                }}
                style={{
                  width: 80,
                  height: 120,
                  justifyContent: "flex-end",
                  paddingLeft: 4,
                }}
                resizeMode="cover"
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                  }}
                >
                  {item.name}
                </Text>
              </ImageBackground>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
