import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timezone',
  standalone: true
})
export class TimezonePipe implements PipeTransform {

  transform(description: string, offset: string): string {
    const now = new Date();

    const offsetMinutes = parseInt(offset) * 60;

    const localTime = new Date(now.getTime() + offsetMinutes * 60000);

    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(localTime);

    return `${description} - ${formattedTime}`;
  }

}
