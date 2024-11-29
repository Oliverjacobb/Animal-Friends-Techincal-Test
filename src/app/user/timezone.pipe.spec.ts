import { TimezonePipe } from './timezone.pipe';

describe('TimezonePipe', () => {
  const pipe = new TimezonePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a formatted string with the correct time', () => {
    const description = 'GMT';
    const offset = '2'; 
    const transformed = pipe.transform(description, offset);
    const now = new Date();
    const expectedTime = new Date(now.getTime() + parseInt(offset) * 60 * 60000);
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(expectedTime);
    
    expect(transformed).toBe(`${description} - ${formattedTime}`);
  });

  it('should handle a negative offset correctly', () => {
    const description = 'GMT';
    const offset = '-3'; 
    const transformed = pipe.transform(description, offset);
    const now = new Date();
    const expectedTime = new Date(now.getTime() + parseInt(offset) * 60 * 60000);
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(expectedTime);
    
    expect(transformed).toBe(`${description} - ${formattedTime}`);
  });
});
