import { ReturnModelType } from "@typegoose/typegoose";
import { Injectable } from "@nestjs/common";
import { TaxRate } from "../models/tax-rate.model";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class TaxRateRepository {
  constructor(@InjectModel(TaxRate) protected readonly model: ReturnModelType<typeof TaxRate>) {}

  public async getTaxTable(startDate: Date, endDate: Date): Promise<TaxRate> {
    return this.model
      .findOne({
        startDate: { $lte: startDate },
        $or: [{ endDate: null }, { endDate: { $gte: endDate } }]
      })
      .lean();
  }
}
