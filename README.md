# 在线视频字幕（ASS）编辑器
[立即访问](https://ass-editor.js.org)。

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

## 说明

本站点使用 `gatsby` 框架构建。关于字幕编辑，依赖如下 npm 包：

- [weizhenye](https://github.com/weizhenye) 的 [ASS](https://github.com/weizhenye/ASS)
- [Jeff Tian](https://github.com/Jeff-Tian) 的 [ASS Serialize](https://github.com/Jeff-Tian/ass-serialize)

## 本地开发：
```bash
git clone https://github.com/Jeff-Tian/ass
cd ass
npm install
# 注意，仅仅运行 gatsby develop 有时 HMR 会不工作
gatsby develop
```

## 待做事项：

- 利用 ASR 技术，自动生成字幕文件，再在这个基础上进行编辑
- 修改某一行时，自动跳转到视频相应的时间段播放预览
- 修改视频（选择本地文件，或者直接粘贴视频链接）
- 修改 ASS 文件元信息
- 特效的可视化编辑器
- 播放视频时，自动选择应该编辑的行
- 扩展 [weizhenye](https://github.com/weizhenye) 的 [ASS](https://github.com/weizhenye/ASS) 支持更多特效
