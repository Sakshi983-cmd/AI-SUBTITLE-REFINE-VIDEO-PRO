const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type SubtitleSegment {
    startTime: Float!
    endTime: Float!
    text: String!
  }

  type DetectedContext {
    isTechTutorial: Boolean!
    isEducational: Boolean!
    isComedy: Boolean!
    isProfessional: Boolean!
    language: String!
  }

  type RefinedSubtitles {
    original: String!
    refined: String!
    segments: [SubtitleSegment!]!
    contextUsed: String!
    detectedContext: DetectedContext!
    suggestedContext: String!
    improvements: [String!]!
    qualityScore: Float!
    qualityLabel: String!
    processingTime: Float!
  }

  type LLMModel {
    name: String!
    id: String!
    description: String!
  }

  type Query {
    refineSubtitles(
      videoPath: String!
      contextPrompt: String!
      llmModel: String
    ): RefinedSubtitles!

    availableModels: [LLMModel!]!
  }
`;

module.exports = { typeDefs };
