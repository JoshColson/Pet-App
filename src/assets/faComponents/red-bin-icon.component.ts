import { Component } from '@angular/core';

@Component({
  selector: 'component-fa-red_bin',
  template: `
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    </head>
    <i class="fa-solid fa-trash-can fa-lg"></i>
  `,
  styles: [`
  .fa-trash-can
  {
    color: #DF0B0B;
    transform: translateY(12%);
    width: 50%;
  }
  `]
})
export class RedBinComponent {

}
