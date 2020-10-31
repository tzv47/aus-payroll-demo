import { Body, Controller, Get, Post } from "@nestjs/common";
import { TaxRateRepository } from "../../data/repositories/tax-rate.repository";
import { GeneratePayrollDto } from "../dtos/payroll.dto";

@Controller("")
export class PayrollController {
  constructor(private taxRateRepository: TaxRateRepository) {}

  @Post("generate")
  public async generatePayroll(@Body() generatePayrollDtos: Array<GeneratePayrollDto>) {
    return generatePayrollDtos;
  }
}
