import kahvalti from "@/assets/dish-kahvalti.jpg";
import sicak from "@/assets/dish-sicak.jpg";
import tatli from "@/assets/dish-tatli.jpg";

export type Category = "Yöresel Kahvaltı" | "Şefin Sinisi" | "Sıcak Yemekler" | "Yöresel Tatlılar";
export const CATEGORIES: Category[] = ["Yöresel Kahvaltı", "Şefin Sinisi", "Sıcak Yemekler", "Yöresel Tatlılar"];

export interface Dish { id: string; name: string; desc: string; price: number; category: Category; image: string }
export interface Reservation { id: string; name: string; phone: string; date: string; time: string; guests: number; notes: string; createdAt: string; status: "Bekliyor" | "Onaylandı" | "İptal" }

export const DEFAULT_MENU: Dish[] = [
  { id: "1", name: "Urfa Serpme Kahvaltı", desc: "Bakır sahanlarda 20+ çeşit yöresel lezzet, isot ve köy tereyağı.", price: 950, category: "Yöresel Kahvaltı", image: kahvalti },
  { id: "2", name: "Bostana", desc: "Taze domates, nar ekşisi ve isotla hazırlanan Urfa salatası.", price: 220, category: "Yöresel Kahvaltı", image: kahvalti },
  { id: "3", name: "Şefin Sinisi", desc: "Chef Ali Keskin'in günün seçkilerinden oluşan büyük sini.", price: 1850, category: "Şefin Sinisi", image: sicak },
  { id: "4", name: "Patlıcan Kebabı", desc: "Közde patlıcan ve zırh kıyması, bakır tavada közlenmiş biber.", price: 680, category: "Sıcak Yemekler", image: sicak },
  { id: "5", name: "Ciğer Tava", desc: "Kuyruk yağında, isot ve soğan eşliğinde.", price: 590, category: "Sıcak Yemekler", image: sicak },
  { id: "6", name: "Su Kabağı Tatlısı", desc: "Tahin ve cevizle, gümüş tabakta.", price: 260, category: "Yöresel Tatlılar", image: tatli },
  { id: "7", name: "Şıllık", desc: "İnce yufka, ceviz ve şerbetle yöresel Urfa tatlısı.", price: 280, category: "Yöresel Tatlılar", image: tatli },
];

const MENU_KEY = "astarte_menu";
const RES_KEY = "astarte_reservations";

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
};
const write = (key: string, v: unknown) => localStorage.setItem(key, JSON.stringify(v));

export const getMenu = () => read<Dish[]>(MENU_KEY, DEFAULT_MENU);
export const saveMenu = (m: Dish[]) => write(MENU_KEY, m);
export const getReservations = () => read<Reservation[]>(RES_KEY, []);
export const saveReservations = (r: Reservation[]) => write(RES_KEY, r);
export const addReservation = (r: Omit<Reservation, "id" | "createdAt" | "status">) => {
  const all = getReservations();
  all.unshift({ ...r, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "Bekliyor" });
  saveReservations(all);
};

export const PHONE = "+90 500 000 00 00";
export const WHATSAPP = "https://wa.me/905000000000";
export const ADDRESS = "Cumhuriyet Mah., Şanlıurfa";
export const MAPS = "https://www.google.com/maps/search/?api=1&query=Astarte+Restaurant+Şanlıurfa";
