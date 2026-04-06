"use client";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shares = [
    {
      name: "LINE",
      color: "bg-[#06C755] hover:bg-[#05a848]",
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.365 9.89c.50 0 .906.405.906.906 0 .499-.406.906-.906.906h-2.527v1.619h2.527c.5 0 .906.406.906.906 0 .5-.406.906-.906.906h-3.434c-.499 0-.906-.406-.906-.906V7.546c0-.5.407-.906.906-.906h3.434c.5 0 .906.407.906.906 0 .5-.406.906-.906.906h-2.527v1.438zm-5.434 4.243c0 .39-.252.735-.625.857-.093.03-.192.047-.294.047-.299 0-.579-.145-.752-.394l-3.514-4.778v4.268c0 .5-.406.906-.906.906-.499 0-.906-.406-.906-.906V7.546c0-.39.252-.735.625-.857.09-.03.187-.046.294-.046.299 0 .579.144.753.392l3.513 4.779V7.546c0-.5.407-.906.906-.906.5 0 .906.407.906.906zm-8.551 0c0 .5-.407.906-.906.906-.5 0-.906-.406-.906-.906V7.546c0-.5.407-.906.906-.906s.906.407.906.906zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.085.923.258 1.058.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967C23.163 14.326 24 12.42 24 10.314"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#155ac2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "Twitter",
      color: "bg-black hover:bg-ink-700",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("連結已複製");
    } catch {
      alert("複製失敗");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-ink-500 mr-1">分享：</span>
      {shares.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${s.color} text-white transition-colors`}
          aria-label={`分享到 ${s.name}`}
        >
          {s.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream-300 hover:bg-cream-400 text-ink-700 transition-colors"
        aria-label="複製連結"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </button>
    </div>
  );
}
