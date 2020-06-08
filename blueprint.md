{{ template:logo }}

{{ template:badges }}

{{ template:description }}

Welcome to {{ pkg.name }}. This is version {{ pkg.version }}!

<!-- Content Table -->

{{ template:toc }}

<!-- Installation -->

{{ load:./Doc/installation.md }}

{{ doc:doc-button.js }}

{{ template:contributors }}

{{ template:license }}

## Dependencies

{{ pkg.dependencies }}

## Keywords

{{ pkg.keywords }}
