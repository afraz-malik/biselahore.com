export function ServiceCard({
  imageSrc,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative h-full min-h-[15rem] overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(95deg,rgba(203,213,225,0.97)_0%,rgba(147,197,253,0.93)_45%,rgba(186,230,253,0.96)_100%)] shadow-sm">
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "contain",
        }}
      />
    </div>
  );
}
