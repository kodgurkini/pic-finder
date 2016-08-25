
import {Component} from "@angular/core";
import {SearchBox} from "./search-box.component";
import {CORE_DIRECTIVES} from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {NgIf} from '@angular/common';
import { hamtaService } from './hamta.service';


@Component({
    selector: 'my-app',
    directives: [SearchBox, CORE_DIRECTIVES, NgIf],
    providers: [HTTP_PROVIDERS, hamtaService],
    template: `
                <div class="jumbotron">  
                <img src="picfinderlogo.png" width="400" height="25" alt="logo" class="img-responsive center-block">   
                <h1 class="text-center">Pic Finder</h1>  
                <p class="lead text-center">Search and find pictures from the <a href="https://pixabay.com/"><img src="pixabay.png" width="128" height="24" alt=""></a> library<p>
                <div class="form-group">
                <p ng-bind-html="space"></p>
                <p></p>
                <label>Search Word</label>
                <search-box (search)="onSearch($event)" text="Type Your Search Here">
                </search-box>
                <button class="btn btn-default center-block" (click)="advanced()">Advanced search <span class="glyphicon glyphicon-menu-down"></span></button>
                <div *ngIf="showadv">
                <p></p>
                <label>Category</label>
                <select class="form-control" (change)="onChangeCategory($event.target.value)">
                <option *ngFor="let i of category">{{i}}</option>
                </select>
                <p></p>
                <label>Type of image</label>
                <select class="form-control" (change)="onChangeType($event.target.value)">
                <option *ngFor="let i of type">{{i}}</option>
                </select>
                <p></p>
                </div>
                <div *ngIf="show">
                <p></p>
                <button class="btn btn-danger center-block" (click)="clear()">Clear results</button>
                </div>
                </div>
                </div>
                <div class="row">
                <div class="col-lg-4" *ngFor="let preview of preview; let i = index">
                <div class="thumbnail" style="background:#e2e2e2">
                <a href="{{link[i]}}"><img src="{{preview}}" class="img-responsive"></a>
                <p></p>
                <p style="float:right;"><span class="glyphicon glyphicon-thumbs-up"></span> {{likes[i]}} <span class="glyphicon glyphicon-comment"></span> {{comments[i]}}</p>
                <p><b>#{{hashtags[i] | uppercase}}</b></p>
                <a style="float:right;" href="{{link[i]}}">download</a>
                <p>By User: {{user[i]}}</p>
                </div>
                </div>
                <button class="btn btn-primary center-block" (click)="showMore()">Show 20 more pictures <span class="glyphicon glyphicon-menu-down"></span></button>
                <p></p>    
                </div>          
    `
})
export class AppComponent {
    show: boolean = false;
    showadv: boolean = false;
    category = 'all fashion nature people science religion places animals industry food sports transportation travel buildings music'.split(' ');
    categoryChosen = '';
    type = 'all photo illustration vector'.split(' ');
    typeChosen = '';
    apiData = [];
    preview = [];
    link = [];
    hashtags = [];
    user = [];
    likes = [];
    comments = [];
    text = ``;
    page = 1;

    constructor(private _hamtaService: hamtaService) {}


  onSearchGet(text) {
      this._hamtaService.httpGet(this.text).subscribe(
            data => this.apiData = data.hits,
            error => console.log("Could not get request"),
            () => this.sortImages()
            );
  }

  sortImages(){
      for (var i=0; i < 20; i++) {
         this.preview.push(this.apiData[i].webformatURL); 
         this.link.push(this.apiData[i].pageURL);
         this.hashtags.push(this.apiData[i].tags);
         this.likes.push(this.apiData[i].likes);
         this.user.push(this.apiData[i].user);
         this.comments.push(this.apiData[i].comments);
        }
  }
    

    onSearch(text) {
        this.text = `https://pixabay.com/api/?key=3130471-5f877d74b904306f82fbefecb&q=${text}`+this.categoryChosen+this.typeChosen+`&page=`+this.page
        this.onSearchGet(this.text)
        this.show = true;
        }

     advanced() {
        this.showadv = !this.showadv;
     }   

    clear() {
        this.show = !this.show;
        this.preview = [];
        this.link = [];
        this.hashtags = [];
        this.likes = [];
        this.user = [];
        this.comments = [];
        
    }

    onChangeCategory(newValue) {
    this.categoryChosen = `&category=`+newValue;
   }

   onChangeType(newValue) {
    this.typeChosen = `&image_type=`+newValue;
   }

   showMore(){
       this.page = this.page+1;
       this.onSearch(this.text)
   }

}