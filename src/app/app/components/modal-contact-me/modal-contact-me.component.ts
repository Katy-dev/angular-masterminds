import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal-contact-me',
  templateUrl: './modal-contact-me.component.html',
  styleUrls: ['./modal-contact-me.component.scss']
})
export class ModalContactMeComponent implements OnInit {
  @Input() image: string;
  @Input() profession: string;
  @Input() name: string;

  @Output() close = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

}
