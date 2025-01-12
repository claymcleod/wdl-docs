import { defineConfig } from "vitepress";
import axios from "axios";

// TODO: change this to the `main` branch once this PR gets merged in:
const url =
  "https://raw.githubusercontent.com/stjude-rust-labs/sprocket-vscode/refs/heads/main/syntaxes/wdl.tmGrammar.json";

/**
 * Gets the current version of the Sprocket TextMate grammar.
 * @returns the TextMate grammar as a JavaScript object
 */
async function getGrammar() {
  try {
    var response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`error occurred: ${error}`);
    throw error;
  }
}

export default defineConfig({
  title: "Workflow Description Language (WDL) Documentation",
  description: "Guides for the Workflow Description Language (WDL).",
  appearance: "force-dark",
  base: "/wdl-docs/",
  themeConfig: {
    /**
     * Logo and site title.
     */
    logo: {
      src: "/logo-only.svg",
      alt: "The Workflow Description Language (WDL) logo.",
    },
    siteTitle: "Documentation",

    /**
     * Navbar.
     */
    nav: [],

    socialLinks: [
      {
        icon: "slack",
        link: "https://join.slack.com/t/openwdl/shared_invite/zt-ctmj4mhf-cFBNxIiZYs6SY9HgM9UAVw",
      },
      { icon: "github", link: "https://github.com/openwdl/wdl-docs" },
    ],

    search: {
      provider: "local",
    },

    /**
     * Sidebar.
     */
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Overview", link: "/getting-started/overview" },
          { text: "Quickstart", link: "/getting-started/quickstart" },
          { text: "Ecosystem", link: "/getting-started/ecosystem" },
          { text: "Values", link: "/getting-started/values" },
        ],
      },
      {
        text: "Reference",
        items: [
          {
            text: "Functions",
            items: [
              {
                text: "Numeric functions",
                link: "/reference/functions/numeric",
              },
              {
                text: "String functions",
                link: "/reference/functions/string",
              },
              {
                text: "File functions",
                link: "/reference/functions/file",
              },
            ],
            collapsed: true,
          },
        ],
      },
    ],
  },
  markdown: {
    theme: "github-dark",
    shikiSetup: async function (highlighter) {
      // Adds the WDL TextMate grammar from the `stjude-rust-labs/sprocket-vscode` repo
      // to the Shiki highlighter.
      await highlighter.loadLanguage(getGrammar());
    },
  },
});
