import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'USER', 'ADMIN'], { message: 'Valid role is required' })
    role: 'INTERN' | 'USER' | 'ADMIN';
}
