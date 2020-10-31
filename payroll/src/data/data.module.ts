import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { TaxRate } from "./models/tax-rate.model";
import { TaxRateRepository } from "./repositories/tax-rate.repository";

const REPOSITORIES = [TaxRateRepository];

const MODELS = [TaxRate];

@Module({
  imports: [TypegooseModule.forFeature(MODELS, "payroll")],
  controllers: [],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES]
})
export class DataModule {}
