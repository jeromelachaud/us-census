const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(403).send('nothing to see here')
  console.log(res.statusCode)
})

module.exports = router
