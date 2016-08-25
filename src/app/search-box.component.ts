
import {Component, Input, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'search-box',
    template: `
    <div class="form-group">
    <div class="input-group">
    <input class="form-control" placeholder="{{text | lowercase}}" #box (keydown.enter)="onSearch(box.value)">
    <span class="input-group-btn">
    <button class="btn btn-primary" (click)="onSearch(box.value)" (keyup.enter)="onSearch(box.value)"><span class="glyphicon glyphicon-search"></span></button>
    </span>
    </div>
    </div>`

})
export class SearchBox {

    @Input()
    text:string;

    @Output()
    search = new EventEmitter();

    onSearch(searchText) {
        this.search.emit(searchText);
    }

}