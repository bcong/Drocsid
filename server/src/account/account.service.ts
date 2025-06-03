import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Response } from 'express';
import { generateID } from '@Utils/math';
import cluster from 'cluster';

@Injectable()
export class AccountService {
    private sequence = 0n

    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) { }

    async signup(@Res() res: Response, newAccount: Account): Promise<Response | Account> {
        const { email } = newAccount;
        const userFind: Account = await this.accountRepository.findOne({ where: { email } })

        console.log(newAccount)

        if (userFind) {
            throw new HttpException({
                errorCode: "ALREADY_EMAIL_USE"
            }, HttpStatus.BAD_REQUEST);
        }

        const workerId = (cluster.worker && cluster.worker.id) || 0;
        const processId = process.pid;
        const id = await generateID(workerId, processId, this.sequence)

        this.sequence > 9 ? this.sequence = 0n : this.sequence++

        const signupAccount = await this.accountRepository.save({ ...newAccount, id: id })
        if (!signupAccount) {
            throw new HttpException({
                errorCode: "INTERNAL_SERVER_ERROR"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return res.status(HttpStatus.CREATED).json({
            email: signupAccount.email,
            name: signupAccount.name
        });
    }
}
