const fs = require('fs');
const path = require('path');

const glossaryPath = path.join(__dirname, '..', 'content', 'glossary.json');
const episodesDir = path.join(__dirname, '..', 'content', 'episodes');

const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
const files = fs.readdirSync(episodesDir).filter(f => f.endsWith('.md'));

let totalReplacements = 0;

for (const file of files) {
    const filePath = path.join(episodesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix global rules
    if (glossary.global) {
        for (const [alias, canonical] of Object.entries(glossary.global)) {
            // Be careful to not replace the canonical name itself with itself recursively,
            // but string replace is fine.
            if (alias !== canonical) {
                const regex = new RegExp(alias, 'g');
                content = content.replace(regex, canonical);
            }
        }
    }
    
    // Fix episode-specific rules
    const epMatch = file.match(/ep0?(\d+)/);
    if (epMatch) {
        const epNum = epMatch[1];
        if (glossary.episodes && glossary.episodes[epNum]) {
            for (const [alias, canonical] of Object.entries(glossary.episodes[epNum])) {
                if (alias !== canonical) {
                    const regex = new RegExp(alias, 'g');
                    content = content.replace(regex, canonical);
                }
            }
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed glossary violations in ${file}`);
        totalReplacements++;
    }
}

console.log(`Glossary sweep complete. Fixed ${totalReplacements} files.`);
