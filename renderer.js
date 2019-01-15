
const geoip = require('geoip-lite')

const trackIpBtn = document.getElementById('trackIpBtn')
const myMap = document.getElementById('myMap')

trackIpBtn.addEventListener('click', function () {
    ipAddr = document.getElementById('ipAddress').value
    document.getElementById('ipAddressEntered').innerHTML = `IP Location found`
    ipObject = geoip.lookup(ipAddr)
    
    console.log(ipObject)
    if (ipObject != null) {
        writeTable(ipObject);
        getMap(ipObject.ll, 7)
    } else {
        document.getElementById('ipAddressEntered').innerHTML = `No IP Information found`
    }
})

myMap.addEventListener('click', function (){
    ipAddr = document.getElementById('ipAddress').value
    document.getElementById('ipAddressEntered').innerHTML = `IP Location found`
    ipObject = geoip.lookup(ipAddr)
    
    console.log(ipObject)
    if (ipObject != null) {
        writeTable(ipObject);
        getMap(ipObject.ll, 14)
    } else {
        document.getElementById('ipAddressEntered').innerHTML = `No IP Information found`
    }
})

function writeTable(ipObject){
    tbl = document.getElementById('myTable')
    console.log("Table " + tbl.rows.length)
    if (tbl.rows.length !== 0) {
        tbl.innerHTML = ''
    }
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';
    var tr = tbl.insertRow()
    tr.appendChild(document.createTextNode('GEO IP Information'))
    tr.style.border = '1px solid black';
    writeRow(tbl, 'Country', ipObject.country)
    writeRow(tbl, 'City', ipObject.city)
    writeRow(tbl, 'Region', ipObject.region)
    writeRow(tbl, 'Coordinates', ipObject.ll)
    writeRow(tbl, 'ZipCode', ipObject.zip)
}

function writeRow(table, title, value) {
    var tr = table.insertRow()
    var td = tr.insertCell()
    td.appendChild(document.createTextNode(title))
    td = tr.insertCell()
    td.appendChild(document.createTextNode(value))
    td.style.border = '1px solid black';
}

function getMap (latLon, zoom) {
    var lat = latLon[0]
    var lng = latLon[1]
    var key = process.env.BING_KEY
    var baseURL = 'https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/'
    
    var imgUrl = `${baseURL}${lat},${lng}/${zoom}?mapSize=640,640&format=png&pp=${lat},${lng};113;kr&key=${key}`
    var map = document.getElementById('myMap')
    map.innerHTML = `<img src=${imgUrl}>`
}
