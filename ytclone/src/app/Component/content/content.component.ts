import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  data: any[] | undefined;

  selectedItem : any | undefined;

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/items')
      .subscribe(response => {
        this.data = response;
        console.log("data is ::" + JSON.stringify(response));

        this.selectedItem = this.data[0];

        console.log("Selected Item", this.selectedItem);  
      });  
  }

  onClick(item: any) {
    this.selectedItem = item;
  }
}
