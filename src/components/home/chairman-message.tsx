import { Quote } from "lucide-react";

export function ChairmanMessage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9">
      <Quote className="size-9 text-primary/30" />
      <h3 className="mt-4 text-xl font-semibold">Message from the Chairman</h3>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
        <p>Dear Esteemed Students, Parents, and Teachers,</p>
        <p>
          I am highly delighted to extend my heartfelt welcome to you all. At
          BISE Lahore, we are committed to ensuring the highest standards in
          education. Our unwavering dedication to the seamless conduct of
          Secondary and Higher Secondary School Examinations guarantees not
          only timely but also transparent results.
        </p>
        <p>
          Understanding the importance of swift academic services, we have
          implemented a rapid student support system. Furthermore, our
          state-of-the-art automated online fast-tracking system is designed
          to enhance efficiency, ensuring a smooth academic journey for every
          student. Together, let us forge a path of excellence in education.
          Transparent evaluation is our priority.
        </p>
      </div>
      <div className="mt-7 border-t border-border pt-5">
        <p className="text-base font-semibold">Engr. Dr. Badar-ul-Islam</p>
        <p className="text-sm text-muted-foreground">Chairman, BISE Lahore</p>
      </div>
    </div>
  );
}
