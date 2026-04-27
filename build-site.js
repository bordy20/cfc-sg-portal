// CFC-SG Multi-page Static Site Generator — v2 Living Covenant theme
// Reuses the v1 sitemap; applies new CSS, motion.js, and templates.
const fs = require('fs');
const path = require('path');

// Output directory. By default, the script regenerates the site IN PLACE
// (the same folder this script lives in). Override with: OUT=./dist node build-site.js
const OUT = process.env.OUT || __dirname;
// Top-level paths that the generator owns (will be wiped & rewritten on each run).
// Anything else in this folder (README.md, DEPLOY.md, .git, etc.) is left alone.
const GENERATED = ['assets', 'index.html', ...require('fs').readdirSync(__dirname).filter(n => {
  // sitemap top-level slugs only
  return ['home','responsibility','holiness','household-and-home','teachings','tithes','chapter','evangelization-and-clp','ancop','mission-centre','zoom-tutorials'].includes(n);
})];

// ---------- SITEMAP (identical to v1) ----------
const sitemap = [
  { title: "Home", slug: "home", icon: "🏠", intent: "The CFC-SG landing hub — covenant, vision, mission, leadership, structure, and annual events.",
    subpages: [
      { title: "CFC-SG Organizational Structure", slug: "cfc-sg-organizational-structure" },
      { title: "National Council and Regional Heads", slug: "national-council-and-regional-heads",
        children: [
          { title: "GOL (Gift of Life) National Core Team", slug: "gol-national-core-team" },
          { title: "PFO (Pastoral Formation Office) National Core Team", slug: "pfo-national-core-team" },
          { title: "Gateway Evangelization National Core Team", slug: "gateway-evangelization-national-core-team" }
        ] },
      { title: "AGT and Mission Areas", slug: "agt-and-mission-areas", sg: true,
        children: [
          { title: "Southeast Asia Missions", slug: "southeast-asia-missions", sg: true },
          { title: "Asia-Pacific Missions", slug: "asia-pacific-missions", sg: true },
          { title: "Global Missions Partnerships", slug: "global-missions-partnerships", sg: true }
        ] },
      { title: "Clusters and Chapters", slug: "clusters-and-chapters",
        children: [
          { title: "Member Statistics", slug: "member-statistics" },
          { title: "HOLD Chapters", slug: "hold-chapters" },
          { title: "Composition", slug: "composition" }
        ] },
      { title: "CFC Mission", slug: "cfc-mission" },
      { title: "CFC Vision", slug: "cfc-vision" },
      { title: "CFC Covenant", slug: "cfc-covenant" },
      { title: "Church Relations Office", slug: "church-relations-office" },
      { title: "Archdiocese of Singapore", slug: "archdiocese-of-singapore", sg: true,
        children: [
          { title: "Partner Parishes", slug: "partner-parishes", sg: true }
        ] },
      { title: "Vatican Recognition", slug: "vatican-recognition" },
      { title: "Annual Activities", slug: "annual-activities",
        children: [
          { title: "First Fruits", slug: "first-fruits",
            children: [
              { title: "First Fruits Exhortation Outline", slug: "first-fruits-exhortation-outline" },
              { title: "SG North First Fruits Offering Options", slug: "sg-north-first-fruits-offering-options", sg: true },
              { title: "SG South First Fruits Offering Options", slug: "sg-south-first-fruits-offering-options", sg: true }
            ] },
          { title: "Leaders Assembly and E-Rally", slug: "leaders-assembly-and-e-rally" }
        ] },
      { title: "CFC Mission Core Covenant", slug: "cfc-mission-core-covenant" },
      { title: "Annual Conferences", slug: "annual-conferences", sg: true }
    ] },

  { title: "Holiness", slug: "holiness", icon: "✝", intent: "Prayer life, sacraments, gifts and fruits of the Holy Spirit, scripture.",
    subpages: [
      { title: "Praising God", slug: "praising-god" },
      { title: "Gifts of the Holy Spirit", slug: "gifts-of-the-holy-spirit",
        children: [
          { title: "Introduction to the Gifts of the Holy Spirit", slug: "introduction-to-the-gifts-of-the-holy-spirit" },
          { title: "Wisdom", slug: "wisdom" },
          { title: "Knowledge", slug: "knowledge" },
          { title: "Faith", slug: "faith" },
          { title: "Healing", slug: "healing" },
          { title: "Mighty Deeds", slug: "mighty-deeds" },
          { title: "Prophecy", slug: "prophecy" },
          { title: "Discernment", slug: "discernment",
            children: [
              { title: "Rules of Spiritual Discernment", slug: "rules-of-spiritual-discernment" }
            ] },
          { title: "Tongues", slug: "tongues" }
        ] },
      { title: "Fruit of the Holy Spirit", slug: "fruit-of-the-holy-spirit" },
      { title: "Sacraments", slug: "sacraments",
        children: [
          { title: "Sacrament of Reconciliation", slug: "sacrament-of-reconciliation" },
          { title: "Act of Contrition", slug: "act-of-contrition" },
          { title: "Marriage Convalidation", slug: "marriage-convalidation" }
        ] },
      { title: "Scripture", slug: "scripture" },
      { title: "Prayer", slug: "prayer",
        children: [
          { title: "Lectio Divina", slug: "lectio-divina" },
          { title: "Prayer for Reverence for Life", slug: "prayer-for-reverence-for-life" },
          { title: "Prayer for Vocations", slug: "prayer-for-vocations" },
          { title: "Prayer of Spiritual Communion", slug: "prayer-of-spiritual-communion" },
          { title: "Prayer to St. Michael the Archangel", slug: "prayer-to-st-michael-the-archangel" },
          { title: "Prayers for the Dead", slug: "prayers-for-the-dead" },
          { title: "Stewardship Prayer", slug: "stewardship-prayer" },
          { title: "Divine Mercy Chaplet", slug: "divine-mercy-chaplet" },
          { title: "Divine Mercy Novena", slug: "divine-mercy-novena" },
          { title: "Divine Mercy Novena Introduction", slug: "divine-mercy-novena-introduction" },
          { title: "Divine Mercy Sunday", slug: "divine-mercy-sunday" }
        ] },
      { title: "Mobile Apps", slug: "mobile-apps" }
    ] },

  { title: "Household and Home", slug: "household-and-home", icon: "👪", intent: "Household meetings, family devotion, exhortation, ACTS prayer.",
    subpages: [
      { title: "What is a Household", slug: "what-is-a-household" },
      { title: "Dynamics of a Household Meeting", slug: "dynamics-of-a-household-meeting" },
      { title: "Family Household", slug: "family-household",
        children: [
          { title: "Family Honoring Night", slug: "family-honoring-night" }
        ] },
      { title: "Bible Sharing", slug: "bible-sharing" },
      { title: "Exhortation", slug: "exhortation",
        children: [
          { title: "Exhortation Samples", slug: "exhortation-samples" }
        ] },
      { title: "ACTS Prayer", slug: "acts-prayer" }
    ] },

  { title: "Evangelization and CLP", slug: "evangelization-and-clp", icon: "📖", intent: "The Christian Life Program and evangelization resources.",
    subpages: [
      { title: "Christian Life Program (CLP)", slug: "christian-life-program",
        children: [
          { title: "CLP v2.0", slug: "clp-v2-0" },
          { title: "CLP v2.0 Materials", slug: "clp-v2-0-materials" },
          { title: "How to Prepare for a CLP", slug: "how-to-prepare-for-a-clp" },
          { title: "CLP Team", slug: "clp-team" },
          { title: "Online Etiquette", slug: "online-etiquette" },
          { title: "Jericho Walk", slug: "jericho-walk" },
          { title: "CLP Intercessory Prayer", slug: "clp-intercessory-prayer" },
          { title: "CLP Intercessory Prayer (Longer)", slug: "clp-intercessory-prayer-longer" },
          { title: "CLP Module 1 Dialogue", slug: "clp-module-1-dialogue" },
          { title: "CLP Module 2 Dialogue", slug: "clp-module-2-dialogue" },
          { title: "Prayer to Pray Over a Brother", slug: "prayer-to-pray-over-a-brother" },
          { title: "Prayer to Pray Over a Sister", slug: "prayer-to-pray-over-a-sister" },
          { title: "Prayer Over of Families (Talk 8)", slug: "prayer-over-of-families-talk-8" },
          { title: "Cleansing Prayer After Pray Over", slug: "cleansing-prayer-after-pray-over" }
        ] },
      { title: "How to Evangelize", slug: "how-to-evangelize" },
      { title: "Family Is a Gift", slug: "family-is-a-gift" }
    ] },

  { title: "ANCOP", slug: "ancop", icon: "🤝", intent: "Answering the Cry of the Poor — CFC's global social development arm.",
    subpages: [
      { title: "Annual ANCOP Events", slug: "annual-ancop-events" },
      { title: "ANCOP Singapore Run", slug: "ancop-sg-run", sg: true },
      { title: "ANCOP Walk", slug: "ancop-walk" }
    ] },

  { title: "Responsibility", slug: "responsibility", icon: "🕊", intent: "Leaders' responsibilities, pastoral dialogue, servant leadership.",
    subpages: [
      { title: "1-on-1 Dialogue", slug: "1-on-1-dialogue" },
      { title: "1-on-1 Dialogue Guide", slug: "1-on-1-dialogue-guide" },
      { title: "1-on-1 Dialogue Supplement", slug: "1-on-1-dialogue-supplement" },
      { title: "Leaders Responsibilities", slug: "leaders-responsibilities" },
      { title: "OGD (Online Global Data)", slug: "ogd-online-global-data" },
      { title: "Servant Leaders", slug: "servant-leaders",
        children: [
          { title: "Being a Servant Like St. Paul", slug: "being-a-servant-like-st-paul" },
          { title: "Who Should Be Servant Leaders", slug: "who-should-be-servant-leaders" }
        ] }
    ] },

  { title: "Teachings", slug: "teachings", icon: "🎓", intent: "Formation track and leader training.",
    subpages: [
      { title: "CFC Formation Track", slug: "cfc-formation-track",
        children: [
          { title: "Tongues Workshop", slug: "tongues-workshop" }
        ] },
      { title: "Household Leaders Training", slug: "household-leaders-training" },
      { title: "Unit Leaders Training", slug: "unit-leaders-training" },
      { title: "Preparing for a Talk", slug: "preparing-for-a-talk",
        children: [
          { title: "Learning PowerPoint", slug: "learning-powerpoint" }
        ] },
      { title: "Preparing for a Sharing", slug: "preparing-for-a-sharing" }
    ] },

  { title: "Tithes", slug: "tithes", icon: "💰", intent: "Biblical tithing, SGD guidance, allocation.",
    subpages: [
      { title: "Tithes in the Scriptures", slug: "tithes-in-the-scriptures" },
      { title: "Why Give Tithes", slug: "why-give-tithes" },
      { title: "How Much Should I Give", slug: "how-much-should-i-give", sg: true },
      { title: "Where Do Tithes Go", slug: "where-do-tithes-go", sg: true }
    ] },

  { title: "CFC-SG Mission Centre", slug: "mission-centre", icon: "🏢", sg: true, intent: "Admin hub — event logistics, receipts, office administration for the Singapore mission centre.",
    subpages: [
      { title: "Borrowing of Items", slug: "borrowing-of-items" },
      { title: "Housekeeping Rules", slug: "housekeeping-rules",
        children: [
          { title: "Reporting Mission Centre Issues", slug: "reporting-mission-centre-issues" }
        ] },
      { title: "CFC One Fund", slug: "cfc-one-fund" },
      { title: "Guidelines for Events", slug: "guidelines-for-events",
        children: [
          { title: "Initial Considerations for Events", slug: "initial-considerations-for-events" },
          { title: "Venues for Events", slug: "venues-for-events", sg: true },
          { title: "Payment Options for Events", slug: "payment-options-for-events", sg: true }
        ] },
      { title: "Ordering CFC IDs", slug: "ordering-cfc-ids" },
      { title: "Reimbursements for Events", slug: "reimbursements-for-events" },
      { title: "Reimbursement for CLPs", slug: "reimbursement-for-clps" },
      { title: "Requests for CLP Kits", slug: "requests-for-clp-kits" },
      { title: "Reservations", slug: "reservations" },
      { title: "Tax Receipts", slug: "tax-receipts", sg: true,
        children: [
          { title: "Missing or Delayed Tax Receipts", slug: "missing-or-delayed-tax-receipts" }
        ] },
      { title: "Office Administration", slug: "office-administration",
        children: [
          { title: "Conference Notes", slug: "conference-notes" },
          { title: "SG South Cluster Reports", slug: "sg-south-reports", sg: true }
        ] },
      { title: "CFC-SG Ablaze", slug: "cfc-sg-ablaze", sg: true },
      { title: "OGD Encoder", slug: "ogd-encoder" }
    ] },

  { title: "Chapter", slug: "chapter", icon: "⛪", intent: "Chapter-level organization, ministries, music, family & social ministries.",
    subpages: [
      { title: "Chapter Organization", slug: "chapter-organization" },
      { title: "Service Roles in a Chapter", slug: "service-roles-in-a-chapter" },
      { title: "Guidelines for Business Dealings", slug: "guidelines-for-business-dealings" },
      { title: "Church Integration", slug: "church-integration" },
      { title: "Music Ministry", slug: "music-ministry",
        children: [
          { title: "Playlists for Household Meetings", slug: "playlists-for-household-meetings" },
          { title: "Praise & Worship Songs", slug: "praise-worship-songs" },
          { title: "CLP Songs", slug: "clp-songs" },
          { title: "LiveLoud Songs", slug: "liveloud-songs" },
          { title: "Worship Workshop", slug: "worship-workshop" },
          { title: "Glory Songs (Fast)", slug: "glory-songs-fast" },
          { title: "Glory Songs (Slow)", slug: "glory-songs-slow" },
          { title: "Composers and Musicians", slug: "composers-and-musicians" }
        ] },
      { title: "Family Ministries", slug: "family-ministries",
        children: [
          { title: "KFC (Kids for Christ)", slug: "kfc",
            children: [
              { title: "Introduction to KFC", slug: "introduction-to-kfc" },
              { title: "Who Serves in KFC", slug: "who-serves-in-kfc" },
              { title: "KFC Promises", slug: "kfc-promises" },
              { title: "KFC Songs", slug: "kfc-songs" },
              { title: "Global Day of Service", slug: "global-day-of-service" }
            ] },
          { title: "YFC (Youth for Christ)", slug: "yfc",
            children: [
              { title: "YFC Events", slug: "yfc-events" },
              { title: "YFC Pastoral Formation", slug: "yfc-pastoral-formation" },
              { title: "YFC Youth Camp", slug: "yfc-youth-camp" }
            ] },
          { title: "SFC (Singles for Christ)", slug: "sfc",
            children: [
              { title: "SFC Couple Coordinator", slug: "sfc-couple-coordinator" },
              { title: "SFC Pastoral Formation", slug: "sfc-pastoral-formation" }
            ] },
          { title: "Senior Couples Program", slug: "senior-couples-program" }
        ] },
      { title: "Social Ministries", slug: "social-ministries",
        children: [
          { title: "Ablaze (Singles Ministry)", slug: "ablaze" },
          { title: "Gift of Life (GOL)", slug: "gift-of-life",
            children: [
              { title: "GOL Objectives", slug: "gol-objectives" },
              { title: "GOL Logo", slug: "gol-logo" },
              { title: "Pro-Life", slug: "pro-life" },
              { title: "40 Days for Life Prayer Vigil", slug: "40-days-for-life-prayer-vigil" },
              { title: "Contraception", slug: "contraception" },
              { title: "Wedding Milestone", slug: "wedding-milestone" }
            ] },
          { title: "Migrants Ministry", slug: "migrants-ministry", sg: true }
        ] },
      { title: "Lord's Day Celebration", slug: "lords-day-celebration" },
      { title: "Chapter Prayer Assembly", slug: "chapter-prayer-assembly" },
      { title: "Chapter Prayer Assembly Themes", slug: "chapter-prayer-assembly-themes" },
      { title: "CFC ID", slug: "cfc-id" }
    ] },

  { title: "Zoom Tutorials", slug: "zoom-tutorials", icon: "💻", intent: "How-to guides for Zoom-based meetings and CLPs.",
    subpages: [
      { title: "Virtual Background", slug: "virtual-background" }
    ] }
];

