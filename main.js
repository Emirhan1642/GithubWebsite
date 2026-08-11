// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Check for saved theme preference or system preference
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


// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get color for programming language
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

// Fetch and render projects
async function initProjects() {
  const grid = document.getElementById('projects-grid');
  
  try {
    // In production (static build), this JSON will be available at the root/public dir
    const response = await fetch('/projects_data.json');
    
    if (!response.ok) {
      throw new Error('Could not load projects data.');
    }
    
    const projects = await response.json();
    
    if (projects.length === 0) {
      grid.innerHTML = '<div class="loading-state">No projects found. Check the build logs.</div>';
      return;
    }
    
    grid.innerHTML = '';
    
    projects.forEach(project => {
      // Calculate how active it is (e.g., pushed in the last 30 days)
      const daysSincePush = (new Date() - new Date(project.pushedAt)) / (1000 * 60 * 60 * 24);
      const isVeryActive = daysSincePush < 30;
      
      const card = document.createElement('div');
      card.className = 'project-card';
      
      card.innerHTML = `
        <div class="project-header">
          <div class="project-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div class="project-status">
            ${isVeryActive ? '<span class="status-dot"></span> Active' : 'Archived / Stable'}
          </div>
        </div>
        <h4 class="project-title">${project.displayName}</h4>
        <p class="project-desc">${project.description}</p>
        
        <div class="project-footer">
          <div class="tech-stack">
            ${project.language ? `
              <span class="tech-dot" style="background-color: ${getLanguageColor(project.language)}"></span>
              <span class="tech-name">${project.language}</span>
            ` : '<span class="tech-name">Mixed</span>'}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary)">
            Updated: ${formatDate(project.pushedAt)}
          </div>
        </div>
      `;
      
      grid.appendChild(card);
    });
    
  } catch (error) {
    console.error('Error rendering projects:', error);
    grid.innerHTML = `
      <div class="loading-state" style="color: #ef4444;">
        <p>Failed to load projects data.</p>
        <p style="font-size: 0.9rem; margin-top: 10px;">If you are running this locally for the first time, run <code>npm run prebuild</code> first.</p>
      </div>
    `;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', initProjects);
