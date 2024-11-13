import { DynamicModule, INestApplication, Module} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Module({

})
export class SwaggerModuleLocal {
    static forRoot(app: INestApplication): DynamicModule {
        const swaggerConfig = new DocumentBuilder()
        .setTitle("The User Service API")
        .setDescription("Documentation User Service API")
        .setVersion("1.0")
        .build()
        
        const document = SwaggerModule.createDocument(app, swaggerConfig)
        SwaggerModule.setup("/swagger", app, document)

        return {
            module: SwaggerModuleLocal
        }
    }
}