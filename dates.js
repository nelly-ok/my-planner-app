let today = new Date()



exports.getWeek = function(){
    let res = []
    for(let i = 0; i < 7; i++){
        res.push(today.getDay(i))
    }
}
//console.log("time", parseInt(today.toTimeString()[0]+today.toTimeString()[1]), parseInt(today.toTimeString()[3]+today.toTimeString()[4]));
exports.getTime = function(){
    
    let hour = parseInt(today.toTimeString()[0]+today.toTimeString()[1]) % 12;
    let min =  parseInt(today.toTimeString()[3]+today.toTimeString()[4]);
    //console.log("hrr day", hour, min);
    let res =  hour.toString() + ':' + min.toString();
    //console.log("Res", res);
    return res;
}

exports.getToday = function(){

    let yy = today.getFullYear();
    let mm = today.getMonth();
    let dd = today.getDate();
    let day = today.getDay();

    let week = []
    let futHold = []

    let ddhold = dd; //update this and check against it to make sure you acount for change in months
    let mmhold = mm;
    


    // FOR FUTURE DAYS
    console.log("Todays day is", day)
    for (let i = day, j = 1; i < 6; i++, j++) { //get days before today
        
        // Deef clean thee lock up
        //console.log("entered future for lloop")
        let newDayData = [];
        let nyy = yy;

        let nmm = 0;
        let ndd = 0;


        //console.log("ddhold is", ddhold, "mmhold id", mmhold)
        if (ddhold == 28 && mmhold == 1 && (yy % 4)){ // if Feb 28 in reg year
            nmm =  mmhold + 1;     // increment to March 1
            ndd = 1;
            mmhold = nmm;
            console.log("Feb 28 Reg Year");
        }
        else if (ddhold == 29 && mmhold == 1 && !(yy % 4)){ // if Feb 29 in leap year
            nmm =  mmhold + 1; // incr
            ndd = 1;
            mmhold = nmm;
            console.log("Feb 29 Leap Year");
        }
        else if (ddhold == 30 && (mmhold == 3 || mmhold == 5 || mmhold == 8 || mmhold == 10 )){ // if  Apr, Jun, Sept, Nov
            nmm = mmhold + 1;
            ndd = 1;
            mmhold = nmm;
            console.log("Apr o Jun o Sept o Nov")
        }
        else if (ddhold == 31 ){
            nmm = mmhold + 1; // else remining months
            ndd = 1;
            mmhold = nmm;
            console.log("Remaining months")
        } 
        else { //else dont worry about it
            nmm = mmhold;
            ndd = ddhold + 1;
            console.log("Don't worry bout it baby this that spleh");
        };

        //left off heree


        let nday = (day + j) % 7;

        
        ddhold = ndd;

        newDayData = [nyy, nmm, ndd, nday];

        futHold.push(newDayData);
    };

    let len = futHold.length;

    for(i = 0; i < len; i++ ){
        let temp = futHold.pop();
        week.push(temp);
    }

    // PUSH TODAY

    week.push([yy, mm, dd, day]); //add tooday

    ddhold = dd;
    mmhold = mm;

    // FOR PREVIOUS DAYS

    for (let i = day, j = 1; i > 0; i--, j++) { //get days before today
        
        

        let newDayData = [];
        let nyy = yy;

        let nmm = 0;
        let ndd = 0;

        if (ddhold == 1 && mmhold == 2 && !(yy % 4)){    // If March 1 on a reg year
            nmm =  mmhold - 1; //deecreemeent and change to 28
            ndd = 28;
            mmhold = nmm;
        }
        else if (ddhold == 1 && mmhold == 2 && (yy % 4)){ // if March 1 in leap year
            nmm =  mmhold - 1; // incr
            ndd = 29;
            mmhold = nmm;
            console.log("March 1 on Leap Year");
        }
        else if (ddhold == 1 && (mmhold == 4 || mmhold == 6 || mmhold == 9 || mmhold == 11 )){ // if  Apr, Jun, Sept, Nov
            nmm = mmhold - 1;
            ndd = 30;
            mmhold = nmm;
            console.log("1st of May o JuL o Oct o Dec")
        }
        else if (ddhold == 1 ){
            nmm = mmhold - 1; // else remining months
            ndd = 31;
            mmhold = nmm;
            console.log("Remaining months")
        } 
        else {
            nmm = mmhold;
            ndd = ddhold - 1;
            console.log("Don't worry bout it baby this that spleh");
        }










        let nday = (day - j) % 7;

        
        ddhold = ndd

        newDayData = [nyy, nmm, ndd, nday];
        week.push(newDayData);
    }



    let options = {
        day: "numeric",
        month: "numeric",
        weekday: "long"
    };

    let res = []

    for (let i = 0; i < 7; i++) {
        let newDate = new Date(week[i][0], week[i][1], week[i][2])
        console.log("week length is", week.length, "new date is", newDate);
        res.push(newDate.toLocaleDateString("en-US", options))
    }


    console.log("gas", week);

    //console.log("week", res, res[6],
    //new Date(2020, 3, 27));

    


    return res
}
//weekday: "long",