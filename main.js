window.onload = () => {
    let thing = `rgba(${randInRange(0, 255)}, ${randInRange(0, 255)}, ${randInRange(0, 255)}, 1)`
    console.log(thing)
    document.getElementById("appname").style.color = thing
}
function randInRange(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}