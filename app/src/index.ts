import { getConnectionManager } from 'typeorm'
import * as path from 'path'
import { getusersConnectionFromSharedRunningQueryInShared } from 'typeorm-shared'
import { getUsersUsingConnectionFromSharedConnectionRunningQueryOutsideOfShared, getUsersUsingConnectionOutsideOfSharedAndRunningQueryOutsideOfShared } from './repositories/user.repository'
const root = path.resolve(__dirname, '..')

const connectionManager = getConnectionManager()

async function start () {
    //logged query is id IN []
    await getusersConnectionFromSharedRunningQueryInShared()
    //logged query is id IN []
    await getUsersUsingConnectionOutsideOfSharedAndRunningQueryOutsideOfShared()
    //logged query is id = ? 
    await getUsersUsingConnectionFromSharedConnectionRunningQueryOutsideOfShared()
}

(async () => {
    console.log('starting')
    await start()
    console.log('started')
})().catch(error => {
    console.log(`failed to start ${error}`)
})