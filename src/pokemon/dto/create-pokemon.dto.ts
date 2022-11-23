import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";


export class CreatePokemonDto {

  @IsInt()
  @Min(1)
  @IsPositive()
  np: number;

  @IsString()
  @MinLength(4)
  name: string;
}


