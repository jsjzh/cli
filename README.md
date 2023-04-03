# cli

## 说明

自己常用的一些脚本合集，也会有一些常用的工具，后面可以添加一些脚本，可以自动安装某些工具，替换环境等。

## 使用

```shell
# cli demo test
pm2 start cli -- demo test
```

## 草稿

1. [x] 自动更新某目录下所有项目的当前分支对应的项目代码
2. [ ] 搞一个命令，类似于 init，把所有电脑开机要做的事情做一遍，比如拉代码啥的
3. [ ] 写个脚本，可以执行 npm install、npm run、yarn 等方法时，切换到 pnpm 上
4. [ ] 添加一个，若 git 提交出错，可以重新执行，不用再输入的功能
5. [ ] git push 遍历文件夹下所有有改动的文件，然后让选，默认全选
6. [ ] git push 之前，检查一下是否有 git status，如果有的话，就直接执行 git push
7. [x] 写一个专门更新某个项目下的所有的 dep 和 devdep 的逻辑
8. [x] git push 添加一个选择，选择要使用的用户
9. [x] git push 添加选择前缀
   1. feat: 新功能、新特性
   2. fix: 修改 bug
   3. perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
   4. refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
   5. docs: 文档修改
   6. style: 代码格式修改, 注意不是 css 修改（例如分号修改）
   7. test: 测试用例新增、修改
   8. build: 影响项目构建或依赖项修改
   9. revert: 恢复上一次提交
   10. ci: 持续集成相关文件修改
   11. chore: 其他修改（不在上述类型中的修改）
   12. release: 发布新版本
   13. workflow: 工作流相关文件修改
10. Chokidar 文件监听 https://github.com/paulmillr/chokidar
11. [x] 写一个能够选择文件夹，然后统一执行命令的方法
