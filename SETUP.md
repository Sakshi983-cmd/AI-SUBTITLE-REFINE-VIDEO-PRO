# 🚀 Complete Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Hugging Face account (free)

---

## Step 1: Clone or Download Repository

### Option A: Clone via Git
```bash
git clone https://github.com/yourusername/ai-subtitle-refiner-pro.git
cd ai-subtitle-refiner-pro
```

### Option B: GitHub Codespaces (Recommended - runs in browser!)
1. Go to your GitHub repository
2. Click green **"Code"** button
3. Click **"Codespaces"** tab
4. Click **"Create codespace on main"**
5. VS Code will open in your browser ✨

---

## Step 2: Install Dependencies
```bash
npm install
```

**This will install:**
- Express.js (server)
- Apollo Server (GraphQL)
- FFmpeg (audio extraction)
- Hugging Face Inference (LLM)
- Compromise.js (NLP)
- Other utilities

---

## Step 3: Environment Configuration

### Create .env file
```bash
cp .env.example .env
```

### Add your Hugging Face API Key

**Get free API key:**
1. Visit: https://huggingface.co/join
2. Sign up (free account)
3. Go to: Settings → Access Tokens
4. Click "New token"
5. Copy the token

**Edit .env file:**
```env
PORT=4000
NODE_ENV=development
HF_API_KEY=hf_xxxxxxxxxxxxxxxxxx
```

---

## Step 4: Install FFmpeg

### macOS
```bash
brew install ffmpeg
```

### Ubuntu/Linux
```bash
sudo apt update
sudo apt install ffmpeg
```

### Windows
1. Download from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to `C:\ffmpeg`
3. Add to PATH environment variable

### Verify Installation
```bash
ffmpeg -version
```

---

## Step 5: Start the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

**Expected Output:**
```
🚀 Server Ready!
📊 GraphQL: http://localhost:4000/graphql
❤️  Health: http://localhost:4000/health
```

---

## Step 6: Test the API

### Open GraphQL Playground

Navigate to: `http://localhost:4000/graphql`

### Test Query 1: Available Models
```graphql
query {
  availableModels {
    name
    id
    description
  }
}
```

**Expected Response:**
```json
{
  "data": {
    "availableModels": [
      {
        "name": "GPT-2",
        "id": "gpt2",
        "description": "Fast and efficient"
      },
      {
        "name": "FLAN-T5",
        "id": "flan-t5",
        "description": "Better accuracy"
      },
      {
        "name": "BLOOM",
        "id": "bloom",
        "description": "Multilingual"
      }
    ]
  }
}
```

### Test Query 2: Refine Subtitles (Demo)

**Note:** For actual video processing, you need a real video file path. This demo uses mock data.
```graphql
query {
  refineSubtitles(
    videoPath: "/path/to/your/video.mp4"
    contextPrompt: "Tech tutorial for beginners"
    llmModel: "gpt2"
  ) {
    original
    refined
    detectedContext {
      isTechTutorial
      isEducational
    }
    suggestedContext
    qualityScore
    qualityLabel
    improvements
    processingTime
  }
}
```

---

## Step 7: Project Structure Overview
```
ai-subtitle-refiner-pro/
│
├── src/
│   ├── index.js                    # Main server entry point
│   ├── graphql/
│   │   ├── schema.js               # GraphQL type definitions
│   │   └── resolvers.js            # Query resolvers
│   │
│   ├── services/
│   │   ├── audioExtractor.js       # FFmpeg audio extraction
│   │   ├── transcriber.js          # Whisper transcription (mock)
│   │   ├── nlpRefiner.js           # NLP-based refinement
│   │   ├── llmRefiner.js           # LLM contextual refinement
│   │   ├── contextAnalyzer.js      # Auto-context detection
│   │   └── qualityScorer.js        # Subtitle quality scoring
│   │
│   └── utils/
│       └── fileHandler.js          # Temp file cleanup
│
├── temp/                           # Temporary audio files (auto-cleaned)
├── .env                            # Environment variables (DO NOT COMMIT)
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies
├── README.md                       # Project documentation
└── SETUP.md                        # This file
```

---

## Step 8: Deployment (Optional)

