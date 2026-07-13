import { FacebookIcon } from "@/components/icons/social-icons";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/biselhrofficial/";

export function FacebookFeed() {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    FACEBOOK_PAGE_URL,
  )}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-blue-500/12 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
          <FacebookIcon className="size-4.5" />
        </span>
        <h3 className="text-xl font-semibold">Follow Us on Facebook</h3>
      </div>
      <div className="mt-5 flex-1 overflow-hidden rounded-xl border border-border">
        <iframe
          src={src}
          className="h-125 w-full"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="BISE Lahore Facebook Page"
        />
      </div>
    </div>
  );
}
