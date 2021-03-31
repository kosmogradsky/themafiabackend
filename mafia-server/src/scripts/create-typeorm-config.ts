import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({ isGlobal: true });
import { DatabaseService } from '../core/database/database.service';
import fs = require('fs');

const dbService = new DatabaseService();

(async () => {
  const config = await dbService.createTypeOrmOptions();
  fs.writeFileSync('ormconfig.json', JSON.stringify(config, null, 2));
})();
