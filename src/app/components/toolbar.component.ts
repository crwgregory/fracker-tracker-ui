import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <md-toolbar color="primary">
    <button md-icon-button (click)="openMenu.emit()">
      <md-icon>menu</md-icon>
    </button>
    <ul class="toolbar-text-container">
      <li>{{title}}</li>
      <li>
        <span>{{subtitle}}</span>
      </li>
    </ul>
    
  </md-toolbar>
  <md-progress-bar *ngIf="loading"
    class="example-margin"
    color="primary"
    mode="query">
  </md-progress-bar>
  `,
  styles: [
    `.toolbar-text-container {
      width: 100%;
      padding: 0;
      margin: 0;
      list-style: none;

      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;

      -webkit-flex-flow: row wrap;
      justify-content: space-between;
    }`
  ]
})
export class ToolbarComponent {
  @Input() loading: boolean = false;
  @Input() title: string;
  @Input() subtitle: string;
  @Output() openMenu = new EventEmitter();
  constructor() { }
}
