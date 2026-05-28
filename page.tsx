"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Skull, Image, Wand2, Save, Copy, RefreshCw, MessageCircle, CalendarDays, Download, User, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const styles = ["Black & Grey Realism", "XR Series", "Beneath The Surface", "Dark Surreal", "Lettering", "Skull / Smoke", "Religious Symbolism", "Biker / Road"];
const placements = ["Forearm", "Upper Arm", "Chest", "Back", "Leg", "Hand", "Neck", "Ribs"];
const moods = ["dark", "clean", "brutal", "emotional", "spiritual", "minimal", "cinematic"];
const sizes = ["small", "medium", "large", "full sleeve"];
const promptParts: Record<string, string> = {
  "Black & Grey Realism": "black and grey realism tattoo design, high detail, smooth shading, realistic depth",
  "XR Series": "experimental xray tattoo style, bones, smoke, negative space, anatomical depth",
  "Beneath The Surface": "beneath the surface tattoo concept, hidden meaning, layered shadows, inner conflict",
  "Dark Surreal": "dark surreal tattoo concept, symbolic, dreamlike, dramatic contrast",
  "Lettering": "custom gothic lettering tattoo design, bold composition, readable typography",
  "Skull / Smoke": "skull and smoke tattoo motive, dramatic shadows, cracked texture, gritty realism",
  "Religious Symbolism": "religious symbolism tattoo, cross, light and shadow, meaningful composition",
  "Biker / Road": "motorcycle road freedom tattoo concept, asphalt, horizon, raw lifestyle energy"
};

type FormState = { idea: string; style: string; placement: string; mood: string; size: string; details: string; };
function buildPrompt({ idea, style, placement, mood, size, details }: FormState) {
  return `${promptParts[style]}. Motive: ${idea || "custom symbolic tattoo motive"}. Placement: ${placement}. Size: ${size}. Mood: ${mood}. ${details ? `Details: ${details}.` : ""} Designed for a professional tattoo stencil, strong readable composition, clean negative space, no random text, no copied artwork, original design.`;
}
function buildWhatsAppMessage({ idea, style, placement, mood, size, details }: FormState) {
  return `NEW DAWN TATTOOZ%0A%0ATattoo Anfrage:%0A%0AMotiv: ${encodeURIComponent(idea)}%0AStyle: ${encodeURIComponent(style)}%0AKörperstelle: ${encodeURIComponent(placement)}%0AGröße: ${encodeURIComponent(size)}%0AMood: ${encodeURIComponent(mood)}%0ADetails: ${encodeURIComponent(details)}%0A%0AAuthenticity over image.`;
}

