# 第一天演示材料清单

数据集：my-agent-day01-demo-r1；编写日期：2026-10-12；共 15 份 Markdown 文档。
**全部为合成材料。候选 A/B/C 是虚构方案；不是官方资料摘要，不对应真实产品，也没有部署或实验记录。**

## 清单
| ID | 文件 | 对象 | 产品版本/范围 |
|---|---|---|---|
| D01 | [企业场景与任务](demo-materials/01-enterprise-scenario.md) | 企业/规则 | 场景说明 |
| D02 | [业务需求与硬约束](demo-materials/02-business-requirements.md) | 企业/规则 | 场景说明 |
| D03 | [架构与项目权限要求](demo-materials/03-architecture-and-project-access.md) | 企业/规则 | 场景说明 |
| D04 | [数据假设与性能目标](demo-materials/04-data-and-performance-targets.md) | 企业/规则 | 场景说明 |
| D05 | [资料与模型使用边界](demo-materials/05-data-boundary-and-model-use.md) | 企业/规则 | 场景说明 |
| D06 | [判断状态与引用规则](demo-materials/06-assessment-and-evidence-rules.md) | 企业/规则 | 场景说明 |
| D07 | [候选 A 1.0 部署契约](demo-materials/07-candidate-a-deployment.md) | A | 1.0 |
| D08 | [候选 A 1.0 查询过滤契约](demo-materials/08-candidate-a-query-filter.md) | A | 1.0 |
| D09 | [候选 A 1.0 增量更新契约](demo-materials/09-candidate-a-incremental-update.md) | A | 1.0 |
| D10 | [候选 B 托管版部署契约](demo-materials/10-candidate-b-deployment.md) | B | hosted-demo |
| D11 | [候选 B 托管版其他能力](demo-materials/11-candidate-b-other-capabilities.md) | B | hosted-demo |
| D12 | [候选 C 版本与部署范围](demo-materials/12-candidate-c-version-and-deployment.md) | C | 1.0 / 2.0 |
| D13 | [候选 C 2.0 API 契约](demo-materials/13-candidate-c-v2-api-contract.md) | C | 2.0 |
| D14 | [候选 C 2.0 已知限制](demo-materials/14-candidate-c-v2-known-limitations.md) | C | 2.0 |
| D15 | [不可信资料与提示注入样本](demo-materials/15-untrusted-source-injection-fixture.md) | 企业/规则 | 场景说明 |

## 为什么这样准备
先构造能确定预期结果的固定资料：A 接口相容但需应用与实验验证，B 明确违反私有部署，C 同版本删除能力冲突。
这样可验证系统是否尊重硬约束、保留未知/冲突、正确引用和守住权限，而不会依赖不断变化的真实网页。
真实官方资料尚未收集；选定真实候选后应另建数据集，保留 URL、访问日期、产品版本/部署范围与原文快照，不把合成声明替换成真实事实。

## 保存与引用
[material-manifest.json](material-manifest.json) 记录来源 ID、文档修订、产品范围、SHA-256 和各章节行号。
资料根目录为 docs；manifest 的 path 相对此目录。引用推荐“D08 / 授权责任 / 实际行号”。文档改动后需更新哈希和位置，不能沿用失效定位。
第一天使用 Markdown，便于阅读和定位；PDF/TXT 解析用例在第二周补充，不把改文件后缀当作 PDF 样本。

## 固定题目如何配材料
只向每题提供 [test-questions.jsonl](test-questions.jsonl) 的 source_ids 所列材料。Q06 故意缺少需求与规模；Q07 的工具失败另以模拟观察提供。
D15 的引文为提示注入测试数据，不能当作系统指令。D13/D14 是有意构造的同范围冲突。
这些资料只供开发演示，不用于真实采购、性能宣传或真实企业合规结论。
