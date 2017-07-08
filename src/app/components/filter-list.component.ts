import {Component, EventEmitter, Output} from "@angular/core";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-filter-list',
  template: `
    <md-input-container>
      <md-icon mdPrefix>search</md-icon>
      <input mdInput placeholder="" (keyup)="keyUp.next($event)">
    </md-input-container>
  `,
  styles: [

  ]
})
export class FilterListComponent {
  keyUp = new Subject<any>();
  @Output() query: EventEmitter<string> = new EventEmitter();
  constructor() {
    this.keyUp.map(x => x.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(value => {
        this.query.emit(value)
      })
  }
}