### Deploy on Render.com (Free)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Render:**
   - Visit: https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - **Settings:**
     - Build Command: `npm install`
     - Start Command: `npm start`
   - **Environment Variables:**
     - `HF_API_KEY` = your_huggingface_key
   - Click "Create Web Service"

3. **Your app will be live in 5-10 minutes!**

### Deploy on Railway.app (Free)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Add environment variables
railway variables set HF_API_KEY=your_key
```

---

## Common Issues & Solutions

### Issue 1: "Cannot find module 'express'"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: "FFmpeg not found"
**Solution:** Install FFmpeg (see Step 4)

### Issue 3: "Port 4000 already in use"
**Solution:** Change PORT in .env file
```env
PORT=5000
```

### Issue 4: "Hugging Face API error"
**Solution:** Check .env file has correct HF_API_KEY

### Issue 5: GraphQL Playground not loading
**Solution:** Make sure server is running and visit exact URL:
```
http://localhost:4000/graphql
```

---

## Testing the Complete Workflow

### Step-by-step test:

1. **Health Check:**
```bash
curl http://localhost:4000/health
```

2. **GraphQL Playground:**
   - Open browser: `http://localhost:4000/graphql`

3. **Run Query:**
```graphql
query {
  refineSubtitles(
    videoPath: "demo.mp4"
    contextPrompt: "Educational content"
  ) {
    refined
    qualityScore
    improvements
  }
}
```

4. **Check Console Output:**
```
🎬 Processing: demo.mp4
📝 Context: Educational content

🔊 Extracting audio...
   → Extracting to: audio_abc123.wav
   ✅ Audio extracted!

🎙️  Transcribing...
   ✅ Transcribed 3 segments

🧠 NLP refinement...
   ✅ Applied 4 NLP improvements

🎯 Detecting context...

🤖 LLM refinement...
   → Using model: gpt2
   ✅ LLM refinement applied

✅ Done in 3.45s

🧹 Cleaned: audio_abc123.wav
```

---

## Next Steps

### For Production Use:

1. **Replace Mock Transcription:**
   - Integrate real Whisper model (whisper.cpp)
   - Or use OpenAI Whisper API

2. **Add File Upload:**
   - Implement multipart/form-data support
   - Add cloud storage (AWS S3, Cloudinary)

3. **Add Authentication:**
   - JWT tokens
   - API key validation

4. **Add Database:**
   - Store processing history
   - User management

5. **Add Queue System:**
   - Bull or RabbitMQ for batch processing
   - Background job processing

---

## Performance Optimization

### Current Performance:
- Audio Extraction: ~1-2 seconds
- Transcription (mock): ~1.5 seconds
- NLP + LLM: ~2-3 seconds
- **Total: ~3-5 seconds per minute of video**

### Optimization Tips:
1. Use faster LLM models
2. Implement caching
3. Parallel processing
4. GPU acceleration for real Whisper

---

## Documentation

### API Documentation

**GraphQL Schema:**
- See: `src/graphql/schema.js`

**Available Queries:**
- `refineSubtitles` - Main subtitle refinement
- `availableModels` - List available LLM models

**Types:**
- `RefinedSubtitles` - Complete output
- `SubtitleSegment` - Timestamp + text
- `DetectedContext` - Auto-detected video type
- `LLMModel` - Model information

---

## Support

### Resources:
- **GraphQL Docs:** https://graphql.org/learn/
- **FFmpeg Docs:** https://ffmpeg.org/documentation.html
- **Hugging Face:** https://huggingface.co/docs
- **Apollo Server:** https://www.apollographql.com/docs/

### Troubleshooting:
- Check server logs in terminal
- Verify environment variables
- Test health endpoint first
- Use GraphQL playground for debugging

---

## Contributing

This is a demo project for Craon.ai Jr. AI Engineer application.

**For improvements:**
1. Fork the repository
2. Create feature branch
3. Submit pull request

---

## License

MIT License - Free to use and modify

---

## Credits

**Built with:**
- Node.js + Express
- Apollo Server (GraphQL)
- FFmpeg (audio processing)
- Hugging Face (LLM inference)
- Compromise.js (NLP)

**Created for:** Craon.ai Jr. AI Engineer Role

---

**✅ Setup Complete! You're ready to go!**

**Questions? Check the README.md or raise an issue on GitHub.**
