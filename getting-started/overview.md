---
outline: deep
---

# Overview

The **Workflow Description Language (WDL)** (pronounced as _/hwɪdl/_ or "whittle" with a
'd') is an open standard for describing data processing workflows using a
human-readable/writeable syntax. It introduces a domain-specific language, as ratified
in [the openly developed specification][specification], that aims to provide simple but
powerful facilities for (a) defining atomic units of computation (a `task`), (b) for
connecting those atomic units together into a larger computation graph (a `workflow`),
and (c) for effortlessly scaling the execution of these graphs in multiple environments.

We recommend you do a couple of things when starting out to have the best possible
experience:

* Follow the quickstart guide to learn the most important concepts in WDL
  ([link](./quickstart.md)).
* Install an developer extension, such as [Sprocket][sprocket-ext] for Visual Studio
  Code, and follow the suggestions.
* Pick an execution engine based on the environment you'd like to run within and stick
  with it ([link](./ecosystem.md#execution-engines)).
* Join Slack to get help from the community ([link][slack-invite]).

The rest of this section is a guide to getting started with WDL—you can navigate through
the guide and other sectiosn of the documentation with the buttons at the bottom or the
left sidebar.

Happy workflowing 👋!

[specification]: https://github.com/openwdl/wdl
[sprocket-ext]:
    https://marketplace.visualstudio.com/items?itemName=stjude-rust-labs.sprocket-vscode
[slack-invite]:
    https://join.slack.com/t/openwdl/shared_invite/zt-ctmj4mhf-cFBNxIiZYs6SY9HgM9UAVw
