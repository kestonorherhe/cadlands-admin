import { Component , OnInit} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    Swal.mixin({
      confirmButtonColor: "#450000",
      // Other global defaults...
    });
  }
}
