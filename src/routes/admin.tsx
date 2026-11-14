import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getMenu, saveMenu, getReservations, saveReservations, type Dish, type Reservation } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Yönetim Paneli — Astern Restoran" },
      { name: "description", content: "Astern Restoran demo rezervasyon ve menü yönetimi." },
      { property: "og:title", content: "Astern Restoran — Yöresel Şef Mutfağı" },
      { property: "og:description", content: "Rezervasyon talepleri ve menü fiyatları." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [tab, setTab] = useState<"res" | "menu">("res");
  const [res, setRes] = useState<Reservation[]>([]);
  const [menu, setMenu] = useState<Dish[]>([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setRes(getReservations()); setMenu(getMenu()); }, []);

  const setStatus = (id: string, status: Reservation["status"]) => {
    const n = res.map((r) => (r.id === id ? { ...r, status } : r));
    setRes(n); saveReservations(n);
  };
  const editDish = (id: string, patch: Partial<Dish>) => setMenu(menu.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const input = "w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none";

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />Siteye dön</Link>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Yönetim <span className="text-gradient-gold italic">Paneli</span></h1>
        <p className="mt-2 text-xs text-muted-foreground">Demo panel: örnek rezervasyonlar dahildir; veriler yalnızca bu tarayıcıda saklanır.</p>
        <div className="mt-8 flex gap-2">
          {([["res", `Rezervasyonlar (${res.length})`], ["menu", "Menü"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full border px-5 py-2 text-sm ${tab === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{l}</button>
          ))}
        </div>

        {tab === "res" ? (
          <div className="mt-6 space-y-3">
            {res.length === 0 && <p className="rounded-sm border border-border bg-card p-8 text-center text-muted-foreground">Henüz rezervasyon talebi yok.</p>}
            {res.map((r) => (
              <div key={r.id} className="grid gap-3 rounded-sm border border-border bg-card p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="text-lg font-semibold">{r.name} · {r.guests} kişi</p>
                  <p className="text-sm text-muted-foreground">{r.date} {r.time} · <a href={`tel:${r.phone}`} className="text-primary">{r.phone}</a></p>
                  {r.notes && <p className="mt-1 text-sm italic text-muted-foreground">“{r.notes}”</p>}
                </div>
                <div className="flex gap-2">
                  {(["Bekliyor", "Onaylandı", "İptal"] as const).map((s) => (
                    <button key={s} onClick={() => setStatus(r.id, s)} className={`rounded-sm border px-3 py-1.5 text-xs ${r.status === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {menu.map((d) => (
              <div key={d.id} className="grid gap-3 rounded-sm border border-border bg-card p-4 sm:grid-cols-[1fr_2fr_120px]">
                <input value={d.name} onChange={(e) => editDish(d.id, { name: e.target.value })} className={input} />
                <input value={d.desc} onChange={(e) => editDish(d.id, { desc: e.target.value })} className={input} />
                <input type="number" value={d.price} onChange={(e) => editDish(d.id, { price: Number(e.target.value) })} className={input} />
              </div>
            ))}
            <button onClick={() => { saveMenu(menu); setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="w-full rounded-sm bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground sm:w-auto">
              {saved ? "Kaydedildi ✓" : "Değişiklikleri Kaydet"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
