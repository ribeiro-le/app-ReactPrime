import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
    Container,
    SearchContainer,
    SearchButton,
    Input, Title,
    BannerButton, Banner,
    SliderMovie,
} from "./styles";

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import api, { key } from '../../services/api'
import { getListMovies, randomBanner } from '../../utils/movie';
import { useNavigation } from '@react-navigation/native';
import Search from '../../pages/Search';

function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [input, setInput] = useState('');


    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

        async function getMovies() {

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])

            if (isActive) {
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(6, popularData.data.results);
                const topList = getListMovies(6, topData.data.results);

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);
                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);

                setLoading(false);
            }

        }

        getMovies();


        return () => {
            isActive = false;
            ac.abort();
        }

    }, [])


    function navigationDetailPage(item) {
        navigation.navigate("Detail", {
            id: item.id,
        })
    }

    function handleSearchMovie() {

        if (input === '') {
            return;
        }

        navigation.navigate('Search', {
            name: input
        })

        setInput('');
    }

    if (loading) {
        return (
            <Container>
                <ActivityIndicator color="#fff" size="large">

                </ActivityIndicator>
            </Container>
        );
    }

    return (
        <Container>
            <Header title="React Prime" />

            <SearchContainer>
                <Input
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder="Ex.Vingadores"
                    placeholderTextColor="#ddd"></Input>

                <SearchButton
                    onPress={handleSearchMovie}
                >
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>

                <BannerButton activeOpacity={0.9} onPress={() => navigationDetailPage(bannerMovie)}>

                    <Banner
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    /></BannerButton>

                <SliderMovie
                    keyExtractor={(item) => String(item.id)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailPage(item)} />}
                ></SliderMovie>

                <Title>Populares</Title>

                <SliderMovie
                    keyExtractor={(item) => String(item.id)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailPage(item)} />}
                ></SliderMovie>

                <Title>Mais votados</Title>

                <SliderMovie
                    keyExtractor={(item) => String(item.id)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailPage(item)} />}
                ></SliderMovie>

            </ScrollView>
        </Container>
    );
}

export default Home;
