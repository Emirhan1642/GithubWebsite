import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'Emirhan1642';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Repositories, their custom display names and custom descriptions
// If you don't have a description on GitHub, it will use the one provided here.
const REPOS = {
  'Nexus-Studio': {
    name: 'Nexus Studio',
    desc: 'A next-generation, Vibe Coding-based game engine editor supporting C# and Luau. Designed entirely from scratch, it serves as the ultimate intersection of lightweight performance and premium quality for modern creators.'
  },
  'Nexus-Plugin': {
    name: 'Nexus Plugin',
    desc: 'A comprehensive plugin for Roblox Studio operating on a BYOK architecture. It provides full Studio access, enabling developers to build complete games without placing a single part manually. It integrates with Studio-MCP, utilizes custom tools, and features specialized skill files to maximize performance.'
  },
  'Linker': {
    name: 'Linker',
    desc: 'A multifunctional social networking platform designed for offline communication. Leveraging a custom mesh and multi-hop architecture, it ensures seamless message and content delivery without internet access. Supports feeds, stories, and notes.'
  }
};

async function fetchProjects() {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️ GITHUB_TOKEN is not defined! Make sure it is set in Vercel or your .env file.');
  }

  const projects = [];
  const headers = {
    'Authorization': GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  for (const [repoName, config] of Object.entries(REPOS)) {
    try {
      console.log(`Fetching data for ${repoName}...`);
      
      // Fetch Repo details
      const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, { headers });

      if (!repoRes.ok) {
        console.error(`❌ Failed to fetch ${repoName}: ${repoRes.status} ${repoRes.statusText}`);
        continue;
      }

      const data = await repoRes.json();
      
      // Fetch Languages
      let allLanguages = [];
      try {
        const langRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`, { headers });
        if (langRes.ok) {
          const langData = await langRes.json();
          // Returns object like { "C++": 1024, "JavaScript": 500 }
          allLanguages = Object.keys(langData); 
        }
      } catch (err) {
        console.error(`⚠️ Could not fetch languages for ${repoName}:`, err.message);
      }
      
      // Fetch recent commits (last 2)
      let recentCommits = [];
      try {
        const commitsRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=2`, { headers });
        if (commitsRes.ok) {
          const commitsData = await commitsRes.json();
          recentCommits = commitsData.map(c => ({
            message: c.commit.message.split('\n')[0], // Get only the first line of the message
            sha: c.sha.substring(0, 7),
            date: c.commit.author.date
          }));
        }
      } catch (err) {
        console.error(`⚠️ Could not fetch commits for ${repoName}:`, err.message);
      }
      
      projects.push({
        id: data.id,
        name: repoName,
        displayName: config.name,
        // Prioritize custom description over GitHub description
        description: config.desc || data.description,
        url: data.html_url,
        isPrivate: data.private,
        // Primary language
        language: data.language, 
        // Array of all languages used
        allLanguages: allLanguages, 
        topics: data.topics || [],
        stats: {
          stars: data.stargazers_count,
          forks: data.forks_count,
          watchers: data.watchers_count,
          issues: data.open_issues_count
        },
        commits: recentCommits,
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

  // Save to public directory
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.join(publicDir, 'projects_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`\n🎉 Successfully saved ${projects.length} projects to ${outputPath}`);
}

fetchProjects();
