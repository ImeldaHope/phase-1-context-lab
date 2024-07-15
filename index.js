/* Your Code Here */

function createEmployeeRecord(arr){
    return {
        firstName : arr[0],
        familyName : arr[1],
        title : arr[2],
        payPerHour : arr[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
}

function createEmployeeRecords(employeesArr){
    return employeesArr.map(createEmployeeRecord);
}

function createTimeInEvent(timeAndDate){
    const [date, hour] = timeAndDate.split(' ');

    this.timeInEvents.push(
        {
            type: "TimeIn",
            date : date,
            hour: parseInt(hour,10)
        }
    )
    
    return this;    
}

function createTimeOutEvent(timeAndDate){
    const [date, hour] = timeAndDate.split(' ');

    this.timeOutEvents.push(
        {
            type: "TimeOut",
            date: date,
            hour: parseInt(hour,10)
        }
    )

    return this;
}

function hoursWorkedOnDate(dateOfWork){
    const timeInEvent = this.timeInEvents.find(emp => emp.date === dateOfWork);
    const timeOutEvent = this.timeOutEvents.find(emp => emp.date === dateOfWork);

    if (timeInEvent && timeOutEvent) {        
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
    } else {        
        return 'record not found';
    }
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName(empArr, firstName){
    return empArr.find((name) => name.firstName === firstName);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeesRecords){
    return employeesRecords.reduce((tots, employeesRecords) => {
        return tots + allWagesFor.call(employeesRecords)
    }, 0)
}