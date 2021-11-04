import React from "react";
import {
    Container,
    Title,
    RateContainer,
    Rate,
    ActionContainer,
    DetailButton,
    DeleteButton
} from './styles'

import { Ionicons, Feather } from '@expo/vector-icons';


function FavoriteItem({ data, deleteMovie, navigatePage }) {
    return (
        <Container>

            <Title size={22}>{data.title}</Title>

            <RateContainer>

                <Ionicons name="md-star" size={16} color="#E7A74e"></Ionicons>

                <Rate>{data.vote_average}/10</Rate>

            </RateContainer>

            <ActionContainer>
                <DetailButton onPress={() => navigatePage(data)}>
                    <Title size={16}>Ver Detalhes</Title>
                </DetailButton>

                <DeleteButton onPress={() => deleteMovie(data.id)}>
                    <Feather name="trash" size={26} color="#fff"></Feather>
                </DeleteButton>

            </ActionContainer>
        </Container>
    );
}

export default FavoriteItem;