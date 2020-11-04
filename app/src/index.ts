import { getConnectionManager } from 'typeorm'
import * as path from 'path'
import { getusersConnectionFromSharedRunningQueryInShared } from 'typeorm-shared'
import { getUsersUsingConnectionFromSharedConnectionRunningQueryOutsideOfShared, getUsersUsingConnectionOutsideOfSharedAndRunningQueryOutsideOfShared } from './repositories/user.repository'
const root = path.resolve(__dirname, '..')

const connectionManager = getConnectionManager()

async function start () {
    //logged query is id IN []
    console.log('THIS METHOD IS CALLING INTO SHARED FOR BOTH GETTING THE CONNECTION AND RUNNING THE QUERY AND PROPERLY TRANSLATES INTO "ID IN"')
    await getusersConnectionFromSharedRunningQueryInShared()
    //logged query is id IN []
    console.log('THIS METHOD IS NOT CALLING SHARED FOR GETTING THE CONNECTION NOR RUNNING THE QUERY AND PROPERLY TRANSLATES INTO "ID IN"')
    await getUsersUsingConnectionOutsideOfSharedAndRunningQueryOutsideOfShared()
    //logged query is id = ? 
    console.log('THIS METHOD IS CALLING INTO SHARED TO GET A CONNECTION BUT RUNNING THE QUERY NOT IN SHARED AND TRANSLATES TO "ID = ?" INSTEAD OF IN')
    await getUsersUsingConnectionFromSharedConnectionRunningQueryOutsideOfShared()
}

(async () => {
    console.log('starting')
    await start()
    console.log('started')
})().catch(error => {
    console.log(`failed to start ${error}`)
})