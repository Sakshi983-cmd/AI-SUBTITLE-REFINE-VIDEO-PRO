const nlp = require('compromise');

function detectVideoContext(text) {
  const topics = {
    isTechTutorial: false,
    isEducational: false,
    isComedy: false,
    isProfessional: false,
    language: 'english'
  };
  
  const techWords = ['code', 'program', 'software', 'algorithm', 'api', 'function'];
  const foundTech = techWords.filter(w => text.toLowerCase().includes(w));
  if (foundTech.length >= 2) topics.isTechTutorial = true;
  
  const eduWords = ['learn', 'tutorial', 'lesson', 'explain'];
  const foundEdu = eduWords.filter(w => text.toLowerCase().includes(w));
  if (foundEdu.length >= 2) topics.isEducational = true;
  
  if (text.includes('haha') || text.includes('lol')) {
    topics.isComedy = true;
  }
  
  const doc = nlp(text);
  if (doc.topics().length > 5) {
    topics.isProfessional = true;
  }
  
  return topics;
}

function suggestContextPrompt(ctx) {
  if (ctx.isTechTutorial) return "Technical tutorial with clear explanations";
  if (ctx.isEducational) return "Educational content for learning";
  if (ctx.isComedy) return "Comedy content with casual tone";
  if (ctx.isProfessional) return "Professional presentation";
  return "General video content";
}

module.exports = { detectVideoContext, suggestContextPrompt };
