import config from "./config";

const { apikey } = config;

const API_URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apikey}&format=json`;


export default function getArtists(country) {

    const url = API_URL.replace(":country", country);

    return fetch(url)
        .then(res => res.json())
        .then(json => json.topartists.artist)
}