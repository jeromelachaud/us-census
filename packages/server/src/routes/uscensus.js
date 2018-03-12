const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
let db

function openDbConnexion () {
  db = new sqlite3.Database('./db/us-census.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message)
    console.info('connected to db')
  })
}

function closeDbConnection () {
  db.close((err) => {
    if (err) console.error(err.message)
    console.info('db closed')
  })
}

// categories
router.get('/categories/', (req, res, next) => {
  openDbConnexion()

  let results = []
  db.serialize(() => {
    db.each(`PRAGMA table_info(census_learn_sql)`,
      (err, row) => {
        if (err) console.error(err.message)
        results.push({category: row.name})
      }, () => res.json(results))
  })
  closeDbConnection()
})

// details about a category.
router.get('/:category/:min/:limit', (req, res, next) => {
  let category = req.params.category
  let min = req.params.min
  let limit = req.params.limit
  openDbConnexion()

  let results = []
  db.serialize(() => {
    db.each(`
              SELECT "${category}", COUNT("${category}") AS count, AVG(age) AS averageage
              FROM 'census_learn_sql'
              GROUP BY "${category}"
              HAVING count>0
              ORDER BY count DESC, averageage DESC
              LIMIT ${min},${limit}`,
    (err, row) => {
      if (err) console.error(err.message)
      results.push({value: row[category], count: row.count, averageage: row.averageage})
    }, () => res.json(results))
  })
  closeDbConnection()
})

// rows per category
router.get('/:category/count', (req, res, next) => {
  let category = req.params.category
  openDbConnexion()
  let results = []
  db.serialize(() => {
    db.each(` SELECT COUNT(*) AS count
              FROM 'census_learn_sql'
              GROUP BY "${category}"
              HAVING count>0
            `,
    (err, row) => {
      if (err) console.error(err.message)
      results.push({value: row[category], count: row.count, averageage: row.averageage})
    }, () => res.json(results))
  })
  closeDbConnection()
})

module.exports = router
