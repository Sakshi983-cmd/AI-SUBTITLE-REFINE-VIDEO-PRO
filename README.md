<div align="center">
  <img src="assets/avatar.png" alt="AI Subtitle Refine Video Pro Logo" width="180" style="border-radius: 50%; margin-bottom: 20px;">
  
  # AI-SUBTITLE-REFINE-VIDEO-PRO 🚀

  **AI-Powered Subtitle Refinement Tool**  
  Whisper + NLP + LLM + GraphQL API = Perfect, Natural & Professional Subtitles

  Transform raw, robotic subtitles into **human-like, context-aware, emotionally intelligent** subtitles automatically!

</div>

<br>

> Note: I've suggested clearer image names and expanded the Project Flow below. If you want, I can rename the uploaded screenshots in the repo (commands provided further down).

## 🔥 Why This Project is Special
Most AI subtitle tools stop at transcription...  
**We go 3 steps ahead**:
- Whisper → Accurate transcription
- NLP → Grammar, timing & readability fix
- **LLM Magic** → Natural language, slang, emotions, context understanding, filler word removal

Result? Subtitles jo real insaan ne likhe lagein! 🔥

## 🎯 Features
- 🎤 **Whisper-based** high-accuracy speech-to-text
- 🧠 **LLM-powered** smart refinement (better than basic spell-check!)
- 🌐 **GraphQL API** – Easy integration with any frontend/app
- ⏱️ Timing correction & sentence merging/splitting
- 🌍 Multi-language support (extendable)
- ⚡ Fast processing with clean output (.srt, .vtt, etc.)

## Project Flow — Detailed, step-by-step (Complete explanation)
Below is a clear, end-to-end flow so contributors and integrators understand exactly what happens and where to extend functionality.

1. Video Input (Uploader / Frontend)
   - User uploads a video file (.mp4, .mov, etc.) or provides a public URL.
   - Frontend sends file or URL to backend GraphQL API (multipart upload or presigned URL).

2. Pre-processing
   - Audio extraction from video (ffmpeg).
   - Normalize audio (resample, mono, adjust levels) to improve ASR accuracy.
   - Optional: noise reduction / voice enhancement.

3. Whisper Transcription (ASR)
   - Whisper model performs speech-to-text and returns raw segments with timestamps.
   - Output format: raw SRT or JSON segments (text, start, end, confidence).

4. Baseline Post-processing (NLP)
   - Punctuation restoration, capitalization, and basic grammar fixes.
   - Merge or split segments for readability (avoid too-short/long caption lines).
   - Remove obvious duplications and fix timestamps small offsets (smoothing).

5. LLM Refinement (Context-aware)
   - LLM receives segment context (neighboring sentences + speaker metadata if available).
   - Tasks performed:
     - Replace robotic phrases with natural language.
     - Remove filler words (uh, um) or convert them per user preference (keep/trim).
     - Apply tone adjustments (formal, casual) or localization (slang, regional phrasing).
     - Preserve technical terms / names (optionally provide a glossary).
   - Output: refined text per segment.

6. Timing Correction & Reflow
   - Recalculate start/end times when segments merged or split.
   - Enforce max characters per line and maximum reading speed (chars/sec) rules.
   - Generate final SRT/VTT/WebVTT with correct cues.

7. Quality Checks & Metrics
   - Confidence thresholds for manual review flags.
   - Readability score (optional).
   - Estimate watch/read speed and warn if subtitles may be too fast.

8. Export / Delivery
   - Provide downloadable .srt, .vtt, and plain transcript.
   - Optionally embed burnt-in subtitles into video (ffmpeg).
   - Expose GraphQL queries/mutations for status, results, and metadata.

9. Integrations & Extensibility
   - Webhook or polling for job completion.
   - Language packs, glossary upload, custom LLM prompts and presets.
   - Batch processing, user profiles, and role-based review steps.

Visual flow (assets/flowchart.svg)
- Recommended: a simple left-to-right flowchart image that maps the steps above (Input → Preprocess → Whisper → NLP → LLM → Timing → Export).
- I referenced `assets/flowchart.svg` in this README; include a clean SVG showing those boxes with arrows and short notes.

## Real Result – Before vs After

Here are the screenshots that show the raw Whisper output vs our refined result.

<div align="center">
  <img src="assets/screenshot-before.png" alt="Before - Raw Whisper output" width="420" style="border: 2px solid #333; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.15);">
  <img src="assets/screenshot-after.png" alt="After - AI Refinement result" width="420" style="border: 2px solid #333; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.15);">
  <br><br>
  <strong>Left = Raw Whisper output • Right = After our AI refinement</strong>
</div>

## 🚀 Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/Sakshi983-cmd/AI-SUBTITLE-REFINE-VIDEO-PRO.git
   cd AI-SUBTITLE-REFINE-VIDEO-PRO
   ```

2. Install dependencies, set API keys (Whisper / LLM), etc. (See docs in /docs or create .env with keys).

3. Run local server and upload a test video.

## Suggested image renames (I recommend these names for clarity)
You uploaded:
- Screenshot 2026-01-18 194916.png
- Screenshot 2026-01-18 201816.png

Suggested repository names:
- assets/screenshot-before.png
- assets/screenshot-after.png

To rename locally and push:
```bash
git mv "assets/Screenshot 2026-01-18 194916.png" assets/screenshot-before.png
git mv "assets/Screenshot 2026-01-18 201816.png" assets/screenshot-after.png
git add README.md
git commit -m "README: improve flow explanation; rename screenshots to screenshot-before/after"
git push origin main
```

If you want, I can:
- Prepare a commit/PR that updates README.md and renames the files for you, or
- Just give the updated README and the exact git commands (above) so you can apply them.

Thanks — batao main kaunsi option karu: khud commit/PR banaun ya tum locally karna chahoge?
