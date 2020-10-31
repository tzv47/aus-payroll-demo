import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConnectionToken, TypegooseModule } from "nestjs-typegoose";

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
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
