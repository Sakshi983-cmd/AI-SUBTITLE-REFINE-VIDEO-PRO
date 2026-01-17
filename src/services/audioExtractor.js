const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

ffmpeg.setFfmpegPath(ffmpegPath);

async function extractAudioFromVideo(videoPath) {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, '../../temp');
    fs.ensureDirSync(tempDir);
    
    const uniqueId = uuidv4().substring(0, 8);
    const audioFile = `audio_${uniqueId}.wav`;
    const audioPath = path.join(tempDir, audioFile);

    console.log(`   → Extracting to: ${audioFile}`);

    ffmpeg(videoPath)
      .toFormat('wav')
      .audioFrequency(16000)
      .audioChannels(1)
      .on('progress', (p) => {
        if (p.percent) {
          process.stdout.write(`\r   → Progress: ${p.percent.toFixed(1)}%`);
        }
      })
      .on('end', () => {
        console.log('\r   ✅ Audio extracted!          ');
        resolve(audioPath);
      })
      .on('error', (err) => {
        console.error(`\n   ❌ FFmpeg error: ${err.message}`);
        reject(new Error(`Audio extraction failed: ${err.message}`));
      })
      .save(audioPath);
  });
}

module.exports = { extractAudioFromVideo };
