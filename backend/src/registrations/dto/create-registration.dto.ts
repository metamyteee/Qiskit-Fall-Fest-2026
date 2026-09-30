import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateRegistrationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName!: string;

  @IsEmail()
  @MaxLength(160)
  email!: string;

  @Matches(/^[0-9+\-\s]{7,15}$/, { message: "phone must be a valid phone number" })
  phone!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(160)
  institution!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(60)
  yearOfStudy!: string;

  @IsIn(["in-person", "online"])
  attendanceMode!: "in-person" | "online";

  @IsIn(["beginner", "intermediate", "advanced"])
  experienceLevel!: "beginner" | "intermediate" | "advanced";

  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  interests!: string[];

  @IsOptional()
  @IsString()
  @MaxLength(200)
  hearAboutUs?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  hpField?: string;
}
