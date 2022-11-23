import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async executeSeed() {

    const {data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);

    data.results.forEach(async({name, url}) => {

      const segments = url.split('/');
      const np = +segments[segments.length -2];

      const pokemon = await this.pokemonModel.create({name, np})

      console.log(name, np)
    })

    return `Seed executed`
    
  }

  
}
