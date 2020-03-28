import { inject } from 'aurelia-framework';

@inject(Element)
export class Drawer {

  constructor(public element: HTMLElement) {

  }
  
  public activate() {
    console.log('drawer', 'activate');
  }

  public deactivate() {
    console.log('drawer', 'deactivate');
  }

  public attached() {
    console.log('drawer', 'attached');
  }

  public detached() {
    console.log('drawer', 'detached');
  }

  public bind() {
    console.log('drawer', 'bind');
  }

  public unbind() {
    console.log('drawer', 'unbind');
  }

  public created() {
    console.log('drawer', 'created');
  }
}
