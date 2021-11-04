import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    padding: 14px;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: 8px;
    
`;

export const Title = styled.Text`
    padding-top: 8px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const RateContainer = styled.View`
    padding-top: 3px;
    flex-direction: row;
    align-items: center;
`;

export const Rate = styled.Text`
    padding-left: 7px;
    font-size: 14px;
    color: #fff;

`;