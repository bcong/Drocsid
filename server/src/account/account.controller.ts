import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { };

    @Post()
    async create(@Body() account: Account) {
        return await this.accountService.create(account);
    }
}