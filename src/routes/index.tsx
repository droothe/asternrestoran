import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Car, Sprout, ChefHat, MapPin, Phone, MessageCircle, Clock, Instagram, Newspaper, Star, CalendarCheck, UtensilsCrossed, Check } from "lucide-react";
import hero from "@/assets/hero-astarte.jpg";
import { CATEGORIES, DEFAULT_MENU, getMenu, addReservation, type Category, type Dish, PHONE, WHATSAPP, ADDRESS, MAPS } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "astarterestoran — Chef Ali Keskin | Urfa Şef Restoranı" },
      { name: "description", content: "Tarladan sofraya ilk yöresel şef restoranı. 400 çeşit Urfa yemeği, yöresel kahvaltı ve online masa rezervasyonu." },
      { property: "og:title", content: "astarterestoran — Chef Ali Keskin" },
      { property: "og:description", content: "400 çeşit Urfa yemeği ve yöresel kahvaltı. Masanızı hemen ayırtın." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const btnGold = "inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-sm border border-primary/50 px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-primary/10";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.35em] text-primary";

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 md:pb-0">
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Reservation />
      <Press />
      <Contact />
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Astarte Restaurant · Chef Ali Keskin · <Link to="/admin" className="hover:text-primary">Yönetim</Link>
      </footer>
      <MobileBar />
    </div>
  );
}

function Nav() {
  const links = [["#hikaye", "Hikayemiz"], ["#menu", "Menü"], ["#rezervasyon", "Rezervasyon"], ["#basin", "Basın"], ["#iletisim", "İletişim"]];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#" className="min-w-0 font-display text-2xl font-semibold tracking-[0.25em] text-gradient-gold">ASTARTE</a>
        <nav className="hidden gap-8 text-sm md:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="text-muted-foreground transition-colors hover:text-primary">{l}</a>)}
        </nav>
        <a href="#rezervasyon" className="hidden rounded-sm bg-gradient-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground md:inline-flex">Rezervasyon</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end">
      <img src={hero} alt="Astarte Restaurant taş kemerli salon ve Chef Ali Keskin" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:pb-28">
        <p className={`${eyebrow} fade-up`}>Chef Ali Keskin · Şanlıurfa</p>
        <h1 className="fade-up mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl md:text-8xl" style={{ animationDelay: ".1s" }}>
          Tarladan Sofraya <span className="italic text-gradient-gold">İlk Yöresel</span> Şef Restoranı
        </h1>
        <p className="fade-up mt-6 max-w-xl text-base text-muted-foreground md:text-lg" style={{ animationDelay: ".2s" }}>
          Taş kemerler, bakır kaplar ve 400 çeşit Urfa yemeği. Asırlık tarifler, bir şefin elinde yeniden doğuyor.
        </p>
        <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: ".3s" }}>
          <a href="#menu" className={btnGhost}><UtensilsCrossed className="h-4 w-4" />Menüyü İncele</a>
          <a href="#rezervasyon" className={btnGold}><CalendarCheck className="h-4 w-4" />Masa Rezerve Et</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const feats = [
    { icon: Car, t: "Otopark Mevcut", d: "Misafirlerimize özel ücretsiz otopark." },
    { icon: ChefHat, t: "İlk Yöresel Şef Restoranı", d: "Urfa mutfağını şef dokunuşuyla sunan ilk adres." },
    { icon: Sprout, t: "Günlük & Taze Malzemeler", d: "Her sabah yerel üreticiden, tarladan sofraya." },
  ];
  return (
    <section id="hikaye" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className={eyebrow}>Hikayemiz</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Bir ustanın <span className="italic text-primary">sofrası</span></h2>
        </div>
        <div className="space-y-5 text-muted-foreground">
          <p>Çocukluğumun Urfa mutfağında, annemin bakır tencerelerinden yükselen kokularla büyüdüm. Astarte, o kokuları unutulmaya bırakmamak için kuruldu.</p>
          <p>Her tabak, yöremizin topraklarından gelen taze malzemeyle ve asırlık tariflere duyduğumuz saygıyla hazırlanıyor.</p>
          <p className="font-display text-3xl italic text-gradient-gold">— Chef Ali Keskin</p>
        </div>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {feats.map(({ icon: I, t, d }) => (
          <div key={t} className="group rounded-sm border border-border bg-card p-7 transition-colors hover:border-primary/60">
            <I className="h-7 w-7 text-primary" />
            <h3 className="mt-5 text-2xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Menu() {
  const [menu, setMenu] = useState<Dish[]>(DEFAULT_MENU);
  const [cat, setCat] = useState<Category>("Yöresel Kahvaltı");
  useEffect(() => setMenu(getMenu()), []);
  const items = menu.filter((d) => d.category === cat);
  return (
    <section id="menu" className="scroll-mt-16 border-y border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className={eyebrow}>Öne Çıkan Lezzetler</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl"><span className="text-gradient-gold">400</span> Çeşit Urfa Yemeği</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Yöresel kahvaltıdan şefin sinisine, her gün yeniden.</p>
        </div>
        <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 md:justify-center">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-5 py-2 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/60"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <article key={d.id} className="fade-up overflow-hidden rounded-sm border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden"><img src={d.image} alt={d.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-2xl font-semibold">{d.name}</h3>
                  <span className="shrink-0 font-semibold text-primary">₺{d.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </article>
          ))}
          {items.length === 0 && <p className="col-span-full text-center text-muted-foreground">Bu kategoride yemek yok.</p>}
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const [done, setDone] = useState(false);
  const input = "w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    addReservation({ name: String(f.get("name")), phone: String(f.get("phone")), date: String(f.get("date")), time: String(f.get("time")), guests: Number(f.get("guests")), notes: String(f.get("notes") ?? "") });
    setDone(true);
    e.currentTarget.reset();
  };
  return (
    <section id="rezervasyon" className="mx-auto max-w-3xl scroll-mt-16 px-5 py-24 md:py-32">
      <div className="text-center">
        <p className={eyebrow}>Hızlı Rezervasyon</p>
        <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Masanızı Ayırtın</h2>
        <p className="mt-4 text-muted-foreground">DM beklemeden, bir dakikada talebinizi iletin.</p>
      </div>
      {done ? (
        <div className="fade-up mt-12 rounded-sm border border-primary/50 bg-card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-gold"><Check className="h-7 w-7 text-primary-foreground" /></div>
          <h3 className="mt-5 text-3xl font-semibold">Talebiniz alındı</h3>
          <p className="mt-2 text-muted-foreground">En kısa sürede sizi arayarak onaylayacağız.</p>
          <button onClick={() => setDone(false)} className={`${btnGhost} mt-6`}>Yeni Talep</button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-12 grid gap-4 rounded-sm border border-border bg-card p-6 sm:grid-cols-2 md:p-10">
          <input required name="name" placeholder="Ad Soyad" className={input} />
          <input required name="phone" type="tel" placeholder="Telefon" className={input} />
          <input required name="date" type="date" className={input} />
          <input required name="time" type="time" className={input} />
          <select required name="guests" defaultValue="2" className={`${input} sm:col-span-2`}>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{i + 1} Kişi</option>)}
          </select>
          <textarea name="notes" rows={3} placeholder="Özel notlar (doğum günü, alerji...)" className={`${input} sm:col-span-2`} />
          <button type="submit" className={`${btnGold} sm:col-span-2`}>Rezervasyon Talebi Gönder</button>
        </form>
      )}
    </section>
  );
}

