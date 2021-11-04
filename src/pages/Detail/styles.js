import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #141a29;
`;

export const Header = styled.View`
    z-index: 99;
    position: absolute;
    top: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 14px;
`;

export const HeaderButton = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    background-color: rgba(25, 26, 48, 0.8);
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 350px;
    border-bottom-left-radius: 70px;
    border-bottom-right-radius: 70px;

`;


export const ButtonLink = styled.TouchableOpacity`
    background-color: #E72F49;
    width: 60px;
    height: 60px;
    border-radius: 35px;
    position: absolute;
    top: 300px;
    right: 18px;
    align-items: center;
    justify-content: center;
    z-index: 99;
    
`;


export const Title = styled.Text`
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    padding:  8px 14px;
    margin-top: 10px;
`;

export const ContentArea = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 14px;
    justify-content: space-between;
`;



export const Rate = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
`;

export const ListGenres = styled.FlatList`
    padding-left: 14px;
    margin: 8px 0;
    max-height: 35px;
    min-height: 35px;

`;

export const Description = styled.Text`
    font-size: 16px;
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 30px;
    color: #fff;
    line-height: 20px;

`;