
import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { CreateAddressDto } from "./CreateAddressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public dateOfJoining: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public status: string;

    @IsString()
    public role: string;

    @IsUUID()
    public departmentId: string;

    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
        public address: Address
}