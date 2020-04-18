let today = new Date()
exports.getWeek = function(){
    let res = []
    for(let i = 0; i < 7; i++){
        res.push(today.getDay(i))
    }
}

exports.getToday = function(){

    let options = {
        day: "numeric",
        month: "numeric"
    };



    return today.toLocaleDateString("en-US", options)
}
//weekday: "long",