import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { modelOptions, prop } from "@typegoose/typegoose";
import { IsArray, IsDateString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class Rate {
  @IsNumber()
  @prop({ required: true })
  public minThreshold: number;

  @IsNumber()
  @prop({ required: true })
  public maxThreshold: number;

  @IsNumber()
  @prop({ required: true })
  public prevThresholdCumulativeValue: number;

  @IsNumber()
  @prop({ required: true })
  public rate: number;
}

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false, collection: "taxRates" } })
export class TaxRate extends Base<string> {
  @IsDateString()
  @prop({ required: true })
  public startDate: Date;

  @IsDateString()
  @prop({ required: true })
  public endDate: Date;

  @prop({ required: true })
  @Type(() => Rate)
  public rateTable: Rate[];
}
