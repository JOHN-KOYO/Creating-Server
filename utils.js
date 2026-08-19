//export function sendJSONResponse(res, statusCode, data) {
   // res.setHeader("Content-Type", "application/json")
   //res.statusCode = statusCode
    //res.end(JSON.stringify(data))
//}

//setting CORS, Allowing websites same domain, same root but different ports to communicate like http://crimba.coms/8000
// and http://crimba.coms/3000 

export function sendJSONResponse(res, statusCode, payload) {
    res.setHeader('Access-Control-Allow-origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}