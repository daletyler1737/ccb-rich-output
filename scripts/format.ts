/**
 * Rich Output Formatter
 */

type OutputType = 'code' | 'table' | 'diff' | 'json' | 'list' | 'callout' | 'tree'

export function formatCode(content: string, lang = 'bash'): string {
  return `\`\`\`${lang}\n${content}\n\`\`\``
}

export function formatTable(headers: string[], rows: string[][]): string {
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => (r[i] || '').length))
  )

  const headerRow = '| ' + headers.map((h, i) => h.padEnd(colWidths[i])).join(' | ') + ' |'
  const sepRow = '|' + colWidths.map(w => '-'.repeat(w + 2)).join('|') + '|'
  const dataRows = rows.map(r =>
    '| ' + r.map((c, i) => (c || '').padEnd(colWidths[i])).join(' | ') + ' |'
  )

  return [headerRow, sepRow, ...dataRows].join('\n')
}

export function formatDiff(oldStr: string, newStr: string): string {
  const oldLines = oldStr.split('\n')
  const newLines = newStr.split('\n')
  const result: string[] = []

  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    const o = oldLines[i]
    const n = newLines[i]
    if (o === n) {
      result.push(`  ${n || ''}`)
    } else if (o === undefined) {
      result.push(`\x1b[32m+ ${n}\x1b[0m`)
    } else if (n === undefined) {
      result.push(`\x1b[31m- ${o}\x1b[0m`)
    } else {
      result.push(`\x1b[31m- ${o}\x1b[0m`)
      result.push(`\x1b[32m+ ${n}\x1b[0m`)
    }
  }

  return result.join('\n')
}

export function formatJson(content: string, pretty = true): string {
  try {
    const obj = JSON.parse(content)
    return `\`\`\`json\n${JSON.stringify(obj, null, pretty ? 2 : 0)}\n\`\`\``
  } catch {
    return content
  }
}

export function formatCallout(text: string, type: 'info' | 'warning' | 'success' | 'error' = 'info'): string {
  const icons = { info: 'ℹ️', warning: '⚠️', success: '✅', error: '❌' }
  const colors = { info: '36', warning: '33', success: '32', error: '31' }
  const icon = icons[type]
  return `\x1b[${colors[type]}m${icon} ${text}\x1b[0m`
}

export function format(content: string, type: OutputType, options: Record<string, string> = {}): string {
  switch (type) {
    case 'code':
      return formatCode(content, options.lang || 'bash')
    case 'table':
      const headers = (options.headers || '').split(',')
      const rows = (options.rows || '').split(',').reduce((acc: string[][], r, i, a) => {
        if (i % headers.length === 0) acc.push(a.slice(i, i + headers.length))
        return acc
      }, [])
      return formatTable(headers, rows)
    case 'diff':
      return formatDiff(options.old || '', options.new || '')
    case 'json':
      return formatJson(content, options.pretty !== 'false')
    case 'callout':
      return formatCallout(content, (options.calloutType as any) || 'info')
    default:
      return content
  }
}

// CLI
if (import.meta.url.endsWith(process.argv[1]?.replace(/^file:\/\//, '') || '')) {
  const type = (process.argv[2] || 'code') as OutputType
  const content = process.argv.slice(3).join(' ')
  console.log(format(content, type, {}))
}
