export default class entry{
    constructor(
        private name: string, 
        private price: number,
        private date: number, 
        private check: boolean){}
    setName(name: string){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setDate(date: number){
        this.date = date;
    }
    getDate(){
        return this.date;
    }
    setCheck(check: boolean){
        this.check = check;
    }
    getCheck(){
        return this.check;
    }
    setPrice(price: number){
        this.price = price;
    }
    getPrice(){
        return this.price;
    }
}

