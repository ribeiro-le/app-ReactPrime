import axios from 'axios';

// URL FILES EM CARTAZ
// https://api.themoviedb.org/3/

// movie/now_playing &language=pt-BR &page=1

export const key = 'a9c4eb3a438c5b565b651cbfbae6baf7'


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;