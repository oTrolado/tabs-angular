import {
    Component,
    OnInit,
    AfterViewInit,
    AfterViewChecked,
    ElementRef,
    ViewChild,
    Input
} from '@angular/core';

@Component({
    selector: 'trolado-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit, AfterViewChecked {
    //CONTROLES DE ESTADO
    atual: number = null;
    arrows: boolean = false;
    animable: boolean = true;
    @Input() tabAlign: string;
    @Input() scalable: string;
    @Input() redutive: string;
    plus: boolean = false;
    minus: boolean = false;
    onPlus: boolean = false;
    newTab:any = {title:'',body:''};
    

    //HEADER
    labels: any = [];
    labelItem: any;
    indicator: any;


    //CONTEUDO
    contents: any;
    tabs: any = [];
    wraper: any;


    @ViewChild("header") header: ElementRef;
    @ViewChild("headerContainer") headerContainer: ElementRef;
    @ViewChild("plusLabel") plusLabel: ElementRef;
    @ViewChild("plusBody") plusBody: ElementRef;


    constructor(
        private view: ElementRef
    ) { }


    ngOnInit() {
        let elements = this.view.nativeElement.querySelectorAll('.trolado-tab-label');

        if (this.scalable == 'true') this.plus = true;
        if (this.redutive == 'true') this.minus = true;

        for (let i = 0; i < elements.length; i++) {

            this.labels.push(elements[i].innerHTML);

        }

        this.contents = this.view.nativeElement.querySelectorAll('.trolado-tab');
        for (let i = 1; i < this.contents.length; i++) {
            this.contents[i].classList.add('hidden');
        }

        this.wraper = this.view.nativeElement.querySelector('.trolado-tabs-wraper');

        this.indicator = this.view.nativeElement.querySelector('.trolado-tabs-indicator');

    }


    ngAfterViewInit() {

        this.labelItem = this.view.nativeElement.querySelector('.trolado-tabs-header-labels').children;

        let labels = this.view.nativeElement.querySelector('.trolado-tabs-header-labels');

        this.labelItem[0].classList.add('active-label');

        this.header.nativeElement.style.left = 0;

        this.header.nativeElement.style.right = 0;

        if (this.tabAlign == 'center') {

            labels.style.justifyContent = 'center';
            labels.style.display = 'flex';

        } else if (this.tabAlign == 'right') {

            labels.style.justifyContent = 'flex-end';
            labels.style.display = 'flex';

        }
        
        if (this.labels.length > 0) {
            if(this.atual == 0) this.atual = null;
            this.exibir(0, null, this.labelItem[0]);
        } else {
            this.criarTAB(this.plusLabel.nativeElement);
        }

    }

    clear() {//RESETA O HEADER E O BODY
        this.onPlus = false;
        this.labels = [];
        this.arrows = false;
        this.newTab = {};
        setTimeout(() => this.onResize(null), 500);
        this.ngOnInit();
        this.ngAfterViewInit();
    }


    ngAfterViewChecked() {

        let width: number = 0;

        if(this.onPlus){
            
        }

        for (let i = 0; i < this.labelItem.length; i++) {

            width += this.labelItem[i].clientWidth;

        }

        //this.header.nativeElement.style.maxWidth = width + 'px';
        this.header.nativeElement.style.minWidth = width + 'px';
    }


    onResize(event) {//Organiza a "casa" quando a "familia" muda de tamanho
        let container = this.headerContainer.nativeElement.clientWidth;
        let element = this.header.nativeElement.clientWidth;

        if (container < element) {
            this.arrows = true;
        } else {
            this.arrows = false;
            this.header.nativeElement.style.left = '0';
        }

        if (this.labels > 1) {
            if (this.atual == 0) {
                this.indicatorTransform(this.labelItem[this.atual].offsetLeft, this.labelItem[this.atual].clientWidth);
            } else {
                this.indicatorTransform(this.labelItem[0].offsetLeft, this.labelItem[0].clientWidth);
            }
        }

    }


    deactivateLabels(i) {//REMOVE MARCAÇÃO ATIVA DOS LABELS
        if (i < this.labelItem.length) {
            this.labelItem[i].classList.remove('active-label');
            this.deactivateLabels(++i);
        }
        return i
    }


    exibir(item, event, element) {//EXECUTA TRANSIÇÃO DA TAB

        if (item == this.atual || !this.animable) return;

        this.animable = false;

        this.deactivateLabels(0);

        element.classList.add('active-label');

        this.contents[item].classList.remove('hidden');

        if ((item > this.atual || this.atual >= this.labels.length) || this.atual-1 == this.labels.length) {
            this.wraper.classList.add('toRight');

        } else {

            this.wraper.classList.add('toLeft')

        }

        this.indicatorTransform(element.offsetLeft, element.clientWidth);


        setTimeout(() => {//RESET ---------------------------
            if (this.atual >= this.labels.length) {
                this.plusBody.nativeElement.classList.add('hidden');

            } else if (this.atual != null && this.labels.length > 1 && this.atual < this.labels.length) {

                this.contents[this.atual].classList.add('hidden');

            }
            this.indicatorTransform(element.offsetLeft, element.clientWidth);
            this.wraper.classList.remove('toLeft', 'toRight');
            this.atual = item;
            this.animable = true;
        }, 400);


        if (this.arrows) {//SE HOUVER ARROWS CHAMA O NAVIGATE
            if (event) {
                let clientX = event.clientX;
                let headerX = this.headerContainer.nativeElement;


                if (clientX - headerX.offsetLeft < 100) {
                    this.navigate('left');
                } else if (clientX + headerX.offsetLeft > headerX.clientWidth - 100) {
                    this.navigate('right');
                }
            }
        }
    }


    criarTAB(label) {//CRIA UM NOVA TAB

        this.onPlus = true;

        while(this.navigate('left'));

        setTimeout(() => {
            label.querySelector('.label-input').innerText = '';
            label.querySelector('.label-input').focus();
        }, 400);

        if (this.animable && this.labelItem.length > 0) {
            if(this.atual == this.labels.length +1) return false;
            
            this.animable = false;

            if (this.labelItem[this.atual]) {

                this.labelItem[this.atual].classList.remove('active-label');

            }
            

            if (!this.onPlus) {
                this.onPlus = true;
            }
            this.plusBody.nativeElement.classList.remove('hidden');

            this.wraper.classList.add('toLeft');

            this.indicatorTransform(label.offsetLeft, label.clientWidth);

            setTimeout(() => {//RESET
                if (this.atual == null) {

                    this.contents[0].classList.add('hidden');

                } else if (this.labels.length > 0) {
                    this.contents[this.atual].classList.add('hidden');
                }
                this.wraper.classList.remove('toLeft', 'toRight');
                this.animable = true;
                this.atual = this.labels.length + 1;
                this.indicatorTransform(label.offsetLeft, label.clientWidth);
            }, 400);
        }
    }


    inputKeypress(event, label){
        
        let labelWidht = label.clientWidth > 122 ? label.clientWidth : 122;
        

        if(labelWidht > this.headerContainer.nativeElement.clientWidth - 100){
            event.preventDefault();
        }

        this.indicatorTransform(label.offsetLeft, labelWidht);
        this.onResize(null);
    }




    abortTAB(textarea) {
        this.onPlus = false;
        if (this.labels.length > 1) {
            textarea.innerHTML = '--Me Edite--';
            setTimeout(() => this.exibir(0, null, this.labelItem[0]), 400);
        }
    }


    saveTAB(label, content) {//SALVA A NOVA TAB

        setTimeout(() => {

            this.newTab.title = label.querySelector('.label-input').innerText;
            this.newTab.body = content.innerHTML;

            let tab = document.createElement('div');
            tab.classList.add('trolado-tab');

            let head = document.createElement('div');
            head.classList.add('trolado-tab-label');
            head.innerText = this.newTab.title;

            let body = document.createElement('div');
            body.classList.add('trolado-tab-content');
            body.innerHTML = this.newTab.body;

            tab.appendChild(head);
            tab.appendChild(body);

            this.wraper.appendChild(tab);
            content.innerHTML = '--Me Edite--';

            this.clear();
        }, 400);
    }


    delete(item, index, event) {//DELETA UMA TAB
        event.stopPropagation();
        setTimeout(() => {
            item.remove();
            this.contents[index].remove();
            this.clear();
        },400);
    }


    indicatorTransform(translate, width) {//MUDA O INDICADOR DE POSIÇÃO/TAMNHo
        this.indicator.style.width = width + 'px';
        this.indicator.style.transform = 'translateX(' + translate + 'px)';

    }


    navigate(direction) {//NAVEGAÇÃO DO HEADER
        let positionLeft = parseInt(this.header.nativeElement.style.left);
        let headerWidth = parseInt(this.header.nativeElement.clientWidth);
        let containerWidth = parseInt(this.headerContainer.nativeElement.clientWidth);

        if (direction == 'right') {

            if ((containerWidth - headerWidth) < positionLeft - 80) {

                this.header.nativeElement.style.left = positionLeft - 80 + 'px';
                return true;
            } else {

                this.header.nativeElement.style.left = positionLeft + (containerWidth - headerWidth - positionLeft) - 19 + 'px';
                return false;
            }


        } else {

            if (positionLeft <= -80) {

                this.header.nativeElement.style.left = positionLeft + 80 + 'px';
                return true;
            } else {

                this.header.nativeElement.style.left = positionLeft + (-1 * (positionLeft) + 19) + 'px';
                return false;
            }
        }
    }
}
