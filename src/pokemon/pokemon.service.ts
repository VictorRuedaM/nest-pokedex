import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}



  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
    // const pokemon = await this.pokemonModel.create(createPokemonDto);

    // return pokemon;
    
    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(param: string) {
    let pokemon: Pokemon;

    if(!isNaN(+param)){
      
      pokemon = await this.pokemonModel.findOne({np: param});
    }
    if(!pokemon && isValidObjectId(param)){
      pokemon = await this.pokemonModel.findById(param)
    }
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: param.toLowerCase().trim()})
    }
    
    if(!pokemon){
      throw new NotFoundException(`Pokemon with Id, name or pn : [ ${param} ] not found.`)
    }

    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(param);

    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto, {new: true});

      return {...pokemon.toJSON(), updatePokemonDto};
    } catch (error) {
      this.handleExceptions(error);
    }
    
  }

  async remove(id: string) {

    // const result = await this.pokemonModel.findByIdAndDelete(id)
    const result = await this.pokemonModel.deleteOne({_id: id});
    
    if(result.deletedCount === 0){
      throw new BadRequestException(`Pokemon with Id: [ ${id} ] not found`);
    }
    return `Pokemon successfully removed`;


  }


  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon already exist in database -- [${error}]`)
    }else{
      console.log('ERROR>>',error);
      throw new InternalServerErrorException(`Can't create Pokemon -- Check server logs`);
    }
  }
}
