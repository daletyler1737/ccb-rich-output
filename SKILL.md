---
name: ccb-rich-output
description: |
  Rich output formatter / 富文本输出格式化工具
  Converts plain text output into markdown, code blocks, tables, diffs.
  用途：将命令输出格式化为富文本：markdown、代码块、表格、diff。
  触发词 / Triggers: "format output", "markdown result", "syntax highlight", "格式化输出", "代码高亮"
---

# Rich Output Formatter / 富文本格式化器

Formats exec/command output into rich markdown.
将命令行输出格式化为富文本 Markdown。

## 支持类型 / Supported Types

| 类型 Type | 说明 Description |
|-----------|-----------------|
| `code` | 代码块（带语言提示）/ Code block with language hint |
| `table` | Markdown 表格 / Markdown table |
| `diff` | 并排差异对比 / Side-by-side diff |
| `json` | 格式化 JSON / Pretty JSON |
| `list` | 有序/无序列表 / Bullet/numbered list |
| `callout` | 提示框（info/warning/success）/ Callout boxes |

## 使用方法 / Usage

```bash
# 格式化为代码块 / Format as code block
node format.ts --type code --lang bash "echo 'hello'"

# 格式化为表格 / Format as table
node format.ts --type table --headers "Name,Age" --rows "Alice,30,Bob,25"

# 格式化为 diff / Format as diff
node format.ts --type diff old.txt new.txt

# 格式化为 JSON / Format as JSON
node format.ts --type json --pretty '{"key":"value"}'
```

## 示例 / Examples

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

## 调用示例 / Code Examples

```typescript
import { format } from './format.js'

// 代码块
format('code', { content: 'npm run build', lang: 'bash' })

// 表格
format('table', { 
  headers: ['Name', 'Status', 'Age'],
  rows: [['Alice', 'Active', '30'], ['Bob', 'Inactive', '25']]
})

// 提示框
format('callout', { type: 'warning', message: 'This action cannot be undone' })
```
