export * from './message';
export * from './loading';
export * from './importExternal';
export * from './other';
export * from './renderContent';

export const sleep = (seconds: number) => new Promise((resolve) => {
    setTimeout(resolve, 1000 * seconds)
})

export const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean,
        lastFn: ReturnType<typeof setTimeout>,
        lastTime: number;
    return function (this: any) {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    waitFor: number,
): (...args: Parameters<F>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
}