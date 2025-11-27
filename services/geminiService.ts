import { Planet, Language } from "../types";

// 前端服务：构造 prompt，并通过后端路由 `/api/ask` 调用 Gemini
// 安全要点：前端不再直接使用 API 密钥；密钥仅在服务端读取环境变量

export const askPlanetQuestion = async (
  planet: Planet,
  question: string,
  lang: Language
): Promise<string> => {
  try {
    const content = planet[lang];
    
    let systemInstruction = '';
    if (lang === 'zh') {
        systemInstruction = `
        你是一位专业的天文学家，正在向公众科普。
        用户正在询问关于行星：${content.name} 的问题。
        关于该行星的背景信息：${content.detail}。类型：${content.type}。
        用户问题："${question}"
        请提供简明、科学准确且引人入胜的回答（不超过3句话）。
        请使用充满好奇心和探索精神的语气。
        请用中文回答。
        `;
    } else {
        systemInstruction = `
        You are an expert astronomer educating the public.
        The user is asking about the planet: ${content.name}.
        Context about this planet: ${content.detail}. Type: ${content.type}.
        User Question: "${question}"
        Provide a concise, scientifically accurate, yet engaging answer (max 3 sentences). 
        Use a tone that implies wonder and curiosity.
        Please answer in English.
        `;
    }

    // 通过后端路由请求，避免密钥暴露在前端
    const resp = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: systemInstruction, model: 'gemini-2.5-flash' })
    });

    if (!resp.ok) {
      throw new Error(`Server responded with ${resp.status}`);
    }

    const data = await resp.json() as { text?: string };
    return data.text || (lang === 'zh' ? "星星现在保持沉默。" : "I couldn't find an answer in the stars right now.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'zh' 
      ? "深空通讯暂时中断，请稍后再试。" 
      : "Communications with the deep space network are currently down. Please try again.";
  }
};
