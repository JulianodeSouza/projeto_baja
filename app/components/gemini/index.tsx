import { createUserContent, GoogleGenAI } from "@google/genai";
import { useRef, useState } from "react";
import "./gemini.scss";

// Importa a chave da API do Gemini do arquivo .env
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ID_PDF_REGULATION = import.meta.env.VITE_ID_PDF_REGULATION;
const ID_PDF_PROJECT_DESCRIPTION = import.meta.env
  .VITE_ID_PDF_PROJECT_DESCRIPTION;
const SYSTEM_INSTRUCTIONS = import.meta.env.VITE_SYSTEM_INSTRUCTIONS;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ======================================================
// Cache em memória/localStorage para perguntas/respostas
// - TTL de 10 minutos
// - Busca por pergunta igual ou semelhante (Jaccard/Dice)
// ======================================================

type CacheItem = {
  q: string; // pergunta normalizada (minúsculas, sem pontuação extra)
  raw: string; // pergunta original digitada
  a: string; // resposta do agente
  ts: number; // timestamp em ms (Date.now())
};

// Chave no localStorage e parâmetros
const CACHE_KEY = "geminiQA:cache:v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos
const CACHE_MAX = 50; // limita tamanho do cache
const CACHE_SIM_THRESHOLD = 0.4; // limiar de similaridade (0 a 1)

// Normaliza a pergunta (remove pontuações, acentos ficam como letras Unicode)
function normalizeQuestion(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // mantém letras/números/espaços
    .replace(/\s+/g, " ")
    .trim();
}

// Quebra em tokens por espaço
function tokenize(s: string): Set<string> {
  return new Set(normalizeQuestion(s).split(" ").filter(Boolean));
}

// Similaridade de Jaccard entre conjuntos de tokens
function jaccardSim(a: string, b: string): number {
  const A = tokenize(a);
  const B = tokenize(b);
  if (A.size === 0 && B.size === 0) return 1;
  let inter = 0;
  A.forEach((t) => {
    if (B.has(t)) inter++;
  });
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : inter / union;
}

// Gera bigramas (pares) de caracteres para strings curtas/semelhantes
function bigrams(s: string): string[] {
  const n = normalizeQuestion(s).replace(/ /g, "");
  const out: string[] = [];
  for (let i = 0; i < n.length - 1; i++) out.push(n.slice(i, i + 2));
  return out.length ? out : [n]; // fallback p/ strings com 0/1 caractere
}

// Coeficiente de Dice com bigramas
function diceCoef(a: string, b: string): number {
  const A = bigrams(a);
  const B = bigrams(b);
  const map = new Map<string, number>();
  A.forEach((g) => map.set(g, (map.get(g) || 0) + 1));
  let inter = 0;
  B.forEach((g) => {
    const c = map.get(g) || 0;
    if (c > 0) {
      inter++;
      map.set(g, c - 1);
    }
  });
  const denom = A.length + B.length;
  return denom === 0 ? 0 : (2 * inter) / denom;
}

// Combina métodos para maior robustez
function similarity(a: string, b: string): number {
  return Math.max(jaccardSim(a, b), diceCoef(a, b));
}

// Lê o cache do localStorage e remove itens expirados
function loadCache(): CacheItem[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const arr = raw ? (JSON.parse(raw) as CacheItem[]) : [];
    const now = Date.now();
    const valid = arr.filter((it) => now - it.ts < CACHE_TTL_MS);
    if (valid.length !== arr.length) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(valid));
    }
    return valid;
  } catch {
    return [];
  }
}

// Persiste itens no localStorage (com limite de tamanho)
function saveCache(items: CacheItem[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(items.slice(-CACHE_MAX)));
  } catch {
    // pode falhar em navegação privada; ignoramos
  }
}

// Insere/atualiza uma resposta no cache
function putInCache(rawQuestion: string, answer: string) {
  const items = loadCache();
  const qn = normalizeQuestion(rawQuestion);
  items.push({ q: qn, raw: rawQuestion, a: answer, ts: Date.now() });
  saveCache(items);
}

