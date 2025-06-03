import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { AccountService } from './account.service';
import { Response } from 'express';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { };

    @Post("signup")
    async singup(@Res() res: Response, @Body() account: Account) {
        console.log(account)
        return await this.accountService.signup(res, account);
    }
}