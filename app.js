// Portfolio Application - Main JavaScript File
 
function initGlobal() {
  const profile = portfolioData?.profile || {};
  
  // Update page title
  if (profile.name) {
    document.title = `${profile.name} | ${profile.title || 'Portfolio'}`;
  }
  
  // Update meta tags
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', `${profile.name || 'Developer'} - ${profile.title || ''} Portfolio`);
  
  const metaAuthor = document.querySelector('meta[name="author"]');
  if (metaAuthor) metaAuthor.setAttribute('content', profile.name || 'Developer');
  
  // Update logo initials
  const logoInitials = document.getElementById('logoInitials');
  if (logoInitials && profile.name) {
    const initials = profile.name.split(' ').map(n => n[0]).join('');
    logoInitials.textContent = initials;
  }
}

// Utility to get icon HTML
function getIconHTML(iconName, className = 'icon') {
  const socialIcons = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  };

  if (socialIcons[iconName]) {
    return socialIcons[iconName];
  }
  return `<i data-lucide="${iconName}" class="${className}"></i>`;
}


// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  const navLinks = document.getElementById('navLinks');
  const mobileNavLinks = document.getElementById('mobileNavLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navbar = document.getElementById('navbar');

  if (!navLinks || !mobileNavLinks || !portfolioData?.navLinks) return;

  // Render navigation links
  portfolioData.navLinks.forEach(link => {
    // Check if the section exists in DOM before adding link
    const sectionId = link.href.replace('#', '');
    if (sectionId && sectionId !== '' && !document.getElementById(sectionId)) return;

    // Desktop nav
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    li.appendChild(a);
    navLinks.appendChild(li);

    // Mobile nav
    const mobileA = document.createElement('a');
    mobileA.href = link.href;
    mobileA.innerHTML = `<span></span>${link.label}`;
    if (mobileMenu) {
      mobileA.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    }
    mobileNavLinks.appendChild(mobileA);
  });

  // Mobile toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active section highlighting
  const sections = portfolioData.navLinks.map(l => l.href.replace('#', '')).filter(id => id);
  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
}

// ============================================
// HERO SECTION
// ============================================

