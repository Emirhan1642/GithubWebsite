import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Vercel Analytics & Speed Insights
inject();
injectSpeedInsights();

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

// --- i18n Translation System ---
const translations = {
  en: {
    title_portfolio: 'Emirhan | Portfolio',
    hero_title: 'Crafting <span class="highlight">Digital</span> Experiences',
    hero_subtitle: 'Building robust and scalable solutions. Showcasing my private workspace projects powered by static build architecture.',
    tab_code_text: 'Code Projects',
    tab_designs_text: 'UI Designs',
    tab_models_text: '3D Models',
    tab_about_text: 'About Me',
    loading_projects: 'Loading projects...',
    loading_designs: 'Loading designs...',
    loading_models: 'Loading models...',
    profile_tagline: 'Software Developer & 3D Artist',
    status_open: 'Open for freelance work',
    detail_born: 'Born: 10/12/2008',
    detail_age: 'Age: 17',
    detail_location: 'Location: Türkiye/Bursa',
    download_cv: 'Download CV',
    about_me_title: 'About Me',
    about_me_text: 'Hello! I am Emirhan, a passionate software developer and 3D artist. I specialize in building next-generation game engines, social networking platforms, and creating stylized 3D environments. Most recently, I have deeply embraced <strong>Vibe Coding</strong> an intuitive, flow-state approach to development where I orchestrate powerful AI tools (like Claude, Codex, and Antigravity) to rapidly prototype and build complex systems. This blend of cutting-edge AI assistance, robust programming expertise, and artistic vision allows me to create deeply immersive and highly optimized digital experiences at incredible speeds.',
    tech_tools_title: 'Technologies & Tools',
    languages_title: 'Languages',
    lang_tr: 'Turkish (Native)',
    lang_en: 'English (B1)',
    journey_title: 'My Journey',
    journey_6: 'Founded Nexus Studio',
    journey_5: 'Founded Linker',
    journey_4: 'Started Vibe Coding',
    journey_3: 'Mastered Blender & Substance Painter',
    journey_2: 'Developing Roblox Games',
    journey_1: 'Started Programming',
    github_title: 'GitHub Contributions',
    get_in_touch_title: 'Get In Touch',
    form_name: 'Name',
    form_email: 'Email',
    form_message: 'Message',
    form_send: 'Send Message',
    footer_text: '&copy; 2026 Emirhan. Built with ❤️ and Vite.'
  },
  tr: {
    title_portfolio: 'Emirhan | Portfolyo',
    hero_title: '<span class="highlight">Dijital</span> Deneyimler Üretmek',
    hero_subtitle: 'Sağlam ve ölçeklenebilir çözümler geliştiriyorum. Statik derleme mimarisiyle güçlendirilmiş özel çalışma alanı projelerimi sergiliyorum.',
    tab_code_text: 'Kod Projeleri',
    tab_designs_text: 'UI Tasarımları',
    tab_models_text: '3D Modeller',
    tab_about_text: 'Hakkımda',
    loading_projects: 'Projeler yükleniyor...',
    loading_designs: 'Tasarımlar yükleniyor...',
    loading_models: 'Modeller yükleniyor...',
    profile_tagline: 'Yazılım Geliştirici & 3D Sanatçısı',
    status_open: 'Freelance işlere açık',
    detail_born: 'Doğum: 10/12/2008',
    detail_age: 'Yaş: 17',
    detail_location: 'Konum: Türkiye/Bursa',
    download_cv: 'CV İndir',
    about_me_title: 'Hakkımda',
    about_me_text: 'Merhaba! Ben Emirhan, tutkulu bir yazılım geliştiricisi ve 3D sanatçısıyım. Yeni nesil oyun motorları, sosyal ağ platformları inşa etme ve stilize 3D ortamlar yaratma konularında uzmanlaşıyorum. Son zamanlarda, güçlü yapay zeka araçlarını (Claude, Codex, Antigravity vb.) orkestra ederek karmaşık sistemleri hızla prototiplemek ve inşa etmek için sezgisel, akış durumuna dayalı bir yaklaşım olan <strong>Vibe Coding</strong>\'i derinlemesine benimsedim. En yeni yapay zeka yardımı, güçlü programlama uzmanlığı ve sanatsal vizyonun bu karışımı, inanılmaz hızlarda son derece sürükleyici ve son derece optimize edilmiş dijital deneyimler yaratmamı sağlıyor.',
    tech_tools_title: 'Teknolojiler & Araçlar',
    languages_title: 'Diller',
    lang_tr: 'Türkçe (Anadil)',
    lang_en: 'İngilizce (B1)',
    journey_title: 'Serüvenim',
    journey_6: 'Nexus Studio\'yu Kurdu',
    journey_5: 'Linker\'ı Kurdu',
    journey_4: 'Vibe Coding\'e Başladı',
    journey_3: 'Blender & Substance Painter\'da Uzmanlaştı',
    journey_2: 'Roblox Oyunları Geliştiriyor',
    journey_1: 'Programlamaya Başladı',
    github_title: 'GitHub Katkıları',
    get_in_touch_title: 'İletişime Geç',
    form_name: 'İsim',
    form_email: 'E-posta',
    form_message: 'Mesaj',
    form_send: 'Mesaj Gönder',
    footer_text: '&copy; 2026 Emirhan. ❤️ ve Vite ile geliştirildi.'
  }
};

