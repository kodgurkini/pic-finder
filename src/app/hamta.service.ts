import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {SearchBox} from "./search-box.component";

@Injectable()

export class hamtaService {
    
    private result;

    constructor(private http: Http) { }
    

     httpGet(url) {
        return this.http.get(url).map(
            result => {
                let data = result.json();
                this.result = data;
                return data
            }
        )
    }
}