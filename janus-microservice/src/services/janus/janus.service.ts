import { Injectable, HttpService, Logger } from '@nestjs/common';
import { throws } from 'node:assert';
import { map } from 'rxjs/operators'

@Injectable()
export class JanusService {

    private logger: Logger = new Logger('JanusAPIWrapper');
    private janusAPIBaseUrl: string = process.env.JANUS_API_BASE_URL;
    private janusAPISecret: string = process.env.JANUS_API_SECRET;

    constructor(private http: HttpService) {

    }

    getJanusInfo() {
        return this.http.get(this.janusAPIBaseUrl + 'info/')
            .pipe(
                map(response => response.data)
            );
    }

    createSession(transaction: string) {
        this.logger.log(`Trying to create transaction ${transaction}...`)

        const request = {
            janus: "create",
            transaction: transaction,
            apisecret: this.janusAPISecret,
        }
        
        return this.http.post(this.janusAPIBaseUrl, request)
            .pipe(
                map(response => response.data)
            );
    }

}
