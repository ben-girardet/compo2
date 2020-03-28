import { customAttribute, inject } from 'aurelia-framework';

@inject(Element)
@customAttribute('make-me-red')
export class MakeMeRedCustomAttribute {
  
  constructor(private element: HTMLElement) {
  }
  
  public attached() {
    this.element.style.color = 'red';
  }
}
