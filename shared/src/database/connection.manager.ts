import { createConnection }  from 'typeorm'
import * as path from 'path'
import { User } from './entities/user'

const root = path.resolve(__dirname, '..')

export const getConnection = async (connectionName: string) => {
    return createConnection({
        name: connectionName,
        type: 'sqlite',
        database: `${root}/data/sample.sqlite`,
        synchronize: true,
        logging: true,
        entities: [User]
    })
}