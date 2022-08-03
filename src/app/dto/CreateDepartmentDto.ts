import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public name: string;

    // @IsString()
    // public username: string;
    @IsString()
    public Id: string;
}