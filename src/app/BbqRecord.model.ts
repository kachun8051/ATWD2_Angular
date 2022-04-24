interface BbqRecord {
    GIHS: String,
    name: string,
    district: string,    
    address: string,
    longitude: string,
    latitude: string    
}

class clsBbq implements BbqRecord { 
    GIHS: String
    name: string
    district: string    
    address: string
    longitude: string
    latitude: string

    constructor() { 
        this.GIHS = '';
        this.name = '';
        this.district = '';
        this.address = '';
        this.longitude = '';
        this.latitude = '';
    }

    setBbqRecord(bbq: BbqRecord) {
        this.GIHS = bbq.GIHS;
        this.name = bbq.name;
        this.district = bbq.district;
        this.address = bbq.address;
        this.longitude = bbq.longitude;
        this.latitude = bbq.latitude;
    }

    getBbqRecord():String {
        let strHtml = '<table>';
        strHtml += '<tr><td>GIHS:</td><td>' + this.GIHS + '</td></tr>' + 
            '<tr><td>Name:</td><td>' + this.name + '</td></tr>' +
            '<tr><td>District:</td><td>' + this.district + '</td></tr>' +
            '<tr><td>Address:</td><td>' + this.address + '</td></tr>' +
            '<tr><td>Longitude:</td><td>' + this.longitude + '</td></tr>' +
            '<tr><td>Latitude:</td><td>' + this.latitude + '</td></tr>';
        strHtml += '</table>';
        return strHtml;
    }
}

export { BbqRecord, clsBbq };