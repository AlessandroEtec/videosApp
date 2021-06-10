import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  cor = "dark";
  constructor() { }

  mudar(event) {
    if (event.tab === "tab1") {
      this.cor = "dark";
    } else if (event.tab === "tab2") {
      this.cor = "primary";
    } else {
      this.cor = "laranja";
    }
  }

}
