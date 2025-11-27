<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 太阳系科普应用｜开发与部署指引（Vercel，私有仓库，安全最小改造）

> 目标：在保证功能的前提下进行最小改动，将密钥从前端移除，采用 Vercel Serverless 保护密钥；代码仅使用 `main` 分支；GitHub 私有仓库 + Vercel 自动部署；本地开发先验证，得到你的同意后再推送。

查看 AI Studio 原始应用：https://ai.studio/apps/drive/1GYxWIDXLzdocympeSndCBlLjMuoshRf6

## 架构与安全

- 前端（React + Vite）：仅负责界面与请求触发，调用相对路径 `POST /api/ask`。
- 服务端函数（Vercel Serverless）：`api/ask.ts` 在服务端读取 `GEMINI_API_KEY` 并调用 Gemini，不向前端泄露密钥。
- 密钥管理：
  - 生产环境在 Vercel 的 Environment Variables 设置 `GEMINI_API_KEY`。
  - 本地开发通过 `vercel dev` 注入本地环境变量，不再把密钥编译进前端。
- 代码改动（最小集）：
  - 新增 `api/ask.ts`（安全代理）。
  - `services/geminiService.ts` 改为 `fetch('/api/ask')`，保留原有 prompt 逻辑。
  - `vite.config.ts` 移除密钥注入，并将前端端口改为 `5173`，配置 `server.proxy` 将 `/api` 代理到 `http://localhost:3000`（Vercel 本地函数端口）。

## 分支与仓库

- 分支策略：仅使用 `main` 分支（按你的指示）。
- 仓库可见性：GitHub 私有仓库；Vercel 支持对接私有仓库并进行自动部署。
- 提交与审核：本地验证通过后，征得你的同意再推送到 GitHub 并触发 Vercel 部署。
- 敏感文件管理：`.env.local` 已在 `.gitignore` 中（`*.local`），不要将真实密钥写入仓库。

## 本地开发与验证

**前提**：Node.js 已安装；无 VPN 场景下可能需要手动开启网络访问以完成 CLI 登录与依赖安装。

1. 安装依赖：
   - `npm install`
2. 安装并登录 Vercel CLI（二选一）：
   - Homebrew（若可用）：`brew install vercel-cli`
   - NPM 全局：`npm i -g vercel`
   - 登录：`vercel login`
3. 配置本地环境变量（开发环境）：
  - 命令格式：`vercel env add <NAME> <ENV>`，示例：`vercel env add GEMINI_API_KEY development`（按提示粘贴密钥）
  - 或临时注入：在终端运行 `GEMINI_API_KEY=你的密钥 vercel dev`
4. 启动本地服务：
   - 启动 Serverless：`vercel dev`（默认监听 `http://localhost:3000`）
   - 启动前端：`npm run dev`（监听 `http://localhost:5173`，已将 `/api` 代理到 `3000`）
5. 访问：`http://localhost:5173`，选择行星并在问答区提问，观察浏览器网络请求命中 `/api/ask`。
6. 构建检查：`npm run build`（验证 TypeScript 与打包是否通过）。

## 部署到 Vercel（自动化）

1. 将本地代码推送到 GitHub 私有仓库（仅在你确认后执行）。
2. 在 Vercel Dashboard 关联该仓库，选择 Framework 为 Vite（静态前端 + Serverless Functions）。
3. 在 Vercel 项目的 Environment Variables 中设置：
   - `GEMINI_API_KEY`（Production / Preview / Development 根据需要分别设置）
4. 部署：
   - 每次 `main` 分支更新后，Vercel 自动构建并部署。
   - 生产访问路径形如 `https://your-project.vercel.app/`；`/api/ask` 由 Vercel 路由到 `api/ask.ts`。

## 安全要点（密钥不暴露）

- 前端代码与构建产物中不再包含 `GEMINI_API_KEY`（已移除 `vite.config.ts` 的编译期注入）。
- 任何用户访问仅能看到前端 JS，不会获取到服务端环境变量。
- 日志与错误返回统一处理，不泄露服务端栈信息。
- `.env.local` 仅用于本地占位或参考，不用于生产；切勿提交真实密钥。

## 运行与故障排查

- 如果 `/api/ask` 返回 500：检查 Vercel 本地是否注入了 `GEMINI_API_KEY`；并确认网络环境可访问 Gemini API。
- 如果前端请求失败（CORS/网络）：确认已同时运行 `vercel dev` 与 `npm run dev`，并确保 5173 → 3000 的代理生效。
- 如果构建失败：`npm run build` 查看错误；类型问题集中在新增 `api/ask.ts`，可按报错信息调整。

## 变更摘要（便于审计）

- 新增：`api/ask.ts`（服务端安全代理）。
- 更新：`services/geminiService.ts`（前端改为调用后端路由）。
- 更新：`vite.config.ts`（移除密钥注入、端口改为 5173、代理到 3000）。

---

### 原始 AI Studio 说明（保留）

**Prerequisites:**  Node.js

1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app: `npm run dev`
