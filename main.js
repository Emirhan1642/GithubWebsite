// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
} else {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  htmlEl.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Calculate "time ago" string in English
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return Math.floor(seconds) + ' seconds ago';
}

// Map repo names to specific SVG icons
function getRepoIcon(repoName, language) {
  if (repoName.toLowerCase().includes('studio') || repoName.toLowerCase().includes('roblox')) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`; 
  }
  if (repoName.toLowerCase().includes('linker') || repoName.toLowerCase().includes('api')) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`; 
  }
  if (repoName.toLowerCase().includes('plugin')) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`; 
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
}

// Color coding for languages
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'C++': '#f34b7d',
    'C#': '#178600',
    'Lua': '#000080',
    'HTML': '#e34c26',
    'CSS': '#563d7c'
  };
  return colors[language] || '#b829ff';
}

// Render projects dynamically
async function initProjects() {
  const grid = document.getElementById('projects-grid');
  
  try {
    const response = await fetch('/projects_data.json');
    if (!response.ok) throw new Error('Could not load projects data.');
    
    const projects = await response.json();
    if (projects.length === 0) {
      grid.innerHTML = '<div class="loading-state">No projects found.</div>';
      return;
    }
    grid.innerHTML = '';
    
    projects.forEach((project, index) => {
      // Create element (Anchor tag if public, Div if private)
      const isClickable = !project.isPrivate && project.url;
      const card = document.createElement(isClickable ? 'a' : 'div');
      
      // Add animate-in class and stagger the animation delay
      card.className = `project-card animate-in ${isClickable ? 'is-public' : 'is-private'}`;
      card.style.animationDelay = `${index * 0.15}s`;
      
      if (isClickable) {
        card.href = project.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }

      // Generate HTML pieces
      const topicsHtml = project.topics && project.topics.length > 0 
        ? `<div class="topics-container">${project.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>`
        : '';
        
      const commitsHtml = project.commits && project.commits.length > 0
        ? `
          <div class="commit-terminal">
            <div class="terminal-header">
              <div class="terminal-dot dot-red"></div>
              <div class="terminal-dot dot-yellow"></div>
              <div class="terminal-dot dot-green"></div>
              <div class="terminal-title">Recent Commits</div>
            </div>
            <div class="commit-list">
              ${project.commits.map(c => `
                <div class="commit-item">
                  <span class="commit-sha">${c.sha}</span>
                  <span class="commit-msg">${c.message}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '';

      // Languages HTML (use allLanguages if available, else fallback to primary language)
      let langsHtml = '';
      if (project.allLanguages && project.allLanguages.length > 0) {
        langsHtml = project.allLanguages.map(lang => `
          <div class="stat-item">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${getLanguageColor(lang)}"></span> ${lang}
          </div>
        `).join('');
      } else if (project.language) {
        langsHtml = `<div class="stat-item"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${getLanguageColor(project.language)}"></span> ${project.language}</div>`;
      }

      card.innerHTML = `
        <div class="card-top">
          <div class="project-icon-wrapper">
            ${getRepoIcon(project.name, project.language)}
          </div>
          <div class="project-info">
            <div class="project-header-row">
              <h4 class="project-title">${project.displayName}</h4>
              <div class="time-ago">Updated: ${timeAgo(project.pushedAt)}</div>
            </div>
            
            <div style="margin-bottom: 12px;">
              <span class="privacy-badge ${project.isPrivate ? 'private' : 'public'}">
                ${project.isPrivate ? '🔒 Private' : '🌐 Public'}
              </span>
            </div>
            
            <p class="project-desc">${project.description}</p>
            ${topicsHtml}
            
            <div class="stats-row">
              ${langsHtml}
              <div class="stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${project.stats.stars}
              </div>
              <div class="stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                ${project.stats.watchers}
              </div>
              <div class="stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                ${project.stats.forks}
              </div>
            </div>
          </div>
        </div>
        ${commitsHtml}
      `;
      
      grid.appendChild(card);
    });
    
  } catch (error) {
    console.error('Error rendering projects:', error);
    grid.innerHTML = '<div class="loading-state" style="color: #ef4444;">Failed to load projects. Ensure prebuild script ran successfully.</div>';
  }
}

document.addEventListener('DOMContentLoaded', initProjects);
