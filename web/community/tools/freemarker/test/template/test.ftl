<#ftl encoding="utf-8">
<#include "/macro.ftl">

hello, ${((word.user.dd)!"1")?js_string}.

${stringify(word!{})}
测试中文和符号¥

---

Freemarker version: ${.version}

Template name: ${.template_name}

Locale: ${.locale}

Current time: ${.now}

---

<#include "/child.ftl" />

