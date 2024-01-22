import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Response } from 'express';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) { }

    async signup(@Res() res: Response, newAccount: Account): Promise<Response | Account> {
        const { email } = newAccount;
        const userFind: Account = await this.accountRepository.findOne({ where: { email } });

        if (userFind) {
            throw new HttpException("Account email already used", HttpStatus.BAD_REQUEST);
        }

        const signupAccount = await this.accountRepository.save(newAccount);
        if (!signupAccount) {
            throw new HttpException("Account creation failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res.status(HttpStatus.CREATED).json({
            email: signupAccount.email,
            name: signupAccount.name
        });
    }
}
