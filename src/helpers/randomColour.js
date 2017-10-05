
export function getRandomColour(){
    var colours = [
        'blueCard', 
        'greenCard',         
        'pinkCard', 
        'redCard',
        'orangeCard', 
        'purpleCard']
    
    return colours[Math.floor(Math.random()*colours.length)];
}