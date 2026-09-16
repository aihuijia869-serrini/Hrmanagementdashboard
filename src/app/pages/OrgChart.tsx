import React, { useState } from "react";
import { RotateCcw, Save, Eye, Settings2, Download, ChevronDown, Plus, Minus } from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary:       "#2B63B8",
  primaryHov:    "#1A4FA0",
  primaryLight:  "#EBF1FB",

  // Node fills
  sectionBg:     "#FFFBEE",   // warm light yellow — board / sector nodes
  sectionBorder: "#DEB96A",
  sectionText:   "#3A2E0D",

  deptBg:        "#EEF2FA",   // cool gray-blue — functional depts
  deptBorder:    "#B8CBE8",
  deptText:      "#1A2D5A",

  subBg:         "#2B63B8",   // deep blue — subsidiary companies
  subText:       "#FFFFFF",

  auxBg:         "#E5EDF8",   // lighter tint — auxiliary units
  auxBorder:     "#B8CBE8",
  auxText:       "#3A5284",

  // Structural
  line:          "#B8CBE8",   // connector lines
  bg:            "#FFFFFF",
  bgLayout:      "#F4F6FB",
  bgPanel:       "#FAFBFD",
  border:        "#E2EAF4",
  borderMid:     "#C8D6EA",

  // Typography
  textPrimary:   "#1A2240",
  textSec:       "#6B7FA3",
  textMid:       "#3D5280",

  shadow:        "0 1px 4px rgba(43,99,184,0.07)",
  shadowHov:     "0 3px 10px rgba(43,99,184,0.13)",
};

const FONT = "'Microsoft YaHei', 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── Node visual map ──────────────────────────────────────────────────────────
const NS = {
  root:       { bg: C.sectionBg, text: C.sectionText, border: `1px solid ${C.sectionBorder}` },
  section:    { bg: C.sectionBg, text: C.sectionText, border: `1px solid ${C.sectionBorder}` },
  dept:       { bg: C.deptBg,    text: C.deptText,    border: `1px solid ${C.deptBorder}` },
  subsidiary: { bg: C.subBg,     text: C.subText,     border: "none" },
  aux:        { bg: C.auxBg,     text: C.auxText,     border: `1px solid ${C.auxBorder}` },
} as const;

// ─── Tree data ────────────────────────────────────────────────────────────────
interface OrgNode {
  id: string;
  short: string;
  full?: string;
  type: keyof typeof NS;
  hc?: number;
  qta?: number;
  initCollapsed?: boolean;
  children?: OrgNode[];
}

