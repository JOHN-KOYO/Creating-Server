export function filterData(data, key, value) {

    return data.filter((item) => {
        return item[key].toLowerCase() === value.toLowerCase()
    })

}

//const filteredData = destinations.filter((destinations)=>{
 //return destinations.continent.toLowerCase() === continent.toLowerCase()