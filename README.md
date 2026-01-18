# AI-SUBTITLE-REFINE-VIDEO-PRO 🚀

**AI-Powered Subtitle Refinement Tool**  
Whisper + NLP + LLM + GraphQL API = Perfect, Natural & Professional Subtitles

Transform raw, robotic subtitles into **human-like, context-aware, emotionally intelligent** subtitles automatically!

---

> Note: I updated image links to use the screenshots currently in the `assets/` folder. To get nicer filenames (recommended), see the rename commands below.

## 🔥 Why This Project is Special
Most AI subtitle tools stop at transcription...  
**We go 3 steps ahead**:
- Whisper → Accurate transcription  
- NLP → Grammar, timing & readability fix  
- LLM Magic → Natural language, slang, emotions, context understanding, filler word removal

Result? Subtitles jo real insaan ne likhe lagein! 🔥

## 🎯 Features
- 🎤 Whisper-based high-accuracy speech-to-text  
- 🧠 LLM-powered smart refinement (better than basic spell-check!)  
- 🌐 GraphQL API – Easy integration with any frontend/app  
- ⏱️ Timing correction & sentence merging/splitting  
- 🌍 Multi-language support (extendable)  
- ⚡ Fast processing with clean output (.srt, .vtt, etc.)

## Project Flow — Detailed, step-by-step
1. Video Input (Uploader / Frontend)  
   - User uploads a video file (.mp4, .mov, etc.) or provides a public URL.  
   - Frontend sends file or URL to backend GraphQL API.

2. Pre-processing  
   - Audio extraction (ffmpeg), normalization, optional noise reduction.

3. Whisper Transcription (ASR)  
   - Whisper returns raw segments with timestamps (SRT or JSON).

4. Baseline Post-processing (NLP)  
   - Punctuation, capitalization, basic grammar fixes, segment merges/splits.

5. LLM Refinement (Context-aware)  
   - Remove fillers, adjust tone, preserve glossary terms, make subtitles natural.

6. Timing Correction & Reflow  
   - Recalculate timestamps, enforce chars/sec reading speed, output final SRT/VTT.

7. Quality Checks & Metrics  
   - Confidence flags, readability score, manual review suggestions.

8. Export / Delivery  
   - Downloadable .srt, .vtt, transcript, optional burnt-in subtitles.

## Visual / Before vs After

Left = Raw Whisper output • Right = After our AI refinement

![Before - Raw Whisper output](assets/Screenshot%202026-01-18%20194916.png)
![After - AI Refinement result](assets/Screenshot%202026-01-18%20201816.png)

---

## 🚀 Quick Start
```bash
git clone https://github.com/Sakshi983-cmd/AI-SUBTITLE-REFINE-VIDEO-PRO.git
cd AI-SUBTITLE-REFINE-VIDEO-PRO
# install deps, set API keys in .env, run server
```

## Recommended (clean) filenames
It's strongly recommended to rename those screenshots to simpler names so future references are easy. Suggested names:
- assets/screenshot-before.png
- assets/screenshot-after.png

To rename locally and push:
```bash
git mv "assets/Screenshot 2026-01-18 194916.png" assets/screenshot-before.png
git mv "assets/Screenshot 2026-01-18 201816.png" assets/screenshot-after.png
git add README.md
git commit -m "README: fix image links and rename screenshots for clarity"
git push origin main
```


## Project Flow — How It Works

```mermaid
flowchart TD
    A[1. Video Input<br>Upload .mp4 / URL] --> B[2. Pre-processing<br>Audio Extract + Normalize<br>ffmpeg]
    B --> C[3. Whisper Transcription<br>ASR → Raw Segments + Timestamps]
    C --> D[4. NLP Baseline Fix<br>Punctuation, Capitalization<br>Basic Grammar + Merge/Split]
    D --> E[5. LLM Smart Refinement<br>Remove fillers<br>Natural language, tone, emotion<br>Context aware rewriting]
    E --> F[6. Timing Correction<br>Chars/sec limit<br>Read speed optimization<br>Final timestamp reflow]
    F --> G[7. Quality Check<br>Confidence score<br>Readability metrics]
    G --> H[8. Export<br>Final .srt / .vtt<br>Burnt-in option<br>Download / API response]

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:3px,color:#000
    style H fill:#dfd,stroke:#333,stroke-width:2px

If you want, I can:
- Create a commit/PR that updates README.md and renames the files for you, or
- Just update README.md (no renames), whichever you prefer.

Batao kaunsa option chahiye — main khud commit kar doon ya tum locally karoge?
