import { readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'

const files = []
const walk = (d) => {
    for (const f of readdirSync(d)) {
        const p = join(d, f)
        if (statSync(p).isDirectory() && !p.includes('node_modules') && !p.includes('dist')) walk(p)
        else if (p.endsWith('.jsx') || p.endsWith('.css')) files.push(p)
    }
}
walk('src')

const pattern =
    /(?:bg|text|border|from|to|via|ring|shadow|divide|fill|stroke|decoration|accent|placeholder|caret|outline|selection)-(?:white|noir|neon|graphite|gunmetal|black|gray|slate|zinc|neutral|stone|indigo|blue|purple|violet|sky|cyan|amber|yellow|orange|red|pink|rose|teal|emerald|green|lime)(?:[a-zA-Z0-9/_.-]*)/g

const usage = new Map()
for (const f of files) {
    const t = readFileSync(f, 'utf8')
    const matches = t.match(pattern) || []
    for (const m of new Set(matches)) usage.set(m, (usage.get(m) || 0) + 1)
}

const sorted = [...usage.entries()].sort((a, b) => b[1] - a[1])
console.log('TOTAL UNIQUE COLOR CLASSES:', sorted.length)
for (const [cls, count] of sorted) console.log(`${cls} x${count}`)