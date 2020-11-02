import { Injectable } from "@nestjs/common";
import * as Big from "big.js";
import * as moment from "moment";

import { GeneratePayrollDto } from "../api/dtos/payroll.dto";
import { Rate, TaxRateRepository } from "../data";
import { GeneratedPayroll } from "../data/interface/generated-payroll.interface";

const ROUND_HALF_UP = 1;

@Injectable()
export class PayrollBuilder {
  constructor(private taxRateRepository: TaxRateRepository) {}

  public async buildAllPayrolls(generatePayrollDtos: Array<GeneratePayrollDto>): Promise<Array<GeneratedPayroll>> {
    return Promise.all(
      generatePayrollDtos.map(async generatePayrollDto => {
        const { startDate, endDate, firstName, lastName, annualSalary, superPercentage } = generatePayrollDto;
        const selectedTax = await this.taxRateRepository.getTaxTable(startDate, endDate);
        const grossIncome = this.setGrossIncome(annualSalary);
        const incomeTax = this.setIncomeTax(annualSalary, selectedTax.rateTable);
        const netIncome = grossIncome - incomeTax;
        const superAmount = this.setSuperAmount(grossIncome, superPercentage);
        return {
          fullName: `${firstName} ${lastName}`,
          period: `${moment(startDate).format("DD MMMM")} - ${moment(endDate).format("DD MMMM")}`,
          grossIncome,
          incomeTax,
          netIncome,
          superAmount
        } as GeneratedPayroll;
      })
    );
  }

  private setGrossIncome(annualSalary: number): number {
    return this.roundToInteger(annualSalary / 12);
  }

  private setIncomeTax(annualSalary: number, rateTable: Array<Rate>) {
    const taxBracket = rateTable.find(rate => {
      return (
        (annualSalary >= rate.minThreshold && annualSalary <= rate.maxThreshold) || (annualSalary >= rate.minThreshold && rate.maxThreshold === 0)
      );
    });

    const annualIncomeTax = taxBracket.prevThresholdCumulativeValue + taxBracket.rate * (annualSalary - (taxBracket.minThreshold - 1));
    return this.roundToInteger(annualIncomeTax / 12);
  }

  private setSuperAmount(grossIncome: number, superRate: number) {
    return this.roundToInteger(grossIncome * (superRate / 100));
  }

  // To handle floating point issues
  private roundToInteger(num: number): number {
    Big.RM = ROUND_HALF_UP;
    return parseInt(new Big(num).toFixed(0), 10);
  }
}
