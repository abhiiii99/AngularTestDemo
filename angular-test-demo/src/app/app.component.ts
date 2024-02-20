import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonUtilService } from './services/common-util.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title!: string;

  constructor(private commonUtilSrv: CommonUtilService) {

    // Dummy GET call implementation
    this.commonUtilSrv.getUserDetails().subscribe(res => {
      console.log(res);
      this.title = res[4].description;
    });
  }
}
