/*
    justSticky.JS (funny cuz JS is an acronym for justSticky ;)).
    you're allowed to breath a bit harder through your nose-holes after reading this pun.


    JustSticky - it's really just that. Nothing fancy, no testing involved yet.
    Hooks window.onScroll and checks whether a given element should be stickied to the top or not.
    Adds class 'just-sticky' on elements which are sticky, so add manual positioning there.

    Need fine control? Pass a function as third-argument to JustSticky which gets called when
    user scrolls. (this refers to JustSticky instance in any case).

    original checkElementPosition function:
     function(){
         var offsetScrolled = (window.scrollY);
         if (offsetScrolled >= this.offsetToScroll){
            this.applyCSS(this.cssStyles.sticky, this.sticky);
            this.addClass('just-sticky');
         } else {
            this.applyCSS(this.cssStyles.unsticky, this.sticky);
            this.removeClass('just-sticky');
        }
     };


    A few things:

    - No dependencies
    - Minimalistic
    - Built on TypeScript
    - Debounces scroll event
    - No external stylesheet required.

 */


interface Window {
    scrollY: any;
}

interface Object {
    scrollSpy: any;
}

interface JustStickyCSSStyle {
    unsticky : Object;
    sticky : Object;
}

class JustSticky {
    debounceTimer : number;
    sticky : HTMLElement;
    cssStyles : JustStickyCSSStyle;

    offsetToScroll : number;
    stickyStyle : CSSStyleDeclaration;

    applyCSS = function(cssObject : Object, element : HTMLElement){
        var styleObject = element.style;
        for (var property in cssObject){
            if (cssObject.hasOwnProperty(property)){
                styleObject[property] = cssObject[property]
            }
        }
    };

    addClass = function(className : String){
        this.sticky.classList.add(className);
    };

    removeClass = function(className : String){
        this.sticky.classList.remove(className);
    };

    checkElementPosition = function(){
        var offsetScrolled = (window.scrollY);
        if (offsetScrolled >= this.offsetToScroll){
            this.applyCSS(this.cssStyles.sticky, this.sticky);
            this.addClass('just-sticky');
        } else {
            this.applyCSS(this.cssStyles.unsticky, this.sticky);
            this.removeClass('just-sticky');
        }

        if (typeof this.scrollSpy !== "undefined"){
            this.scrollSpy();
        }
    };

    scrollSpy : () => void = undefined;

    constructor(selector : string, options : Object, checkElementFn : () => void){
        options = options || {};
        if (typeof options.scrollSpy !== "undefined"){
            this.scrollSpy = options.scrollSpy;
        }
        var _this : JustSticky = this;

        this.debounceTimer = undefined;
        this.sticky = <HTMLElement>document.querySelector(selector);
        this.stickyStyle = this.sticky.style;
        this.cssStyles = {
            unsticky: {
                zIndex: this.stickyStyle.zIndex,
                position: this.stickyStyle.position,
                top: this.stickyStyle.top
            },
            sticky: {
                zIndex: 9999,
                position: 'fixed',
                top: 0
            }
        };


        this.applyCSS(this.cssStyles.unsticky, this.sticky);
        this.offsetToScroll = this.sticky.offsetTop;

        if (typeof checkElementFn !== "undefined" && typeof checkElementFn === "function"){
            this.checkElementPosition = checkElementFn;
        }

        window.addEventListener('scroll', function(){
            if (typeof _this.debounceTimer !== "undefined"){
                clearTimeout(_this.debounceTimer);
                _this.debounceTimer = undefined;
            }
            _this.debounceTimer = setTimeout(_this.checkElementPosition.bind(_this), 10);
        });

    }
};


