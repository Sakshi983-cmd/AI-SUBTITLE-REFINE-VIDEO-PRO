function calculateQualityScore(original, refined, improvements) {
  let score = 50;
  
  score += improvements.length * 5;
  
  if (refined.length > original.length * 0.8) {
    score += 10;
  }
  
  const sentences = refined.split('. ');
  const capitalized = sentences.filter(s => s[0] === s[0].toUpperCase()).length;
  score += capitalized * 2;
  
  if (/[.!?]$/.test(refined)) score += 10;
  if (!/\s{2,}/.test(refined)) score += 5;
  
  return Math.min(score, 100);
}

function getQualityLabel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Improvement';
}

module.exports = { calculateQualityScore, getQualityLabel };
