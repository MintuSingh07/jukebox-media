import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BRANDS_SOURCES = {
  unilever: [
    "https://logo.clearbit.com/unilever.com?size=400",
    "https://www.logo.wine/a/logo/Unilever/Unilever-Logo.wine.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Unilever_text_logo.svg/330px-Unilever_text_logo.svg.png"
  ],
  vaseline: [
    "https://logo.clearbit.com/vaseline.com?size=400",
    "https://www.logo.wine/a/logo/Vaseline/Vaseline-Logo.wine.png"
  ],
  dove: [
    "https://logo.clearbit.com/dove.com?size=400",
    "https://www.logo.wine/a/logo/Dove_(brand)/Dove_(brand)-Logo.wine.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dove_wordmark.svg/330px-Dove_wordmark.svg.png"
  ],
  closeup: [
    "https://logo.clearbit.com/closeup.com?size=400",
    "https://www.logo.wine/a/logo/Closeup_(toothpaste)/Closeup_(toothpaste)-Logo.wine.png"
  ],
  lakme: [
    "https://logo.clearbit.com/lakmeindia.com?size=400",
    "https://www.logo.wine/a/logo/Lakm%C3%A9/Lakm%C3%A9-Logo.wine.png"
  ],
  minimalist: [
    "https://logo.clearbit.com/beminimalist.co?size=400"
  ],
  surfexcel: [
    "https://logo.clearbit.com/surfexcel.in?size=400",
    "https://www.logo.wine/a/logo/Surf_Excel/Surf_Excel-Logo.wine.png"
  ],
  vim: [
    "https://logo.clearbit.com/vim.in?size=400",
    "https://www.logo.wine/a/logo/Vim_(brand)/Vim_(brand)-Logo.wine.png"
  ]
};

export async function GET() {
  const targetDir = path.join(process.cwd(), "public", "brands");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const results: Record<string, { success: boolean; url?: string; error?: string }> = {};

  for (const [brand, urls] of Object.entries(BRANDS_SOURCES)) {
    let downloaded = false;
    let lastError = "";

    for (const url of urls) {
      try {
        console.log(`Fetching ${brand} from ${url}...`);
        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });

        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          const destPath = path.join(targetDir, `${brand}.png`);
          fs.writeFileSync(destPath, buffer);
          results[brand] = { success: true, url };
          downloaded = true;
          break;
        } else {
          lastError = `HTTP Status ${res.status}`;
        }
      } catch (err: any) {
        lastError = err.message || String(err);
      }
    }

    if (!downloaded) {
      results[brand] = { success: false, error: lastError };
    }
  }

  return NextResponse.json({ results });
}
