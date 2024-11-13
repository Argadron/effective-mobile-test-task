import { Controller, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SwaggerOK } from "../swagger/apiResponse.interfaces";

@Controller(`/user`)
@ApiTags(`User Controller`)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put(`/problem`)
    @ApiOperation({ summary: "Set problem flag to false and return count" })
    @ApiResponse({ status: 200, description: "Count getted", type: SwaggerOK })
    async update() {
        return await this.userService.update()
    }
}