
const finalAttendance = (dates) => {

    let total = 0
    let numberDates = dates.length
    for (let i = 0; i < dates.length; i++) {
        total += dates[i].present
    }
    return `${(total/numberDates)*100}+%`

}

export default finalAttendance