// Procura resposta por igualdade ou similaridade acima do limiar
function findCachedAnswer(rawQuestion: string): string | null {
  const items = loadCache();
  const qn = normalizeQuestion(rawQuestion);

  // 1) match exato (normalizado), do mais recente para o mais antigo
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].q === qn) return items[i].a;
  }

  // 2) caso não ache exato, tenta similaridade
  let best: { score: number; a: string } | null = null;
  for (let i = items.length - 1; i >= 0; i--) {
    const score = similarity(items[i].raw, rawQuestion);

    if (score >= CACHE_SIM_THRESHOLD) {
      if (!best || score > best.score) best = { score, a: items[i].a };
    }
  }
  return best ? best.a : null;
}

export default function GeminiHelp() {
  const [userQuestion, setUserQuestion]: [string, (value: string) => void] =
    useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Atualiza o textarea diretamente e ajusta a altura (auto-resize)
  function updateTextarea(value: string) {
    if (!textAreaRef.current) return;
    textAreaRef.current.value = value;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  // Envia questão para o agente
  const askGemini = async () => {
    try {
      if (userQuestion.trim() === "") {
        alert("Preencha o campo com alguma pergunta");
        return;
      }

      // 2) Sem cache válido: chama o agente e mostra loading
      setLoading(true);

      // 1) Tenta obter resposta do cache (sem acionar loading)
      const cached = findCachedAnswer(userQuestion);
      if (cached) {
        // Se achou, só exibe e retorna sem consultar o agente
        updateTextarea(cached);
        setAiAnswer(cached);
        setLoading(false);

        return;
      }

      const pdfRegulation = {
        fileData: {
          mimeType: "application/pdf",
          fileUri: `https://generativelanguage.googleapis.com/v1beta/${ID_PDF_REGULATION}`,
        },
      };
      const pdfProjectDescription = {
        fileData: {
          mimeType: "application/pdf",
          fileUri: `https://generativelanguage.googleapis.com/v1beta/${ID_PDF_PROJECT_DESCRIPTION}`,
        },
      };

      const contents = [userQuestion, pdfRegulation, pdfProjectDescription];

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [createUserContent(contents)],
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS,
        },
      });

      const text = result.text || "";
      if (text) {
        updateTextarea(text);
      }

      // Atualiza estados de UI
      setAiAnswer(""); // força re-render imediato
      setLoading(false);
      setAiAnswer(text);

      // 3) Salva no cache para reutilização por até 10 minutos
      if (text) {
        putInCache(userQuestion, text);
      }
    } catch (e) {
      setLoading(false);
      console.error("Erro ao chamar a API do Gemini");
      console.error(e);
    }
  };

  return (
    <div className="container-gemini">
      <p className="title-section">Ajuda com o regulamento</p>

      <p className="subtitle">
        Tem alguma dúvida específica sobre o regulamento?
      </p>
      <p className="assistant-text">Pergunte ao nosso assistente! </p>

      <div className="container-ai">
        <div className="container-input-ai">
          <input
            readOnly={loading}
            className="input-ai"
            type="text"
            placeholder="Digite sua pergunta aqui..."
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askGemini();
              }
            }}
          />
          <button
            disabled={!userQuestion || loading}
            className={`button-ai ${loading ? "button-loading" : ""}`}
            onClick={(e) => askGemini()}
            aria-busy={loading}
            aria-live="polite"
            aria-label={loading ? "Enviando..." : "Enviar"}
            type="button">
            <span className="button-text">Enviar</span>
            {loading && (
              <span className="btn-spinner" aria-hidden="true"></span>
            )}
          </button>
        </div>

        <div className="response-wrapper">
          <textarea
            ref={textAreaRef}
            value={aiAnswer}
            disabled
            placeholder="As respostas aparecerão aqui..."
            className={`ai-response-box ${loading ? "loading" : ""}`}
            name="answer-ai"
            id="answer-ai"
          />

          {loading && (
            <div
              className="loading-overlay"
              aria-live="polite"
              aria-label="Carregando resposta">
              <div className="loading-dots" role="img" aria-hidden>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
