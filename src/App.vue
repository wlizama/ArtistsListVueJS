<template lang="pug">
    #app
        img(src='./assets/logo.png')
        h1 {{ title }}
        select(v-model="selectedCountry")
            option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
        spinner(v-show="loading")
        ul
            artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>

import Artist from "./components/Artist.vue";
import Spinner from "./components/Spinner.vue";

import getArtists from "./api";

export default {
    name: 'app',
    data () {
        return {
            title : "Music List",
            loading : true,
            countries : [
                { name : "Argentina" , value : "argentina" },
                { name : "España" , value : "spain" },
                { name : "Perú" , value : "peru" }
            ],
            selectedCountry : "argentina",
            artists : []
        }
    },
    methods : {
        refreshArtists () {
            const self = this;
            self.artists = [];
            self.loading = true;
            getArtists(this.selectedCountry)
                .then(function (artists){
                    self.artists = artists;
                    self.loading = false;
                });
        } 
    },
    components: {
        Artist : Artist,
        Spinner : Spinner
    },
    mounted () {
        this.refreshArtists();
    },
    watch : {
        selectedCountry () {
            this.refreshArtists();
        }
    }
}
</script>

<style lang="stylus">
    #app
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50
        margin-top 60px

    h1, h2
        font-weight normal

    ul
        list-style-type none
        padding 0

    li
        display inline-block
        margin 0 10px

    a
        color #42b983
</style>
