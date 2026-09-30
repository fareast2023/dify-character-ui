const reply = (status, data) => new Response(JSON.stringify(data), {status, headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
export default async function handler(req) {
  if(req.method !== 'POST') return reply(405,{error:'POSTで送信してください。'});
  const origin=req.headers.get('origin');
  if(origin && origin !== new URL(req.url).origin) return reply(403,{error:'このサイトから送信してください。'});
  const key=process.env.DIFY_API_KEY;
  if(!key) return reply(503,{error:'DIFY_API_KEY が設定されていません。Netlifyで設定後、再デプロイしてください。'});
  let body;
  try { const raw=await req.text(); if(raw.length>12000) return reply(413,{error:'質問が長すぎます。'}); body=JSON.parse(raw); } catch {return reply(400,{error:'送信形式を確認してください。'});}
  if(!body || typeof body.query!=='string' || !body.query.trim() || body.query.length>2000 || typeof body.user!=='string' || !/^[a-zA-Z0-9-]{16,80}$/.test(body.user) || (body.conversation_id && (typeof body.conversation_id!=='string' || !/^[a-zA-Z0-9-]{1,80}$/.test(body.conversation_id)))) return reply(400,{error:'質問や会話情報が正しくありません。新しい会話をお試しください。'});
  try {
    const res=await fetch('https://api.dify.ai/v1/chat-messages',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({inputs:{},query:body.query.trim(),user:body.user,conversation_id:body.conversation_id||'',response_mode:'blocking'}),signal:AbortSignal.timeout(55000)});
    if(!res.ok) return reply(res.status===429?429:502,{error:res.status===429?'利用上限に達しました。時間をおいてお試しください。':'Difyに接続できませんでした。設定・モデルの利用枠を確認し、会話を新しくしてお試しください。'});
    const data=await res.json();
    if(typeof data.answer!=='string') throw new Error('Invalid answer');
    return reply(200,{answer:data.answer,conversation_id:data.conversation_id});
  } catch {return reply(504,{error:'回答を受信できませんでした。少し待ってからお試しください。'});}
}
