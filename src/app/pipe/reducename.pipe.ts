import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reducename'
})
export class ReducenamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