// ---------- Flatten into page records ----------
const pages = [];
pages.push({ title: "CFC Singapore", pathParts: [], crumbs: [], parentSectionSlug: null, depth: 0, isRoot: true });
for (const section of sitemap) {
  pages.push({ title: section.title, icon: section.icon, intent: section.intent, pathParts: [section.slug], crumbs: [{ title: "Home", parts: [] }], parentSectionSlug: section.slug, depth: 1, isSection: true, sg: section.sg, sectionRef: section });
  (function walk(nodes, parentParts, sectionSlug) {
    for (const n of nodes) {
      const parts = [...parentParts, n.slug];
      pages.push({ title: n.title, pathParts: parts, crumbs: null, parentSectionSlug: sectionSlug, depth: parts.length, sg: n.sg });
      if (n.children) walk(n.children, parts, sectionSlug);
    }
  })(section.subpages || [], [section.slug], section.slug);
}

// Compute crumbs
const pageByKey = new Map();
for (const p of pages) pageByKey.set(p.pathParts.join('/'), p);
for (const p of pages) {
  const crumbs = [];
  if (p.pathParts.length > 0) crumbs.push({ title: "Home", parts: [] });
  for (let i = 1; i < p.pathParts.length; i++) {
    const ancestor = pageByKey.get(p.pathParts.slice(0, i).join('/'));
    if (ancestor) crumbs.push({ title: ancestor.title, parts: ancestor.pathParts });
  }
  p.crumbs = crumbs;
}

