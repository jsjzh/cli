# cli

## 说明

自己常用的一些脚本合集，也会有一些常用的工具，后面可以添加一些脚本，可以自动安装某些工具，替换环境等。

## 使用

```shell
# cli demo test
pm2 start cli -- demo test
```

## 草稿

```ts
const cli = new Cli({
  context: {
    name: "king",
  },
  commands: [],
  options: {
    logger: {},
  },
});

const cli = new Cli({
  name: "",
  version: "",
  desc: "",
  commands: [],
  // helpers: [],
  options: {
    logger: {},
  },
});

cli.execute(process.argv);

// commands/aaa.ts
const command = new Cli.Command({
  command: "",
  desc: "",
  options: [],
  commands: [bbb],
  task(props) {
    const cron = new props.helper.CronJob("* * * * * *", () => {
      props.logger.error("hello" + props.context.name);
    });
  },
});

// commands/bbb.ts
const command = new Cli.Command({
  command: "",
  desc: "",
  options: [],
  commands: [],
  task(props) {
    const cron = new props.helper.CronJob("* * * * * *", () => {
      props.logger.error("hello" + props.context.name);
    });
  },
});

export default command;
```
