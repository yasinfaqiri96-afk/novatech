import styles from "@/components/ServiceFaq.module.css";

export type FaqItem = { question: string; answer: string };

export default function ServiceFaq({
  items,
  heading = "سوالات متداول",
  className,
}: {
  items: FaqItem[];
  heading?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={className ? `${styles.root} ${className}` : styles.root} aria-labelledby="service-faq-title">
      <h2 id="service-faq-title" className={styles.heading}>{heading}</h2>
      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.question} className={styles.item}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
