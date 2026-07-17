import { FacebookIcon } from "@/components/icons/social-icons";

export function FacebookFeed() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-blue-500/12 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
          <FacebookIcon className="size-4.5" />
        </span>
        <h3 className="text-xl font-semibold">Follow Us on Facebook</h3>
      </div>
      <br />
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbiselahorepunjab&tabs=timeline&width=500&height=600&adapt_container_width=true&hide_cover=false&show_facepile=true"
        className="w-full"
        height="600"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}
