import {
  PRIVACY_EFFECTIVE_DATE,
  PRIVACY_OPERATOR,
  PRIVACY_SECTIONS,
  type PrivacyBlock,
} from "@/data/privacy";
import {
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_HOURS,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
} from "@/data/site";

export function PrivacyPolicy() {
  return (
    <>
      <section className="relative border-b border-border pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">Legal</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Effective date: {PRIVACY_EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="pb-20 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {PRIVACY_SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight text-ink dark:text-white sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </div>
            </div>
          ))}

          <div id="contact" className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-ink dark:text-white sm:text-2xl">
              Contact us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For any question, request or complaint about this policy or your personal
              information, contact {SITE_NAME} ({PRIVACY_OPERATOR}):
            </p>
            <ul className="mt-4 space-y-2 text-base text-muted-foreground">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Privacy`}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href={SUPPORT_PHONE_HREF}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  {SUPPORT_PHONE}
                </a>
              </li>
              <li>Hours: {SUPPORT_HOURS}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ block }: { block: PrivacyBlock }) {
  if (block.kind === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground marker:text-brand">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-base leading-relaxed text-muted-foreground">{block.text}</p>;
}
