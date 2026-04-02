---
name: ccb-rich-output
description: |
  Rich output formatter for exec results. Converts plain text output into
  markdown, code blocks with syntax highlighting, tables, diffs.
  Use when: displaying code output, building reports, formatting tool results.
  Triggers: "format output", "markdown result", "syntax highlight", "table format".
---

# Rich Output Formatter

Formats exec/command output into rich markdown.

## Usage

```bash
# Format as markdown code block
node format.ts --type code --lang bash "echo 'hello'"

# Format as table
node format.ts --type table --headers "Name,Age" --rows "Alice,30,Bob,25"

# Format as diff
node format.ts --type diff old.txt new.txt

# Format as JSON
node format.ts --type json --pretty '{"key":"value"}'
```

## Supported Types

| Type | Description |
|------|-------------|
| `code` | Code block with language hint |
| `table` | Markdown table |
| `diff` | Side-by-side diff |
| `json` | Pretty JSON |
| `list` | Bullet/numbered list |
| `callout` | Warning/info/success boxes |

## Examples

```typescript
import { format } from './format.js'

format('code', { content: 'ls -la', lang: 'bash' })
// ```bash
// ls -la
// ```

format('table', { headers: ['Name','Age'], rows: [['Alice',30]] })
// | Name   | Age |
// |--------|-----|
// | Alice  | 30  |
```
