

function CalculateAvgRate({ratings}){
    let sum = 0
    let totalRate = 0
    for(let i=1; i<=5; i++){
      totalRate = totalRate + ratings[i]
      sum += i * ratings[i]
    }
    const avg = sum/totalRate
    const newAvg = Math.round(avg*10)/10
    return newAvg
  }

export default CalculateAvgRate
