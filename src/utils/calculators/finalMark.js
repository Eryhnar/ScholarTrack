
const finalMark = (assignments) => {
    let total = 0;
    let totalWeight = 0;
    if (assignments.length === 0) return "NA";
    for (let i = 0; i < assignments.length; i++) {
        total += (assignments[i].value * assignments[i].task[0].weight)/100;
        totalWeight += assignments[i].task[0].weight/100;
    }
    return total / totalWeight;
};

export default finalMark;