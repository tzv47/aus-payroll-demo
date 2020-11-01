import { Injectable } from "@nestjs/common";
import { GeneratePayrollDto } from "../api/dtos/payroll.dto";
import { TaxRateRepository } from "../data";

@Injectable()
export class PayrollBuilder {
  constructor(private taxRateRepository: TaxRateRepository) {}

  public async buildAllPayrolls(generatePayrollDtos: Array<GeneratePayrollDto>): Promise<any> {
    return;
  }

  private buildPayroll() {}

  private setGrossIncome() {}

  private setIncomeTax() {}

  private setNetIncome() {}

  private setSuperAmount() {}
}
