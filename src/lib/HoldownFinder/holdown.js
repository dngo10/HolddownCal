import {tempDataReceived, GetHttp} from './temData';

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
        this.holdownDict[RequiredItem.itemLabels[4]] = [2500, 300];
        this.holdownDict[RequiredItem.itemLabels[5]] = [6, 8, 12];

        for(const [key, value] of Object.entries(this.holdownDict)){
           this.activeDict[key] = false;
           this.resultDict[key] = this.holdownDict[key][0];
        }
    }



}

class Controller{
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

    static RemoveQuote(str){
        let temp = str.substring(1, str.length - 1);
        return temp;
    }
}

class ExTractReceviedInfo{
    static obj = JSON.parse(tempDataReceived);
}