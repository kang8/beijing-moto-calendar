# beijing-moto-calendar

自动生成北京机动车尾号限行日历 `.ics` 文件。这个项目只按北京市交管局公布的尾号轮换规则生成“尾号 5”的限行时间提醒，不判断具体禁行区域，也不区分车辆类型。

默认输出：

- 文件：`dist/plate-5.ics`
- 日历名称：`北京尾号5限行`
- 事件：`🚫 北京尾号5限行`
- 时间：限行日 `07:00–20:00`
- 时区：`Asia/Shanghai`
- 数据来源：北京市交管局官方页面 <https://jtgl.beijing.gov.cn/jgj/lszt/659722/660341/>

## 本地生成

需要 Node.js 20 或更新版本。

```bash
npm ci
npm run generate
```

生成后查看：

```bash
ls dist/plate-5.ics
```

## 修改尾号

默认尾号是 `5`。可以通过环境变量修改：

```bash
PLATE_TAIL=0 npm run generate
```

英文字母尾号会按北京规则作为 `0` 处理。

## iPhone / Apple Calendar 订阅

1. 将仓库推送到 GitHub，并确保 `dist/plate-5.ics` 已提交。
2. 使用 raw 文件地址作为订阅 URL，例如：

```text
https://raw.githubusercontent.com/<username>/beijing-moto-calendar/main/dist/plate-5.ics
```

3. 在 iPhone 上打开“设置”。
4. 进入“日历”。
5. 进入“账户”。
6. 选择“添加账户”。
7. 选择“其他”。
8. 选择“添加已订阅的日历”。
9. 粘贴上面的订阅 URL 并保存。

Apple Calendar 会定期刷新订阅日历。刷新频率由 Apple Calendar 控制。

## 自动更新

GitHub Actions workflow 位于 `.github/workflows/generate.yml`：

- 每年 3、6、9、12 月的 20–28 日每天自动运行一次。
- 支持手动触发 `workflow_dispatch`。
- push 到 `main` 时自动运行。
- 如果 `dist/plate-5.ics` 有变化，会自动提交并推送。

## 解析失败时的 fallback

生成器会优先抓取北京市交管局官方页面并解析限行周期。如果页面无法访问或解析失败，会使用内置 fallback 配置，至少包含：

- `2026-06-29` 至 `2026-09-27`：尾号 5 周五限行
- `2026-09-28` 至 `2026-12-27`：尾号 5 周一限行
- `2026-12-28` 至 `2027-03-28`：尾号 5 周二限行
