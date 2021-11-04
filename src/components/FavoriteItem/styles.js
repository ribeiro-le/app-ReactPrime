import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 14px;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: ${props => props.size}px;
    font-weight: bold;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
`;

export const Rate = styled.Text`
    color: #fff;
    font-size:  16px;
    padding: 14px;
`;


export const ActionContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;


export const DetailButton = styled.TouchableOpacity`
    width: 85%;
    height: 35px;
    background-color: #e72f49;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

export const DeleteButton = styled.TouchableOpacity`
    width: 15%;
    height: 30px;
    align-items: center;
    justify-content: center;
`;
