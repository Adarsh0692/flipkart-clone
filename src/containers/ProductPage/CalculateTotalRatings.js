

function CalculateTotalRatings({ratings}){
  if (!ratings || typeof ratings !== 'object') {
    return 0;
  }
    const arr = Object.values(ratings)
    const totalRate = arr.reduce((a,b) => a+b)
    return totalRate
  }
  

export default CalculateTotalRatings
