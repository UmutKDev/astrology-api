import { IsNotEmpty, IsString, IsEnum, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { slugify } from 'helpers/cast.helper';
import {
  AstrologySign,
  AstrologyFeature,
  DateType,
  Type,
} from 'interfaces/astrology.interface';

export class AstrologyDataRequest {
  @Transform(({ value }) => slugify(value))
  @IsNotEmpty()
  @IsString()
  @IsEnum(AstrologySign, {
    message: `$property must be one of ${Object.keys(AstrologySign).map(
      (key) => AstrologySign[key],
    )}`,
  })
  sign: AstrologySign;

  @Transform(({ value }) => slugify(value))
  @IsNotEmpty()
  @IsString()
  @IsEnum(Type, {
    message: `$property must be one of ${Object.keys(Type).map(
      (key) => Type[key],
    )}`,
  })
  type: Type;

  @ValidateIf(({ type }) => type === Type.Date)
  @IsNotEmpty()
  @Transform(({ value }) => slugify(value))
  @IsString()
  @IsEnum(DateType, {
    message: `$property must be one of ${Object.keys(DateType).map(
      (key) => DateType[key],
    )}`,
  })
  date: DateType;

  @ValidateIf(({ type }) => type === Type.Feature)
  @IsNotEmpty()
  @Transform(({ value }) => slugify(value))
  @IsString()
  @IsEnum(AstrologyFeature, {
    message: `$property must be one of ${Object.keys(AstrologyFeature).map(
      (key) => AstrologyFeature[key],
    )}`,
  })
  feature: AstrologyFeature;
}