const TREE: OrgNode = {
  id: "board", short: "董事会", full: "董事会", type: "section",
  children: [{
    id: "mgmt", short: "经营班子 / 高管", full: "经营班子及高级管理层", type: "dept", hc: 0, qta: 8,
    children: [
      {
        id: "hq", short: "集团本部", full: "集团本部", type: "section",
        initCollapsed: true,
        children: [
          { id: "d1",  short: "党委办公室",      full: "党委办公室（人力资源）",              type: "dept", hc: 0, qta: 0 },
          { id: "d2",  short: "综合办公室",      full: "综合办公室（董事会办公室）",          type: "dept", hc: 0, qta: 0 },
          { id: "d3",  short: "资金财务中心",    full: "资金管理财务中心",                    type: "dept", hc: 0, qta: 0 },
          { id: "d4",  short: "投资拓展部",      full: "投资拓展部",                          type: "dept", hc: 0, qta: 6 },
          { id: "d5",  short: "法务管理部",      full: "法务管理部",                          type: "dept", hc: 0, qta: 5 },
          { id: "d6",  short: "项目工管办",      full: "项目管理部（总工室·安全生产办公室）", type: "dept", hc: 0, qta: 6 },
          { id: "d7",  short: "监督审计部",      full: "监督审计部",                          type: "dept", hc: 0, qta: 5 },
          { id: "d8",  short: "经营管理部",      full: "经营管理部",                          type: "dept", hc: 0, qta: 6 },
          { id: "d9",  short: "纪检监察组",      full: "纪检监察组",                          type: "dept", hc: 0, qta: 7 },
          { id: "d10", short: "经营班子",        full: "经营班子（储备）",                    type: "dept", hc: 0, qta: 0 },
          { id: "d11", short: "高管",            full: "高管（储备）",                        type: "dept", hc: 0, qta: 0 },
          { id: "d12", short: "综合管理部",      full: "综合管理部",                          type: "dept", hc: 0, qta: 0 },
          { id: "d13", short: "财务管理部",      full: "财务管理部",                          type: "dept", hc: 0, qta: 0 },
          { id: "d14", short: "计划供应部",      full: "计划供应部",                          type: "dept", hc: 0, qta: 0 },
          { id: "d15", short: "风控审计部",      full: "风控审计部",                          type: "dept", hc: 0, qta: 0 },
          { id: "d16", short: "粮食物资储备部",  full: "粮食和物资储备部",                    type: "dept", hc: 0, qta: 0 },
          { id: "d17", short: "农司销售部",      full: "农司农副产品销售部",                  type: "dept", hc: 0, qta: 0 },
        ],
      },
      {
        id: "subs", short: "下属企业", full: "下属企业（含股权比例）", type: "section",
        children: [
          {
            id: "ss", short: "城市服务板块", type: "section",
            children: [
              { id: "s1", short: "储备军粮供应公司", full: "惠州市储备军粮供应有限公司",   type: "subsidiary", hc: 0,  qta: 79  },
              { id: "s2", short: "生鲜农产投资公司", full: "广东惠生鲜农产品投资有限公司", type: "subsidiary", hc: 0,  qta: 126 },
            ],
          },
          {
            id: "so", short: "城市运营板块", type: "section",
            children: [
              { id: "s3", short: "城市运营服务公司", full: "惠州市城投城市运营服务有限公司", type: "subsidiary", hc: 0, qta: 65 },
            ],
          },
          {
            id: "sb", short: "城市建设板块", type: "section",
            children: [
              { id: "s4", short: "城安建设工程公司", full: "惠州市城安建设工程有限公司",         type: "subsidiary", hc: 1,  qta: 195 },
              { id: "s5", short: "市政动迁建设公司", full: "惠州市市政动迁建设有限公司",         type: "subsidiary", hc: 42, qta: 0   },
              { id: "s6", short: "建设监理公司",     full: "惠州市建设集团工程建设监理有限公司", type: "subsidiary", hc: 0,  qta: 0   },
            ],
          },
          {
            id: "sd", short: "城市开发板块", type: "section",
            children: [
              { id: "s7", short: "城投开发置业",  full: "惠州城投开发置业有限公司", type: "subsidiary", hc: 0, qta: 0 },
              { id: "s8", short: "惠发展城投公司", full: "惠发展城投有限公司",      type: "subsidiary", hc: 0, qta: 0 },
            ],
          },
          { id: "a1", short: "农副产品销售公司", full: "农副产品销售公司（综合运营部）", type: "aux", hc: 0, qta: 0 },
          { id: "a2", short: "储军工会",         full: "储备军粮工会",                  type: "aux", hc: 0, qta: 0 },
          { id: "a3", short: "粮食集团",         full: "粮食集团公司",                  type: "aux", hc: 0, qta: 0 },
          { id: "a4", short: "外包人员",         full: "外包劳务人员",                  type: "aux", hc: 0, qta: 0 },
        ],
      },
    ],
  }],
};

