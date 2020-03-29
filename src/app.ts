import { TemplatingEngine, CompositionEngine, ViewSlot, CompositionContext, Controller } from 'aurelia-templating';
import { Hello } from 'resources/hello';
import { inject, Container, ViewResources } from 'aurelia-framework';

@inject(Container, ViewResources , TemplatingEngine, CompositionEngine)
export class App {
  public anchor1: HTMLElement;
  public anchor2: HTMLElement;
  public anchor3: HTMLElement;

  constructor(
    private container: Container,
    private viewResources: ViewResources,
    private templatingEngine: TemplatingEngine, 
    private compositionEngine: CompositionEngine) {

  }
  
  public activate() {
    
  }
  
  public attached() {
    this.composeWithEnhance(); 
    this.composeOnly();
    this.composeOnlyWithHTML();
  }

  /** The following code is a mirror of the current drawer implementation */
  public async composeWithEnhance() {
    const bindingContext: any = {};
    const element = document.createElement('host');
    this.anchor1.appendChild(element);
    const childView = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
    const controllers = (childView as any).controllers as Controller[];
    const view: any = controllers[0].view;
    const slot = new ViewSlot(view.slots['__au-default-slot-key__'].anchor, false);
    let compositionContext = this.createCompositionContext(this.container, element, bindingContext, { viewModel: Hello }, slot);
    compositionContext = await this.ensureViewModel(compositionContext);
    this.compositionEngine.compose(compositionContext);
  }

  /** 
   * The following code is a simplification with only the compose()
   * It has the same issue with customAttribute
   **/
  public async composeOnly() {
    const bindingContext: any = {};
    let compositionContext = this.createCompositionContext(this.container, this.anchor2, bindingContext, { viewModel: Hello });
    compositionContext = await this.ensureViewModel(compositionContext);
    this.compositionEngine.compose(compositionContext);
  }
  
  /** 
   * The following code is a simplification with only the compose()
   * It has the same issue with customAttribute
   **/
  public async composeOnlyWithHTML() {
    const bindingContext: any = {};
    let compositionContext = this.createCompositionContext(this.container, this.anchor3, bindingContext, { view: 'resources/hello.html' });
    compositionContext = await this.ensureViewModel(compositionContext);
    this.compositionEngine.compose(compositionContext);
  }

  private createCompositionContext(
    container: any, 
    host: Element, 
    bindingContext: any, 
    settings: {model?: any, view?: any, viewModel?: any},
    slot? : ViewSlot
    ): CompositionContext {
    return {
      container,
      bindingContext: settings.viewModel ? null : bindingContext,
      viewResources: this.viewResources,
      model: settings.model,
      view: settings.view,
      viewModel: settings.viewModel,
      viewSlot: slot || new ViewSlot(host, true),
      host
    };
  }

  private ensureViewModel(compositionContext: CompositionContext): Promise<CompositionContext> {
    if (compositionContext.viewModel === undefined) {
      return Promise.resolve(compositionContext);
    }
    if (typeof compositionContext.viewModel === 'object') {
      return Promise.resolve(compositionContext);
    }
    return this.compositionEngine.ensureViewModel(compositionContext);
  }
  
}


