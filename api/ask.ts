// Vercel Serverless Function: Secure Gemini proxy
// 目的：在服务端调用 Gemini API，前端不接触或暴露 `GEMINI_API_KEY`
// 适用部署：Vercel（Node.js Serverless Functions），文件路径固定为 `api/*`

import { GoogleGenAI } from "@google/genai";

// 注意：在 Vercel 项目设置中配置环境变量 `GEMINI_API_KEY`
// 该函数仅接受 POST 请求，入参为 { prompt: string, model?: string }
export default async function handler(req: any, res: any) {
  try {
    // 方法校验：仅允许 POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // 解析请求体
    const { prompt, model } = (req.body ?? {}) as {
      prompt?: string;
      model?: string;
    };

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'prompt'" });
    }

    // 从服务端环境读取密钥（不会出现在前端 bundle 中）
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Server configuration error: GEMINI_API_KEY not set" });
    }

    const ai = new GoogleGenAI({ apiKey });

    // 进行模型调用（保留最小改动：前端已构造完整 prompt）
    const response = await ai.models.generateContent({
      model: model || "gemini-2.5-flash",
      contents: prompt,
    });

    // 返回纯文本结果；也可返回完整元数据（根据需要扩展）
    return res.status(200).json({ text: response.text ?? "" });
  } catch (err: any) {
    // 异常处理：统一错误信息，避免泄露服务端细节
    console.error("[api/ask] Error:", err);
    return res.status(500).json({ error: "AI service unavailable" });
  }
}

