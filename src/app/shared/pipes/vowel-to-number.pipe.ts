import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelToNumber'
})
export class VowelToNumberPipe implements PipeTransform {

  valueLC = '';
  vowelsNumbers: {[key:string]: string; } = {
    'a': '4',
    'e': '3',
    'i': '1',
    'o': '0'
  };
  i = 0;
  ArrayVowels: string[] = [];
  transform(value: string): string {
    this.valueLC = value.toLowerCase();
    this.ArrayVowels = this.valueLC.split('');
    for (const vowel of this.ArrayVowels) {
      if(this.vowelsNumbers[vowel.toString()] != undefined){
        this.ArrayVowels[this.i] = this.vowelsNumbers[vowel.toString()];
      }
      this.i += 1;
    }

    return this.ArrayVowels.join('');
  }

}