function initHero() {
  const profile = portfolioData?.profile;
  if (!profile) return;
  
  const elements = {
    heroName: document.getElementById('heroName'),
    heroRole: document.getElementById('heroRole'),
    heroBio: document.getElementById('heroBio'),
    heroLocation: document.getElementById('heroLocation'),
    heroSocials: document.getElementById('heroSocials')
  };

  if (elements.heroName) elements.heroName.textContent = profile.name || '';
  if (elements.heroRole) elements.heroRole.textContent = profile.title || '';
  if (elements.heroBio) elements.heroBio.textContent = profile.bio || '';
  if (elements.heroLocation) {
    if (profile.location) {
      elements.heroLocation.textContent = profile.location;
    } else {
      elements.heroLocation.parentElement.style.display = 'none';
    }
  }

  // Social links
  if (elements.heroSocials) {
    const socialLinks = [
      { icon: 'github', href: profile.github, label: 'GitHub' },
      { icon: 'linkedin', href: profile.linkedin, label: 'LinkedIn' },
      { icon: 'mail', href: profile.email ? `mailto:${profile.email}` : null, label: 'Email' }
    ].filter(s => s.href);

    socialLinks.forEach(social => {
      const a = document.createElement('a');
      a.href = social.href;
      a.className = 'social-link';
      a.setAttribute('aria-label', social.label);
      if (social.href.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = getIconHTML(social.icon);
      elements.heroSocials.appendChild(a);
    });
  }
}

// ============================================
// ABOUT SECTION
// ============================================

function initAbout() {
  const { profile, education, certifications } = portfolioData || {};
  const aboutContent = document.getElementById('aboutContent');
  const aboutSection = document.getElementById('about');

  if (!aboutContent) return;
  if (!profile && !education && (!certifications || certifications.length === 0)) {
    if (aboutSection) aboutSection.style.display = 'none';
    return;
  }

  const highlights = [
    { icon: 'cloud', label: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD' },
    { icon: 'users', label: 'Community Leader', desc: 'AWS Cloud Club Captain' },
    { icon: 'star', label: 'Open Source', desc: 'GSSoC \'24 Contributor' }
  ];

  let html = '';

  if (profile?.bio || profile?.bioExtended) {
    html += `
      <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: 0.1s; margin-bottom: 1.5rem;">
        ${profile.bio ? `<p style="color: hsl(var(--foreground) / 0.9); line-height: 1.6; margin-bottom: 0.75rem;">${profile.bio}</p>` : ''}
        ${profile.bioExtended ? `<p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6;">${profile.bioExtended}</p>` : ''}
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid hsl(var(--border) / 0.4);">
          ${highlights.map(h => `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 2rem; height: 2rem; border-radius: 0.5rem; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary)); flex-shrink: 0;">
                <i data-lucide="${h.icon}" style="width: 0.875rem; height: 0.875rem;"></i>
              </div>
              <div>
                <p style="font-size: 0.75rem; font-weight: 600; color: hsl(var(--foreground));">${h.label}</p>
                <p style="font-size: 0.6875rem; color: hsl(var(--muted-foreground));">${h.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (education || (certifications && certifications.length > 0)) {
    html += `<div class="grid-2">`;
    
    if (education) {
      html += `
        <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: 0.2s;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.12); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary));">
              <i data-lucide="graduation-cap" style="width: 1.125rem; height: 1.125rem;"></i>
            </div>
            <h3 style="font-size: 1rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground));">Education</h3>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <p style="color: hsl(var(--foreground)); font-weight: 500; line-height: 1.4;">${education.degree || ''}</p>
            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${education.institution || ''}</p>
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding-top: 0.25rem;">
              <span style="display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.7);">
                <i data-lucide="calendar" style="width: 0.6875rem; height: 0.6875rem;"></i>
                ${education.period || ''}
              </span>
              ${education.cgpa ? `
              <span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.625rem; border-radius: 9999px; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); font-size: 0.75rem; color: hsl(var(--primary)); font-weight: 600;">
                <i data-lucide="star" style="width: 0.625rem; height: 0.625rem;"></i>
                CGPA ${education.cgpa}
              </span>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    if (certifications && certifications.length > 0) {
      html += `
        <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: 0.3s;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.12); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary));">
              <i data-lucide="award" style="width: 1.125rem; height: 1.125rem;"></i>
            </div>
            <h3 style="font-size: 1rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground));">Certifications</h3>
          </div>
          
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
            ${certifications.map((cert, i) => `
              <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: hsl(var(--muted-foreground)); opacity: 0; animation: fadeIn 0.3s ease forwards; animation-delay: ${0.3 + i * 0.08}s;">
                <span style="width: 1.25rem; height: 1.25rem; border-radius: 50%; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <span style="width: 0.375rem; height: 0.375rem; border-radius: 50%; background: hsl(var(--primary));"></span>
                </span>
                ${cert}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    html += `</div>`;
  }

  aboutContent.innerHTML = html;
}

// ============================================
// SKILLS SECTION
// ============================================

function initSkills() {
  const skills = portfolioData?.skills;
  const skillsContent = document.getElementById('skillsContent');
  const skillsSection = document.getElementById('skills');

  if (!skillsContent) return;
  if (!skills || Object.keys(skills).length === 0) {
    if (skillsSection) skillsSection.style.display = 'none';
    return;
  }

  const categories = Object.keys(skills);
  let activeFilter = 'All';

  const categoryMeta = {
    'Languages': { icon: 'code-2', color: 'hsl(45 93% 58%)', dot: 'hsl(45 93% 58%)' },
    'Frameworks': { icon: 'layers', color: 'hsl(217 91% 60%)', dot: 'hsl(217 91% 60%)' },
    'Databases': { icon: 'database', color: 'hsl(142 71% 45%)', dot: 'hsl(142 71% 45%)' },
    'Tools': { icon: 'wrench', color: 'hsl(271 76% 53%)', dot: 'hsl(271 76% 53%)' },
    'Cloud / DevOps': { icon: 'cloud', color: 'hsl(199 89% 48%)', dot: 'hsl(199 89% 48%)' },
    'Soft Skills': { icon: 'users', color: 'hsl(346 77% 50%)', dot: 'hsl(346 77% 50%)' }
  };

  function renderSkills() {
    const visibleCategories = activeFilter === 'All' ? categories : categories.filter(c => c === activeFilter);
    
    skillsContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${visibleCategories.map(category => {
          const items = skills[category];
          if (!items || items.length === 0) return '';
          const meta = categoryMeta[category] || { icon: 'code', color: 'hsl(var(--primary))', dot: 'hsl(var(--primary))' };
          
          return `
            <div>
              <div style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 1rem;">
                <div style="width: 1.5rem; height: 1.5rem; border-radius: 0.375rem; background: hsl(var(--secondary) / 0.6); border: 1px solid hsl(var(--border) / 0.6); display: flex; align-items: center; justify-content: center; color: ${meta.color};">
                  <i data-lucide="${meta.icon}" style="width: 0.75rem; height: 0.75rem;"></i>
                </div>
                <span style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: ${meta.color};">
                  ${category}
                </span>
                <div style="flex: 1; height: 1px; background: hsl(var(--border) / 0.4);"></div>
                <span style="font-size: 0.625rem; color: hsl(var(--muted-foreground) / 0.4);">${items.length}</span>
              </div>
              
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${items.map(skill => `
                  <span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border) / 0.6); background: hsl(var(--secondary) / 0.3); font-size: 0.75rem; font-weight: 500; color: hsl(var(--secondary-foreground)); transition: all 0.2s ease; cursor: default;">
                    <span style="width: 0.375rem; height: 0.375rem; border-radius: 50%; background: ${meta.dot}; opacity: 0.6;"></span>
                    ${skill}
                  </span>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    
    lucide.createIcons();
  }

  // Render filter tabs
  const skillsFilter = document.getElementById('skillsFilter');
  if (skillsFilter) {
    const tabs = ['All', ...categories];
    skillsFilter.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem;">
        ${tabs.map(tab => {
          const meta = tab !== 'All' ? categoryMeta[tab] : null;
          return `
            <button 
              class="skill-filter-btn ${tab === activeFilter ? 'active' : ''}" 
              data-filter="${tab}"
              style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; border: 1px solid; transition: all 0.25s ease; cursor: pointer; ${
                tab === activeFilter 
                  ? 'background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-color: hsl(var(--primary)); box-shadow: 0 0 14px hsl(38 95% 58% / 0.3);'
                  : 'background: hsl(var(--secondary) / 0.3); color: hsl(var(--muted-foreground)); border-color: hsl(var(--border) / 0.6);'
              }"
            >
              ${meta ? `<i data-lucide="${meta.icon}" style="width: 0.6875rem; height: 0.6875rem;"></i>` : ''}
              ${tab}
            </button>
          `;
        }).join('')}
      </div>
    `;

    document.querySelectorAll('.skill-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeFilter = e.currentTarget.dataset.filter;
        document.querySelectorAll('.skill-filter-btn').forEach(b => {
          if (b.dataset.filter === activeFilter) {
            b.style.background = 'hsl(var(--primary))';
            b.style.color = 'hsl(var(--primary-foreground))';
            b.style.borderColor = 'hsl(var(--primary))';
            b.style.boxShadow = '0 0 14px hsl(38 95% 58% / 0.3)';
          } else {
            b.style.background = 'hsl(var(--secondary) / 0.3)';
            b.style.color = 'hsl(var(--muted-foreground))';
            b.style.borderColor = 'hsl(var(--border) / 0.6)';
            b.style.boxShadow = 'none';
          }
        });
        renderSkills();
      });
    });
  }

  renderSkills();
}


