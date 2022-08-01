import format  from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const DATE_FORMATS: {[key: string]: string} = {
  SHORT_DATE_US: "d / M / yy",
  MEDIUM_DATE: "MMM d, yyyy"
}

export class FormattingUtils { 

  static formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  static formatDate(inputStr: string, outputFormat?: string): string {
    const parsedDate = parseISO(inputStr);
    return format(parsedDate, outputFormat ? outputFormat : DATE_FORMATS['MEDIUM_DATE']);
  }
}