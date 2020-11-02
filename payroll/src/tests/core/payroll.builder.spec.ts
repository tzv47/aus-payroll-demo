import { createMock } from "@golevelup/ts-jest";
import { BadRequestException } from "@nestjs/common";
import * as moment from "moment";

import * as taxRates from "../../../seed/data/0-taxRates/taxRates";
import { PayrollBuilder } from "../../core/payroll.builder";
import { TaxRate, TaxRateRepository } from "../../data";

describe("[Payment] Core/PayrollBuilder", () => {
  let payrollBuilder: PayrollBuilder;

  const mockTaxRates = taxRates;
  beforeEach(() => {
    const mockTaxRateRepository = createMock<TaxRateRepository>({
      getTaxTable: async (startDate: Date, endDate: Date): Promise<TaxRate> => {
        return mockTaxRates.find(
          taxRate =>
            moment(startDate).isAfter(moment(taxRate.startDate)) && (moment(endDate).isBefore(moment(taxRate.endDate)) || taxRate.endDate === null)
        );
      }
    });

    payrollBuilder = new PayrollBuilder(mockTaxRateRepository);
  });

  describe("* Generate Payroll with correct tax period", () => {
    it("should return generated Payroll", async () => {
      const data = [
        {
          firstName: "Mark",
          lastName: "Dean",
          annualSalary: 60050,
          superPercentage: 9,
          startDate: new Date("2020-03-01"),
          endDate: new Date("2020-03-31")
        }
      ];

      const [payroll] = await payrollBuilder.buildAllPayrolls(data);

      expect(payroll.grossIncome).toEqual(5004);
      expect(payroll.incomeTax).toEqual(922);
      expect(payroll.netIncome).toEqual(4082);
      expect(payroll.superAmount).toEqual(450);
    });
  });

  describe("* Generate Payroll with non existing tax period", () => {
    it("should throw bad request exception", async () => {
      const data = [
        {
          firstName: "Mark",
          lastName: "Dean",
          annualSalary: 60050,
          superPercentage: 9,
          startDate: new Date("2000-03-01"),
          endDate: new Date("2000-03-31")
        }
      ];
      try {
        const [payroll] = await payrollBuilder.buildAllPayrolls(data);
      } catch (error) {
        expect(error).toEqual(new BadRequestException("No available tax found based on given period"));
      }
    });
  });
});
