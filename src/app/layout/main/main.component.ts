import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { TokenService } from "src/app/core/authentication/token.service";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  isSidebarOpen2: boolean = true;
  contentMargin = 25;
  constructor(
    private _location: Location,
    private tokenService: TokenService
  ) {}
  ngOnInit() {}
  receiveOpen(event) {
    this.isSidebarOpen2 = event;
    console.log(
      "inside burgerClicked: pls. change showMenu to be:",
      this.isSidebarOpen2
    );
    if (!this.isSidebarOpen2) {
      this.contentMargin = 9; //css when it's close
    } else {
      this.contentMargin = 25; //css when it's open
    }
  }
}
