import fs from 'fs'
import path from 'path'

const databasePath = path.resolve(__dirname, 'database.json')
let data

const load = () => {
  let file
  try {
    file = fs.readFileSync(path.resolve(databasePath))
  } catch(e){
    file = '{}'
    saveDatabase(fileName, {})
  }
  data = JSON.parse(file)
  return data
}

const save = (table, newTable) => {
  data = {
    ...data,
    [table]: newTable
  }
  fs.writeFileSync(path.resolve(databasePath), JSON.stringify(data,null,2))
  return data
}

const database = {
  load,
  save
}

export default database