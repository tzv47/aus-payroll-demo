import { Module, HttpModule } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { PayrollController } from "./controllers/payroll.controller";

const AUTH_CONTROLLERS = [PayrollController];

@Module({
  imports: [HttpModule, CoreModule],
  providers: [],
  controllers: [...AUTH_CONTROLLERS]
})
export class ApiModule {}
