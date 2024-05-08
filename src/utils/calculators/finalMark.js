
const finalMark = (assignments, exam) => {
    let total = 0
    let totalWeight = 0
    for (let i = 0; i < assignments.length; i++) {
        total += (assignments[i].mark)*assignments[i].weight
        totalWeight += assignments[i].weight
    }
    return total/totalWeight
}

export default finalMark