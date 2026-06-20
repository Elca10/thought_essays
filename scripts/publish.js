#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const postsDir = path.join(__dirname, '..', 'posts');
const today    = new Date().toISOString().split('T')[0];

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
let changed  = false;

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const content  = fs.readFileSync(filePath, 'utf8');

  if (content.startsWith('---')) continue; // already formatted

  const lines        = content.split('\n');
  const titleMatch   = lines[0]?.match(/^\*\*(.+?)\*\*/);
  const summaryMatch = lines[1]?.match(/^\*(.+?)\*/);

  if (!titleMatch) {
    console.log(`Skipping ${file}: expected **Title** on line 1`);
    continue;
  }

  const title   = titleMatch[1].trim();
  const summary = summaryMatch ? summaryMatch[1].trim() : '';

  // content starts after the — separator
  let bodyStart = lines.findIndex(l => l.trim() === '—') + 1;
  if (bodyStart === 0) bodyStart = 3;
  while (bodyStart < lines.length && lines[bodyStart].trim() === '') bodyStart++;

  const body = lines.slice(bodyStart).join('\n').trimEnd();

  const fm = ['---', 'layout: post.njk', `title: ${title}`, `date: ${today}`];
  if (summary) fm.push(`summary: ${summary}`);
  fm.push('---');

  fs.writeFileSync(filePath, fm.join('\n') + '\n\n' + body + '\n');
  console.log(`Formatted: ${file}`);
  changed = true;
}

if (!changed) {
  console.log('No unformatted posts found.');
  process.exit(0);
}

try {
  execSync('git add posts/', { stdio: 'inherit' });
  execSync('git commit -m "Publish new post(s)"', { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  console.log('\nPushed — site will redeploy in ~1 minute.');
} catch (e) {
  console.error('Git error:', e.message);
  process.exit(1);
}
