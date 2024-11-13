import { ApiProperty } from "@nestjs/swagger";

export class SwaggerOK {
    @ApiProperty({ description: "Code from response", default: 200 })
    readonly statusCode: number;

    @ApiProperty({ description: "Response message", default: "User info data..." })
    readonly message: string; 

    @ApiProperty({ description: "Error message", default: null })
    readonly error: string;
}

export class SwaggerBadRequest {
    @ApiProperty({ description: "Code from response", default: 400 })
    readonly statusCode: number; 

    @ApiProperty({ description: "Response message", default: "Username must be a string" })
    readonly message: string; 

    @ApiProperty({ description: "Error message", default: "BadRequest Execption" })
    readonly error: string;
}