export default function TattooMotiveApp() {
  const [idea, setIdea] = useState("Skull, smoke, broken smiley, hidden meaning");
  const [style, setStyle] = useState(styles[1]);
  const [placement, setPlacement] = useState("Forearm");
  const [mood, setMood] = useState("dark");
  const [size, setSize] = useState("medium");
  const [details, setDetails] = useState("black background, strong contrast, NEW DAWN energy");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState<any[]>([]);
  const state = { idea, style, placement, mood, size, details };
  const prompt = useMemo(() => buildPrompt(state), [idea, style, placement, mood, size, details]);
  const whatsappUrl = useMemo(() => `https://wa.me/?text=${buildWhatsAppMessage(state)}`, [idea, style, placement, mood, size, details]);

  const randomize = () => {
    const ideas = ["open book, cross, clouds and memory", "grenade sticker, skull texture, yellow smiley contrast", "empty road, broken line, freedom symbol", "angel statue, cracked face, smoke", "raven, candle, hidden skull", "motorcycle helmet, storm mask, anti image concept", "church window, broken light, black roses", "xray skull, smoke, fractured identity"];
    setIdea(ideas[Math.floor(Math.random() * ideas.length)]);
    setStyle(styles[Math.floor(Math.random() * styles.length)]);
    setPlacement(placements[Math.floor(Math.random() * placements.length)]);
    setMood(moods[Math.floor(Math.random() * moods.length)]);
    setSize(sizes[Math.floor(Math.random() * sizes.length)]);
  };
  const copyPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  const saveIdea = () => setSaved([{ id: Date.now(), idea, style, placement, mood, size, details, prompt }, ...saved].slice(0, 5));
  const exportText = () => { const blob = new Blob([prompt], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "new-dawn-tattoo-prompt.txt"; a.click(); URL.revokeObjectURL(url); };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl shadow-xl">ND</div>
              <div><h1 className="text-2xl font-black tracking-tight">MOTIVE GENERATOR</h1><p className="text-[10px] text-zinc-400 tracking-[0.28em]">NEW DAWN TATTOOZ</p></div>
            </div>
            <div className="h-10 w-10 rounded-full border border-zinc-800 flex items-center justify-center"><Smartphone className="h-5 w-5 text-zinc-400" /></div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">Tattoo-Ideen, KI-Prompts, Beratungsdaten und WhatsApp-Anfrage in einem dunklen NEW DAWN System.</p>
        </motion.div>
        <Card className="bg-zinc-950 border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"><CardContent className="p-4 space-y-4">
          <div className="rounded-3xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-4"><div className="flex items-center gap-2 mb-2 text-zinc-300"><User className="h-4 w-4" /><span className="text-xs uppercase tracking-widest">Kundenidee</span></div><textarea value={idea} onChange={(e) => setIdea(e.target.value)} className="w-full min-h-24 rounded-2xl bg-black border border-zinc-800 p-3 text-sm outline-none focus:border-white" /></div>
          <div className="grid grid-cols-2 gap-3"><Select label="Style" value={style} setValue={setStyle} options={styles} /><Select label="Stelle" value={placement} setValue={setPlacement} options={placements} /><Select label="Mood" value={mood} setValue={setMood} options={moods} /><Select label="Größe" value={size} setValue={setSize} options={sizes} /></div>
          <label className="block"><span className="text-xs text-zinc-500 uppercase tracking-widest">Extra Details</span><input value={details} onChange={(e) => setDetails(e.target.value)} className="mt-2 w-full rounded-2xl bg-black border border-zinc-800 p-3 text-sm outline-none focus:border-white" /></label>
          <div className="grid grid-cols-2 gap-2"><Button onClick={randomize} className="rounded-2xl bg-zinc-800 hover:bg-zinc-700"><RefreshCw className="h-4 w-4 mr-2" /> Random</Button><Button onClick={copyPrompt} className="rounded-2xl bg-white text-black hover:bg-zinc-200"><Copy className="h-4 w-4 mr-2" /> {copied ? "Kopiert" : "Prompt"}</Button><Button onClick={saveIdea} className="rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800"><Save className="h-4 w-4 mr-2" /> Speichern</Button><Button onClick={exportText} className="rounded-2xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800"><Download className="h-4 w-4 mr-2" /> Export</Button></div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="block"><Button className="w-full rounded-2xl bg-green-600 hover:bg-green-500 text-white"><MessageCircle className="h-4 w-4 mr-2" /> Anfrage per WhatsApp vorbereiten</Button></a>
        </CardContent></Card>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5"><Card className="bg-zinc-950 border-zinc-800 rounded-3xl"><CardContent className="p-4"><div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><Wand2 className="h-4 w-4" /><h2 className="font-bold">Generierter KI-Prompt</h2></div><Sparkles className="h-4 w-4 text-zinc-500" /></div><p className="text-sm leading-relaxed text-zinc-300">{prompt}</p></CardContent></Card></motion.div>
        <div className="grid grid-cols-3 gap-3 mt-5"><Mini icon={<Skull />} title="Dark" /><Mini icon={<Image />} title="Stencil" /><Mini icon={<CalendarDays />} title="Booking" /></div>
        {saved.length > 0 && <div className="mt-5 space-y-3"><h3 className="text-xs uppercase tracking-[0.25em] text-zinc-500">Saved Archive</h3>{saved.map((item) => <Card key={item.id} className="bg-zinc-950 border-zinc-900 rounded-2xl"><CardContent className="p-3"><p className="text-sm font-bold">{item.idea}</p><p className="text-xs text-zinc-500 mt-1">{item.style} · {item.placement} · {item.size}</p></CardContent></Card>)}</div>}
        <div className="mt-6 text-center text-[10px] tracking-[0.28em] text-zinc-600">AUTHENTICITY OVER IMAGE</div>
      </div>
    </div>
  );
}
function Select({ label, value, setValue, options }: { label: string; value: string; setValue: (v: string) => void; options: string[] }) { return <label className="block"><span className="text-xs text-zinc-500 uppercase tracking-widest">{label}</span><select value={value} onChange={(e) => setValue(e.target.value)} className="mt-2 w-full rounded-2xl bg-black border border-zinc-800 p-3 text-sm outline-none focus:border-white">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function Mini({ icon, title }: { icon: React.ReactNode; title: string }) { return <div className="rounded-2xl bg-zinc-950 border border-zinc-900 p-3 text-center text-zinc-400"><div className="flex justify-center mb-2 [&_svg]:h-5 [&_svg]:w-5">{icon}</div><div className="text-xs uppercase tracking-widest">{title}</div></div>; }
