export * from './message';
export * from './loading';
export * from './importExternal';
export * from './other';
export * from './renderContent';

export const sleep = (seconds:number) => new Promise((resolve) => {
    setTimeout(resolve, 1000 * seconds)
})