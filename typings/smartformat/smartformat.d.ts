 
declare module Smart {
    
    interface ISelector {
        (value, selector:string):any;
    }

    interface IFormatter {
        (value, format: string): string;
    }

    export function format(template: string, data);
    export function addExtensions(type:string, hash: {
        [key:string] : ISelector|IFormatter;
    });

    class SmartFormatter {
        constructor(selectors: ISelector[], formatters: IFormatter[]);

        format(template:string, data):string;
        evaluateSelector(data, properties);
        evaluateFormat(value, format);
    }
}