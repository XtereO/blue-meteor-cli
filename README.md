<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=14_MxI0TSoz8wK9e-f8BHzworUfehaZz3"/>
</div>

## Несколько слов

Когда я создавал этот cli, я водхновлялся [nestjs](https://www.npmjs.com/package/@nestjs/cli).

## Правила использования

Устанавливать глобально. Для названий используйте kebab-case при задании команд. Например: game-online, user-premium, translate-eng-ru, escape. Используйте cli с корня директории приложения (если проект в папке D:/test-app, делайте команды из нее), не в src.

## Использование

### Получение всех команд

Чтобы получить все команды, напишите в терминале:

```
blum --help
```

### Создание проекта

Команда подтягивает [git репозиторий](https://github.com/avocadoteam/react-template) (git clone), затем запускает `pnpm i` и удаляет .git, так после подтягивания вы можете легко проиницилизировать свой репозиторий.

```
blum g [project-name]
```

### Создание layout

Нужно для добавления нового слоя абстракции (например, в игре у вас может быть single и multiplayer слои). В опциях вы можете добавить -c (создает рядом css файл), -r (убирает существующий слой). Эта команда создает новый роут и связывает с AppLayout - удобно. Новый слой появиться в `src/ui/layouts/<name>`.

```
blum l <name>
```

### Создание panel

Опции как и у layout. Это то, что будет видеть юзер при нахождении по соответствующему роуту (например, в игре в слое single находится панели game-settings и game-scene). Появиться в `src/ui/layouts/<layout-name>/panels/<panel-name>`.

```
blum p <panel-name> <layout-name>
```

### Создание modal, card, popout

Опции как в layout. Это все элементы, которые находятся выше панели. Например, модальная страница или карточка может использоваться для коротких операций подтверждений как включение уведомлений. Popout обычно это спинер или alert. Все это появится в папке `src/ui/layouts/<name>`.

```
// create modal
blum m <name>

// create card
blum c <name>

// create popout
blum po <name>
```

### Форматирование

```
blum f
```

### Другое

Другие команды треубуют только имя и имеют опции -r (удаление), brick и atom имеют также -c (создание рядом файла css).
