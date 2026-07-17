import { FacebookIcon } from "@/components/icons/social-icons";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=100077684865008";

const FACEBOOK_POST_URLS = [
  "https://www.facebook.com/share/v/1L1S21N5vH/",
  "https://www.facebook.com/permalink.php?story_fbid=pfbidExamplePost2&id=100077684865008",
  "https://www.facebook.com/permalink.php?story_fbid=pfbidExamplePost3&id=100077684865008",
];

export function FacebookFeed() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-blue-500/12 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
          <FacebookIcon className="size-4.5" />
        </span>
        <h3 className="text-xl font-semibold">Follow Us on Facebook</h3>
      </div>

      <a
        href={FACEBOOK_PAGE_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-3 text-sm font-medium text-blue-600 hover:underline"
      >
        Open Facebook page
      </a>

      <div className="mt-5 max-h-[760px] space-y-5 overflow-y-auto pr-1">
        {FACEBOOK_POST_URLS.map((postUrl, index) => {
          const postPluginSrc = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}&show_text=true&width=500`;

          return (
            <div
              key={postUrl}
              className="overflow-hidden rounded-xl border border-border bg-background"
              style={{
                marginLeft: `${index * 10}px`,
                marginRight: `${Math.max(0, 20 - index * 10)}px`,
              }}
            >
              <iframe
                src={postPluginSrc}
                className="h-[520px] w-full"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={`Facebook Post ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
