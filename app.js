
const query = require('./query')

const { getBalance } = query

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/balance/:id/:timestamp/:accountId', function (req, res) {
  const id = req.params.id
  const timestamp = req.params.timestamp
  const accId = req.params.accountId

  query.getBalance(accId).then(result => {

    let balance = parseFloat(result)

    if( isNaN(balance) )
      res.json(result.toString())
    else
      res.json({id: id, timestamp: timestamp, accountId: accId, balance: balance})
  })
})

app.post('/transfer', function (req, res) {
  const id = req.body.id
  const fromAccountId = req.body.fromAccountId;
  const toAccountId = req.body.toAccountId;
  const amount = parseFloat(req.body.amount);

  console.log(id, fromAccountId, toAccountId, amount)

  query.transfer(fromAccountId, toAccountId, amount).then(result => {
    res.json(result.toString())
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})