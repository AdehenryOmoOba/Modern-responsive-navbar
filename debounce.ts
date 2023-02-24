type TRemoveStyles = () => void

export function debouncedRemoveStyles(fn: TRemoveStyles, delay: number) {

  let setTimeoutID: number | undefined;

  return function()  {
    if (setTimeoutID) {
        clearTimeout(setTimeoutID)
    }
    setTimeoutID =  setTimeout(() => {
        console.log('Calling debounced function...')
      }, delay);
     
  }
}