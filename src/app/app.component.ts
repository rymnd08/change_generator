import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ChangeApp";
  paymentVal = 0
  priceVal = 0
  change = 0;
  changeArray : any = []
  billsCount : any = {}
  compute(pay: HTMLInputElement, prc: HTMLInputElement) {
    this.paymentVal = +pay.value
    this.priceVal = +prc.value
    this.change = (this.paymentVal - this.priceVal)
    this.changeArray = this.getBills(this.change)
    this.billsCount = this.countBills(this.changeArray)
    pay.value = ''
    prc.value = ''
    console.log(this.changeArray, this.billsCount)
  }

  countBills(arr: Array<number>) {
    const billsCount = arr.reduce(
      (acc: any, value: number) => {
        switch (value) {
          case 1000:
            acc["thousand"]++;
            break;
          case 500:
            acc["fiveHundred"]++;
            break;
          case 100:
            acc["oneHundred"]++;
            break;
          case 50:
            acc["fifthy"]++;
            break;
          case 20:
            acc["twenthy"]++;
            break;
          case 10:
            acc["ten"]++;
            break;
          case 5:
            acc["five"]++;
            break;
          case 1:
            acc["one"]++;
            break;
        }
        return acc;
      },
      {
        thousand: 0,
        fiveHundred: 0,
        oneHundred: 0,
        fifthy: 0,
        twenthy: 0,
        ten: 0,
        five: 0,
        one: 0,
      }
    );
    return billsCount;
  }

  getBills(change: number) {
    const bills = [1000, 500, 100, 50, 20, 10, 5, 1];
    let counter = [];
    for (let i = 0; i < bills.length; i++) {
      if (bills[i] > change) continue;

      while (change - bills[i] >= bills[i]) {
        counter.push(bills[i]);
        change = change - bills[i];
      }

      if (bills[i] <= change) {
        counter.push(bills[i]);
        change = change - bills[i];
      }

      if (change === 0) break;

      if (i === bills.length - 1 && change != 0) i = 0;
    }

    return counter.sort((a, b) => b - a);
  }
}
