import Link from "next/link";
const stages = [
  ["contracts", "قرارداد", "Contract", "قرارداد"],
  ["loading", "بارگیری", "Loading", "بارول"],
  ["tanker-logistics", "حمل", "Transport", "لېږد"],
  ["tank-inventory", "تانک", "Tanks", "ټانک"],
  ["sales", "فروش", "Sales", "پلور"],
  ["accounting", "حسابداری", "Accounting", "حسابداري"],
  ["profit-loss", "مفاد", "Profit", "ګټه"],
];
export default function MashalFlow({language = "fa"}: {language?: "fa" | "en" | "ps"}) {
 const index = language === "en" ? 2 : language === "ps" ? 3 : 1;
 return <nav className="mashal-flow" aria-label={language === "en" ? "From contract to profit" : language === "ps" ? "له قرارداد څخه تر ګټې" : "جریان قرارداد تا مفاد"}>
 {stages.map(([slug, ...names], i) => <Link key={slug} href={`/oil-and-gas-software/${slug}`}><span aria-hidden="true">{i + 1}</span><strong>{names[index - 1]}</strong></Link>)}
 </nav>;
}
