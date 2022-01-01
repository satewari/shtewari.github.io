import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBjwQUYmH30_UJEZQLmkrDb6nsK7dJyKJc",
    authDomain: "edd1-768ce.firebaseapp.com",
    databaseURL: "https://edd1-768ce-default-rtdb.firebaseio.com",
    projectId: "edd1-768ce",
    storageBucket: "edd1-768ce.appspot.com",
    messagingSenderId: "502637728966",
    appId: "1:502637728966:web:da20eacc4c44111d83b3c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var dbRef = getDatabase(app);
var cardsRef = ref(dbRef, 'cards');
const cardRef = ref(dbRef, 'cards/');

function buildTable(tableId, values, wrapSize, elementTransformFunc) {
    wrapSize = wrapSize || 100;
    var tableId = document.getElementById(tableId);

    if (tableId && tableId.childNodes.length > 0)
        tableId.removeChild(tableId.childNodes[0]);

    if (!tableId || !values || values.length === 0) {
        console.log(`Table Id = ${tableId}, values = ${values}.. Missing input, Exiting`);
        return;
    }

    var tableElement = document.createElement("table");
    tableId.appendChild(tableElement);

    var tableRow;
    values.split(",").forEach(function (element, index) {
        if (index % wrapSize == 0) {
            tableRow = document.createElement("tr");
            tableElement.appendChild(tableRow);
        }
        var cellData = document.createElement("td");
        cellData.innerHTML = elementTransformFunc ? elementTransformFunc(element.trim()) : element.trim();
        cellData.style.padding = "5px";
        tableRow.appendChild(cellData);
    })
}
onValue(cardRef, (snapshot) => {
    //Add code for playing a SOUND in here.
    var str = "";
    const data = snapshot.val();
    var StrA = [];
    var newStr = "";
    var sorted = [];
    for(var k in data){
        var v = data[k];
        if(v["value"]){
            /**StrA.push(v["name"])
            CounterA.push(v["counter"])**/
            //v["counter"][]
            str+=v["name"];
            StrA.push(v["counter"]+v["name"]);
            //console.log(StrA)
            sorted = StrA.sort((a, b) => {
                return a.localeCompare(b, undefined, {
                  numeric: true,
                  sensitivity: 'base'
                })
              })
            //console.log(sorted);
        }
        //console.log(v)
    }
    /**data.forEach()
    CounterA.sort(function(a,b){return a-b});
    if(CounterA[1]==1){
        for(let i = 1; i<CounterA.length; i++) {
            CounterA[i]=CounterA[i]+1;
        }
    } else {
        for(let i = 0; i< CounterA.length; i++){
            if (CounterA[i+1]-CounterA[i]!=1){
                for(let v = i; v<CounterA.length; v++){
                    CounterA[v]=Counter[v]-1;
                }
            }
        }
    }**/
    /**for(var k in data){
        //print(k)
        var v = data[k]
        //print(v)
        if(v["counter"]) {
        }
        
    }**/
    //console.log(sorted)
    //console.log(newStr)
    const regex = /^[0-9]{1,4}/g;
    for(var word in sorted){
        //console.log(sorted[word])
        if(word != sorted.length-1){
            newStr+=(sorted[word].replace(regex,'')+", ");
            //console.log(sorted[word].match(regex));

        } else {
            newStr+=sorted[word].replace(regex, '');
        }
    }
    document.getElementById("EDD").innerHTML = newStr;
    buildTable("EDDIMG", newStr, 6, function (e) {
        return `<img style="width:50%" src=${/UnoCards/ + e+'.png'}>`;
    })
    //document.getElementById("EDD").innerHTML = data.name
});