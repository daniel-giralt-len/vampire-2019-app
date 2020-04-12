const databaseStructure = require('./database-structure')
const fs = require('fs')
const fileOut = './generated-data.json'

const param = process.argv[2]

if(param === '-h' || param === '--help'){
  console.log(`generate-db
  Generates random (but sensible) data to be used in TinyDB's database.json file
  Outputs to ${fileOut} (overwrites!)

  With no parameter, it will generate a whole database.
  If you need a specific table, here's the full list of options:
${Object
  .entries(databaseStructure)
  .map(([tableName, tableData]) => {
    const isList = Array.isArray(tableData)
    return `    ${tableName} ${isList ? '<amount>' : ''}\n`
  })
  .join('')
}
  `)
  process.exit(0)
}

const generateTableElement = structure => {
  try{
    const element = {}
    Object
      .keys(structure)
      .forEach(key => {
        try {
          element[key] = structure[key].generate
            ? structure[key].generate()
            : generateTableElement(structure[key])
        } catch (e){
          console.error(`Could not generate key ${key}`)
          console.error(e.message)
        }
      })
    return element
  }catch(e){
    console.log('Could not generate table')
    console.log(structure)
    console.error(e.message)
  }
}

const generateTable = (tableName, nElements) => {
  const tableStructure = databaseStructure[tableName]
  const isList = Array.isArray(tableStructure)
  if(isList){
    const elementStructure = tableStructure[0]
    return Array(nElements)
      .fill()
      .map(() => generateTableElement(elementStructure))
  }
  return generateTableElement(tableStructure)
}


if(!param){
  const database = Object
    .keys(databaseStructure)
    .reduce((acc, key) => ({
      ...acc,
      [key]: generateTable(key, parseInt(1+Math.random()*5))})
    , {})
  fs.writeFileSync(fileOut, JSON.stringify(database, null, 4))
  process.exit(0)
}

const amount = process.argv[3] || 1
const table = generateTable(param, amount)
fs.writeFileSync(fileOut, JSON.stringify(table, null, 4))