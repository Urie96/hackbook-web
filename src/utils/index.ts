import { useRouter as useVueRouter } from 'vue-router';
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

export const toDurationChinese = (seconds: number) => {
    if (seconds < 60) {
        return '不到1分钟';
    }
    if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}分钟`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    if (minutes > 0) {
        return `${hours}小时${minutes}分钟`;
    }
    return `${hours}小时`;
}

export function getFirstDayOfThisWeek() {
    const date = new Date();
    const day = date.getDay() || 7;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day);
};

export function getFirstDayOfThisMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export const useRouter = () => {
    const router = useVueRouter();
    return {
        push: (path: string) => {
            history.state.forward === path ? history.forward() : router.push(path);
        },
        back: (path: string) => {
            history.state.back === path ? history.back() : router.replace(path);
        }
    }
}