console.log('Total pages:', pages.length);

// ---------- Helpers ----------
function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function relTo(fromParts, toParts) {
  const up = '../'.repeat(fromParts.length);
  const down = toParts.length === 0 ? '' : toParts.join('/') + '/';
  return up + down || './';
}

// ---------- Sidebar builder ----------
function buildSidebar(currentPage) {
  const curKey = currentPage.pathParts.join('/');
  const curSection = currentPage.parentSectionSlug;

  function render(nodes, sectionSlug, parentParts) {
    let html = '<div class="nest">';
    for (const n of nodes) {
      const parts = [...parentParts, n.slug];
      const key = parts.join('/');
      const href = relTo(currentPage.pathParts, parts);
      const isCurrent = key === curKey;
      const isAncestor = curKey.startsWith(key + '/');
      const sgBadge = n.sg ? ' <span class="sg-badge">SG</span>' : '';
      if (n.children && n.children.length) {
        const openAttr = (isCurrent || isAncestor) ? ' open' : '';
        const curCls = isCurrent ? ' current' : '';
        html += `<details${openAttr}>`;
        html += `<summary><a href="${href}" class="sum-link${curCls}">${escape(n.title)}${sgBadge}</a><span class="chev"></span></summary>`;
        html += render(n.children, sectionSlug, parts);
        html += `</details>`;
      } else {
        const curCls = isCurrent ? ' current' : '';
        html += `<a class="leaf${curCls}" href="${href}">${escape(n.title)}${sgBadge}</a>`;
      }
    }
    html += '</div>';
    return html;
  }

  let html = '';
  html += `<div class="sidebar-title">CFC-SG <span class="sidebar-title-sub">Living Covenant · v2</span></div>`;
  html += `<div class="controls"><button class="btn" onclick="toggleAll(true)">Expand all</button><button class="btn" onclick="toggleAll(false)">Collapse all</button></div>`;
  const rootHref = relTo(currentPage.pathParts, []);
  const rootCurCls = currentPage.isRoot ? ' current' : '';
  html += `<a class="leaf top${rootCurCls}" href="${rootHref}">🏠 Overview</a>`;
  for (const section of sitemap) {
    const secParts = [section.slug];
    const secKey = section.slug;
    const href = relTo(currentPage.pathParts, secParts);
    const isCurrent = secKey === curKey;
    const inSection = curSection === section.slug;
    const openAttr = inSection ? ' open' : '';
    const curCls = isCurrent ? ' current' : '';
    const sgBadge = section.sg ? ' <span class="sg-badge">SG</span>' : '';
    html += `<details class="lvl-1"${openAttr}>`;
    html += `<summary><a href="${href}" class="sum-link top${curCls}">${section.icon} ${escape(section.title)}${sgBadge}</a><span class="chev"></span></summary>`;
    if (section.subpages && section.subpages.length) {
      html += render(section.subpages, section.slug, [section.slug]);
    }
    html += `</details>`;
  }
  return html;
}

