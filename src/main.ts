import Entry from "./Entry";

var value = 200;
var allEntries: Entry[] = [];

var button = document.getElementById("newValue");
button?.addEventListener("click", newValue);
function newValue(){
    let name = prompt("Name:")
    let price = parseInt(prompt("Price:")!);
    let date = parseInt(prompt("Date:")!);
    if(name != null && price != null && date != null){
        createNewEntry(name, price, date);
    }
    console.table(allEntries.sort((a, b) => a.getDate() - b.getDate()));
}

function createNewEntry(name: string, price: number, date: number){
    let newEntry = new Entry(name, price, date, false);
    allEntries.push(newEntry);
}

function displayEntries(){
    console.table(allEntries);
}

function deleteEntry(name: string){
    for(let i = 0; i < allEntries.length; i++){
        if(allEntries[i].getName() == name){
            allEntries.splice(i, 1);
        }
    }
}

function getDayOfThisMonth(){
    let date = new Date();
    return date.getDate();
}

function checkEveryEntryIfDayIsOver(){
    for(let i = 0; i < allEntries.length; i++){
        if(allEntries[i].getDate() <= getDayOfThisMonth()){
            allEntries[i].setCheck(true);
        }
    }
}

function getSumOfAllTrueEntries(){
    let sum = 0;
    for(let i = 0; i < allEntries.length; i++){
        if(allEntries[i].getCheck() == true){
            sum += allEntries[i].getPrice();
        }
    }
    return sum;
}

function getSumOfAllFalseEntries(){
    let sum = 0;
    for(let i = 0; i < allEntries.length; i++){
        if(allEntries[i].getCheck() == false){
            sum += allEntries[i].getPrice();
        }
    }
    return sum;
}

function getSumOfAllEntries(){
    let sum = 0;
    for(let i = 0; i < allEntries.length; i++){
        sum += allEntries[i].getPrice();
    }
    return sum;
}

createNewEntry("test", 10, 12);
createNewEntry("test2", 20, 1);
createNewEntry("test3", 30, 28);
createNewEntry("test4", 40, 29);
checkEveryEntryIfDayIsOver();
displayEntries();
console.log(getSumOfAllTrueEntries());

