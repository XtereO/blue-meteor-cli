<div align="center">
    <img width="134" src="https://webstockreview.net/images/comet-clipart-meteorite-4.png">
</div>

## Few words

When I create this cli, I was inspired by [nestjs](https://www.npmjs.com/package/@nestjs/cli).

## Rules of naming

When you make name, give it in kebab-case. Examples: game-online, user-premium, translate-eng-ru, escape. Make all commands from main directory of app(if project in D:/test-app, make commands form this path), not in src.

## Usage

### Get all commands

Write in terminal, to get all commands:

```
blum --help
```

### Generate project

This command fetch [git repository](https://github.com/avocadoteam/react-template) (git clone), run `pnpm i` and remove .git, so after fetched you can easy init your own repo.

```
blum g [project-name]
```

### Create layout

Need for add new layout's absctraction (For example: game - in this game you can create single and multiplayer). In options you can add -c (create also css file nearby), -r (remove existing layout). This command make new route and link with AppLayout - comfortable. The new layout will appear in `src/ui/layouts/<name>`.

```
blum l <name>
```

### Create panel

Options like in layout. It's screen of panel, for previous example is game single or multiplayer. Will appear in `src/ui/layouts/<layout-name>/panels/<panel-name>`.

```
blum p <panel-name> <layout-name>
```

### Create modal, card, popout

Options like in layout. All this things are high level in app. You may use modal and card for short operation like turn on notification. Popout like spinner or alert. All this things appear in layouts.

```
// create modal
blum m <name>

// create card
blum c <name>

// create popout
blum po <name>
```

### Format

```
blum f
```

### Other

The other commands require just name and have options -r (remove), brick and atom has also -c (create css file nearby).
