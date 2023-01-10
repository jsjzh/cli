# cli

## 说明

自己常用的一些脚本合集，也会有一些常用的工具，后面可以添加一些脚本，可以自动安装某些工具，替换环境等。

还可以增加一种会自动在后台运行的脚本，可以通过 cron 来控制运行时间，再通过 pm2 来保证服务稳定运行，接着
用 log 日志记录的工具，给记录到文件里，并且，这个 log 日志记录不仅仅可以用在长时间挂在后台的脚本上，平时的日志也可以记录。

## 使用

```shell
# cli demo test
pm2 start cli -- demo test
```

## 草稿

把这个想象成是一个 http 请求的处理模式，有一个中心的 context，感觉有点类似于 egg

数据如何向下传递？

helper 是包装过的 axios 或者 exec 的代码，然后可以通过 npm 包引入

command 是已经可以运行的脚本，比如 git hosts update，然后这里面也会有用到 helper，这个该怎么设计？

或许，command 也是 new Cli 生成的，command 也有 commands 和 helper 的参数

container 只是将他们串起来的方法，比如一个外层的 container 有一个 commands，这个 commands 的 command 是 git，如果只是在第一层添加了 commands，那就运行 cli git 就行，如果这个 command 传了 commands 的参数，也是这个 git，那么，就得 cli git git 才可以使用

所以，我只是要做一个壳子，把他们套起来，然后，需要想想怎么给 helper 和 context 添加进去，有 logger，但是有一点，就是 axios 库，不应该被包装吧，因为 axios 一般是把 host 提炼出来用的，就是单成一个 service，那或者，又提供 helper.api 又可以直接用 axios，command 写的时候，如果有发起请求的需求，需要检测一下是否 helper 是否有 api？不过没事，axios 这种不是强需求，因为外部也可以用

我这个比较特别的就是，有包装了 logger cron exec runTask 的方法

还有一个就是，我这些 helper 里面，也是有 logger 输出的，怎么正确的取到 logger？

可以设计成洋葱模型么？就是用 pipe 或者是就 compose，一层一层传递下去，每层都有一个解析？或许不需要？但是 cli 的参数的解析，比如说类型的转换？但其实怎么说呢，洋葱模型一层一层是每层都有效的，哦？等会，那我的 helper 和 context 是不是可以用洋葱模型给他一个个放进去，当 cli xxx xxx xxx 来的时候，洋葱模型用来套入 helper，但是感觉没有太大的必要啊，因为 egg 是一个持久化的服务，而我这个是 cli 等于说是一次运行的玩意儿，当然，也有 cron 的功能，但是真的需要这种一层一层的处理方式么？我觉得是不是有必要去看看 egg 的 compose 的源码那里

如果是多个的，比如 npm 和 npx 还有其他的啥的，是写在一个仓库的，哦，那其实也没事，因为用多入口就好了，然后 bin 那里用 xxx: xxx 来表示即可

哦，还有一点，就是得有一个办法，能够获取到 Container 也就是 Cli 的一些信息，比如 name 或者 version 等等的？真的需要吗？想一想

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
