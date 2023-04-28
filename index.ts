import { parse } from "std/flags/mod.ts";
import getChatGPTResponse from "./getChatGPTResponse.ts";
import { TerminalSpinner } from "https://deno.land/x/spinners/mod.ts";
import { getImageForKeyword } from "./unsplash.ts";

const autoBlogPrependPrompt = `Write me a blog post written in markdown about`;
const autoBlogAppendedPrompt =
  `Also return a json object containing the title, a short summary for SEO and a single keyword for the article. add ===META=== before the json and after the json.`;
const defaultPrompt =
  "A/B testing in next.js using the edge middleware. Explain the concepts and benefits of A/B testing. The target audience should be technical people. Don't include code snipepts";

const { apiKey, outDir, fileName, prompt, max_tokens, temperature, unsplashAPIKey } = parse(
  Deno.args,
  {
    string: [
      "apiKey",
      "outDir",
      "fileName",
      "prompt",
      "max_tokens",
      "temperature",
      "unsplashAPIKey"
    ],
  },
);

if (!apiKey) {
  console.log("%cPlease provide an API key", "color: red;");
  Deno.exit(1);
}

const encoder = new TextEncoder();

const terminalSpinner = new TerminalSpinner("Generating blog post...");

terminalSpinner.start();
const { text } = await getChatGPTResponse({
  apiKey: apiKey,
  max_tokens: max_tokens ? parseInt(max_tokens, 10) : 100,
  prompt: autoBlogPrependPrompt +
    (prompt ? prompt : defaultPrompt) +
    autoBlogAppendedPrompt,
  temperature: temperature ? parseInt(temperature, 10) : 0.7,
});

// get rid of the first line
const [rawText, rawMeta] = text.replace("\n\n", "").split("===META===");

const meta = JSON.parse(rawMeta.replace("===META===", "")) as {
  title: string;
  summary: string;
  keyword: string;
};

let image: string | null = null;

if(unsplashAPIKey != null) {
  image = await getImageForKeyword(meta.keyword, unsplashAPIKey)
}

const data = encoder.encode(`
import Head from 'next/head';

<Head>
  <title>${meta.title}</title>
  <meta name="description" content="${meta.summary}" />
  <meta name="keywords" content="${meta.keyword}" />
  <meta name="og:title" content="${meta.title}" />
  <meta name="og:description" content="${meta.summary}" />
  ${image != null && '<meta name="og:image" content="${image}" />'}
</Head>

${image != null && `[![${meta.title}](${image})](${image})`}

${rawText}`);

await Deno.writeFile(
  new URL(
    `${outDir ? `./${outDir}` : "."}/${fileName ? fileName : "test"}.mdx`,
    import.meta.url,
  ),
  data,
);

terminalSpinner.succeed("Sucessfully generated blog post!");
