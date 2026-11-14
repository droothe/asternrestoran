import kahvalti from "@/assets/dish-kahvalti.jpg";
import sicak from "@/assets/dish-sicak.jpg";
import tatli from "@/assets/dish-tatli.jpg";

export type Category = "Kahvaltı" | "Şefin Tadım Menüsü" | "Ana Yemekler" | "Tatlılar";
export const CATEGORIES: Category[] = ["Kahvaltı", "Şefin Tadım Menüsü", "Ana Yemekler", "Tatlılar"];

export interface Dish { id: string; name: string; desc: string; price: number; category: Category; image: string }
export interface Reservation { id: string; name: string; phone: string; date: string; time: string; guests: number; notes: string; createdAt: string; status: "Bekliyor" | "Onaylandı" | "İptal" }

export const DEFAULT_MENU: Dish[] = [
  { id: "1", name: "Anadolu Kahvaltı Seçkisi", desc: "Mevsim peynirleri, fırın ekmeği, ev yapımı reçel ve zeytin.", price: 950, category: "Kahvaltı", image: kahvalti },
  { id: "2", name: "Köz Patlıcan & Yoğurt", desc: "Közlenmiş patlıcan, süzme yoğurt ve soğuk sıkım zeytinyağı.", price: 320, category: "Kahvaltı", image: kahvalti },
  { id: "3", name: "Şefin Tadım Menüsü", desc: "Chef Kerem Arslan'ın mevsimsel ürünlerle hazırladığı seçki.", price: 1850, category: "Şefin Tadım Menüsü", image: sicak },
  { id: "4", name: "Odun Ateşinde Dana", desc: "Yavaş pişmiş dana, köz sebzeler ve otlu tereyağı.", price: 980, category: "Ana Yemekler", image: sicak },
  { id: "5", name: "Mevsim Sebzeleri", desc: "Taş fırında pişirilmiş mevsim sebzeleri ve tahin sosu.", price: 590, category: "Ana Yemekler", image: sicak },
  { id: "6", name: "Bal & Ceviz Tatlısı", desc: "Bal şerbeti, ceviz ve kaymakla tamamlanan hafif tatlı.", price: 360, category: "Tatlılar", image: tatli },
  { id: "7", name: "İrmik Helvası", desc: "Tereyağında kavrulmuş irmik, süt köpüğü ve Antep fıstığı.", price: 320, category: "Tatlılar", image: tatli },
];

const MENU_KEY = "astern_demo_menu";
const RES_KEY = "astern_demo_reservations";

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
};
const write = (key: string, v: unknown) => localStorage.setItem(key, JSON.stringify(v));

export const getMenu = () => read<Dish[]>(MENU_KEY, DEFAULT_MENU);
export const saveMenu = (m: Dish[]) => write(MENU_KEY, m);
const createDemoReservations = (): Reservation[] => {
  const dateAfter = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  };
  const createdAt = new Date().toISOString();
  return [
    { id: "demo-1", name: "Demo Misafir 01", phone: "+90 555 000 00 01", date: dateAfter(1), time: "12:30", guests: 2, notes: "DEMO · Pencere kenarı tercihi", createdAt, status: "Onaylandı" },
    { id: "demo-2", name: "Demo Misafir 02", phone: "+90 555 000 00 02", date: dateAfter(1), time: "19:00", guests: 4, notes: "DEMO · Aile yemeği", createdAt, status: "Bekliyor" },
    { id: "demo-3", name: "Demo Misafir 03", phone: "+90 555 000 00 03", date: dateAfter(2), time: "20:00", guests: 3, notes: "DEMO · Kutlama", createdAt, status: "Onaylandı" },
    { id: "demo-4", name: "Demo Misafir 04", phone: "+90 555 000 00 04", date: dateAfter(3), time: "13:00", guests: 6, notes: "DEMO · Teras masası tercihi", createdAt, status: "Bekliyor" },
  ];
};
export const getReservations = () => {
  const reservations = read<Reservation[] | null>(RES_KEY, null);
  if (reservations !== null) return reservations;

  const demoReservations = createDemoReservations();
  if (typeof window !== "undefined") saveReservations(demoReservations);
  return demoReservations;
};
export const saveReservations = (r: Reservation[]) => write(RES_KEY, r);
export const addReservation = (r: Omit<Reservation, "id" | "createdAt" | "status">) => {
  const all = getReservations();
  all.unshift({ ...r, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "Bekliyor" });
  saveReservations(all);
};

export const PHONE = "+90 555 000 00 00";
export const EMAIL = "rezervasyon@asternrestoran.example";
export const WHATSAPP = "https://wa.me/905550000000";
export const ADDRESS = "Tarihi Yarımada, İstanbul (genel demo konumu)";
export const MAPS = "https://www.google.com/maps/search/?api=1&query=Tarihi+Yarimada+Istanbul";