let currentLang = localStorage.getItem('lang') || 'en';
const langToggleBtn = document.getElementById('lang-toggle');

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  if (langToggleBtn) {
    langToggleBtn.textContent = lang.toUpperCase();
  }
  
  document.title = translations[lang].title_portfolio;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const cvLink = document.getElementById('cv-link');
  if (cvLink) {
    cvLink.href = lang === 'tr' ? '/resume-tr.pdf' : '/resume.pdf';
  }
  
  // Re-render dynamic content when language changes
  // Check if grid exists to avoid issues before DOM load
  if (document.getElementById('projects-grid')) {
    initProjects();
    initDesigns();
    initModels();
  }
}

if (langToggleBtn) {
  langToggleBtn.textContent = currentLang.toUpperCase();
  langToggleBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'tr' : 'en');
  });
}
// ------------------------------

// Calculate "time ago" string
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + (currentLang === 'tr' ? ' yıl önce' : ' years ago');
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + (currentLang === 'tr' ? ' ay önce' : ' months ago');
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + (currentLang === 'tr' ? ' gün önce' : ' days ago');
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + (currentLang === 'tr' ? ' saat önce' : ' hours ago');
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + (currentLang === 'tr' ? ' dakika önce' : ' minutes ago');
  return Math.floor(seconds) + (currentLang === 'tr' ? ' saniye önce' : ' seconds ago');
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
  const filtersContainer = document.getElementById('project-filters');
  
  try {
    const response = await fetch('/projects_data.json');
    if (!response.ok) throw new Error('Could not load projects data.');
    
    const projects = await response.json();
    if (projects.length === 0) {
      grid.innerHTML = '<div class="loading-state" data-i18n="loading_projects">' + translations[currentLang].loading_projects + '</div>';
      return;
    }
    grid.innerHTML = '';
    
    // Collect all unique languages
    const uniqueLangs = new Set();
    
    projects.forEach((project, index) => {
      // Gather languages for this project
      let projectLangs = [];
      if (project.allLanguages && project.allLanguages.length > 0) {
        projectLangs = project.allLanguages;
      } else if (project.language) {
        projectLangs = [project.language];
      }
      projectLangs.forEach(l => uniqueLangs.add(l));
      
      const isClickable = !project.isPrivate && project.url;
      const card = document.createElement(isClickable ? 'a' : 'div');
      card.className = `project-card animate-in ${isClickable ? 'is-public' : 'is-private'}`;
      card.style.animationDelay = `${index * 0.15}s`;
      card.setAttribute('data-lang', projectLangs.join(',').toLowerCase());
      
      if (isClickable) {
        card.href = project.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }

      const projectDescriptionsTR = {
        "Nexus-Plugin": "BYOK mimarisi üzerinde çalışan, Roblox Studio için kapsamlı bir eklenti. Tam Studio erişimi sağlayarak geliştiricilerin tek bir parçayı bile manuel olarak yerleştirmeden eksiksiz oyunlar geliştirmesine olanak tanır. Studio-MCP ile entegre çalışır, özel araçlar kullanır ve performansı en üst düzeye çıkarmak için özelleşmiş yetenek (skill) dosyaları içerir.",
        "Nexus-Studio": "C# ve Luau'yu destekleyen yeni nesil, Vibe Coding tabanlı oyun motoru editörü. Tamamen sıfırdan tasarlanmış olup modern geliştiriciler için hafif performans ile yüksek kalitenin en üst düzeydeki kesişimini sunar.",
        "Linker": "Çevrimdışı iletişim için tasarlanmış çok işlevli sosyal ağ platformu. Özel mesh ve çok atlamalı (multi-hop) ağ mimarisi sayesinde internet erişimi olmadan kesintisiz mesaj ve içerik iletimi sağlar. Akış, hikayeler ve notlar özelliklerini destekler."
      };
      
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
              <div class="terminal-title">${currentLang === 'tr' ? 'Son Commitler' : 'Recent Commits'}</div>
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

      let langsHtml = '';
      if (projectLangs.length > 0) {
        langsHtml = projectLangs.map(lang => `
          <div class="stat-item">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${getLanguageColor(lang)}"></span> ${lang}
          </div>
        `).join('');
      }

      card.innerHTML = `
        <div class="card-top">
          <div class="project-icon-wrapper">
            ${getRepoIcon(project.name, project.language)}
          </div>
          <div class="project-info">
            <div class="project-header-row">
              <h4 class="project-title">${project.displayName}</h4>
              <div class="time-ago">${currentLang === 'tr' ? 'Güncellendi:' : 'Updated:'} ${timeAgo(project.pushedAt)}</div>
            </div>
            
            <div style="margin-bottom: 12px;">
              <span class="privacy-badge ${project.isPrivate ? 'private' : 'public'}">
                ${project.isPrivate ? (currentLang === 'tr' ? '🔒 Gizli' : '🔒 Private') : (currentLang === 'tr' ? '🌐 Herkese Açık' : '🌐 Public')}
              </span>
            </div>
            
            <p class="project-desc">${currentLang === 'tr' && projectDescriptionsTR[project.name] ? projectDescriptionsTR[project.name] : project.description}</p>
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
    
    // Create filters
    if (filtersContainer && uniqueLangs.size > 0) {
      const allLangs = Array.from(uniqueLangs).sort();
      const allText = currentLang === 'tr' ? 'Tümü' : 'All';
      let filterHTML = `<button class="filter-btn active" data-filter="all">${allText}</button>`;
      allLangs.forEach(lang => {
        filterHTML += `<button class="filter-btn" data-filter="${lang.toLowerCase()}">${lang}</button>`;
      });
      filtersContainer.innerHTML = filterHTML;
      
      const filterBtns = filtersContainer.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const filter = btn.getAttribute('data-filter');
          const cards = grid.querySelectorAll('.project-card');
          
          cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-lang').includes(filter)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
    
  } catch (error) {
    console.error('Error rendering projects:', error);
    grid.innerHTML = '<div class="loading-state" style="color: #ef4444;">Failed to load projects. Ensure prebuild script ran successfully.</div>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initProjects();
  initTabs();
  initDesigns();
  initLightbox();
  initModels();
  init3DLightbox();
  initContactForm();
  initHorizontalScroll();
  initScrollTop();
});

// Interactive Mouse Glow (Dynamic Background)
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Tab Switching Logic
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and target content
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      // Remove animation class, trigger reflow, and add back for smooth transition
      targetElement.classList.remove('fade-in');
      void targetElement.offsetWidth; // trigger reflow
      
      targetElement.classList.add('active', 'fade-in');
    });
  });
}

// Render UI Designs
async function initDesigns() {
  const grid = document.getElementById('designs-grid');
  
  try {
    const response = await fetch('/designs_data.json');
    if (!response.ok) throw new Error('Could not load designs data.');
    
    const designs = await response.json();
    if (designs.length === 0) {
      grid.innerHTML = '<div class="loading-state">No designs found.</div>';
      return;
    }
    grid.innerHTML = '';
    
    designs.forEach((design, index) => {
      const designContainer = document.createElement('div');
      designContainer.className = 'design-project animate-in';
      designContainer.style.animationDelay = (index * 0.2) + 's';
      
      const imagesHtml = design.images.map(img => 
        `<div class="design-image-wrapper" onclick="openLightbox('${img}')"><img src="${img}" alt="${design.title} Screenshot" loading="lazy"></div>`
      ).join('');

      const title = currentLang === 'tr' && design.title_tr ? design.title_tr : design.title;
      const desc = currentLang === 'tr' && design.description_tr ? design.description_tr : design.description;

      designContainer.innerHTML = `
        <div class="design-header">
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
        <div class="gallery-wrapper">
          <button class="gallery-nav-btn prev-btn" aria-label="Previous image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div class="design-gallery">
            ${imagesHtml}
          </div>
          <button class="gallery-nav-btn next-btn" aria-label="Next image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      `;
      
      grid.appendChild(designContainer);

      // Add navigation interactions
      const gallery = designContainer.querySelector('.design-gallery');
      const prevBtn = designContainer.querySelector('.prev-btn');
      const nextBtn = designContainer.querySelector('.next-btn');
      
      if (prevBtn && nextBtn && gallery) {
        const getItems = () => Array.from(gallery.querySelectorAll('.design-image-wrapper'));

        prevBtn.addEventListener('click', () => {
          const items = getItems();
          if (items.length === 0) return;
          const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
          
          let currentIndex = items.findIndex(item => {
            const itemCenter = item.offsetLeft - gallery.offsetLeft + item.clientWidth / 2;
            return itemCenter >= galleryCenter - 10; // -10 for floating point leniency
          });
          
          if (currentIndex > 0) {
            items[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        });

        nextBtn.addEventListener('click', () => {
          const items = getItems();
          if (items.length === 0) return;
          const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
          
          let currentIndex = items.findIndex(item => {
            const itemCenter = item.offsetLeft - gallery.offsetLeft + item.clientWidth / 2;
            return itemCenter > galleryCenter + 10;
          });
          
          if (currentIndex !== -1) {
            items[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else if (items.length > 0) {
            items[items.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        });
      }

      // Highlight centered item logic
      const updateHighlight = () => {
        const items = Array.from(gallery.querySelectorAll('.design-image-wrapper'));
        if (items.length === 0) return;
        
        const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
        let closestItem = null;
        let minDistance = Infinity;
        
        items.forEach(item => {
          const itemCenter = item.offsetLeft - gallery.offsetLeft + item.clientWidth / 2;
          const distance = Math.abs(itemCenter - galleryCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestItem = item;
          }
          item.classList.remove('highlighted');
        });
        
        if (closestItem) {
          closestItem.classList.add('highlighted');
        }
      };

      gallery.addEventListener('scroll', updateHighlight);
      // Run once initially to highlight the first item (with a slight delay to allow rendering)
      setTimeout(updateHighlight, 100);
    });
  } catch (error) {
    console.error('Error rendering designs:', error);
    grid.innerHTML = '<div class="loading-state" style="color: #ef4444;">Failed to load designs data.</div>';
  }
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function initLightbox() {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Global function to be called from onclick
window.openLightbox = function(imgSrc) {
  lightboxImg.src = imgSrc;
  lightbox.classList.add('active');
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden'; 
};

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '0px';
  setTimeout(() => {
    lightboxImg.src = '';
  }, 400);
}

// Render 3D Models
async function initModels() {
  const grid = document.getElementById('models-grid');
  
  try {
    const response = await fetch('/models_data.json');
    if (!response.ok) throw new Error('Could not load models data.');
    
    const models = await response.json();
    if (models.length === 0) {
      grid.innerHTML = '<div class="loading-state">No models found.</div>';
      return;
    }
    grid.innerHTML = '';
    
    models.forEach((model, index) => {
      const modelContainer = document.createElement('div');
      modelContainer.className = 'model-card animate-in';
      modelContainer.style.animationDelay = (index * 0.2) + 's';
      
      const title = currentLang === 'tr' && model.title_tr ? model.title_tr : model.title;
      const desc = currentLang === 'tr' && model.description_tr ? model.description_tr : model.description;

      modelContainer.innerHTML = `
        <div class="model-image-wrapper" onclick="open3DLightbox('${model.model}')">
          <model-viewer src="${model.model}" auto-rotate rotation-per-second="30deg" alt="3D Model Thumbnail" shadow-intensity="1" style="width: 100%; height: 100%; pointer-events: none; --poster-color: transparent;"></model-viewer>
          <div class="model-3d-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
        </div>
        <div class="design-header">
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
      `;
      
      grid.appendChild(modelContainer);
    });
  } catch (error) {
    console.error('Error rendering models:', error);
    grid.innerHTML = '<div class="loading-state" style="color: #ef4444;">Failed to load models data.</div>';
  }
}

// 3D Lightbox Logic
const lightbox3d = document.getElementById('lightbox-3d');
const lightbox3dClose = document.getElementById('lightbox-3d-close');
const modelViewerElement = document.getElementById('model-viewer-element');

function init3DLightbox() {
  lightbox3dClose.addEventListener('click', close3DLightbox);
  lightbox3d.addEventListener('click', (e) => {
    if (e.target === lightbox3d) {
      close3DLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox3d.classList.contains('active')) {
      close3DLightbox();
    }
  });
}

window.open3DLightbox = function(modelSrc) {
  modelViewerElement.src = modelSrc;
  lightbox3d.classList.add('active');
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden';
};

function close3DLightbox() {
  lightbox3d.classList.remove('active');
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '0px';
  setTimeout(() => {
    modelViewerElement.src = '';
  }, 400);
}

// AJAX Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('submit-btn-text');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalText = btnText.innerHTML;
      btnText.innerHTML = currentLang === 'tr' ? 'Gönderiliyor...' : 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          btnText.innerHTML = currentLang === 'tr' ? 'Başarıyla Gönderildi ✅' : 'Sent Successfully ✅';
          form.reset();
          setTimeout(() => {
            btnText.innerHTML = translations[currentLang].form_send;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
          }, 3000);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        btnText.innerHTML = currentLang === 'tr' ? 'Hata Oluştu ❌' : 'Error Occurred ❌';
        setTimeout(() => {
          btnText.innerHTML = translations[currentLang].form_send;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }, 3000);
      }
    });
  }
}

// Horizontal Scroll for UI Designs
function initHorizontalScroll() {
  const galleries = document.querySelectorAll('.design-gallery');
  galleries.forEach(gallery => {
    gallery.addEventListener('wheel', (evt) => {
      if (evt.deltaY !== 0 && Math.abs(evt.deltaY) > Math.abs(evt.deltaX)) {
        evt.preventDefault();
        gallery.scrollLeft += evt.deltaY;
      }
    });
  });
}

// Scroll to Top Button
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top');
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
