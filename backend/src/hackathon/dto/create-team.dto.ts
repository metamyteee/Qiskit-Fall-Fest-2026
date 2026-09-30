import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class TeamLeaderDto {
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
}

class TeamMemberDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName!: string;

  @IsEmail()
  @MaxLength(160)
  email!: string;

  @IsString()
  @MaxLength(160)
  institution!: string;
}

export class CreateHackathonRegistrationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  teamName!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  track?: string;

  @IsIn(["in-person", "online"])
  attendanceMode!: "in-person" | "online";

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  problemStatement?: string;

  @ValidateNested()
  @Type(() => TeamLeaderDto)
  leader!: TeamLeaderDto;

  @IsArray()
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  members!: TeamMemberDto[];

  @IsOptional()
  @IsUrl({}, { message: "githubUrl must be a valid URL" })
  @MaxLength(300)
  githubUrl?: string;

  @IsBoolean()
  agreedToRules!: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  hpField?: string;
}
