import { DataModule } from "@app/data/data.module";
import { HttpModule, Module } from "@nestjs/common";
import { PayrollBuilder } from "./payroll.builder";

@Module({
  imports: [DataModule],
  providers: [PayrollBuilder],
  exports: [PayrollBuilder]
})
export class CoreModule {}
