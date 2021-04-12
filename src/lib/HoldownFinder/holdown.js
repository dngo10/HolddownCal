import {GetHttp} from './DataGetter';

export class RequiredItem{
    static holdown;
    static postSize;
    static anchorBolt;
    static location;
    static concreteFc;
    static concreteWidth;

    static holdownstr = "Holdown";
    static postSizestr = "Post Size";
    static anchorBoltStr = "Anchor Bolt";
    static locationStr = "Location";
    static concreteFcStr = "Concrete f'c";
    static concreteWidthStr = "Min. Concrete Width";

    static itemLabels = [
        this.holdownstr,
        this.postSizestr,
        this.anchorBoltStr,
        this.locationStr,
        this.concreteFcStr,
        this.concreteWidthStr,
    ];

    holdownDict;
    activeDict;
    resultDict;
    httpGet = new GetHttp();

    constructor(){
        this.activeDict = new Map();
        this.resultDict = new Map();
    }

    async initialize(fetch){
        let item = await this.httpGet.GetValue(fetch);
        this.holdownDict = Controller.MatchRegex(item);
        this.holdownDict[RequiredItem.itemLabels[4]] = [2500, 3000];
        this.holdownDict[RequiredItem.itemLabels[5]] = [6, 8, 12];

        for(const [key, value] of Object.entries(this.holdownDict)){
           this.activeDict[key] = false;
           this.resultDict[key] = this.holdownDict[key][0];
        }
    }



}

export class Controller{
    static MatchRegex(tempData){
        //console.log(tempData);
        let result = new Map();

        let re = String.raw`\[((\"\w*\**\")\,)*(\"\w*\")\]`;
        let  matches = [...tempData.matchAll(re)]; //There is suppose to have 4

        let index = 0;
        for (var matchArr of matches){
            let key = RequiredItem.itemLabels[index];

            let str = matchArr[0];
            str = str.substring(1, str.length - 1);
            let itemArray = str.split(",");

            let resultArray = [];
            for(let i = 0; i < itemArray.length; i++){
                let item = this.RemoveQuote(itemArray[i]);
                resultArray.push(item);
            }
            result[key] = resultArray;
            index++;
        }
        return result;
    }

    static async GetReceivedReport(resultDict){
        let jsonObj = await this.GetJsonReport(resultDict);
        let str = jsonObj["DetailReport"];
        let strList = str.split('\n');
        console.log(strList);
        return strList = Controller.#FormatText(strList);
    }

    static #FormatText(strList){
        for(let i = 0; i < strList.length; i++){
            if(strList[i].includes('\\!')){
                strList[i] = strList[i].replace('\\!', "<span class=\"has-text-danger is-italic\">");
                strList[i] = strList[i] + "</span>";
            }

            if(strList[i].includes('\\B')){
                strList[i] = strList[i].replace('\\B', "<span class=\"has-text-danger has-text-weight-bold\">");
                strList[i] = strList[i] + "</span>";
            }
        }
        return strList;
    }

    static async GetJsonReport (resultDict){
        let result = "";
        for(const [key, value] of Object.entries(resultDict)){
          result = result + value + " ";
        }
        
        const temp = await fetch(GetHttp.domain, {
          method: 'POST',
          headers:{
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
          },
          body: '\"' + result + '\"',
        });  
        let jsonObj = await temp.json();
        return jsonObj;
    }

    static RemoveQuote(str){
        let temp = str.substring(1, str.length - 1);
        return temp;
    }

    static ImgMap = {
        'HD5B': 'https://www.dropbox.com/s/ewed3evlt85wcbf/HD5B.png?dl=1',
        'HD7B': 'https://www.dropbox.com/s/wp09zv0nmkvgcee/HD7B.png?dl=1',
        'HD9B': 'https://www.dropbox.com/s/10bbos7uba5wdra/HD9B.png?dl=1',
        'HD12': 'https://www.dropbox.com/s/9uvh7622stwk1ha/HD12.png?dl=1',
        'HD19': 'https://www.dropbox.com/s/jvrh0wrkuxp09qo/HD19.png?dl=1',
        'HDQ8': 'https://www.dropbox.com/s/2nzwg8u8uuqg9id/HDQ8.png?dl=1',
        'HDU2': 'https://www.dropbox.com/s/tp5n2eayy15jmvc/HDU2.png?dl=1',
        'HDU4': 'https://www.dropbox.com/s/2s7mgw0ipo5xjy3/HDU4.png?dl=1',
        'HDU5': 'https://www.dropbox.com/s/a03xekurrq332h2/HDU5.png?dl=1',
        'HDU8': 'https://www.dropbox.com/s/uiabt2yw3cxhwso/HDU8.png?dl=1',
        'HDU11': 'https://www.dropbox.com/s/j4mjb5sk1pq0j33/HDU11.png?dl=1',
        'HDU14': 'https://www.dropbox.com/s/wkurvpd68fhy8ea/HDU14.png?dl=1',
        'HHDQ11': 'https://www.dropbox.com/s/5mfh73pszptl1mp/HHDQ11.png?dl=1',
        'HHDQ14': 'https://www.dropbox.com/s/g7j6zc0tzipkipc/HHDQ14.png?dl=1',
        'HTT5': 'https://www.dropbox.com/s/3n8krfvdyfuf4bz/HTT5.png?dl=1',
        'PAB': 'https://www.dropbox.com/s/7umzs8alkax95eq/PAB.png?dl=1',
        'SSTB': 'https://www.dropbox.com/s/ijs1x35jzh97l3a/SSTB.png?dl=1'
    }
}