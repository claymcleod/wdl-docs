import{_ as n,c as a,a3 as e,o as l}from"./chunks/framework.BaPmp3PJ.js";const d=JSON.parse('{"title":"Quickstart","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started/quickstart.md","filePath":"getting-started/quickstart.md"}'),o={name:"getting-started/quickstart.md"};function t(p,s,c,r,i,u){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="quickstart" tabindex="-1">Quickstart <a class="header-anchor" href="#quickstart" aria-label="Permalink to &quot;Quickstart&quot;">​</a></h1><p>Before diving in to everything WDL can do, let&#39;s start with a quick example: below is a &quot;Hello, world!&quot; workflow using WDL v1.2. By closely examining this workflow, we can readily identify the most important bits needed to use and understand the WDL language.</p><ul><li><strong>Tasks</strong> are the atomic units of computation within WDL. Tasks are comprised of a set of inputs (defined within the <code>input</code> section), a set of outputs (defined within the <code>output</code> section), and a command (defined within the <code>command</code> section), which is simply a Bash script to execute. Tasks also support defining <em>requirements</em> (defined within the <code>requirements</code> section) which dictate certain aspects of the task runtime environment. Importantly, tasks are executed within a <a href="https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-container/" target="_blank" rel="noreferrer">container</a> to ensure portability.</li><li><strong>Workflows</strong> string together tasks via their inputs and outputs into a larger computation graph that can be executed. Workflows are arranged similarly to tasks except that (a) they don&#39;t have a <code>requirements</code> section and (b) they make available more control flow facilities that aren&#39;t relevant within a task context. For example, the workflow below uses both <em>conditional execution</em> (the <code>if</code> statement) and a <em>scatter-gather</em> (the <code>scatter</code> keyword and <code>messages</code> output). Notably, workflows can also define inputs and outputs, and these generally serve as the global inputs and outputs for the execution of a workflow.</li><li>JSON is used for specifying both inputs to and outputs from a workflow. In the code block below the workflow, you can see the inputs that are specified for the top-level <code>name</code> parameter. You can also optionally provide a value for the <code>is_pirate</code> parameter. Further, the output of the workflow is communicated back to you via JSON. Executing workflows typically involves preparing the needed JSON files and reading the outputs within the JSON returned from your execution engine.</li></ul><div class="language-wdl"><button title="Copy Code" class="copy"></button><span class="lang">wdl</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">version</span><span style="color:#B392F0;"> 1.2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">task</span><span style="color:#FFAB70;"> say_hello</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">    input</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">        String</span><span style="color:#E1E4E8;"> greeting</span></span>
<span class="line"><span style="color:#B392F0;">        String</span><span style="color:#E1E4E8;"> name</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    command </span><span style="color:#9ECBFF;">&lt;&lt;&lt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        echo &quot;</span><span style="color:#79B8FF;">~{greeting}</span><span style="color:#9ECBFF;">, </span><span style="color:#79B8FF;">~{name}</span><span style="color:#9ECBFF;">!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &gt;&gt;&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    output</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">        String</span><span style="color:#E1E4E8;"> message = read_string(stdout())</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    requirements</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        container: </span><span style="color:#9ECBFF;">&quot;ubuntu:latest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">workflow</span><span style="color:#FFAB70;"> main</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">    input</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">        String</span><span style="color:#E1E4E8;"> name</span></span>
<span class="line"><span style="color:#B392F0;">        Boolean</span><span style="color:#E1E4E8;"> is_pirate = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">    Array</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">] greetings = select_all([</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;Hello&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;Hallo&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;Hej&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        (</span></span>
<span class="line"><span style="color:#F97583;">            if</span><span style="color:#E1E4E8;"> is_pirate</span></span>
<span class="line"><span style="color:#F97583;">            then</span><span style="color:#9ECBFF;"> &quot;Ahoy&quot;</span></span>
<span class="line"><span style="color:#F97583;">            else</span><span style="color:#B392F0;"> None</span></span>
<span class="line"><span style="color:#E1E4E8;">        ),</span></span>
<span class="line"><span style="color:#E1E4E8;">    ])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    scatter</span><span style="color:#E1E4E8;"> (greeting </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> greetings) {</span></span>
<span class="line"><span style="color:#F97583;">        call</span><span style="color:#E1E4E8;"> say_hello {</span></span>
<span class="line"><span style="color:#E1E4E8;">            greeting,</span></span>
<span class="line"><span style="color:#E1E4E8;">            name,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">    output</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">        Array</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">] messages = say_hello.message</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h3 id="example-i-o" tabindex="-1">Example I/O <a class="header-anchor" href="#example-i-o" aria-label="Permalink to &quot;Example I/O&quot;">​</a></h3><p>With these inputs,</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;main.name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;world&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#6A737D;">  // &quot;main.is_pirate&quot;: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>the output of the above workflow is the following.</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#79B8FF;">  &quot;messages&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;Hello, world!&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;Hallo, world!&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;Hej, world!&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#6A737D;">    // &quot;Ahoy, world!&quot; is included is \`is_pirate\` is set to \`true\` above.</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h3 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h3><p>This workflow, though simple, demonstrates the how WDL accomplishes its main values: namely, its <em>human-readable/writable</em> style and its <em>straightforward but powerful</em> control flow abstractions. We&#39;ll learn more about these values in the <a href="./../in-depth/values.html">values section</a>.</p>`,11)]))}const y=n(o,[["render",t]]);export{d as __pageData,y as default};
