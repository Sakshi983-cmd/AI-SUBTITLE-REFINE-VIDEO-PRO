const { extractAudioFromVideo } = require('../services/audioExtractor');
const { transcribeAudio } = require('../services/transcriber');
const { applyNLPRefinement } = require('../services/nlpRefiner');
const { refinedWithLLM, getAvailableModels } = require('../services/llmRefiner');
const { detectVideoContext, suggestContextPrompt } = require('../services/contextAnalyzer');
const { calculateQualityScore, getQualityLabel } = require('../services/qualityScorer');
const { cleanupTempFile } = require('../utils/fileHandler');
const fs = require('fs-extra');

const resolvers = {
  Query: {
    refineSubtitles: async (_, { videoPath, contextPrompt, llmModel }) => {
      const startTime = Date.now();
      let audioFilePath = null;
      
      try {
        const videoExists = await fs.pathExists(videoPath);
        if (!videoExists) {
          throw new Error(`Video file not found: ${videoPath}`);
        }

        console.log(`\n🎬 Processing: ${videoPath}`);
        console.log(`📝 Context: ${contextPrompt}\n`);

        // Step 1: Audio extract
        console.log('🔊 Extracting audio...');
        audioFilePath = await extractAudioFromVideo(videoPath);
        
        // Step 2: Transcribe
        console.log('🎙️  Transcribing...');
        const transcription = await transcribeAudio(audioFilePath);
        
        // Step 3: NLP refinement
        console.log('🧠 NLP refinement...');
        const nlpResult = applyNLPRefinement(transcription.text);
        
        // Step 4: Context detection
        console.log('🎯 Detecting context...');
        const detectedCtx = detectVideoContext(transcription.text);
        const suggestedCtx = suggestContextPrompt(detectedCtx);
        
        // Step 5: LLM refinement
        console.log('🤖 LLM refinement...');
        const llmRefined = await refinedWithLLM(
          nlpResult.refinedText, 
          contextPrompt,
          llmModel || 'gpt2'
        );
        
        // Step 6: Quality score
        const qualityScore = calculateQualityScore(
          transcription.text,
          llmRefined,
          nlpResult.improvements
        );

        const segments = transcription.segments.map(s => ({
          startTime: s.start,
          endTime: s.end,
          text: s.text
        }));

        const allImprovements = [
          ...nlpResult.improvements,
          'Applied LLM contextual understanding',
          `Optimized for: "${contextPrompt}"`
        ];

        const processingTime = (Date.now() - startTime) / 1000;
        
        console.log(`✅ Done in ${processingTime.toFixed(2)}s\n`);

        return {
          original: transcription.text,
          refined: llmRefined,
          segments,
          contextUsed: contextPrompt,
          detectedContext: detectedCtx,
          suggestedContext: suggestedCtx,
          improvements: allImprovements,
          qualityScore: qualityScore,
          qualityLabel: getQualityLabel(qualityScore),
          processingTime: parseFloat(processingTime.toFixed(2))
        };

      } catch (error) {
        console.error('❌ Error:', error.message);
        throw new Error(`Refinement failed: ${error.message}`);
      } finally {
        if (audioFilePath) {
          await cleanupTempFile(audioFilePath);
        }
      }
    },

    availableModels: () => {
      return getAvailableModels();
    }
  }
};

module.exports = { resolvers };
