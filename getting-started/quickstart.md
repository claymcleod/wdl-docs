# Quickstart

Before diving in to everything WDL can do, let's start with a quick example: below is a
"Hello, world!" workflow using WDL v1.2. By closely examining this workflow, we can
readily identify the most important bits needed to use and understand the WDL language.

* **Tasks** are the atomic units of computation within WDL. Tasks are comprised of a set
  of inputs (defined within the `input` section), a set of outputs (defined within the
  `output` section), and a command (defined within the `command` section), which is
  simply a Bash script to execute. Tasks also support defining _requirements_ (defined
  within the `requirements` section) which dictate certain aspects of the task runtime
  environment. Importantly, tasks are executed within a
  [container][container-explanation] to ensure portability.
* **Workflows** string together tasks via their inputs and outputs into a larger
  computation graph that can be executed. Workflows are arranged similarly to tasks
  except that (a) they don't have a `requirements` section and (b) they make available
  more control flow facilities that aren't relevant within a task context. For example,
  the workflow below uses both _conditional execution_ (the `if` statement) and a
  _scatter-gather_ (the `scatter` keyword and `messages` output). Notably, workflows can
  also define inputs and outputs, and these generally serve as the global inputs and
  outputs for the execution of a workflow.
* JSON is used for specifying both inputs to and outputs from a workflow. In the code
  block below the workflow, you can see the inputs that are specified for the top-level
  `name` parameter. You can also optionally provide a value for the `is_pirate`
  parameter. Further, the output of the workflow is communicated back to you via JSON.
  Executing workflows typically involves preparing the needed JSON files and reading the
  outputs within the JSON returned from your execution engine.

```wdl
version 1.2

task say_hello {
    input {
        String greeting
        String name
    }

    command <<<
        echo "~{greeting}, ~{name}!"
    >>>

    output {
        String message = read_string(stdout())
    }

    requirements {
        container: "ubuntu:latest"
    }
}

workflow main {
    input {
        String name
        Boolean is_pirate = false
    }

    Array[String] greetings = select_all([
        "Hello",
        "Hallo",
        "Hej",
        (
            if is_pirate
            then "Ahoy"
            else None
        ),
    ])

    scatter (greeting in greetings) {
        call say_hello {
            greeting,
            name,
        }
    }

    output {
        Array[String] messages = say_hello.message
    }
}

```

### Example I/O

With these inputs,

```json
{
  "main.name": "world",
  // "main.is_pirate": true,
}
```

the output of the above workflow is the following.

```json
{
  "messages": [
    "Hello, world!",
    "Hallo, world!",
    "Hej, world!",
    // "Ahoy, world!" is included is `is_pirate` is set to `true` above.
  ]
}
```

### Conclusion

This workflow, though simple, demonstrates the how WDL accomplishes its main values:
namely, its _human-readable/writable_ style and its _straightforward but powerful_
control flow abstractions. We'll learn more about these values on the
[Values](./values.md) page.

[container-explanation]:
    https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-container/
