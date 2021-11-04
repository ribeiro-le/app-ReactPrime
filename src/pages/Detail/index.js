import React, { useState, useEffect } from "react";
import { Alert } from "react-native"
import {
    Container,
    Header,
    HeaderButton,
    Banner,
    ButtonLink,
    Title,
    ContentArea,
    Rate,
    ListGenres,
    Description


} from "./styles";

import { ScrollView, Modal } from 'react-native';
import Genres from '../../components/Genres'
import ModalLink from '../../components/ModalLink'

import { Feather, Ionicons } from "@expo/vector-icons";
import Stars from 'react-native-stars';

import { useNavigation, useRoute } from "@react-navigation/native";
import api, { key } from "../../services/api";

import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage'

function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState({});
    const [openLink, setOpenLink] = useState(false);
    const [favoritedMovie, setFavoritedMovie] = useState(false);

    useEffect(() => {
        let isActive = true;

        async function getMovie() {
            const response = await api
                .get(`/movie/${route.params?.id}`, {
                    params: {
                        api_key: key,
                        language: "pt-BR",
                    },
                })
                .catch((err) => {
                    console.log(err);
                });

            if (isActive) {
                setMovie(response.data);
                //console.log(response.data)

                const isFavorite = await hasMovie(response.data)
                setFavoritedMovie(isFavorite)
            }
        }

        if (isActive) {
            getMovie();
        }

        return () => {
            isActive = false;
        };
    }, []);


    async function handleFavoriteMovie(movie) {

        if (favoritedMovie) {
            await deleteMovie(movie.id);
            setFavoritedMovie(false);

            Alert.alert(`Removido...`,
                `O filme ${movie.title} foi removido da sua lista!`)
        }
        else {
            await saveMovie('@primereact', movie);
            setFavoritedMovie(true);

            Alert.alert(`Salvo...`,
                `O filme ${movie.title} foi salvo em sua lista!`
            );

        }

    }


    return (
        <Container>
            <Header>
                <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color="#fff"></Feather>
                </HeaderButton>

                <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
                    {favoritedMovie ? (
                        <Ionicons
                            name="bookmark"
                            size={28}
                            color="#fff">

                        </Ionicons>
                    ) : (
                        <Ionicons
                            name="bookmark-outline"
                            size={28}
                            color="#fff"></Ionicons>
                    )}
                </HeaderButton>
            </Header>

            <Banner
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
            ></Banner>

            <ButtonLink onPress={() => setOpenLink(true)}>

                <Feather name="link" size={28} color="#fff"></Feather>
            </ButtonLink>

            <Title numberOfLines={2}>{movie.title}</Title>

            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={
                        <Ionicons name="md-star" size={24} color="#E7A74E"></Ionicons>
                    }
                    emptyStar={
                        <Ionicons name="md-star-outline" size={24} color="#E7A74E"></Ionicons>
                    }
                    halfStar={
                        <Ionicons name="md-star-half" size={24} color="#E7A74E"></Ionicons>
                    }
                    disable={true}

                ></Stars>
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>
            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Genres data={item} />}
            ></ListGenres>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Description>{movie.overview}</Description>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openLink}
            >
                <ModalLink
                    link={movie?.homepage}
                    title={movie.title}
                    closeModal={() => setOpenLink(false)}
                >

                </ModalLink>

            </Modal>

        </Container>
    );
}

export default Detail;
