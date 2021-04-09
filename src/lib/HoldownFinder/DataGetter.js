//export var tempData = String.raw`[["STHD10","STHD14","HTT5","HDU2","HDU4","HDU5","HDU8","HDQ8","HDU11","HDU14","HHDQ11","HHDQ14","HD12","HD19"],["SSTB16","SSTB20","SSTB24","SSTB28","PAB5","PAB7","PAB8","PAB9","PAB10"],["4X4","4X6","4X8","4X6*","6X6","6X8"],["Midwall","Corner"]]`;
//import fetch from 'node-fetch';

//export var tempDataReceived = String.raw`{"Holdown":{"AB_dia":0.875,"IsNeedAB":true,"Name":"HDU8","MinWoodThk":3.5,"Is6X6":false,"Nails":"(20) 1/4\" X 2 1/2\" SDS","Wood":1,"Tension":6970,"Defl":0.116},"AnchorBolt":{"de":6.5,"F":10.0,"fc":2500.0,"Name":"PAB5","Dia":0.625,"Tension":6675,"Defl":0.0},"post":{},"Stemwall":8,"MaxTension":6675,"Defl":0.11109038737446199,"DetailReport":"SDC C-F, Concrete state: Cracked\r\nHDU8/4X4\nPad is required per detail\r\nHoldown capacity: 6970 lb \r\nAnchor Bolt capacity: 6675 lb \\B\\!(Govern) *** \r\n\r\n\\BMax. Capacity = 6675 lb, MaxDefl. = 0.111 in.\r\n"}`;

export class GetHttp{
    //static domain = "http://localhost:5000/api/values";
    //static domain = "https://localhost:44319/api/values";
    static domain = "https://holdowncheckserver20210409103617.azurewebsites.net/api/values";

    constructor(){
    }


    requestInit = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }

    async GetValue(fetch){
        const response = await fetch(GetHttp.domain, this.requestInit);
        const data = await response.text();
        return data;
    }
}