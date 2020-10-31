import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConnectionToken, TypegooseModule } from "nestjs-typegoose";
import { ApiModule } from "./api/api.module";
import { DataModule } from "./data/data.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRootAsync({
      connectionName: "payroll",
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("PAYROLL_MONGODB_URI") || "mongodb://mongodb/payroll",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }),
      inject: [ConfigService]
    }),
    ApiModule,
    DataModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
