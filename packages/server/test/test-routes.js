const expect = require('chai').expect
const request = require('request')
const server = 'http://localhost:3001'
/* eslint-disable quotes */
const expectedCategories = [
  {
    "category": "age",
  },
  {
    "category": "class of worker",
  },
  {
    "category": "industry code",
  },
  {
    "category": "occupation code",
  },
  {
    "category": "education",
  },
  {
    "category": "wage per hour",
  },
  {
    "category": "last education",
  },
  {
    "category": "marital status",
  },
  {
    "category": "major industry code",
  },
  {
    "category": "major occupation code",
  },
  {
    "category": "mace",
  },
  {
    "category": "hispanice",
  },
  {
    "category": "sex",
  },
  {
    "category": "member of labor",
  },
  {
    "category": "reason for unemployment",
  },
  {
    "category": "fulltime",
  },
  {
    "category": "capital gain",
  },
  {
    "category": "capital loss",
  },
  {
    "category": "dividends",
  },
  {
    "category": "income tax liability",
  },
  {
    "category": "previous residence region",
  },
  {
    "category": "previous residence state",
  },
  {
    "category": "household-with-family",
  },
  {
    "category": "household-simple",
  },
  {
    "category": "weight",
  },
  {
    "category": "msa-change",
  },
  {
    "category": "reg-change",
  },
  {
    "category": "within-reg-change",
  },
  {
    "category": "lived-here",
  },
  {
    "category": "migration prev res in sunbelt",
  },
  {
    "category": "num persons worked for employer",
  },
  {
    "category": "family members under 118",
  },
  {
    "category": "father birth country",
  },
  {
    "category": "mother birth country",
  },
  {
    "category": "birth country",
  },
  {
    "category": "citizenship",
  },
  {
    "category": "own business or self employed",
  },
  {
    "category": "fill questionnaire for veteran's admin",
  },
  {
    "category": "veterans benefits",
  },
  {
    "category": "weeks worked in year",
  },
  {
    "category": "year",
  },
  {
    "category": "salary range",
  },
]
/* eslint-renable quotes */

it('Index', (done) => {
  request(`${server}/`, (err, res, body) => {
    if (err) return
    expect(res.statusCode).to.equal(403)
    done()
  })
})

it('Categories', (done) => {
  request(`${server}/uscensus/categories/`, (err, res, body) => {
    if (err) return
    expect(JSON.parse(res.body)).to.deep.equal(expectedCategories)
    done()
  })
})
