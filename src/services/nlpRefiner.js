const nlp = require('compromise');

function applyNLPRefinement(text) {
  const improvements = [];
  
  let doc = nlp(text);
  
  doc.sentences().toTitleCase();
  improvements.push('Applied proper sentence capitalization');
  
  const properNouns = doc.people().length + doc.places().length + doc.organizations().length;
  if (properNouns > 0) {
    improvements.push(`Capitalized ${properNouns} proper noun(s)`);
  }
  
  doc.numbers().toNumber();
  
  let refinedText = doc.text();
  
  const originalLen = refinedText.length;
  refinedText = refinedText.replace(/\s+/g, ' ').trim();
  if (refinedText.length < originalLen) {
    improvements.push('Removed extra whitespace');
  }
  
  if (!refinedText.endsWith('.') && !refinedText.endsWith('!') && !refinedText.endsWith('?')) {
    refinedText += '.';
    improvements.push('Added missing period');
  }
  
  const corrections = {
    ' i ': ' I ',
    "dont": "don't",
    "cant": "can't",
    "wont": "won't"
  };
  
  let correctionCount = 0;
  for (const [wrong, correct] of Object.entries(corrections)) {
    const regex = new RegExp(wrong, 'gi');
    if (regex.test(refinedText)) {
      refinedText = refinedText.replace(regex, correct);
      correctionCount++;
    }
  }
  
  if (correctionCount > 0) {
    improvements.push(`Fixed ${correctionCount} common error(s)`);
  }
  
  console.log(`   ✅ Applied ${improvements.length} NLP improvements`);
  
  return {
    refinedText,
    improvements
  };
}

module.exports = { applyNLPRefinement };
