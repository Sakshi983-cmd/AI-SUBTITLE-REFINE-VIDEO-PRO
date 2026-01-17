const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HF_API_KEY || 'hf_placeholder');

async function refinedWithLLM(text, context, modelName = 'gpt2') {
  const models = {
    'gpt2': 'gpt2',
    'flan-t5': 'google/flan-t5-base',
    'bloom': 'bigscience/bloom-560m'
  };
  
  const selectedModel = models[modelName] || 'gpt2';
  console.log(`   → Using model: ${selectedModel}`);
  
  try {
    const prompt = `Refine these subtitles for clarity.
Context: ${context}
Original: ${text}
Refined:`;

    const response = await hf.textGeneration({
      model: selectedModel,
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        top_p: 0.9
      }
    });

    let refined = response.generated_text.trim();
    
    if (refined.includes('Refined:')) {
      refined = refined.split('Refined:')[1].trim();
    }
    
    console.log(`   ✅ LLM refinement applied`);
    return refined.length > 20 ? refined : text;
    
  } catch (error) {
    console.log(`   ⚠️  LLM fallback: ${error.message}`);
    return text;
  }
}

function getAvailableModels() {
  return [
    { name: 'GPT-2', id: 'gpt2', description: 'Fast and efficient' },
    { name: 'FLAN-T5', id: 'flan-t5', description: 'Better accuracy' },
    { name: 'BLOOM', id: 'bloom', description: 'Multilingual' }
  ];
}

module.exports = { refinedWithLLM, getAvailableModels };
