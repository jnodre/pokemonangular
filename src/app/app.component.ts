import { Component } from '@angular/core';
import axios from'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemons  = [];
  newPokemon  : any ;
  modeShiny : boolean = false;
  
  constructor() {
    this.getPokemons()
  }
/*
  public loadPokemons(){
    this.getPokemonsFromAPI()
    .then(pokemons => this.pokemons = pokemons.results);
    
  }
  private getPokemonsFromAPI(){
    return axios.get('https://pokeapi.co/api/v2/pokemon')
    .then( response => {return response.data})
  }*/
  public getPokemons(){
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then( pokemons => 
        pokemons.data.results.map((pokemon) =>
          axios.get(pokemon.url).then( newPokemon =>  { 
            this.pokemons.push(newPokemon.data)
            newPokemon.data.modeShiny = false;
          })))

    console.log()
  }
  changeImg(pokemon){
    const pokemonFounded = this.pokemons.find( x => x.name === pokemon.name );
    !pokemonFounded.modeShiny ? pokemonFounded.modeShiny = true : pokemonFounded.modeShiny = false;
  }
}