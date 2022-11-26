import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/httpAdapter/axios.adapter';


@Injectable()
export class SeedService {
  
  

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly hppt: AxiosAdapter
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.hppt.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`);
    
    const pokemonToInsert: {name: string, np: number}[] = [];

    data.results.forEach(async({name, url}) => {

      const segments = url.split('/');
      const np = +segments[segments.length -2];

      // const pokemon = await this.pokemonModel.create({name, np})

      pokemonToInsert.push({name, np});
      
    })

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `Seed executed`
    
  }

  
}
