// src/components/owner/ReportItemModal.jsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  X, AlertCircle, CheckCircle, Brain, Upload, Trash2,
  LayoutDashboard, List, Sparkles, Zap, Target, Activity,
  Trophy, TrendingUp
} from 'lucide-react';
import { createLostReport } from '../../api/items';
import Input from '../shared/Input';

/* ─── Constants ─────────────────────────────────────────────── */
const CATEGORIES = [
  'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
  'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
  'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
  'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS','OTHERS',
];
const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA',
];

/* Map backend category code → key under categoriesGrid.items.* */
const CATEGORY_KEY_MAP = {
  PHONES: 'phones', LAPTOPS: 'laptops', DOCUMENTS: 'documents', IDS: 'ids',
  PASSPORTS: 'passports', BAGS: 'bags', WALLETS: 'wallets', KEYS: 'keys',
  ELECTRONICS: 'electronics', CLOTHES: 'clothes', JEWELRY: 'jewelry',
  WATCHES: 'watches', MONEY: 'money', BOOKS: 'books', VEHICLE_ITEMS: 'vehicleItems',
  HEADPHONES: 'headphones', CHARGERS_PHONE: 'chargers', CHARGERS_OTHERS: 'chargers',
  WATER_BOTTLES: 'waterBottles', TOYS: 'toys', MEDICAL_ITEMS: 'medicalItems',
  SPORTS_ITEMS: 'sportsItems', PET_ITEMS: 'petItems', FOOD_CONTAINERS: 'foodContainers',
  UMBRELLAS: 'umbrellas', CALCULATOR: 'calculator', OTHERS: 'otherItems',
};

/* ─── AI pipeline stages — label keys under reportModal.aiStages.* ─── */
const AI_STAGES = [
  { id: 'ingest',   labelKey: 'ingest',   ms: 400 },
  { id: 'nlp',      labelKey: 'nlp',      ms: 500 },
  { id: 'embed',    labelKey: 'embed',    ms: 500 },
  { id: 'image',    labelKey: 'image',    ms: 600 },
  { id: 'geo',      labelKey: 'geo',      ms: 450 },
  { id: 'color',    labelKey: 'color',    ms: 400 },
  { id: 'category', labelKey: 'category', ms: 400 },
  { id: 'rank',     labelKey: 'rank',     ms: 500 },
  { id: 'score',    labelKey: 'score',    ms: 500 },
  { id: 'done',     labelKey: 'done',     ms: 300 },
];

/* ─── Score helpers ─────────────────────────────────────────── */
const safeNum = (v) => {
  const n = Number(v);
  return isNaN(n) ? null : n;
};
const scoreColor = (v) => {
  const n = safeNum(v) ?? 0;
  if (n >= 90) return '#10b981';
  if (n >= 75) return '#1a56db';
  if (n >= 60) return '#f59e0b';
  return '#94a3b8';
};
/* scoreBadge now returns a translation key + style, so it can be localized */
const scoreBadge = (v, t) => {
  const n = safeNum(v) ?? 0;
  if (n >= 90) return { label: t('reportModal.badges.excellent'), bg: '#dcfce7', text: '#166534' };
  if (n >= 75) return { label: t('reportModal.badges.high'),      bg: '#dbeafe', text: '#1e40af' };
  if (n >= 60) return { label: t('reportModal.badges.possible'),  bg: '#fef9c3', text: '#854d0e' };
  return             { label: t('reportModal.badges.low'),        bg: '#f1f5f9', text: '#475569' };
};

const STYLES = `
  @keyframes spin-cw  { to { transform: rotate(360deg);  } }
  @keyframes spin-ccw { to { transform: rotate(-360deg); } }
  @keyframes pulse-ring {
    0%   { transform: scale(0.72); opacity: 0.85; }
    100% { transform: scale(2.5);  opacity: 0;    }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.38); opacity: 0.22; }
    40%           { transform: scale(1);    opacity: 1;    }
  }
  @keyframes scoreReveal {
    0%   { opacity: 0; transform: scale(0.4) translateY(24px); }
    65%  { transform: scale(1.1) translateY(-5px); }
    100% { opacity: 1; transform: scale(1) translateY(0);   }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0);    }
    50%       { box-shadow: 0 0 40px 10px rgba(16,185,129,0.22); }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { transform: translateY(900%);  opacity: 0; }
  }
  @keyframes orbitSpin {
    from { transform: rotate(0deg)   translateX(88px) rotate(0deg);   }
    to   { transform: rotate(360deg) translateX(88px) rotate(-360deg); }
  }
  @keyframes shimmerBar {
    0%   { background-position: -200px 0; }
    100% { background-position:  200px 0; }
  }
  .spin-cw   { animation: spin-cw  1.15s linear infinite; }
  .spin-ccw  { animation: spin-ccw 0.82s linear infinite; }
  .spin-slow { animation: spin-cw  3.2s  linear infinite; }
  .fade-in-up   { animation: fadeInUp   0.42s ease-out forwards; }
  .dot-bounce   { animation: dotBounce  1.2s  ease-in-out infinite; }
  .score-reveal { animation: scoreReveal 0.85s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .glow-pulse   { animation: glowPulse  2.2s  ease-in-out infinite; }
  .scan-line    { animation: scanLine   2.6s  ease-in-out infinite; }
  .shimmer-bar  {
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent);
    background-size: 200px 100%;
    animation: shimmerBar 1.5s ease-in-out infinite;
  }
`;

