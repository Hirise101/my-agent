# GPT Researcher：第一天参考代码阅读笔记

阅读日期：2026-10-12；参考仓库：F:/AgentProject/gpt-researcher。
本文依据当前本地代码静态阅读；没有运行研究流程或模型调用，也不还原原作者最初的开发过程。

## 入口和定位
[README](F:/AgentProject/gpt-researcher/README.md:23) 定义通用网络/本地研究与带引用报告。
my-agent 的差异是固定选型职责、候选与版本、硬约束、四种判断状态、项目权限、有效文档与可复核证据。

## 普通报告的 WebSocket 调用链
```text
用户任务与报告参数
  -> /ws：websocket_endpoint
  -> handle_websocket_communication：识别 start 消息
  -> handle_start_command：解析参数
  -> WebSocketManager.start_streaming
  -> run_agent：按报告类型分流
  -> BasicReport.run
      -> GPTResearcher.conduct_research
      -> GPTResearcher.write_report
  -> 生成报告文件、发送返回信息
```
该链对应普通报告路径。详细报告与 multi_agents 有独立分支，不将它们混为一条流程。HTTP /report/ 也不是 /ws 的同一个入口。

## 模块阅读表
| 位置 | 输入 | 输出/状态修改 | 外部调用与错误边界 | my-agent 要做的适配 |
|---|---|---|---|---|
| [app.py /ws](F:/AgentProject/gpt-researcher/backend/server/app.py:408) | WebSocket 连接与消息 | 交给消息处理；finally 断开管理连接 | 捕获断开/异常并记录 | HTTP 创建任务与后台执行解耦；断线不取消研究 |
| [handle_start_command](F:/AgentProject/gpt-researcher/backend/server/server_utils.py:134) | start 后的 JSON、task、report_type 等 | 参数解析、开始流式研究、报告文件路径 | 缺 task/report_type 直接返回；后续文件生成 | 用 Pydantic 业务契约、服务器身份与项目授权替代宽松输入 |
| [run_agent](F:/AgentProject/gpt-researcher/backend/server/websocket_manager.py:116) | 问题、来源、报告类型、风格等 | 选择 BasicReport/DetailedReport/multi_agents，返回报告 | 调用相应 runner，传入日志/消息处理器 | 自己实现选型服务，不通过导入 GPTResearcher 代替核心 |
| [BasicReport.run](F:/AgentProject/gpt-researcher/backend/report_type/basic_report/basic_report.py:72) | 构造时保存的研究参数 | 先研究，再返回报告字符串 | 两个 await；该方法本身没有独立重试逻辑 | 保留研究与报告的职责边界，证据和报告分别保存 |
| [conduct_research](F:/AgentProject/gpt-researcher/gpt_researcher/agent.py:343) | query、来源与配置 | 可能选择角色，research_conductor 返回 self.context，记录事件 | 角色模型调用、检索/抓取；deep 类型单独处理 | 固定选型职责，按计划取证，程序校验预算/工具/项目 |
| [write_report](F:/AgentProject/gpt-researcher/gpt_researcher/agent.py:463) | self.context 或 ext_context，报告配置 | 调 report_generator，返回报告，记录事件 | 模型报告生成 | 比较矩阵、四态判断、关键结论引用核验与限制 |

## 两个核心步骤
当前 BasicReport.run 的主干：
```python
await self.gpt_researcher.conduct_research()
report = await self.gpt_researcher.write_report()
return report
```
研究产生上下文；写作使用上下文。不能把收到一段模型回答就等同于完成工具研究和证据验证。

## 输入与资料来源
[GPTResearcher 初始化](F:/AgentProject/gpt-researcher/gpt_researcher/agent.py:53) 接收 query、report_type、report_source、source_urls、query_domains 等通用参数。
[枚举](F:/AgentProject/gpt-researcher/gpt_researcher/utils/enum.py:30) 包含 web、local、hybrid 等来源；
[本地资料说明](F:/AgentProject/gpt-researcher/README.md:274) 使用 DOC_PATH 和 local 来源。
my-agent 需要独立的 SelectionRequest/CandidateInput，不能仅在 query 字符串里隐含候选和硬约束。
来源类别与文档路径配置不等于项目授权或数据外发许可；自己的实现应明确这两层边界。

## 固定问题与评测参考
[evals/README](F:/AgentProject/gpt-researcher/evals/README.md:7) 区分事实准确性、报告质量和幻觉检查。
现有 SimpleQA 有问题/标准答案/来源；研究问题集给出通用研究任务。my-agent 应准备自己的选型题与参考证据，而非把通用问答分数当作选型质量。
本次 Q01–Q10 是自己定义的测试数据，不是已运行的 GPT Researcher 评测结果。

## 自己必须实现的边界
服务器授权、版本发布、资料位置、证据快照、硬约束优先、未知/冲突、引用核验、共享预算、人工反馈与报告版本。
第一天只理解边界和接口职责，不复制整套项目。后续每次仿写一个可验收功能，并记录外部调用与失败状态。
本机代码链接在参考仓库移动后需要重新定位；行号对应本次静态阅读的版本。
