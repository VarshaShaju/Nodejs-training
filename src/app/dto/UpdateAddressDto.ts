import { IsString } from "class-validator";

export class UpdateAddressDto {
    @IsString()
    public line1: string;

    @IsString()
    public line2: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public country: string;

    @IsString()
    public pin: string;
}