// ---------- Content templates ----------
function rootHomeContent() {
  return `
  <section class="hero">
    <div class="hero-blob-1"></div>
    <div class="hero-blob-2"></div>
    <div class="hero-inner">
      <span class="eyebrow fade-on-load" style="--delay:0ms">✦ Couples for Christ · Singapore</span>
      <h1 class="fade-on-load" style="--delay:150ms">A living covenant — <em>renewed every day</em> in Singapore's families.</h1>
      <p class="lede fade-on-load" style="--delay:300ms">CFC-SG is the Singapore chapter of Couples for Christ, a Catholic lay community recognised by the Vatican. We form couples, singles, youth, and children to live the Gospel in their homes and serve the Church and the poor.</p>
      <div class="hero-ctas fade-on-load" style="--delay:450ms">
        <a class="btn-primary" href="evangelization-and-clp/christian-life-program/">Join a Christian Life Program</a>
        <a class="btn-ghost" href="home/">About CFC-SG</a>
      </div>
      <div class="hero-stats fade-on-load" style="--delay:600ms">
        <div class="hstat"><div class="hstat-num" data-count="11">11</div><div class="hstat-label">Sections</div></div>
        <div class="hstat"><div class="hstat-num" data-count="180">180</div><div class="hstat-label">Resources</div></div>
        <div class="hstat"><div class="hstat-num" data-count="4">4</div><div class="hstat-label">Ministries</div></div>
        <div class="hstat"><div class="hstat-num">1</div><div class="hstat-label">Covenant</div></div>
      </div>
    </div>
  </section>
  <section class="section-grid">
    ${sitemap.map(s => `
      <a class="section-card fade-on-scroll" href="${s.slug}/">
        <div class="card-icon">${s.icon}</div>
        <h3>${escape(s.title)}${s.sg ? ' <span class="sg-badge">SG</span>' : ''}</h3>
        <p>${escape(s.intent)}</p>
        <div class="card-more">Explore →</div>
      </a>
    `).join('')}
  </section>
  <section class="callout fade-on-scroll">
    <div>
      <h2>About this preview</h2>
      <p>This is a full 180-page preview of the new CFC-SG site, mirroring the structure of the reference CFC-GVA site with Singapore adaptations baked in. Every page in the sidebar works. Starter content is in place for top-level sections; sub-pages show their intended purpose and the Singapore-specific notes for the team to fill in.</p>
    </div>
  </section>`;
}

