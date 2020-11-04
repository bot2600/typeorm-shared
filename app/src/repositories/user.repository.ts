import { createConnection, In } from 'typeorm'
import * as path from 'path'
import { getConnection, User } from 'typeorm-shared'

const root = path.resolve(__dirname, '..')

export const getUsersUsingConnectionFromSharedConnectionRunningQueryOutsideOfShared = async () => {
    const connection = await getConnection('getUsersUsingConnectionFromSharedConnectionRunningQueryOutsideOfShared')
    return connection.getRepository(User).find({ id: In(['00f9955c-49e1-4391-b4f8-e4c0bd1d0ce2', '0d3a54cd-116b-4db5-8288-4e8d1ee21946'])})
}

export const getUsersUsingConnectionOutsideOfSharedAndRunningQueryOutsideOfShared = async () => {
    const connection = await createConnection({
        name: 'getUsersUsingConnectionOutsideOfSharedAndRunningQueryOutsideOfShared',
        type: 'sqlite',
        database: `${root}/data/sample.sqlite`,
        synchronize: true,
        logging: true,
        entities: [User]
    })
    return connection.getRepository(User).find({ id: In(['00f9955c-49e1-4391-b4f8-e4c0bd1d0ce2', '0d3a54cd-116b-4db5-8288-4e8d1ee21946'])})
}