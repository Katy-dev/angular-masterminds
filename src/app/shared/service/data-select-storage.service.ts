import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSelectStorageService {

  constructor() {
  }

  itemsList: string[] = [
    'marketing consultant',
    'psychologist',
    'frontend engineer',
    'product manager',
    'designer',
    'backend engineer',
  ];

  aspectsList: string[] = [
    'Physical health',
    'Well-being',
    'Mental health',
    'Organized',
    'Accountable',
    'Positive attitude',
    'Focused',
    'Respectful of others',
    'Strong communicator'
  ];
}
