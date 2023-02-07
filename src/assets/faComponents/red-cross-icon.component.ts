import { Component } from '@angular/core';

@Component({
  selector: 'component-fa-red_cross',
  template: `
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    </head>
    <i class="fa-solid fa-circle-xmark fa-2x"></i>
  `,
  styles: [`
  .fa-circle-xmark
  {
    color: #DF0B0B;
    transform: translateY(35%);
  }
  `]
})
export class RedCrossComponent {

}
