import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Recursively collect all .jsx files under src
const files = []
const walk = (d) => {
    for (const f of readdirSync(d)) {
        const p = join(d, f)
        if (statSync(p).isDirectory() && !p.includes('node_modules') && !p.includes('dist')) walk(p)
        else if (p.endsWith('.jsx')) files.push(p)
    }
}
walk('src')

// Ordered replacement map — most specific first
const replacements = [
    // Arbitrary-alpha whites: bg-white/[0.03], border-white/[0.08] etc.
    [/white\/\[([0-9.]+)\]/g, 'ink/[$1]'],
    // Status colors → theme-aware tokens
    [/red-(?:300|400|500)\/(\d+)/g, 'danger/$1'],
    [/border-red-\d+\/\d+/g, 'border-danger'],
    [/text-red-\d+/g, 'text-danger'],
    [/bg-red-\d+\/\d+/g, 'bg-danger'],
    [/fill-red-\d+/g, 'fill-danger'],
    [/emerald-(?:300|400)(?:\/(\d+))?/g, 'success/$1'],
    [/border-emerald-\d+\/\d+/g, 'border-success'],
    [/text-emerald-\d+/g, 'text-success'],
    [/bg-emerald-\d+(?:\/\d+)?/g, 'bg-success'],
    [/text-amber-\d+/g, 'text-warning'],
    [/text-purple-300/g, 'text-neon-purple-light'],
    [/from-blue-500\/20/g, 'from-neon/20'],
    // text-noir is near-black text on gradient buttons — needs to stay dark in light theme
    [/text-noir\b/g, 'text-night'],
    // Overlay scrims: black → night
    [/bg-black\/(\d+)/g, 'bg-night/$1'],
    // Text on dark surfaces: white → ink (theme-aware text)
    [/text-white\/(\d+)/g, 'text-ink/$1'],
    [/text-white\b/g, 'text-ink'],
    // Borders & hairlines: white → ink tint (dark tint in scandi = visible frost)
    [/border-white\/(\d+)/g, 'border-ink/$1'],
    [/border-white\b/g, 'border-ink'],
    [/via-white\/(\d+)/g, 'via-ink/$1'],
    // Background whites become ink tints so scandi glass uses dark frost
    [/bg-white\/(\d+)/g, 'bg-ink/$1'],
    [/bg-white\b/g, 'bg-ink'],
    [/via-white\b/g, 'via-ink']
]

let totalChanges = 0
const perFile = []

for (const f of files) {
    let t = readFileSync(f, 'utf8')
    const before = t
    let fileChanges = 0
    for (const [re, to] of replacements) {
        t = t.replace(re, (m, ...args) => {
            fileChanges++
            if (to.includes('$1')) return to.replace('$1', args[0] ?? '')
            return to
        })
    }
    if (t !== before) {
        writeFileSync(f, t)
        totalChanges += fileChanges
        perFile.push(`${f}: ${fileChanges} replacements`)
    }
}

console.log('=== THEME MIGRATION COMPLETE ===')
console.log('Files touched:', perFile.length)
console.log('Total replacements:', totalChanges)
console.log('---')
perFile.forEach((l) => console.log(l))