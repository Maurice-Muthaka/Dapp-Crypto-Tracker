export const isEmptyObj = (obj: any) =>
  (obj !== null || obj !== undefined) &&
  Object.entries(obj).length === 0 &&
  obj.constructor === Object;
  
export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const getEllipsisTxt = ( str: string, n = 6 ) => {
    if (str) {
        return `${str.substring(0, n)}...${str.substring(str.length - 8, str.length)}`;
    }
    return '';
}

export function numberWithCommas(x: string | number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const n4 = new Intl.NumberFormat('en-us', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
  