function sectionContent(page) {
  const s = page.sectionRef;
  const subList = s.subpages || [];
  const renderCards = (nodes) => `<div class="card-grid">
    ${nodes.map((n, i) => {
      const sgBadge = n.sg ? ' <span class="sg-badge">SG</span>' : '';
      const childCount = n.children ? n.children.length : 0;
      return `<a class="info-card fade-on-scroll" style="--stagger:${i * 60}ms" href="${n.slug}/">
        <h4>${escape(n.title)}${sgBadge}</h4>
        ${childCount ? `<div class="sub-count">${childCount} sub-page${childCount > 1 ? 's' : ''}</div>` : ''}
        <span class="card-arrow">→</span>
      </a>`;
    }).join('')}
  </div>`;
  return `
  <header class="page-header fade-on-load" style="--delay:100ms">
    <div class="page-icon-big">${s.icon}</div>
    <div>
      <h1>${escape(s.title)}${s.sg ? ' <span class="sg-badge big">SG</span>' : ''}</h1>
      <p class="lede">${escape(s.intent)}</p>
    </div>
  </header>
  <section>
    <h2 class="fade-on-scroll">Pages in this section</h2>
    ${renderCards(subList)}
  </section>
  ${s.sg ? `<section class="sg-callout fade-on-scroll">
    <h2>Singapore adaptations in this section</h2>
    <p>This section includes pages that must be meaningfully rewritten for Singapore — not just renamed. Common changes:</p>
    <ul>
      <li>RCAV → Archdiocese of Singapore, and Vancouver parishes → SG partner parishes</li>
      <li>CAD / Interac → SGD / PayNow / bank transfer</li>
      <li>GVA North / South → SG North / South clusters</li>
      <li>Western hemisphere mission areas → Southeast Asia and Asia-Pacific</li>
    </ul>
  </section>` : ''}
  `;
}

function subpageContent(page) {
  const parent = page.crumbs[page.crumbs.length - 1];
  return `
  <header class="page-header simple fade-on-load" style="--delay:100ms">
    <h1>${escape(page.title)}${page.sg ? ' <span class="sg-badge big">SG</span>' : ''}</h1>
    <p class="lede">Part of: ${page.crumbs.slice(1).map(c => escape(c.title)).join(' · ') || escape(page.crumbs[0]?.title || '')}</p>
  </header>
  <section class="content-placeholder">
    <div class="placeholder-card fade-on-scroll">
      <h3>Content to be provided</h3>
      <p>This page will contain the <strong>${escape(page.title)}</strong> content, adapted for Singapore where applicable. The page owner should:</p>
      <ol>
        <li>Copy the reference content from the CFC-GVA site for context.</li>
        <li>Apply Singapore adaptations from the <em>CFC-SG Sitemap</em> document (see Singapore Adaptation Legend).</li>
        <li>Replace names, contact details, and currency with SG equivalents (SGD, PayNow, DBS/POSB/UOB, Archdiocese of Singapore).</li>
        <li>Request review from the relevant Singapore core team before publishing.</li>
      </ol>
    </div>
    ${page.sg ? `<div class="sg-note fade-on-scroll">
      <strong>Singapore-specific:</strong> This page diverges meaningfully from the reference CFC-GVA version. Treat the original as inspiration only and write fresh Singapore-accurate content.
    </div>` : ''}
  </section>
  <nav class="page-nav">
    ${parent ? `<a class="back" href="../">← Back to ${escape(parent.title)}</a>` : ''}
  </nav>`;
}

function contentFor(page) {
  if (page.isRoot) return rootHomeContent();
  if (page.isSection) return sectionContent(page);
  return subpageContent(page);
}

