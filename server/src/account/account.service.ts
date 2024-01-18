import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) { }

    async create(newAccount: Account): Promise<HttpException> {
        const { email } = newAccount
        const userFind: Account = await this.accountRepository.findOne({ where: { email } })

        if (userFind) {
            throw new HttpException("Account Email Aleady used", HttpStatus.BAD_REQUEST)
        }

        if (!await this.accountRepository.save(newAccount)) {
            throw new HttpException("Account creation failed", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return new HttpException({
            email: email
        }, HttpStatus.CREATED)
    }
}
