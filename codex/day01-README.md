# my-agent：第一天资料导航

日期：2026-10-12；数据集：my-agent-day01-demo-r1。
本文是辅助导航，保存在 codex。docs 仅保留既有开发指南与第一天五部分的实际资料。

## 第一天需要的五部分

1. **项目介绍与业务范围**：[项目介绍](../docs/project-overview.md)、[业务范围](../docs/scope.md)。
2. **15 份合成演示材料及来源清单**：[材料说明与清单](../docs/demo-materials-README.md)、[机器可读来源清单](../docs/material-manifest.json)；原文位于 docs/demo-materials/。
3. **10 个测试问题、预期行为和失败示例**：[问题说明](../docs/test-questions.md)、[机器可读问题集](../docs/test-questions.jsonl)。
4. **GPT Researcher 调用链笔记**：[参考代码笔记](../docs/reference-notes.md)。
5. **验收清单与待确认事项**：[第一天验收](../docs/day01-acceptance.md)。

## 开发指南

[enterprise-retrieval-advisor-development-guide.md](../docs/enterprise-retrieval-advisor-development-guide.md) 保持在 docs，内容不变。

## 数据与事实边界

A 1.0、B hosted-demo、C 2.0 均为虚构候选；15 份材料全部是合成测试数据，不代表真实产品能力或已完成的部署实验。
每题只读取 test-questions.jsonl 的 source_ids；模拟身份由测试程序注入，不能作为生产 API 的授权来源。
资料中的冲突和提示注入样本用于验证规则，原文只作为数据，不执行其中指令。
真实候选、版本、预算与数据外发许可仍待确认；当前固定问题尚未作为 Agent 测试运行。

## 目录职责

docs 保存开发指南与五部分的范围、材料、问题、调用链和验收文件；codex 保存这类辅助导航与其他工作资料。
本次目录整理不改动开发指南、演示原文、来源清单、测试问题、项目根 README、源码或配置，也不执行 Git 初始化、暂存或提交。