// ─── Tree Node Component ──────────────────────────────────────────────────────
function TreeNode({ node, showFull }: { node: OrgNode; showFull: boolean }) {
  const [open, setOpen] = useState(!node.initCollapsed);
  const hasKids = Boolean(node.children?.length);
  const label   = showFull ? (node.full ?? node.short) : node.short;
  const s       = NS[node.type];
  const showStats = node.hc !== undefined && node.qta !== undefined;

  const nodeW = node.type === "subsidiary" ? 120 : node.type === "aux" ? 115 : 118;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* ── Node card ─────────────────────────────────────────── */}
      <div
        onClick={() => hasKids && setOpen(v => !v)}
        style={{
          position: "relative",
          background: s.bg,
          color: s.text,
          border: s.border,
          borderRadius: 6,
          padding: node.type === "subsidiary" ? "8px 12px" : "9px 13px",
          width: nodeW,
          textAlign: "center",
          fontSize: 13,
          lineHeight: 1.5,
          fontWeight: 500,
          cursor: hasKids ? "pointer" : "default",
          boxShadow: C.shadow,
          userSelect: "none",
          transition: "box-shadow 0.15s ease, transform 0.12s ease",
          fontFamily: FONT,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = C.shadowHov;
          el.style.transform  = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = C.shadow;
          el.style.transform  = "";
        }}
      >
        <div style={{ fontSize: node.type === "section" ? 13 : 12.5, wordBreak: "keep-all" }}>{label}</div>

        {showStats && (
          <div style={{
            fontSize: 10,
            marginTop: 3,
            opacity: node.type === "subsidiary" ? 0.82 : 0.68,
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}>
            在编 {node.hc} / 编制 {node.qta}
          </div>
        )}

        {/* Expand / collapse badge */}
        {hasKids && (
          <div
            onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
            style={{
              position: "absolute",
              bottom: -9,
              left: "50%",
              transform: "translateX(-50%)",
              width: 17,
              height: 17,
              borderRadius: "50%",
              background: "#fff",
              border: `1.5px solid ${C.primary}`,
              color: C.primary,
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 1px 4px rgba(43,99,184,0.15)",
              lineHeight: 1,
            }}
          >
            {open ? "−" : "+"}
          </div>
        )}
      </div>

      {/* ── Children ──────────────────────────────────────────── */}
      {hasKids && open && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
          {/* Vertical stem */}
          <div style={{ width: 1, height: 13, background: C.line }} />

          {/* Children row */}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {node.children!.map((child, i) => {
              const total   = node.children!.length;
              const isFirst = i === 0;
              const isLast  = i === total - 1;
              const isOnly  = total === 1;

              return (
                <div
                  key={child.id}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 6px" }}
                >
                  {/* Connector: horizontal bar segment + vertical drop */}
                  <div style={{ position: "relative", height: 20, width: "100%" }}>
                    {!isOnly && (
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left:  isFirst ? "50%" : 0,
                        right: isLast  ? "50%" : 0,
                        height: 1,
                        background: C.line,
                      }} />
                    )}
                    <div style={{
                      position: "absolute",
                      top: 0, bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 1,
                      background: C.line,
                    }} />
                  </div>

                  <TreeNode node={child} showFull={showFull} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared small button ──────────────────────────────────────────────────────
function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 12px",
        background: hov ? C.primaryHov : C.primary,
        color: "#fff",
        border: "none",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: FONT,
        letterSpacing: "0.01em",
        transition: "background 0.12s",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Sidebar select-style row ─────────────────────────────────────────────────
function SideField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: C.textSec, marginBottom: 5, fontWeight: 500, letterSpacing: "0.03em" }}>{label}</div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 10px",
        border: `1px solid ${C.border}`,
        borderRadius: 5,
        fontSize: 12,
        color: C.textPrimary,
        background: C.bg,
        cursor: "pointer",
        fontFamily: FONT,
      }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{value}</span>
        <ChevronDown size={11} style={{ color: C.textSec, flexShrink: 0, marginLeft: 4 }} />
      </div>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
const LEGEND_ITEMS = [
  { bg: C.sectionBg, border: C.sectionBorder, label: "集团 / 板块节点" },
  { bg: C.deptBg,    border: C.deptBorder,    label: "职能部门节点"   },
  { bg: C.subBg,     border: "transparent",   label: "下属子公司节点" },
  { bg: C.auxBg,     border: C.auxBorder,     label: "辅助单位节点"   },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export function OrgChart() {
  const [showFull, setShowFull] = useState(false);
  const [scale, setScale]       = useState(1);

  return (
    <div
      style={{
        display: "flex", height: "100%",
        margin: "-16px -24px",
        fontFamily: FONT,
        background: C.bgLayout,
        overflow: "hidden",
      }}
    >
      {/* ══ Left control panel ══════════════════════════════════ */}
      <aside style={{
        width: 200,
        flexShrink: 0,
        background: C.bgPanel,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Panel header */}
        <div style={{
          padding: "14px 16px 12px",
          borderBottom: `1px solid ${C.border}`,
          fontSize: 13,
          fontWeight: 600,
          color: C.textPrimary,
          letterSpacing: "0.03em",
        }}>
          组织架构图
        </div>

        <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          <SideField label="组织架构" value="惠州市城市建设投资…" />
          <SideField label="展开层级" value="第六级" />
          <SideField label="历史版本" value="请选择版本" />

          <div style={{ height: 1, background: C.border, margin: "2px 0" }} />

          {/* Zoom */}
          <div>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 6, fontWeight: 500, letterSpacing: "0.03em" }}>缩放比例</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                onClick={() => setScale(s => Math.max(0.3, Math.round((s - 0.1) * 10) / 10))}
                style={{
                  width: 28, height: 28,
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                  background: C.bg,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.textMid,
                  transition: "border-color 0.12s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.primary)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <Minus size={12} />
              </button>
              <span style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 600, color: C.textPrimary }}>
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(s => Math.min(2, Math.round((s + 0.1) * 10) / 10))}
                style={{
                  width: 28, height: 28,
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                  background: C.bg,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.textMid,
                  transition: "border-color 0.12s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.primary)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <div style={{ height: 1, background: C.border, margin: "2px 0" }} />

          {/* Export */}
          <button
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "8px 12px",
              background: C.primary,
              color: "#fff",
              border: "none",
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: FONT,
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = C.primaryHov)}
            onMouseLeave={e => (e.currentTarget.style.background = C.primary)}
          >
            <Download size={13} />
            导出图片
          </button>
        </div>

        {/* Panel footer */}
        <div style={{
          padding: "10px 14px",
          borderTop: `1px solid ${C.border}`,
          fontSize: 10,
          color: C.textSec,
          lineHeight: 1.6,
        }}>
          点击节点 <strong style={{ color: C.primary }}>+/−</strong> 展开收起<br />
          支持横向滚动查看全树
        </div>
      </aside>

      {/* ══ Main area ════════════════════════════════════════════ */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

        {/* ── Toolbar ─────────────────────────────────────────── */}
        <div style={{
          padding: "9px 20px",
          background: C.bg,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
          flexWrap: "wrap",
        }}>
          <ActionBtn icon={<RotateCcw size={12} />} label="重置架构图" />
          <ActionBtn icon={<Save size={12} />}      label="保存当前版本" />
          <ActionBtn icon={<Eye size={12} />}       label="查看隐藏节点" />
          <ActionBtn icon={<Settings2 size={12} />} label="调整架构图" />

          <div style={{ flex: 1 }} />

          {/* 简称 / 全称 toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: C.textSec, whiteSpace: "nowrap" }}>节点显示名称：</span>
            <div style={{
              display: "flex",
              border: `1px solid ${C.borderMid}`,
              borderRadius: 4,
              overflow: "hidden",
            }}>
              {([{ v: false, label: "简称" }, { v: true, label: "全称" }] as const).map(opt => (
                <button
                  key={opt.label}
                  onClick={() => setShowFull(opt.v)}
                  style={{
                    padding: "4px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                    border: "none",
                    borderLeft: opt.v ? `1px solid ${C.borderMid}` : "none",
                    cursor: "pointer",
                    background: showFull === opt.v ? C.primary : C.bg,
                    color: showFull === opt.v ? "#fff" : C.textSec,
                    transition: "background 0.12s, color 0.12s",
                    fontFamily: FONT,
                    letterSpacing: "0.02em",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Chart canvas ─────────────────────────────────────── */}
        <div style={{ flex: 1, overflow: "auto", background: C.bg, position: "relative" }}>
          <div style={{ display: "inline-block", minWidth: "100%", padding: "52px 56px", textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              transformOrigin: "top center",
              transform: `scale(${scale})`,
              transition: "transform 0.18s ease",
            }}>
              <TreeNode node={TREE} showFull={showFull} />
            </div>
          </div>
        </div>

        {/* ── Legend bar ───────────────────────────────────────── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "7px 20px",
          background: C.bgPanel,
          borderTop: `1px solid ${C.border}`,
          fontSize: 11,
          color: C.textSec,
          flexShrink: 0,
          flexWrap: "wrap",
        }}>
          <span style={{ fontWeight: 600, color: C.textPrimary, fontSize: 11, letterSpacing: "0.03em" }}>图例</span>
          {LEGEND_ITEMS.map(item => (
            <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{
                display: "inline-block",
                width: 22,
                height: 14,
                borderRadius: 3,
                background: item.bg,
                border: `1px solid ${item.border}`,
              }} />
              <span>{item.label}</span>
            </span>
          ))}
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{
              display: "inline-block", width: 1, height: 12, background: C.line,
              marginRight: 3,
            }} />
            连接线色 {C.line}
          </span>
        </div>
      </div>
    </div>
  );
}
