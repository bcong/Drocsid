import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    exports: [TypeOrmModule],
    providers: [AccountService],
    controllers: [AccountController]
})
export class AccountModule { }
