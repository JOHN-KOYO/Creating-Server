//import http from 'node:http'

//const port = 8000
//const server = http.createServer((req, res) =>{res.end('Hello from server')})
//server.listen(port, () => console.log(`server running on port:${port}`))

//The above function can be adjusted as folows:

//import http from 'node:http'

//const port = 8000

//const server = http.createServer((req, res) => {
    //res.write('This is some data\n')
    //res.write('This is some more data\n')
    //res.end('Hello from server', 'utf8')
//})
//server.listen(port, () => {
    //console.log(`Server running on port: ${port}`)
//})
//in place of '.res' we can use '.write' in case there are several data points like:
// res.write('this is some data \n')
// res.write('this is some more data \n')
// you must still end with 'res.end' like res.end('Hello from server') to make it work

//Server Construction: 

//import http from 'node:http'
//import { getDataFromDB } from './db.js' 

//const port = 8000

//const server = http.createServer(async(req, res) => {
    //const destinations = await getDataFromDB()
    //if (req.url=== '/api'&& req.method=== 'GET') {
       // res.setHeader("Content-Type", "application/json")
       // res.statusCode = 200
       // res.end(JSON.stringify(destinations))}
//else if(req.url.startsWith('/api/continent') && req.method === "GET")
//{const destinations = await getDataFromDB()
    //const continent = req.url.split('/').pop()
 //const filteredData = destinations.filter((destinations)=>{
// return destinations.continent.toLowerCase() === continent.toLowerCase()

 //})
  //res.setHeader("Content-Type", "application/json")
      //  res.statusCode = 200
      //  res.end(JSON.stringify(filteredData))
//}

//else { 
    //res.setHeader("Content-Type", "text/plain")
    //res.statusCode = 404
    //res.end("Not found")}
//})

//server.listen(port, () => {
   // console.log(`Server running on port: ${port}`)
//})



//Let us make the code drier

//import http from 'node:http'
//import { getDataFromDB } from './db.js' 
//import { sendJSONResponse } from './utils/sendJSONResponse.js'
//const port = 8000

//const server = http.createServer(async(req, res) => {
    //const destinations = await getDataFromDB()
    //if (req.url=== '/api'&& req.method=== 'GET') {
        //sendJSONResponse(res, 200, destinations)}

//else if(req.url.startsWith('/api/continent') && req.method === "GET")
//{const destinations = await getDataFromDB()
    //const continent = req.url.split('/').pop()
 //const filteredData = destinations.filter((destinations)=>{
 //return destinations.continent.toLowerCase() === continent.toLowerCase()

 //})
 // sendJSONResponse(res, 200, filteredData)
  
//}
//else if(req.url.startsWith('/api/country') && req.method === "GET")
//{const destinations = await getDataFromDB()
    //const country = req.url.split('/').pop()
// const filteredData = destinations.filter((destinations)=>{
 //return destinations.country.toLowerCase() === country.toLowerCase()

 //})
 // sendJSONResponse(res, 200, filteredData)
  
//}
//else { 
   // res.setHeader("Content-Type", "text/plain")
  //  sendJSONResponse(res, 404, ({ error: "Not found" }))
  // }
//})

//server.listen(port, () => {
 //   console.log(`Server running on port: ${port}`)
//})



// Making it further drier by targeting fitering sections: 

//import http, { createServer } from 'node:http'
//import { getDataFromDB } from './db.js' 
//import { sendJSONResponse } from './utils/sendJSONResponse.js'
//import { filterData } from './utils/filterData.js'
//const port = 8000

//const server = http.createServer(async(req, res) => {
    //const destinations = await getDataFromDB()
    //if (req.url=== '/api'&& req.method=== 'GET') {
       // sendJSONResponse(res, 200, destinations)}

//else if(req.url.startsWith('/api/continent') && req.method === "GET")
//{const destinations = await getDataFromDB()
    //const continent = req.url.split('/').pop()
//const filteredData = filterData(destinations, "continent", continent)
  //sendJSONResponse(res, 200, filteredData)
  
//}
//else if(req.url.startsWith('/api/country') && req.method === "GET")
//{const destinations = await getDataFromDB()
    //const country = req.url.split('/').pop()
 //const filteredData = filterData(destinations, "country", country)
  //sendJSONResponse(res, 200, filteredData)
  
//}
//else { 
   // res.setHeader("Content-Type", "text/plain")
   // sendJSONResponse(res, 404, ({ error: "Not found" }))
   //}
//})

//server.listen(port, () => {
    //console.log(`Server running on port: ${port}`)
//})


//Query parameter
//netstat -ano | findstr :8000 then "taskkill /PID 12345 /F", for changing server.

//Sample:

//import HTTP from 'node:http'
//const server = HTTP.createServer((req, res) =>{
//const urlObj = new URL(req.url, ` http://${req.headers.host}`)
//const queryObj = Object.fromEntries(urlObj.searchparams)
//console.log(queryObj)
//})
//server.listen(8000, () => console.log(`server listening on port 8000`))


//Query parameter further integrated into the server code:
import http from 'node:http'
import { getDataFromDB } from './db.js'
import { sendJSONResponse } from './utils.js'
import { filterData } from './filteredData.js'
import { getDataByQueryParams } from './getDataByQueryParams.js'

const port = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        const filteredResults = getDataByQueryParams(destinations, queryObj)

        sendJSONResponse(res, 200, filteredResults)

    } else if (urlObj.pathname.startsWith('/api/continent') && req.method === 'GET') {
        const continent = decodeURIComponent(urlObj.pathname.split('/').pop())

        const filteredResults = filterData(destinations, 'continent', continent)

        sendJSONResponse(res, 200, filteredResults)

    } else if (urlObj.pathname.startsWith('/api/country') && req.method === 'GET') {
        const country = decodeURIComponent(urlObj.pathname.split('/').pop())

        const filteredResults = filterData(destinations, 'country', country)

        sendJSONResponse(res, 200, filteredResults)

    } else {
        sendJSONResponse(res, 404, { error: 'Not found' })
    }
})

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})