// ============================================
// EXPERIENCE SECTION
// ============================================

function initExperience() {
  const experience = portfolioData?.experience;
  const experienceContent = document.getElementById('experienceContent');
  const experienceSection = document.getElementById('experience');

  if (!experienceContent) return;
  if (!experience || experience.length === 0) {
    if (experienceSection) experienceSection.style.display = 'none';
    return;
  }

  const typeConfig = {
    'internship': { label: 'Internship', icon: 'briefcase', color: 'hsl(45 93% 58%)', bg: 'hsl(45 93% 58% / 0.1)', border: 'hsl(45 93% 58% / 0.25)' },
    'leadership': { label: 'Leadership', icon: 'star', color: 'hsl(271 76% 53%)', bg: 'hsl(271 76% 53% / 0.1)', border: 'hsl(271 76% 53% / 0.25)' },
    'work': { label: 'Work', icon: 'code-2', color: 'hsl(217 91% 60%)', bg: 'hsl(217 91% 60% / 0.1)', border: 'hsl(217 91% 60% / 0.25)' },
    'opensource': { label: 'Open Source', icon: 'git-merge', color: 'hsl(142 71% 45%)', bg: 'hsl(142 71% 45% / 0.1)', border: 'hsl(142 71% 45% / 0.25)' }
  };

  experienceContent.innerHTML = `
    <div style="position: relative;">
      <div style="position: absolute; left: 1.25rem; top: 0.5rem; bottom: 0.5rem; width: 1px; background: linear-gradient(to bottom, hsl(38 95% 58% / 0.5), hsl(var(--border) / 0.4), transparent); display: none;" class="timeline-line"></div>
      
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${experience.map((exp, i) => {
          const type = exp.type || 'work';
          const config = typeConfig[type] || typeConfig['work'];
          
          return `
            <div class="glass-hover card-shine card animate-fade-up" style="animation-delay: ${i * 0.08}s; position: relative; padding-left: 0;">
              <div style="position: absolute; left: 0.875rem; top: 1.25rem; display: none;" class="timeline-dot">
                <div style="width: 0.75rem; height: 0.75rem; border-radius: 50%; background: hsl(38 95% 58% / 0.7); border: 2px solid hsl(var(--background)); transition: all 0.3s ease;"></div>
              </div>
              
              <div style="padding: 1rem 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                      <h3 style="font-size: 1rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground)); line-height: 1.3;">
                        ${exp.role || ''}
                      </h3>
                      <span style="display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.125rem 0.5rem; border-radius: 0.375rem; border: 1px solid ${config.border}; background: ${config.bg}; font-size: 0.625rem; font-weight: 600; letter-spacing: 0.05em; color: ${config.color};">
                        <i data-lucide="${config.icon}" style="width: 0.5625rem; height: 0.5625rem;"></i>
                        ${config.label}
                      </span>
                    </div>
                    <p style="color: hsl(var(--primary)); font-weight: 500; font-size: 0.875rem;">${exp.company || ''}</p>
                  </div>
                  ${exp.period ? `<span style="display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: 9999px; background: hsl(var(--secondary) / 0.6); border: 1px solid hsl(var(--border) / 0.6); font-size: 0.75rem; color: hsl(var(--muted-foreground)); align-self: flex-start;">
                    <i data-lucide="calendar" style="width: 0.625rem; height: 0.625rem;"></i>
                    ${exp.period}
                  </span>` : ''}
                </div>
                
                ${exp.highlights ? `<ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                  ${exp.highlights.map((item, j) => `
                    <li style="display: flex; align-items: start; gap: 0.75rem; font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6; opacity: 0; animation: fadeIn 0.3s ease forwards; animation-delay: ${i * 0.08 + j * 0.05 + 0.25}s;">
                      <span style="width: 0.375rem; height: 0.375rem; border-radius: 50%; background: hsl(38 95% 58% / 0.5); margin-top: 0.375rem; flex-shrink: 0;"></span>
                      ${item}
                    </li>
                  `).join('')}
                </ul>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Show timeline on desktop
  const timelineLine = experienceContent.querySelector('.timeline-line');
  if (window.innerWidth >= 768 && timelineLine) {
    document.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => {
      el.style.display = 'block';
    });
    const subContainer = experienceContent.querySelector('div > div');
    if (subContainer) subContainer.style.paddingLeft = '4rem';
  }
}

// ============================================
// PROJECTS SECTION
// ============================================

function initProjects() {
  const projects = portfolioData?.projects;
  const projectsContent = document.getElementById('projectsContent');
  const projectsSection = document.getElementById('projects');

  if (!projectsContent) return;
  if (!projects || projects.length === 0) {
    if (projectsSection) projectsSection.style.display = 'none';
    return;
  }

  projectsContent.innerHTML = projects.map((project, i) => `
    <div class="glass-hover card-shine card-lg animate-fade-up" style="animation-delay: ${i * 0.15}s; display: flex; flex-direction: column;">
      <div style="display: flex; align-items: start; justify-content: space-between; gap: 0.5rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: start; gap: 0.75rem; min-width: 0;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary)); flex-shrink: 0; margin-top: 0.125rem; transition: all 0.3s ease;">
            ${getIconHTML('layers', 'icon-sm')}
          </div>
          <div style="min-width: 0;">
            <h3 style="font-size: 1.125rem; font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: hsl(var(--foreground)); line-height: 1.3; transition: color 0.3s ease;">
              ${project.title || ''}
            </h3>
            <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.7); margin-top: 0.125rem;">${project.subtitle || ''}</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 0.25rem; flex-shrink: 0;">
          ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="Source code" style="display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 0.5rem; color: hsl(var(--muted-foreground)); border: 1px solid transparent; transition: all 0.2s ease; text-decoration: none;">
            ${getIconHTML('github', 'icon-sm')}
          </a>` : ''}
          ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" aria-label="Live demo" style="display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 0.5rem; color: hsl(var(--muted-foreground)); border: 1px solid transparent; transition: all 0.2s ease; text-decoration: none;">
            ${getIconHTML('external-link', 'icon-sm')}
          </a>` : ''}
        </div>
      </div>
      
      <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 1.25rem; line-height: 1.6;">${project.description || ''}</p>
      
      ${project.highlights ? `<ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; flex: 1;">
        ${project.highlights.map(h => `
          <li style="display: flex; align-items: start; gap: 0.625rem; font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.8);">
            <span style="width: 0.25rem; height: 0.25rem; border-radius: 50%; background: hsl(38 95% 58% / 0.7); margin-top: 0.375rem; flex-shrink: 0;"></span>
            ${h}
          </li>
        `).join('')}
      </ul>` : ''}
      
      ${project.tech ? `<div style="display: flex; flex-wrap: wrap; gap: 0.375rem; padding-top: 1rem; border-top: 1px solid hsl(var(--border) / 0.4);">
        ${project.tech.map(t => `
          <span style="padding: 0.125rem 0.5rem; font-size: 0.625rem; font-weight: 500; border-radius: 0.375rem; background: hsl(var(--secondary) / 0.5); border: 1px solid hsl(var(--border) / 0.5); color: hsl(var(--muted-foreground) / 0.8); transition: all 0.2s ease;">
            ${t}
          </span>
        `).join('')}
      </div>` : ''}
    </div>
  `).join('');
}

// ============================================
// CONTACT SECTION
// ============================================

function initContact() {
  const profile = portfolioData?.profile;
  const codingProfiles = portfolioData?.codingProfiles;
  const contactContent = document.getElementById('contactContent');
  const contactSection = document.getElementById('contact');

  if (!contactContent) return;
  if (!profile && (!codingProfiles || codingProfiles.length === 0)) {
    if (contactSection) contactSection.style.display = 'none';
    return;
  }

  const contactLinks = [
    { icon: 'mail', label: 'Email', value: profile?.email, href: profile?.email ? `mailto:${profile.email}` : null },
    { icon: 'phone', label: 'Phone', value: profile?.phone, href: profile?.phone ? `tel:${profile.phone}` : null },
    { icon: 'github', label: 'GitHub', value: profile?.githubHandle, href: profile?.github },
    { icon: 'linkedin', label: 'LinkedIn', value: profile?.linkedinHandle, href: profile?.linkedin }
  ].filter(link => link.value && link.href);

  let html = '';

  if (profile?.email) {
    html += `
      <div class="animate-fade-up" style="animation-delay: 0.1s; position: relative; border-radius: 1rem; border: 1px solid hsl(38 95% 58% / 0.2); background: linear-gradient(135deg, hsl(38 95% 58% / 0.08), hsl(38 95% 58% / 0.04), transparent); padding: 2rem; margin-bottom: 2rem; overflow: hidden;">
        <div style="position: absolute; top: 0; right: 0; width: 12rem; height: 12rem; background: hsl(38 95% 58% / 0.06); border-radius: 50%; filter: blur(60px); pointer-events: none;"></div>
        
        <div style="position: relative; z-index: 10; display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <i data-lucide="sparkles" style="width: 0.875rem; height: 0.875rem; color: hsl(var(--primary));"></i>
              <span style="font-size: 0.75rem; color: hsl(var(--primary)); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">Open to work</span>
            </div>
            <p style="color: hsl(var(--foreground)); font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 1.125rem; margin-bottom: 0.25rem;">Looking for internships & full-time roles</p>
            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Full-Stack Development · React · Node.js · Next.js</p>
          </div>
          <a href="mailto:${profile.email}" class="btn-primary" style="align-self: flex-start;">
            Send email
            <i data-lucide="arrow-up-right" style="width: 0.875rem; height: 0.875rem;"></i>
          </a>
        </div>
      </div>
    `;
  }

  if (contactLinks.length > 0) {
    html += `
      <div class="grid-2" style="margin-bottom: 4rem;">
        ${contactLinks.map((link, i) => `
          <a href="${link.href}" ${link.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="glass-hover card-shine animate-fade-up" style="animation-delay: ${i * 0.08}s; display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border-radius: 1rem; text-decoration: none; transition: all 0.3s ease;">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: hsl(38 95% 58% / 0.1); border: 1px solid hsl(38 95% 58% / 0.2); display: flex; align-items: center; justify-content: center; color: hsl(var(--primary)); flex-shrink: 0; transition: all 0.3s ease;">
              ${getIconHTML(link.icon)}
            </div>
            <div style="flex: 1; min-width: 0;">
              <p style="font-size: 0.625rem; color: hsl(var(--muted-foreground) / 0.6); text-transform: uppercase; letter-spacing: 0.12em; font-weight: 500;">${link.label}</p>
              <p style="font-size: 0.875rem; color: hsl(var(--foreground)); margin-top: 0.125rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${link.value}</p>
            </div>
            ${getIconHTML('arrow-up-right', 'icon-xs')}
          </a>
        `).join('')}
      </div>
    `;
  }

  html += `
    <div style="padding-top: 2rem; border-top: 1px solid hsl(var(--border) / 0.4); display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem;">
      <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.5); text-align: center;">
        © ${new Date().getFullYear()} ${profile?.name || 'Developer'} · Built with HTML, CSS & JavaScript
      </p>
      <div style="display: flex; align-items: center; gap: 1.25rem;">
        ${profile?.github ? `<a href="${profile.github}" target="_blank" rel="noopener noreferrer" style="color: hsl(var(--muted-foreground) / 0.5); transition: color 0.3s ease;">
          ${getIconHTML('github', 'icon-sm')}
        </a>` : ''}
        ${profile?.linkedin ? `<a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" style="color: hsl(var(--muted-foreground) / 0.5); transition: color 0.3s ease;">
          ${getIconHTML('linkedin', 'icon-sm')}
        </a>` : ''}
        ${(profile?.github || profile?.linkedin) && codingProfiles && codingProfiles.length > 0 ? `<div style="width: 1px; height: 1rem; background: hsl(var(--border) / 0.4);"></div>` : ''}
        ${codingProfiles ? codingProfiles.map(link => `
          <a href="${link.href}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; color: hsl(var(--muted-foreground) / 0.5); text-decoration: none; transition: color 0.3s ease;">
            ${link.label}
          </a>
        `).join('') : ''}
      </div>
    </div>
  `;

  contactContent.innerHTML = html;
  setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 0);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initGlobal();
  initNavigation();
  initHero();
  initAbout();
  initSkills();
  initExperience();
  initProjects();
  initContact();
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Initialize scroll animations
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
});

// Handle window resize for responsive features
window.addEventListener('resize', () => {
  const experienceContent = document.getElementById('experienceContent');
  if (experienceContent) {
    if (window.innerWidth >= 768) {
      document.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => {
        el.style.display = 'block';
      });
      experienceContent.querySelector('div > div').style.paddingLeft = '4rem';
    } else {
      document.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => {
        el.style.display = 'none';
      });
      experienceContent.querySelector('div > div').style.paddingLeft = '0';
    }
  }
});
