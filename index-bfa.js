/* [0] adm0_id: country id
   [1] adm0_name: country name
   [2] adm1_id: locality id
   [3] adm1_name: locality name
   [4] mkt_id: market id
   [5] mkt_name: market name
   [6] cm_id: commodity purchase id
   [7] cm_name: commodity purchased
   [8] cur_id: currency id
   [9] cur_name: name of currency
   [10] pt_id: market type id
   [11] pt_name: market type (Retail/Wholesale/Producer/Farm Gate)
   [12] um_id: measurement id
   [13] um_name: unit of goods measurement
   [14] mp_month: month recorded
   [15] mp_year: year recorded
   [16] mp_price: price paid
   [17] mp_commoditysource: Source supplying price information
*/

module.exports = {
    mean_price_bread_country: function mean_price_bread_country(country) {
let array = []
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",3,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",4,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",4,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",4,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",4,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",5,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",6,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",7,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",8,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",9,2015,50.0,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",10,2015,56.25,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",11,2015,65.25,"WFP"])
array.push([1,"Afghanistan",272,"Badakhshan",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",12,2015,55.5,"WFP"])
array.push([1,"Afghanistan",272,"Mazar",266,"Fayzabad",55,"Bread",87,"AFN",15,"Retail",5,"KG",1,2015,55.6,"WFP"])

let i = 0
let s = 0

array.forEach((e) => {
    if (e[3] === country) {
        s += e[16]
        i++
    }
})

return s/i
}
}