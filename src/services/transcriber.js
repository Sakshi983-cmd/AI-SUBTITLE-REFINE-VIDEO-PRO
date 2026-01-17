async function transcribeAudio(audioPath) {
  try {
    console.log(`   → Transcribing: ${audioPath}`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockTranscription = {
      text: "Welcome to this tutorial on artificial intelligence. Today we will explore machine learning concepts and how they apply to real world problems. We'll start with the basics and then move to more advanced topics.",
      segments: [
        {
          start: 0.0,
          end: 4.2,
          text: "Welcome to this tutorial on artificial intelligence."
        },
        {
          start: 4.2,
          end: 9.8,
          text: "Today we will explore machine learning concepts and how they apply to real world problems."
        },
        {
          start: 9.8,
          end: 14.5,
          text: "We'll start with the basics and then move to more advanced topics."
        }
      ]
    };

    console.log(`   ✅ Transcribed ${mockTranscription.segments.length} segments`);
    return mockTranscription;

  } catch (error) {
    throw new Error(`Transcription failed: ${error.message}`);
  }
}

module.exports = { transcribeAudio };
