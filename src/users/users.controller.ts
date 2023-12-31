import { Body, Controller, Get, Param, Post, HttpCode, Query, Delete,Put, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users/')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Get('/:id')
    getUserById(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<any> {
        return this.userService.getUserById(id)
    }


    @Get()
    getUsers(
        @Query('user') user?: string
    ): Promise<any> {
        if (user) return this.userService.getUsersByUser(user);
        return this.userService.getUsers();
    }
    @Post()
    createUser(@Body() userDto: UserDto): Promise<any> {
        return this.userService.createUser(userDto);
    }
    
    @Delete('/:id')
    @HttpCode(204)
    deleteUser(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
    @Put('/:id')
    updateUserById(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() userDto: UserDto): Promise<any> {
        return this.userService.updateUserById(id, userDto);
    }



}
