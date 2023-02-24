export function debouncedRemoveStyles(fn, delay) {
    let setTimeoutID;
    return function () {
        if (setTimeoutID) {
            clearTimeout(setTimeoutID);
        }
        setTimeoutID = setTimeout(() => {
            fn()
        }, delay);
    };
}
