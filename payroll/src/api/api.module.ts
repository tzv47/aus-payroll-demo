import { DataModule } from "@app/data/data.module";
import { Module, HttpModule } from "@nestjs/common";
import { PayrollController } from "./controllers/payroll.controller";

const AUTH_CONTROLLERS = [PayrollController];

@Module({
  imports: [HttpModule, DataModule],
  providers: [],
  controllers: [...AUTH_CONTROLLERS]
})
export class ApiModule {}
