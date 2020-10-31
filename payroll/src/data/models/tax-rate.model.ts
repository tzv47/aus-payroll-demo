import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptions, prop } from "@typegoose/typegoose";
import { IsArray, IsDateString, IsNumber } from "class-validator";

export class Rate {
  @IsNumber()
  @prop({ required: true })
  public minimumBracket: number;

  @IsNumber()
  @prop({ required: true })
  public maximumBracket: number;

  @IsNumber()
  @prop({ required: true })
  public additionalTax: number;

  @IsNumber()
  @prop({ required: true })
  public rate: number;
}

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class TaxRate extends Base<string> {
  @IsDateString()
  @prop({ required: true })
  public startDate: Date;

  @IsDateString()
  @prop({ required: true })
  public endDate: Date;

  @IsArray()
  @prop({ required: true })
  public rateTable: Array<Rate>;
}
