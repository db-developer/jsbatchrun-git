
### commit ###
<blockquote>
  <p>Git commit one or more changed files or all changes in one or more project directories.</p>

  <table border=0 width=100%>
    <tr><th colspan="3"><b>format</b></th></tr>
    <tr><th colspan="3">&gt; batchrun git commit &lt;options&gt; [directories]</th></tr>
    <tr><th colspan="3"><b>mandatory option</b>(one or the other)</th></tr>
    <tr><td>--message</td>
        <td style="text-align:center">string</td>
        <td>commit message</td>
        </tr>
    <tr><th colspan="3"><b>other options</b></th></tr>
    <tr><td>--file</td>
        <td style="text-align:center">string</td>
        <td>filepath relative to project directory<br/>
            this option may be added multiple times.</td>
        </tr>
    <tr><td>--allowempty</td>
        <td style="text-align:center">boolean</td>
        <td>Don't fail on committing projects that do not have changed files.</td>
        </tr>
    <tr><th colspan="3"><b>substituting options</b> (will substitute valid options)</th></tr>
    <tr><td>--env:opt:[optionname][propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read property 'propertyname' and pass its value to <code>jsbr fs clean</code> using option '--optionname'<br />
            Example: --env:opt:file:foo (with foo: "/var/tmp/fun") => --file "/var/tmp/fun"</td>
        </tr>
    <tr><th colspan="3"><b>additional options</b> (will extend the arguments iterated by <code>jsbr fs clean</code>)</th></tr>
    <tr><td>--env:args:use:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname'</td>
        </tr>
    <tr><td>--env:args:append:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname' and append them to existing arguments.</td>
        </tr>
    <tr><td>--env:args:prepend:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname' and prepend them to existing arguments.</td>
        </tr>
    <tr><th colspan="3"><b>additional options</b> (will narrow the arguments iterated by <code>jsbr fs clean</code>)</th></tr>
    <tr><td>--args:from</td>
        <td style="text-align:center">integer</td>
        <td>start cleaning task at and including this position, in the list of directories (arguments)</td>
        </tr>
    <tr><td>--args:to</td>
        <td style="text-align:center">integer</td>
        <td>stop cleaning task at and including this position, in the list of directories (arguments)</td>
        </tr>
    <tr><td>--args:index</td>
        <td style="text-align:center">integer</td>
        <td>run cleaning task (only!) for this position, in the list of directories (arguments)<br />
            (will override any ranges set by --args:from and --args:to)</td>
        </tr>
    <tr><th colspan="3"><b>special options</b></th></tr>
    <tr><td>--debug</td>
        <td style="text-align:center">boolean</td>
        <td>display debug information</td>
        </tr>
    <tr><td>--help</td>
        <td style="text-align:center">boolean</td>
        <td>display help for command <code>jsbr fs clean</code></td>
        </tr>
  </table>      

  <p><b>examples:</b></p>
  <br />

  <p>
    Commit files [ "somefile.js", "otherfile.js" ] with commit message for all listed project directories.

  ```bash
  > batchrun git commit --file somefile.js --file otherfile.js  --message update ~/projects/project-00 ~/projects/project-01 ...
  ```
  </p>
  <p>
    Commit all projects of the global list of projects, starting at index 7 and including all projects up
    to index 12 inclusive. (The first index, that could be addressed was '0')

  ```bash
  > batchrun git commit --allowempty --args:from 7 --args:to 12 ~/projects/project-00 ~/projects/project-01 ...
  ```
  </p>
</blockquote>
