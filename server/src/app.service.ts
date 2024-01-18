import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    private serverStartTime: number;

    constructor() {
        this.serverStartTime = Date.now();
    }

    getServerStatus(): object {
        const serverCurrentTime = Date.now();
        const serverRunTime = serverCurrentTime - this.serverStartTime;

        return {
            status: "OK",
            serverStartTime: new Date(this.serverStartTime).toLocaleString(),
            serverCurrentTime: new Date(serverCurrentTime).toLocaleString(),
            serverRunTime: `${serverRunTime / 1000} sec`
        };
    }
}
