import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'Emirhan1642';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Repositories and their custom display names
const REPOS = {
  'Nexus-Studio': 'Nexus Studio',
  'Nexus-Plugin': 'Nexus Plugin',
  'Linker': 'Linker',
  'Studio': 'Studio Core',
  'Roblox-Project': 'Roblox Experience'
};

async function fetchProjects() {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️ GITHUB_TOKEN is not defined! Make sure it is set in Vercel or your .env file.');
  }

  const projects = [];

  for (const [repoName, displayName] of Object.entries(REPOS)) {
    try {
      console.log(`Fetching data for ${repoName}...`);
      const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
        headers: {
          'Authorization': GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) {
        console.error(`❌ Failed to fetch ${repoName}: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      
      projects.push({
        id: data.id,
        name: data.name,
        displayName: displayName,
        description: data.description || 'No description provided.',
        url: data.html_url, // URL to the repo (might be 404 for visitors if it's private, maybe we don't link it or link to a generic page)
        isPrivate: data.private,
        language: data.language,
        stars: data.stargazers_count,
        createdAt: data.created_at,
        pushedAt: data.pushed_at
      });
      console.log(`✅ Successfully fetched ${repoName}`);
    } catch (error) {
      console.error(`❌ Error fetching ${repoName}:`, error);
    }
  }

  // Sort projects by pushed_at descending (most recently active first)
  projects.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

  // Save to public directory so it can be fetched by the frontend
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.join(publicDir, 'projects_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`\n🎉 Successfully saved ${projects.length} projects to ${outputPath}`);
}

fetchProjects();
