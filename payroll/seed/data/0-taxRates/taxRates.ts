import { TaxRate } from "../../../src/data";

const taxRates: Array<TaxRate> = [];

const taxRate = {} as TaxRate;

taxRate.startDate = new Date(2017, 6, 1, 0, 0, 0);
taxRate.endDate = null;
taxRate.rateTable = [
  {
    minThreshold: 0,
    maxThreshold: 18200,
    prevThresholdCumulativeValue: 0,
    rate: 0
  },
  {
    minThreshold: 18201,
    maxThreshold: 37000,
    prevThresholdCumulativeValue: 0,
    rate: 0.19
  },
  {
    minThreshold: 37001,
    maxThreshold: 87000,
    prevThresholdCumulativeValue: 3572,
    rate: 0.325
  },
  {
    minThreshold: 87001,
    maxThreshold: 180000,
    prevThresholdCumulativeValue: 19822,
    rate: 0.37
  },
  {
    minThreshold: 180001,
    maxThreshold: null,
    prevThresholdCumulativeValue: 54232,
    rate: 0.45
  }
];

taxRates.push(taxRate);
export = taxRates;