function AnimatedScore({ target, color, size = '5xl' }) {
  const [val, setVal]   = useState(0);
  const frameRef        = useRef(null);
  useEffect(() => {
    const dur   = 1500;
    const start = performance.now();
    const run   = (now) => {
      const t    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(target * ease);
      if (t < 1) frameRef.current = requestAnimationFrame(run);
      else        setVal(target);
    };
    frameRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);
  return (
    <span className={`text-${size} font-black leading-none`} style={{ color }}>
      {val.toFixed(2)}%
    </span>
  );
}

function ScoreBar({ label, value, delay = 0, compact = false }) {
  const [w, setW] = useState(0);
  const n         = safeNum(value) ?? 0;
  const color     = scoreColor(n);
  useEffect(() => {
    const t = setTimeout(() => setW(Math.min(n, 100)), delay + 50);
    return () => clearTimeout(t);
  }, [n, delay]);
  return (
    <div className={compact ? '' : 'mb-1'}>
      <div className="flex justify-between mb-1">
        <span className={`${compact ? 'text-[11px]' : 'text-xs'} text-gray-500`}>{label}</span>
        <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-bold`} style={{ color }}>{n.toFixed(2)}%</span>
      </div>
      <div className={`${compact ? 'h-1.5' : 'h-2'} bg-gray-100 rounded-full overflow-hidden`}>
        <div className="h-full rounded-full relative overflow-hidden"
             style={{ width: `${w}%`, backgroundColor: color, transition: 'width 1s ease-out' }}>
          <div className="shimmer-bar absolute inset-0" />
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select name={name} value={value} onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   outline-none bg-white text-gray-800 transition-all">
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
    AI PROCESSING SCREEN
═══════════════════════════════════════════════════════════════ */
function AIProcessingScreen({ apiPromise, onDone }) {
  const { t } = useTranslation();
  const [doneStages, setDoneStages] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const apiResult = useRef(null);
  const apiDone = useRef(false);

  useEffect(() => {
    let idx = 0;
    let t2;
    const tick = () => {
      if (idx >= AI_STAGES.length) {
        setAnimDone(true);
        return;
      }
      setDoneStages(p => [...p, AI_STAGES[idx].id]);
      idx++;
      setCurrentIdx(idx);
      if (idx < AI_STAGES.length) t2 = setTimeout(tick, AI_STAGES[idx].ms);
      else t2 = setTimeout(() => setAnimDone(true), 200);
    };
    t2 = setTimeout(tick, AI_STAGES[0].ms);
    return () => clearTimeout(t2);
  }, []);

  useEffect(() => {
    if (!apiPromise) return;
    apiPromise
      .then(res => {
        apiResult.current = res;
        apiDone.current = true;
      })
      .catch(err => {
        apiResult.current = { __error: err?.message || t('reportModal.ai.errNetwork') };
        apiDone.current = true;
      });
  }, [apiPromise, t]);

  useEffect(() => {
    if (!animDone) return;
    const poll = setInterval(() => {
      if (apiDone.current) {
        clearInterval(poll);
        onDone(apiResult.current);
      }
    }, 100);
    return () => clearInterval(poll);
  }, [animDone, onDone]);

  const progress = Math.round((doneStages.length / AI_STAGES.length) * 100);

  return (
    <div className="flex flex-col items-center py-2 fade-in-up select-none">
      <div className="relative flex items-center justify-center mb-7" style={{ width: 220, height: 220 }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute rounded-full" style={{
            width: 220, height: 220,
            border: '2px solid rgba(26,86,219,0.14)',
            animation: `pulse-ring 3s ease-out ${i * 1}s infinite`,
          }} />
        ))}
        <div className="absolute rounded-full spin-slow" style={{ width: 196, height: 196, border: '1.5px dashed rgba(26,86,219,0.18)' }} />
        <svg width="176" height="176" viewBox="0 0 176 176" className="absolute spin-cw">
          <circle cx="88" cy="88" r="80" fill="none" stroke="#e2e8f0" strokeWidth="6.5" />
          <circle cx="88" cy="88" r="80" fill="none" stroke="#1a56db" strokeWidth="6.5" strokeLinecap="round" strokeDasharray="503" strokeDashoffset="360" />
        </svg>
        <div className="absolute flex items-center justify-center rounded-full bg-[#eff6ff] border-2 border-[#bfdbfe]" style={{ width: 64, height: 64 }}>
          <div className="scan-line absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#1a56db]/60 to-transparent" />
          <Brain size={30} style={{ color: '#1a56db' }} />
        </div>
        <div className="absolute top-2 right-2 text-[11px] font-black text-[#1a56db] bg-white rounded-full px-2 py-0.5 shadow border border-blue-100">
          {progress}%
        </div>
      </div>

      <h3 className="text-2xl font-black text-[#0f172a] mb-1.5 tracking-tight text-center">
        {t('reportModal.ai.title')}
      </h3>
      <div className="w-full max-w-sm mb-5">
        <div className="h-3.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full relative overflow-hidden" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#1a56db,#10b981)', transition: 'width 0.4s ease-out' }}>
            <div className="shimmer-bar absolute inset-0" />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 max-w-sm">
        <div className="space-y-1.5">
          {AI_STAGES.map((stage, i) => {
            const isDone = doneStages.includes(stage.id);
            const isCurrent = !isDone && i === currentIdx;
            return (
              <div key={stage.id} className="flex items-center gap-2.5 text-xs" style={{ opacity: isDone || isCurrent ? 1 : 0.25 }}>
                {isDone ? <CheckCircle size={13} className="text-[#10b981]" /> : isCurrent ? <span className="w-3 h-3 rounded-full border-2 border-[#1a56db] border-t-transparent spin-cw" /> : <span className="w-3 h-3 rounded-full bg-gray-200" />}
                <span className={isCurrent ? "text-blue-600 font-bold" : "text-gray-600"}>
                  {t(`reportModal.aiStages.${stage.labelKey}`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
    RESULT SCREEN
═══════════════════════════════════════════════════════════════ */
function ResultScreen({ apiData, onClose, onSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const reportId = apiData?.id;
  const itemName = apiData?.itemName;
  const totalMatches = safeNum(apiData?.totalMatches) ?? 0;
  const matches = Array.isArray(apiData?.matches) ? apiData.matches : [];
  const bestScore = safeNum(apiData?.bestScore ?? matches[0]?.finalScore);

  if (totalMatches === 0 || bestScore == null) {
    return (
      <div className="flex flex-col py-4 fade-in-up text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
          <Brain size={36} className="text-[#1a56db]" />
        </div>
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3.5 py-1 mb-4 mx-auto text-xs font-bold text-green-700">
          <CheckCircle size={13} /> {t('reportModal.result.submittedBadge')}
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">
          {t('reportModal.result.noMatchTitle')}
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
          {t('reportModal.result.noMatchText1')}{' '}
          <span className="font-mono font-bold text-gray-700">{reportId}</span>
          {t('reportModal.result.noMatchText2')}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/owner/dashboard')} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow hover:bg-blue-700 transition-all">
            {t('reportModal.result.dashboard')}
          </button>
          <button onClick={() => { onSuccess?.(); onClose(); }} className="px-5 py-2.5 border border-blue-600 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all">
            {t('reportModal.result.myReports')}
          </button>
        </div>
      </div>
    );
  }

  const badge = scoreBadge(bestScore, t);
  const bestColor = scoreColor(bestScore);
  const circumference = 2 * Math.PI * 58;
  const dashOffset = circumference - (Math.min(bestScore, 100) / 100) * circumference;

  return (
    <div className="flex flex-col py-2 space-y-5 fade-in-up">
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
        <CheckCircle size={16} className="text-[#10b981] shrink-0" />
        <span className="text-sm font-bold text-green-700">{t('reportModal.result.submittedBadge')}</span>
      </div>

      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5">
        <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
          {t('reportModal.result.registeredItem')}
        </p>
        <p className="text-sm font-black text-[#0f172a]">
          {itemName || t('reportModal.result.lostItemFallback')}
        </p>
      </div>

      <div className="rounded-2xl p-5 border-2 text-center" style={{ borderColor: `${bestColor}30`, backgroundColor: `${bestColor}05` }}>
        <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: bestColor }}>
          {t('reportModal.result.highestMatch')}
        </p>
        <div className="flex items-center justify-center gap-6 mb-3">
          <div className="relative w-24 h-24 shrink-0">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="42" fill="none" stroke={`${bestColor}15`} strokeWidth="7" />
              <circle cx="48" cy="48" r="42" fill="none" stroke={bestColor} strokeWidth="7" strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={(2 * Math.PI * 42) - (Math.min(bestScore, 100) / 100) * (2 * Math.PI * 42)} transform="rotate(-90 48 48)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Target size={16} style={{ color: bestColor }} />
            </div>
          </div>
          <div className="text-left">
            <AnimatedScore target={bestScore} color={bestColor} size="4xl" />
            <div className="mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black" style={{ backgroundColor: badge.bg, color: badge.text }}>
                {badge.label}
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 font-bold">
          {t('reportModal.result.totalMatches', { count: totalMatches })}
        </p>
      </div>

      <div className="max-h-[260px] overflow-y-auto space-y-3 pr-1">
        {matches.map((m, i) => {
          const fs = safeNum(m.finalScore) ?? 0;
          const mc = scoreColor(fs);
          return (
            <div key={i} className="border border-[#e2e8f0] rounded-xl p-3 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-50">
                <span className="text-xs font-black text-gray-800">
                  {t('reportModal.result.matchRank', { number: i + 1 })}
                </span>
                <span className="text-sm font-black" style={{ color: mc }}>{fs.toFixed(2)}%</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {m.nameScore != null && <ScoreBar label={t('reportModal.result.scoreLabels.name')} value={m.nameScore} compact />}
                {m.descriptionScore != null && <ScoreBar label={t('reportModal.result.scoreLabels.description')} value={m.descriptionScore} compact />}
                {m.locationScore != null && <ScoreBar label={t('reportModal.result.scoreLabels.location')} value={m.locationScore} compact />}
                {m.dateScore != null && <ScoreBar label={t('reportModal.result.scoreLabels.date')} value={m.dateScore} compact />}
                {m.colorScore != null && <ScoreBar label={t('reportModal.result.scoreLabels.color')} value={m.colorScore} compact />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={() => { onSuccess?.(); onClose(); }} className="flex-1 py-2.5 border-2 border-blue-600 text-blue-600 text-sm font-black rounded-xl hover:bg-blue-50 transition-all">
          {t('reportModal.result.goToMyReports')}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
    CONTAINER BASE WRAPPER
═══════════════════════════════════════════════════════════════ */
export default function ReportItemModal({ onClose, onSuccess }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    itemName: '', description: '', category: '', lostDate: '', region: '',
    area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fieldError, setFieldError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const apiPromiseRef = useRef(null);

  const stepTitles = [
    t('reportModal.steps.basic'),
    t('reportModal.steps.location'),
    t('reportModal.steps.images'),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const validate = () => {
    setFieldError('');
    if (step === 0) {
      if (!form.itemName.trim()) { setFieldError(t('reportModal.errors.itemName')); return false; }
      if (!form.category) { setFieldError(t('reportModal.errors.category')); return false; }
      if (!form.description.trim()) { setFieldError(t('reportModal.errors.description')); return false; }
    }
    if (step === 1) {
      if (!form.region) { setFieldError(t('reportModal.errors.region')); return false; }
      if (!form.area.trim()) { setFieldError(t('reportModal.errors.area')); return false; }
      if (!form.lostDate) { setFieldError(t('reportModal.errors.lostDate')); return false; }
      if (!form.lostLocation.trim()) { setFieldError(t('reportModal.errors.lostLocation')); return false; }
    }
    return true;
  };

  const nextStep = () => { if (validate()) setStep(p => Math.min(p + 1, 2)); };
  const prevStep = () => { setFieldError(''); setStep(p => Math.max(p - 1, 0)); };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setFieldError('');
    setApiError('');

    const rawPayload = {
      itemName: form.itemName,
      description: form.description,
      category: form.category,
      lostDate: form.lostDate,
      region: form.region,
      area: form.area,
      lostLocation: form.lostLocation,
      dominantColor: form.dominantColor || null,
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
      imageUrls: imagePreviews
    };

    const customExecutionWrapper = new Promise(async (resolve) => {
      try {
        const response = await createLostReport(rawPayload);
        resolve(response);
      } catch (err) {
        resolve({ __isInterceptedError: true, message: err?.message });
      }
    });

    apiPromiseRef.current = customExecutionWrapper;
  };

  const handleAiScreenDone = (result) => {
    if (result?.__isInterceptedError) {
      if (result.message === 'Success') {
        setApiError(t('reportModal.errors.statusCodeMismatch'));
        setSubmitting(false);
        return;
      }
      setApiError(result.message || t('reportModal.errors.networkFailed'));
      setSubmitting(false);
      return;
    }

    if (!result) {
      setApiError(t('reportModal.errors.emptyResponse'));
      setSubmitting(false);
      return;
    }

    const extracted = result.data ? result.data : result;

    if (extracted && (extracted.id || Array.isArray(extracted.matches))) {
      setApiData(extracted);
    } else {
      setApiError(t('reportModal.errors.missingEnvelope'));
    }
    setSubmitting(false);
  };

  const categoryOptions = CATEGORIES.map(c => ({
    value: c,
    label: (() => {
      const key = CATEGORY_KEY_MAP[c];
      return key ? t(`categoriesGrid.items.${key}`) : c.replace(/_/g, ' ');
    })(),
  }));

  const regionOptions = REGIONS.map(r => ({
    value: r,
    label: t(`regions.${r}`, r.replace(/_/g, ' ')),
  }));

  return (
    <>
      <style>{STYLES}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden relative">

          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900">
                {t('reportModal.title')}
              </h2>
              <p className="text-xs text-gray-400">
                {t('reportModal.stepOf', { current: step + 1, total: 3 })}: {stepTitles[step]}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 pt-4 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300" style={{ backgroundColor: i <= step ? '#1a56db' : '#f1f5f9' }} />
            ))}
          </div>

          {submitting ? (
            <div className="p-6 overflow-y-auto flex-1">
              <AIProcessingScreen apiPromise={apiPromiseRef.current} onDone={handleAiScreenDone} />
            </div>
          ) : apiData || apiError ? (
            <div className="p-6 overflow-y-auto flex-1">
              {apiError ? (
                <div className="text-center py-6">
                  <AlertCircle size={32} className="text-red-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-800">{apiError}</p>
                  <button onClick={() => { setApiError(''); setApiData(null); }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">
                    {t('reportModal.retrySubmit')}
                  </button>
                </div>
              ) : (
                <ResultScreen apiData={apiData} onClose={onClose} onSuccess={onSuccess} />
              )}
            </div>
          ) : (
            <>
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {fieldError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
                    <AlertCircle size={14} /> <span>{fieldError}</span>
                  </div>
                )}

                {step === 0 && (
                  <div className="space-y-4">
                    <Input
                      label={t('reportModal.fields.itemName')}
                      name="itemName"
                      value={form.itemName}
                      onChange={handleChange}
                      placeholder={t('reportModal.placeholders.itemName')}
                      required
                    />
                    <SelectField
                      label={t('reportModal.fields.category')}
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder={t('reportModal.placeholders.category')}
                      options={categoryOptions}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('reportModal.fields.description')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t('reportModal.placeholders.description')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                      />
                    </div>
                    <Input
                      label={t('reportModal.fields.dominantColor')}
                      name="dominantColor"
                      value={form.dominantColor}
                      onChange={handleChange}
                      placeholder={t('reportModal.placeholders.dominantColor')}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <SelectField
                      label={t('reportModal.fields.region')}
                      name="region"
                      value={form.region}
                      onChange={handleChange}
                      placeholder={t('reportModal.placeholders.region')}
                      options={regionOptions}
                      required
                    />
                    <Input
                      label={t('reportModal.fields.area')}
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder={t('reportModal.placeholders.area')}
                      required
                    />
                    <Input
                      label={t('reportModal.fields.lostDate')}
                      name="lostDate"
                      type="date"
                      value={form.lostDate}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label={t('reportModal.fields.lostLocation')}
                      name="lostLocation"
                      value={form.lostLocation}
                      onChange={handleChange}
                      placeholder={t('reportModal.placeholders.lostLocation')}
                      required
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 text-center py-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Upload size={24} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-700">
                      {t('reportModal.ready.title')}
                    </h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">
                      {t('reportModal.ready.subtitle')}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 0}
                  className={`px-4 py-2 text-sm font-bold ${step === 0 ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {t('common.back')}
                </button>
                {step < 2 ? (
                  <button type="button" onClick={nextStep} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow">
                    {t('common.next')}
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} className="px-5 py-2 bg-emerald-600 text-white text-sm font-black rounded-xl shadow flex items-center gap-1.5">
                    <Sparkles size={14} /> {t('reportModal.submitAndMatch')}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}