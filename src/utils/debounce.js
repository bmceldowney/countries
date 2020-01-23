/**
 * Prevents a function from being called until a cooldown period has passed
 * @param {Function} fn - the function to debounce
 * @param {Integer} cooldown - the amount of time that must pass until the function can be invoked again
 */
export default function debounce (fn, cooldown) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    const done = () => {
      timer = null
      fn.apply(context, args)
    }

    clearTimeout(timer)
    timer = setTimeout(done, cooldown)
  }
}
