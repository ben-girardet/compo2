import { TemplatingEngine, CompositionEngine, ViewSlot, CompositionContext, Controller } from 'aurelia-templating';
import { Hello } from 'resources/hello';
import { inject, Container } from 'aurelia-framework';

@inject(Container, TemplatingEngine, CompositionEngine)
export class App {
  public anchor1: HTMLElement;
  public anchor2: HTMLElement;

  constructor(
    private container: Container,
    private templatingEngine: TemplatingEngine, 
    private compositionEngine: CompositionEngine) {

  }
  
  public activate() {
    
  }
  
  public attached() {
    this.composeWithEnhance(); 
    this.composeOnly(); 
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

  private createCompositionContext(
    container: any, 
    host: Element, 
    bindingContext: any, 
    settings: {model?: any, view?: any, viewModel?: any},
    slot? : ViewSlot
    ): CompositionContext {
      console.log('createCompositionContext');
    return {
      container,
      bindingContext: settings.viewModel ? null : bindingContext,
      viewResources: null as any,
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

