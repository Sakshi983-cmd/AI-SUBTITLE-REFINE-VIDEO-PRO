const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Temp folder banao
const tempDir = path.join(__dirname, '../temp');
fs.ensureDirSync(tempDir);

app.get('/', (req, res) => {
  res.json({ 
    status: 'running',
    message: 'AI Subtitle Refiner API',
    endpoints: {
      graphql: '/graphql',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    formatError: (err) => {
      console.error('GraphQL Error:', err.message);
      return { message: err.message };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`\n🚀 Server Ready!`);
    console.log(`📊 GraphQL: http://localhost:${PORT}/graphql`);
    console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
  });
}

startServer().catch(err => {
  console.error('Failed to start:', err);
  process.exit(1);
});