// ---------- Page template ----------
function pageHtml(page) {
  const rel = relTo(page.pathParts, []);
  const title = page.isRoot ? 'CFC Singapore — Couples for Christ' : `${page.title} · CFC-SG`;
  const sidebar = buildSidebar(page);
  const body = contentFor(page);

  let crumbHtml = '';
  if (!page.isRoot && page.crumbs.length > 0) {
    crumbHtml = '<nav class="breadcrumbs">' + page.crumbs.map(c => {
      const href = relTo(page.pathParts, c.parts);
      return `<a href="${href}">${escape(c.title)}</a>`;
    }).join('<span class="sep">›</span>') + `<span class="sep">›</span><span class="crumb-current">${escape(page.title)}</span></nav>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escape(title)}</title>
<meta name="description" content="CFC Singapore — Couples for Christ Singapore. ${escape(page.intent || page.title)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${rel}assets/style.css" />
</head>
<body>
<header class="topbar" id="topbar">
  <div class="topbar-inner">
    <a class="brand" href="${rel}">
      <div class="brand-mark">CFC</div>
      <div>
        <div class="brand-title">Couples for Christ — Singapore</div>
        <div class="brand-sub">${page.isRoot ? 'Home' : escape(page.title)}</div>
      </div>
    </a>
    <button class="menu-toggle" aria-label="Toggle menu" onclick="document.body.classList.toggle('menu-open')">☰</button>
  </div>
</header>

<div class="layout">
  <aside class="sidebar" id="sidebar">${sidebar}</aside>
  <main class="main">
    ${crumbHtml}
    ${body}
  </main>
</div>

<footer class="site-footer">
  <div class="footer-inner">
    <div><strong>CFC Singapore</strong> · Couples for Christ Singapore</div>
    <div class="footer-small">v2 Living Covenant · Preview site mirroring CFC-GVA structure · Not yet public</div>
  </div>
</footer>

<script>
  function toggleAll(open) {
    document.querySelectorAll('#sidebar details').forEach(d => d.open = open);
  }
  document.querySelectorAll('.sidebar a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 900) document.body.classList.remove('menu-open');
  }));
</script>
<script src="${rel}assets/motion.js" defer></script>
</body>
</html>`;
}

// ---------- CSS ----------
const CSS = `/* CFC-SG v2 · Living Covenant theme */
:root {
  --burgundy-dark: #4A0E18;
  --burgundy: #6E1423;
  --burgundy-light: #8B2335;
  --gold: #C9A96E;
  --gold-soft: #E6D3AA;
  --cream: #F8F1E4;
  --cream-dark: #EDE2CC;
  --page: #FBFAF6;
  --ink: #2A2320;
  --muted: #6B5E55;
  --rule: #E5DDCF;
  --white: #FFFFFF;

  --shadow-sm: 0 1px 3px rgba(74,14,24,0.08);
  --shadow-md: 0 6px 20px rgba(74,14,24,0.12);
  --shadow-lg: 0 12px 40px rgba(74,14,24,0.18);
  --glow-gold: 0 4px 20px rgba(201,169,110,0.40);

  --t-fast: 150ms ease-out;
  --t-med: 300ms cubic-bezier(.4,0,.2,1);
  --t-slow: 800ms cubic-bezier(.2,.8,.2,1);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--ink);
  background: var(--page);
  line-height: 1.65;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 700;
  line-height: 1.15;
  color: var(--burgundy-dark);
  letter-spacing: -0.01em;
}
h1 { font-size: clamp(2rem, 4.5vw, 3rem); color: var(--burgundy); }
h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); margin-bottom: 1rem; }
h3 { font-size: 1.35rem; color: var(--burgundy); }
h4 { font-size: 1.1rem; color: var(--burgundy); font-weight: 700; }
p { margin-bottom: 0.9rem; }
em { font-style: italic; }
a { color: var(--burgundy); text-decoration: none; transition: color var(--t-fast); }
a:hover { color: var(--gold); }
ul, ol { padding-left: 1.2rem; margin-bottom: 1rem; }
li { margin-bottom: 0.35rem; }

/* Focus rings */
a:focus-visible, button:focus-visible, summary:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ============== TOP BAR ============== */
.topbar {
  background: var(--burgundy-dark);
  color: var(--cream);
  padding: 0.9rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-md);
  transition: padding var(--t-med), background var(--t-med);
}
.topbar.shrunk {
  padding: 0.55rem 0;
  background: rgba(74,14,24,0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.topbar-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.brand { display: flex; align-items: center; gap: 0.85rem; color: var(--cream); transition: opacity var(--t-fast); }
.brand:hover { opacity: 0.88; color: var(--cream); }
.brand-mark {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold-soft));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', serif;
  font-weight: 700; font-size: 1.05rem; color: var(--burgundy-dark);
  flex-shrink: 0;
  box-shadow: inset 0 -2px 4px rgba(74,14,24,0.25);
  transition: transform var(--t-med);
}
.brand:hover .brand-mark { transform: rotate(-5deg); }
.topbar.shrunk .brand-mark { width: 36px; height: 36px; font-size: 0.9rem; }
.brand-title {
  font-family: 'Fraunces', serif;
  font-size: 1.18rem; font-weight: 700;
  color: var(--cream);
  line-height: 1.1;
  transition: font-size var(--t-med);
}
.topbar.shrunk .brand-title { font-size: 1.05rem; }
.brand-sub {
  font-size: 0.68rem; letter-spacing: 0.22em;
  color: var(--gold-soft); text-transform: uppercase;
  margin-top: 2px;
  font-weight: 700;
}
.menu-toggle {
  display: none;
  background: transparent;
  color: var(--cream);
  border: 1px solid var(--gold-soft);
  font-size: 1.2rem;
  width: 40px; height: 40px;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--t-fast);
}
.menu-toggle:hover { background: var(--burgundy); }

/* ============== LAYOUT ============== */
.layout {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  padding: 1.8rem 1.5rem 3rem;
}

/* ============== SIDEBAR ============== */
.sidebar {
  background: var(--white);
  border: 1px solid var(--rule);
  border-radius: 10px;
  padding: 1rem 0.7rem;
  align-self: start;
  position: sticky;
  top: 92px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  box-shadow: var(--shadow-sm);
}
.sidebar-title {
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--burgundy);
  padding: 0 0.4rem 0.55rem;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 0.55rem;
}
.sidebar-title-sub {
  display: block;
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 700;
  margin-top: 2px;
  font-family: 'Inter', sans-serif;
}
.controls { display: flex; gap: 0.4rem; margin-bottom: 0.55rem; flex-wrap: wrap; padding: 0 0.2rem; }
.btn {
  background: var(--white);
  color: var(--burgundy);
  border: 1px solid var(--rule);
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all var(--t-fast);
  flex: 1;
  letter-spacing: 0.02em;
  font-weight: 600;
}
.btn:hover { background: var(--burgundy); color: var(--cream); border-color: var(--burgundy); }

details { margin: 0; }
details summary {
  list-style: none;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.38rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.88rem;
  color: var(--ink);
  gap: 0.4rem;
  transition: background var(--t-fast);
}
details summary::-webkit-details-marker { display: none; }
details summary:hover { background: var(--cream); }
details[open] > summary { color: var(--burgundy-dark); font-weight: 700; }
details.lvl-1 > summary {
  font-weight: 600;
  border-left: 3px solid transparent;
  padding-left: 0.5rem;
  transition: border-left-color var(--t-fast), background var(--t-fast);
}
details.lvl-1[open] > summary {
  border-left-color: var(--gold);
  background: var(--cream);
}
.sum-link { color: inherit; flex: 1; display: inline-block; font: inherit; }
.sum-link.top { font-weight: 700; }
.sum-link.current, .leaf.current {
  color: var(--burgundy);
  font-weight: 700;
  background: var(--gold-soft);
  position: relative;
}
.leaf.current::before {
  content: "";
  position: absolute;
  left: 0; top: 15%; bottom: 15%;
  width: 3px;
  background: var(--gold);
  border-radius: 2px;
}
.chev {
  display: inline-block; width: 14px; height: 14px;
  flex-shrink: 0; position: relative;
}
.chev::before {
  content: "";
  position: absolute; top: 4px; left: 3px;
  width: 7px; height: 7px;
  border-right: 2px solid var(--gold);
  border-bottom: 2px solid var(--gold);
  transform: rotate(-45deg);
  transition: transform var(--t-med);
}
details[open] > summary .chev::before { transform: rotate(45deg); top: 2px; }
.leaf {
  display: block;
  padding: 0.32rem 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
  border-radius: 4px;
  transition: all var(--t-fast);
  position: relative;
}
.leaf:hover { background: var(--cream); color: var(--burgundy); }
.leaf.top {
  font-weight: 700;
  color: var(--burgundy);
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--rule);
  margin-bottom: 0.35rem;
}
.leaf.top.current { background: var(--burgundy); color: var(--cream); border-color: var(--burgundy); }
.leaf.top.current::before { display: none; }
.nest { padding-left: 0.7rem; border-left: 1px dashed var(--rule); margin-left: 0.35rem; }
.nest .nest { border-left-color: var(--gold-soft); }

.sg-badge {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: var(--burgundy);
  background: var(--gold-soft);
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 700;
  margin-left: 4px;
  text-transform: uppercase;
  vertical-align: middle;
  font-family: 'Inter', sans-serif;
  animation: sg-pulse 0.9s ease-out 0.4s 1;
}
.sg-badge.big { font-size: 0.72rem; padding: 3px 9px; }
@keyframes sg-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(201,169,110,0.6); }
  50% { transform: scale(1.06); box-shadow: 0 0 0 6px rgba(201,169,110,0); }
  100% { transform: scale(1); }
}

/* ============== MAIN ============== */
.main { min-width: 0; }
.breadcrumbs {
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 1.2rem;
  line-height: 1.4;
}
.breadcrumbs a { color: var(--burgundy); font-weight: 500; }
.breadcrumbs .sep { margin: 0 0.4rem; color: var(--gold); }
.breadcrumbs .crumb-current { color: var(--ink); font-weight: 700; }

.page-header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.3rem;
  border-bottom: 2px solid var(--gold);
}
.page-header.simple { display: block; }
.page-header.simple h1 { margin-bottom: 0.4rem; }
.page-icon-big {
  font-size: 3.2rem;
  line-height: 1;
  padding-top: 0.3rem;
  flex-shrink: 0;
}
.lede {
  font-size: 1.12rem;
  color: var(--muted);
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 400;
  line-height: 1.45;
  margin-top: 0.4rem;
}

/* ============== HERO (root only) ============== */
.hero {
  background: linear-gradient(135deg, var(--burgundy-dark) 0%, var(--burgundy) 55%, var(--burgundy-light) 100%);
  color: var(--cream);
  padding: 3.5rem 2.5rem 3rem;
  border-radius: 10px;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.hero-blob-1, .hero-blob-2 {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero-blob-1 {
  top: -80px; right: -80px;
  width: 420px; height: 420px;
  background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
  opacity: 0.22;
  animation: drift 12s ease-in-out infinite alternate;
}
.hero-blob-2 {
  bottom: -60px; left: -60px;
  width: 300px; height: 300px;
  background: radial-gradient(circle, var(--gold-soft) 0%, transparent 70%);
  opacity: 0.15;
  animation: drift 15s ease-in-out infinite alternate-reverse;
}
@keyframes drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(50px, 40px) scale(1.15); }
}
.hero-inner { position: relative; z-index: 2; max-width: 780px; }
.eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  color: var(--gold-soft);
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.35rem 1rem;
  border: 1px solid rgba(230,211,170,0.45);
  border-radius: 20px;
  background: rgba(255,255,255,0.06);
  margin-bottom: 1.2rem;
  font-family: 'Inter', sans-serif;
}
.hero h1 {
  color: var(--cream);
  font-size: clamp(2rem, 4.5vw, 3rem);
  margin-bottom: 0.95rem;
  line-height: 1.12;
  font-weight: 700;
}
.hero h1 em {
  background: linear-gradient(90deg, var(--gold-soft) 0%, var(--gold) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--gold); /* fallback */
  font-style: italic;
}
.hero .lede {
  color: var(--gold-soft);
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 1.6rem;
  max-width: 640px;
}
.hero-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.btn-primary, .btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  transition: all var(--t-med);
  position: relative;
  overflow: hidden;
}
.btn-primary {
  background: var(--gold);
  color: var(--burgundy-dark);
  box-shadow: var(--glow-gold);
}
.btn-primary::after {
  content: "→";
  display: inline-block;
  transition: transform var(--t-med);
  font-size: 1.1em;
  line-height: 1;
}
.btn-primary:hover {
  background: var(--gold-soft);
  color: var(--burgundy-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(201,169,110,0.55);
}
.btn-primary:hover::after { transform: translateX(5px); }
.btn-ghost {
  background: transparent;
  color: var(--cream);
  border: 1.5px solid rgba(230,211,170,0.5);
}
.btn-ghost:hover {
  background: rgba(230,211,170,0.15);
  border-color: var(--gold-soft);
  color: var(--gold-soft);
  transform: translateY(-2px);
}

/* ============== HERO STATS ============== */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(230,211,170,0.22);
  max-width: 600px;
}
.hstat-num {
  font-family: 'Fraunces', serif;
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.hstat-label {
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-soft);
  opacity: 0.88;
  margin-top: 6px;
  font-weight: 700;
}

/* ============== SECTION CARDS (root) ============== */
.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.1rem;
  margin-bottom: 2.5rem;
}
.section-card {
  background: var(--white);
  padding: 1.5rem 1.4rem;
  border-radius: 10px;
  border: 1px solid var(--rule);
  box-shadow: var(--shadow-sm);
  transition: all var(--t-med);
  color: var(--ink);
  display: block;
  position: relative;
  overflow: hidden;
}
.section-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), var(--gold-soft));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--t-med);
}
.section-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.section-card:hover::before { transform: scaleX(1); }
.card-icon { font-size: 2.1rem; margin-bottom: 0.6rem; line-height: 1; }
.section-card h3 { color: var(--burgundy); margin-bottom: 0.4rem; font-size: 1.3rem; }
.section-card p { color: var(--muted); font-size: 0.92rem; margin-bottom: 0.8rem; }
.card-more {
  font-size: 0.72rem;
  color: var(--gold);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: letter-spacing var(--t-med);
}
.section-card:hover .card-more { letter-spacing: 0.2em; }

/* ============== CALLOUT ============== */
.callout {
  background: var(--white);
  border-left: 4px solid var(--gold);
  padding: 1.6rem 1.9rem;
  border-radius: 0 10px 10px 0;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
}
.callout h2 { color: var(--burgundy); margin-bottom: 0.6rem; }

/* ============== CARD GRID (section pages) ============== */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.9rem;
  margin: 1.2rem 0 2rem;
}
.info-card {
  background: var(--white);
  border: 1px solid var(--rule);
  padding: 1.1rem 1.2rem;
  border-radius: 8px;
  transition: all var(--t-med);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--ink);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}
.info-card:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.info-card h4 {
  color: var(--burgundy);
  margin-bottom: 0.25rem;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: 'Fraunces', serif;
}
.sub-count {
  font-size: 0.7rem;
  color: var(--gold);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.15rem;
}
.card-arrow {
  position: absolute;
  right: 1.1rem;
  top: 1.1rem;
  color: var(--gold);
  font-weight: 700;
  transition: transform var(--t-med);
  opacity: 0.5;
}
.info-card:hover .card-arrow { transform: translateX(4px); opacity: 1; }

/* ============== SG CALLOUT ============== */
.sg-callout {
  background: var(--cream-dark);
  border: 1px solid var(--gold);
  border-radius: 8px;
  padding: 1.4rem 1.6rem;
  margin: 1.5rem 0;
}
.sg-callout h2 { color: var(--burgundy-dark); font-size: 1.3rem; margin-bottom: 0.5rem; }
.sg-callout ul { margin-top: 0.5rem; }
.sg-note {
  background: var(--cream-dark);
  border-left: 3px solid var(--gold);
  padding: 0.95rem 1.2rem;
  border-radius: 0 4px 4px 0;
  margin: 1rem 0;
  font-size: 0.95rem;
}

/* ============== PLACEHOLDER CARD ============== */
.content-placeholder { margin-top: 1rem; }
.placeholder-card {
  background: var(--white);
  border: 1px dashed var(--gold);
  border-radius: 8px;
  padding: 1.4rem 1.6rem;
  box-shadow: var(--shadow-sm);
}
.placeholder-card h3 { margin-bottom: 0.6rem; }
.placeholder-card ol { padding-left: 1.4rem; margin-bottom: 0; }
.placeholder-card li { margin-bottom: 0.4rem; }
.placeholder-card strong { color: var(--burgundy); font-weight: 700; }
.page-nav { margin-top: 2rem; }
.back {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--rule);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--burgundy);
  background: var(--white);
  transition: all var(--t-med);
  font-weight: 600;
}
.back:hover { background: var(--burgundy); color: var(--cream); border-color: var(--burgundy); transform: translateX(-3px); }

/* ============== FOOTER ============== */
.site-footer {
  background: var(--burgundy-dark);
  color: var(--cream);
  padding: 1.5rem 1.5rem;
  margin-top: 3rem;
}
.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.footer-small { font-size: 0.78rem; color: var(--gold-soft); }

/* ============== MOTION: entrance ============== */
.fade-on-load {
  opacity: 0;
  transform: translateY(20px);
  animation: rise var(--t-slow) both;
  animation-delay: var(--delay, 0ms);
}
.fade-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--t-slow), transform var(--t-slow);
  transition-delay: var(--stagger, 0ms);
}
.fade-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
@keyframes rise {
  to { opacity: 1; transform: translateY(0); }
}

/* ============== RESPONSIVE ============== */
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; padding: 1rem 0.8rem 2rem; gap: 1rem; }
  .menu-toggle { display: inline-block; }
  .sidebar {
    position: fixed;
    top: 72px; left: 0;
    width: 85%; max-width: 340px;
    height: calc(100vh - 72px);
    max-height: none;
    border-radius: 0;
    transform: translateX(-105%);
    transition: transform var(--t-med);
    z-index: 90;
    box-shadow: var(--shadow-md);
  }
  body.menu-open .sidebar { transform: translateX(0); }
  .page-header { flex-direction: column; gap: 0.5rem; }
  .page-icon-big { font-size: 2.6rem; }
  .hero { padding: 2.4rem 1.6rem 2rem; }
  .hero-ctas .btn-primary, .hero-ctas .btn-ghost { width: 100%; justify-content: center; }
}

/* ============== REDUCED MOTION ============== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .hero-blob-1, .hero-blob-2 { animation: none !important; }
  .fade-on-load, .fade-on-scroll { opacity: 1 !important; transform: none !important; }
  .sg-badge { animation: none !important; }
}
`;

// ---------- motion.js ----------
const JS = `/* CFC-SG v2 · motion.js */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-on-scroll').forEach(el => el.classList.add('in-view'));
    return;
  }

  // 1. Scroll fade-up with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.fade-on-scroll').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.fade-on-scroll').forEach(function (el) { el.classList.add('in-view'); });
  }

  // 2. Topbar shrink on scroll
  var topbar = document.getElementById('topbar');
  var lastShrunk = false;
  function onScroll() {
    var shrunk = window.scrollY > 40;
    if (shrunk !== lastShrunk) {
      if (topbar) topbar.classList.toggle('shrunk', shrunk);
      lastShrunk = shrunk;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Stat counter animation
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (!target || isNaN(target)) return;
    var duration = 1400;
    var start = null;
    var initial = 0;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(initial + (target - initial) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { counterIO.observe(el); });
  }
})();
`;

// ---------- Write ----------
fs.mkdirSync(OUT, { recursive: true });
// Only wipe paths the generator owns — preserve docs, .git, build-site.js, etc.
for (const name of GENERATED) {
  const p = path.join(OUT, name);
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'assets', 'style.css'), CSS);
fs.writeFileSync(path.join(OUT, 'assets', 'motion.js'), JS);

let written = 0;
for (const p of pages) {
  const dir = path.join(OUT, ...p.pathParts);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(p));
  written++;
}

console.log('Wrote', written, 'pages to', OUT);
