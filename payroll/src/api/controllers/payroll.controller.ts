import { Body, Controller, Post } from "@nestjs/common";
import { PayrollBuilder } from "../../core/payroll.builder";
import { GeneratePayrollDto } from "../dtos/payroll.dto";

@Controller("")
export class PayrollController {
  constructor(private payrollBuilder: PayrollBuilder) {}

  @Post("generate")
  public async generatePayroll(@Body() generatePayrollDtos: Array<GeneratePayrollDto>) {
    return this.payrollBuilder.buildAllPayrolls(generatePayrollDtos);
  }
}