function Press() {
  const cards = [
    { icon: Star, t: "Ömür Akkor Ziyareti", d: "Ünlü gastronomi yazarı Ömür Akkor, Astarte sofrasında Urfa mutfağını tattı." },
    { icon: Newspaper, t: "Basında Astarte", d: "“Urfa mutfağının şef dokunuşuyla buluştuğu ilk adres.”" },
    { icon: Instagram, t: "@astarterestaurant", d: "Mutfaktan günlük kareler ve yeni lezzetler için bizi takip edin.", href: "https://instagram.com/astarterestaurant" },
  ];
  return (
    <section id="basin" className="scroll-mt-16 border-y border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <p className={`${eyebrow} text-center`}>Basında Biz</p>
        <h2 className="mt-4 text-center text-4xl font-semibold md:text-6xl">Değerli Konuklarımız</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: I, t, d, href }) => {
            const body = (<><I className="h-6 w-6 text-primary" /><h3 className="mt-6 text-2xl font-semibold">{t}</h3><p className="mt-3 text-sm text-muted-foreground">{d}</p></>);
            return href
              ? <a key={t} href={href} target="_blank" rel="noreferrer" className="rounded-sm border border-border bg-background p-8 transition-colors hover:border-primary/60">{body}</a>
              : <div key={t} className="rounded-sm border border-border bg-background p-8">{body}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="iletisim" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className={eyebrow}>İletişim & Konum</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Sizi bekliyoruz</h2>
          <div className="mt-10 space-y-5 text-muted-foreground">
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" />{ADDRESS}</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-primary">{PHONE}</a></p>
            <p className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" />Her gün 08:00 – 23:00</p>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <a href={MAPS} target="_blank" rel="noreferrer" className={btnGold}><MapPin className="h-4 w-4" />Yol Tarifi Al (Google Maps)</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className={btnGhost}><MessageCircle className="h-4 w-4" />WhatsApp İletişim</a>
        </div>
      </div>
    </section>
  );
}

function MobileBar() {
  const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px]";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur md:hidden">
      <a href="#menu" className={`${item} text-muted-foreground`}><UtensilsCrossed className="h-5 w-5" />Menü</a>
      <a href="#rezervasyon" className={`${item} bg-gradient-gold font-semibold text-primary-foreground`}><CalendarCheck className="h-5 w-5" />Rezervasyon</a>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className={`${item} text-muted-foreground`}><MessageCircle className="h-5 w-5" />WhatsApp</a>
    </nav>
  );
}
