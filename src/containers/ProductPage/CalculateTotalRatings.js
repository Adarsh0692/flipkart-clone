

function CalculateTotalRatings({ratings}){
    const arr = Object.values(ratings)
    const totalRate = arr.reduce((a,b) => a+b)
    return totalRate
  }
  

export default CalculateTotalRatings
