import { IsDateString, IsNumber, IsString } from "class-validator";

export class GeneratePayrollDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsNumber()
  public annualSalary: number;

  @IsNumber()
  public superRate: number;

  @IsDateString()
  public startDate: Date;

  @IsDateString()
  public endDate: Date;
}
