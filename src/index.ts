
// permet d'importer ce qu'il y'a dans .env (ce n'est pas fait nativement dans node.js)
// pas besoin de le faire pour prisma et le DATABASE_URL 
// car prisma fait cette manip dans leur propre code en faire
// maintenant, partout .env est accessible !
import * as dotenv from 'dotenv'
dotenv.config()
import config from './config'
import app from "./server"

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`)
})