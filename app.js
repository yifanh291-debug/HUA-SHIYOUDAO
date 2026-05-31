const canvas = document.querySelector("#posterCanvas");
const ctx = canvas.getContext("2d");

const templateCategories = [
  { key: "hot", name: "热门" },
  { key: "guide", name: "引导" },
  { key: "simple", name: "简约" },
  { key: "fresh", name: "清新" },
  { key: "retro", name: "复古" },
  { key: "business", name: "商务" },
  { key: "tech", name: "科技" },
  { key: "education", name: "教育" },
  { key: "food", name: "美食" },
  { key: "travel", name: "旅行" },
  { key: "cartoon", name: "卡通" },
  { key: "marketing", name: "营销" },
];

const templates = {
  note: {
    name: "清醒便签",
    category: "hot",
    thumb: ["#f8f2de", "#1f2a25"],
    accentShape: "corner",
    align: "left",
    weight: 800,
  },
  quote: {
    name: "主编金句",
    category: "hot",
    thumb: ["#f6f7f4", "#d9604c"],
    accentShape: "rule",
    align: "center",
    weight: 700,
  },
  memo: {
    name: "运营备忘",
    category: "hot",
    thumb: ["#173d30", "#f6fff8"],
    accentShape: "stamp",
    align: "left",
    weight: 800,
  },
  calm: {
    name: "松弛日签",
    category: "hot",
    thumb: ["#e5f2ec", "#16835f"],
    accentShape: "circle",
    align: "center",
    weight: 700,
  },
  topFollow: {
    name: "顶部关注",
    category: "guide",
    thumb: ["#eef6ff", "#2978b5"],
    accentShape: "topBar",
    align: "left",
    weight: 800,
  },
  readMore: {
    name: "阅读原文",
    category: "guide",
    thumb: ["#fff8e8", "#c47a1a"],
    accentShape: "arrow",
    align: "center",
    weight: 800,
  },
  watchLike: {
    name: "点个在看",
    category: "guide",
    thumb: ["#fff0f5", "#d96075"],
    accentShape: "heart",
    align: "center",
    weight: 800,
  },
  qrCard: {
    name: "扫码关注",
    category: "guide",
    thumb: ["#f4f7f2", "#2b5947"],
    accentShape: "qr",
    align: "left",
    weight: 800,
  },
  minimalWhite: {
    name: "极简留白",
    category: "simple",
    thumb: ["#ffffff", "#202522"],
    accentShape: "minimal",
    align: "left",
    weight: 760,
  },
  magazine: {
    name: "杂志标题",
    category: "simple",
    thumb: ["#f3f1eb", "#111111"],
    accentShape: "split",
    align: "left",
    weight: 900,
  },
  lineNote: {
    name: "细线笔记",
    category: "simple",
    thumb: ["#fafafa", "#7a7f78"],
    accentShape: "thinFrame",
    align: "center",
    weight: 700,
  },
  blackGold: {
    name: "黑金摘要",
    category: "business",
    thumb: ["#191815", "#d7b56d"],
    accentShape: "luxury",
    align: "center",
    weight: 900,
  },
  report: {
    name: "报告摘要",
    category: "business",
    thumb: ["#eff3f8", "#2b4d68"],
    accentShape: "report",
    align: "left",
    weight: 800,
  },
  founder: {
    name: "创始人说",
    category: "business",
    thumb: ["#f8f5ef", "#66503b"],
    accentShape: "signature",
    align: "left",
    weight: 760,
  },
  neonAi: {
    name: "AI霓虹",
    category: "tech",
    thumb: ["#07131f", "#27d7ff"],
    accentShape: "neon",
    align: "center",
    weight: 900,
  },
  cloudTech: {
    name: "云端科技",
    category: "tech",
    thumb: ["#e9f8fb", "#1687a7"],
    accentShape: "circuit",
    align: "left",
    weight: 800,
  },
  dataPulse: {
    name: "数据脉冲",
    category: "tech",
    thumb: ["#101926", "#65e6bd"],
    accentShape: "pulse",
    align: "left",
    weight: 850,
  },
  classroom: {
    name: "课程笔记",
    category: "education",
    thumb: ["#fff7d8", "#315c8d"],
    accentShape: "book",
    align: "left",
    weight: 800,
  },
  exam: {
    name: "备考提醒",
    category: "education",
    thumb: ["#f0f5ff", "#3c5bce"],
    accentShape: "badge",
    align: "center",
    weight: 850,
  },
  knowledge: {
    name: "知识卡片",
    category: "education",
    thumb: ["#f8fbf4", "#4f7d4b"],
    accentShape: "grid",
    align: "left",
    weight: 760,
  },
  tea: {
    name: "茶饮上新",
    category: "food",
    thumb: ["#fff2e5", "#bf6b3b"],
    accentShape: "steam",
    align: "center",
    weight: 850,
  },
  recipe: {
    name: "食谱小记",
    category: "food",
    thumb: ["#fffaf0", "#6c8a3d"],
    accentShape: "plate",
    align: "left",
    weight: 760,
  },
  cityWalk: {
    name: "城市漫游",
    category: "travel",
    thumb: ["#eaf4f7", "#276f87"],
    accentShape: "route",
    align: "center",
    weight: 800,
  },
  postcard: {
    name: "明信片",
    category: "travel",
    thumb: ["#fff6ed", "#c0604c"],
    accentShape: "postmark",
    align: "left",
    weight: 760,
  },
  oldPaper: {
    name: "旧报纸",
    category: "retro",
    thumb: ["#e8dfc8", "#3a3128"],
    accentShape: "newspaper",
    align: "left",
    weight: 850,
  },
  chineseClassic: {
    name: "新中式",
    category: "retro",
    thumb: ["#f7efe3", "#8d2f24"],
    accentShape: "seal",
    align: "center",
    weight: 850,
  },
  hongKong: {
    name: "港风标题",
    category: "retro",
    thumb: ["#151515", "#ffcf33"],
    accentShape: "poster",
    align: "left",
    weight: 900,
  },
  cuteBubble: {
    name: "可爱气泡",
    category: "cartoon",
    thumb: ["#fff0f7", "#df6c9f"],
    accentShape: "bubble",
    align: "center",
    weight: 850,
  },
  comic: {
    name: "漫画强调",
    category: "cartoon",
    thumb: ["#fff6c7", "#111111"],
    accentShape: "comic",
    align: "center",
    weight: 900,
  },
  pet: {
    name: "萌宠日记",
    category: "cartoon",
    thumb: ["#edf9f2", "#3c8d6b"],
    accentShape: "paw",
    align: "left",
    weight: 780,
  },
  springFresh: {
    name: "春日清新",
    category: "fresh",
    thumb: ["#edf8ea", "#5c9c59"],
    accentShape: "leaf",
    align: "center",
    weight: 760,
  },
  softPink: {
    name: "少女粉",
    category: "fresh",
    thumb: ["#fff0f4", "#d86f8c"],
    accentShape: "petal",
    align: "center",
    weight: 760,
  },
  ocean: {
    name: "海盐蓝",
    category: "fresh",
    thumb: ["#e9f8ff", "#247da0"],
    accentShape: "wave",
    align: "left",
    weight: 800,
  },
  sale: {
    name: "活动促销",
    category: "marketing",
    thumb: ["#fff4de", "#f04d3d"],
    accentShape: "burst",
    align: "center",
    weight: 900,
  },
  launch: {
    name: "新品发布",
    category: "marketing",
    thumb: ["#121212", "#ffde3b"],
    accentShape: "launch",
    align: "center",
    weight: 900,
  },
  limited: {
    name: "限时福利",
    category: "marketing",
    thumb: ["#fff2f2", "#d92d20"],
    accentShape: "coupon",
    align: "left",
    weight: 880,
  },
};

const palettes = {
  ink: {
    name: "墨绿",
    bg: "#f8f2de",
    paper: "#fffaf0",
    text: "#1f2a25",
    muted: "#687069",
    accent: "#16835f",
    accent2: "#d9604c",
  },
  coral: {
    name: "珊瑚",
    bg: "#fff5ef",
    paper: "#fffaf7",
    text: "#2b2320",
    muted: "#7c6a62",
    accent: "#d9604c",
    accent2: "#16835f",
  },
  night: {
    name: "深夜",
    bg: "#13231f",
    paper: "#173d30",
    text: "#f6fff8",
    muted: "#bfd1c9",
    accent: "#e0c36d",
    accent2: "#d9604c",
  },
  blue: {
    name: "清蓝",
    bg: "#eaf4f7",
    paper: "#f8fdff",
    text: "#1c2b34",
    muted: "#667780",
    accent: "#276f87",
    accent2: "#d9604c",
  },
};

const ratios = {
  square: { label: "方图", width: 1080, height: 1080 },
  vertical: { label: "竖图", width: 1080, height: 1440 },
  cover: { label: "封面", width: 900, height: 383 },
};

const samples = [
  "成长不是突然变强，而是一次次把自己接住。",
  "把注意力放回自己身上，很多答案就会慢慢浮出来。",
  "真正稳定的输出，来自每天一点点把系统搭起来。",
  "不是所有问题都要立刻解决，有些答案会在路上长出来。",
  "今天先完成一件小事，让生活重新开始流动。",
];

const state = {
  text: document.querySelector("#copyInput").value,
  template: "note",
  templateCategory: "hot",
  palette: "ink",
  ratio: "square",
  texture: "paper",
  fontSize: 68,
  lineHeight: 1.28,
  padding: 128,
  textX: 16,
  textY: 44,
  watermark: "你的公众号",
  showWatermark: true,
  watermarkSize: 26,
  watermarkX: 12,
  watermarkY: 88,
  backgroundImage: null,
  backgroundName: "",
  backgroundOpacity: 0.34,
  backgroundBlur: 4,
  isDraggingWatermark: false,
  isDraggingText: false,
  dragMode: "text",
};

const elements = {
  copyInput: document.querySelector("#copyInput"),
  charCount: document.querySelector("#charCount"),
  templateCategoryGrid: document.querySelector("#templateCategoryGrid"),
  templateGrid: document.querySelector("#templateGrid"),
  paletteGrid: document.querySelector("#paletteGrid"),
  ratioGroup: document.querySelector("#ratioGroup"),
  textureGroup: document.querySelector("#textureGroup"),
  canvasTitle: document.querySelector("#canvasTitle"),
  templateName: document.querySelector("#templateName"),
  fontSize: document.querySelector("#fontSize"),
  lineHeight: document.querySelector("#lineHeight"),
  paddingSize: document.querySelector("#paddingSize"),
  textX: document.querySelector("#textX"),
  textY: document.querySelector("#textY"),
  fontSizeValue: document.querySelector("#fontSizeValue"),
  lineHeightValue: document.querySelector("#lineHeightValue"),
  paddingSizeValue: document.querySelector("#paddingSizeValue"),
  textXValue: document.querySelector("#textXValue"),
  textYValue: document.querySelector("#textYValue"),
  watermarkInput: document.querySelector("#watermarkInput"),
  watermarkToggle: document.querySelector("#watermarkToggle"),
  watermarkSize: document.querySelector("#watermarkSize"),
  watermarkX: document.querySelector("#watermarkX"),
  watermarkY: document.querySelector("#watermarkY"),
  watermarkSizeValue: document.querySelector("#watermarkSizeValue"),
  watermarkXValue: document.querySelector("#watermarkXValue"),
  watermarkYValue: document.querySelector("#watermarkYValue"),
  backgroundInput: document.querySelector("#backgroundInput"),
  backgroundName: document.querySelector("#backgroundName"),
  clearBackgroundButton: document.querySelector("#clearBackgroundButton"),
  backgroundOpacity: document.querySelector("#backgroundOpacity"),
  backgroundBlur: document.querySelector("#backgroundBlur"),
  backgroundOpacityValue: document.querySelector("#backgroundOpacityValue"),
  backgroundBlurValue: document.querySelector("#backgroundBlurValue"),
  dragModeGroup: document.querySelector("#dragModeGroup"),
};

function init() {
  renderTemplateCategories();
  renderTemplateButtons();
  renderPaletteButtons();
  bindEvents();
  drawPoster();
}

function renderTemplateCategories() {
  elements.templateCategoryGrid.innerHTML = "";
  templateCategories.forEach((category) => {
    const count = Object.values(templates).filter((template) => template.category === category.key).length;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `template-category ${category.key === state.templateCategory ? "active" : ""}`;
    button.dataset.templateCategory = category.key;
    button.innerHTML = `<span>${category.name}</span><em>${count}</em>`;
    elements.templateCategoryGrid.append(button);
  });
}

function renderTemplateButtons() {
  elements.templateGrid.innerHTML = "";
  Object.entries(templates)
    .filter(([, template]) => template.category === state.templateCategory)
    .forEach(([key, template]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `template-card ${key === state.template ? "active" : ""}`;
    button.dataset.template = key;
    button.innerHTML = `
      <div class="template-thumb" style="background:${template.thumb[0]}; color:${template.thumb[1]}"></div>
      <span>${template.name}</span>
    `;
    elements.templateGrid.append(button);
  });
}

function renderPaletteButtons() {
  elements.paletteGrid.innerHTML = "";
  Object.entries(palettes).forEach(([key, palette]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `swatch ${key === state.palette ? "active" : ""}`;
    button.title = palette.name;
    button.dataset.palette = key;
    button.innerHTML = `<span style="background:linear-gradient(135deg, ${palette.paper} 0 45%, ${palette.accent} 45% 70%, ${palette.accent2} 70% 100%)"></span>`;
    elements.paletteGrid.append(button);
  });
}

function bindEvents() {
  elements.copyInput.addEventListener("input", (event) => {
    state.text = event.target.value;
    drawPoster();
  });

  elements.templateCategoryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template-category]");
    if (!button) return;
    state.templateCategory = button.dataset.templateCategory;
    const firstTemplate = Object.entries(templates).find(([, template]) => template.category === state.templateCategory);
    if (firstTemplate) {
      state.template = firstTemplate[0];
      const position = getDefaultTextPosition(state.template);
      state.textX = position.x;
      state.textY = position.y;
      elements.textX.value = state.textX;
      elements.textY.value = state.textY;
    }
    renderTemplateCategories();
    renderTemplateButtons();
    drawPoster();
  });

  elements.templateGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template]");
    if (!button) return;
    state.template = button.dataset.template;
    const position = getDefaultTextPosition(state.template);
    state.textX = position.x;
    state.textY = position.y;
    elements.textX.value = state.textX;
    elements.textY.value = state.textY;
    renderTemplateButtons();
    drawPoster();
  });

  elements.paletteGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-palette]");
    if (!button) return;
    state.palette = button.dataset.palette;
    renderPaletteButtons();
    drawPoster();
  });

  elements.ratioGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ratio]");
    if (!button) return;
    state.ratio = button.dataset.ratio;
    setActiveButton(elements.ratioGroup, button);
    drawPoster();
  });

  elements.textureGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-texture]");
    if (!button) return;
    state.texture = button.dataset.texture;
    setActiveButton(elements.textureGroup, button);
    drawPoster();
  });

  [
    ["fontSize", "fontSize"],
    ["lineHeight", "lineHeight"],
    ["paddingSize", "padding"],
    ["textX", "textX"],
    ["textY", "textY"],
    ["watermarkSize", "watermarkSize"],
  ].forEach(([id, key]) => {
    elements[id].addEventListener("input", (event) => {
      state[key] = Number(event.target.value);
      drawPoster();
    });
  });

  elements.dragModeGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-drag-mode]");
    if (!button) return;
    state.dragMode = button.dataset.dragMode;
    setActiveButton(elements.dragModeGroup, button);
  });

  elements.watermarkInput.addEventListener("input", (event) => {
    state.watermark = event.target.value;
    drawPoster();
  });

  elements.watermarkToggle.addEventListener("change", (event) => {
    state.showWatermark = event.target.checked;
    drawPoster();
  });

  [
    ["watermarkX", "watermarkX"],
    ["watermarkY", "watermarkY"],
    ["backgroundOpacity", "backgroundOpacity"],
    ["backgroundBlur", "backgroundBlur"],
  ].forEach(([id, key]) => {
    elements[id].addEventListener("input", (event) => {
      state[key] = Number(event.target.value);
      drawPoster();
    });
  });

  elements.backgroundInput.addEventListener("change", handleBackgroundUpload);

  elements.clearBackgroundButton.addEventListener("click", () => {
    state.backgroundImage = null;
    state.backgroundName = "";
    elements.backgroundInput.value = "";
    drawPoster();
  });

  canvas.addEventListener("pointerdown", (event) => {
    if (state.dragMode === "watermark") {
      if (!state.showWatermark) return;
      state.isDraggingWatermark = true;
      updateWatermarkFromPointer(event);
    } else {
      state.isDraggingText = true;
      updateTextFromPointer(event);
    }
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (state.isDraggingWatermark) updateWatermarkFromPointer(event);
    if (state.isDraggingText) updateTextFromPointer(event);
  });

  canvas.addEventListener("pointerup", (event) => {
    state.isDraggingWatermark = false;
    state.isDraggingText = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointercancel", () => {
    state.isDraggingWatermark = false;
    state.isDraggingText = false;
  });

  document.querySelector("#sampleButton").addEventListener("click", () => {
    const current = elements.copyInput.value;
    const next = samples.find((sample) => sample !== current) || samples[0];
    elements.copyInput.value = next;
    state.text = next;
    drawPoster();
  });

  document.querySelector("#resetButton").addEventListener("click", () => {
    elements.copyInput.value = samples[0];
    elements.fontSize.value = 68;
    elements.lineHeight.value = 1.28;
    elements.paddingSize.value = 128;
    elements.textX.value = 16;
    elements.textY.value = 44;
    elements.watermarkInput.value = "你的公众号";
    elements.watermarkToggle.checked = true;
    elements.watermarkSize.value = 26;
    elements.watermarkX.value = 12;
    elements.watermarkY.value = 88;
    elements.backgroundInput.value = "";
    elements.backgroundOpacity.value = 0.34;
    elements.backgroundBlur.value = 4;
    Object.assign(state, {
      text: samples[0],
      template: "note",
      templateCategory: "hot",
      palette: "ink",
      ratio: "square",
      texture: "paper",
      fontSize: 68,
      lineHeight: 1.28,
      padding: 128,
      textX: 16,
      textY: 44,
      watermark: "你的公众号",
      showWatermark: true,
      watermarkSize: 26,
      watermarkX: 12,
      watermarkY: 88,
      backgroundImage: null,
      backgroundName: "",
      backgroundOpacity: 0.34,
      backgroundBlur: 4,
      isDraggingWatermark: false,
      isDraggingText: false,
      dragMode: "text",
    });
    setActiveByData(elements.ratioGroup, "ratio", "square");
    setActiveByData(elements.textureGroup, "texture", "paper");
    setActiveByData(elements.dragModeGroup, "drag-mode", "text");
    renderTemplateCategories();
    renderTemplateButtons();
    renderPaletteButtons();
    drawPoster();
  });

  document.querySelector("#downloadButton").addEventListener("click", downloadImage);
  document.querySelector("#downloadButtonSide").addEventListener("click", downloadImage);
  document.querySelector("#fitButton").addEventListener("click", () => {
    document.querySelector("#canvasFrame").scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
}

function setActiveButton(group, activeButton) {
  group.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
  activeButton.classList.add("active");
}

function setActiveByData(group, dataName, value) {
  const active = group.querySelector(`[data-${dataName}="${value}"]`);
  if (active) setActiveButton(group, active);
}

function drawPoster() {
  const ratio = ratios[state.ratio];
  const template = templates[state.template];
  const palette = palettes[state.palette];
  canvas.width = ratio.width;
  canvas.height = ratio.height;

  elements.charCount.textContent = `${state.text.length}/260`;
  elements.canvasTitle.textContent = `${ratio.label} ${ratio.width} x ${ratio.height}`;
  elements.templateName.textContent = template.name;
  elements.fontSizeValue.value = state.fontSize;
  elements.lineHeightValue.value = state.lineHeight.toFixed(2);
  elements.paddingSizeValue.value = state.padding;
  elements.textXValue.value = state.textX;
  elements.textYValue.value = state.textY;
  elements.watermarkSizeValue.value = state.watermarkSize;
  elements.watermarkXValue.value = state.watermarkX;
  elements.watermarkYValue.value = state.watermarkY;
  elements.backgroundName.textContent = state.backgroundName || "上传背景图";
  elements.backgroundOpacityValue.value = `${Math.round(state.backgroundOpacity * 100)}%`;
  elements.backgroundBlurValue.value = state.backgroundBlur;

  paintBackground(ratio, palette);
  paintTemplateChrome(ratio, template, palette);
  paintText(ratio, template, palette);
  paintWatermark(ratio, palette);
}

function paintBackground(ratio, palette) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, ratio.width, ratio.height);

  if (state.backgroundImage) {
    paintUploadedBackground(ratio, Math.min(0.28, state.backgroundOpacity * 0.72));
  }

  const inset = state.ratio === "cover" ? 34 : 52;
  ctx.fillStyle = palette.paper;
  ctx.globalAlpha = state.backgroundImage ? 0.82 : 1;
  roundRect(inset, inset, ratio.width - inset * 2, ratio.height - inset * 2, 18);
  ctx.fill();
  ctx.globalAlpha = 1;

  if (state.backgroundImage) {
    ctx.save();
    roundRect(inset, inset, ratio.width - inset * 2, ratio.height - inset * 2, 18);
    ctx.clip();
    paintUploadedBackground(ratio, state.backgroundOpacity);
    ctx.fillStyle = palette.paper;
    ctx.globalAlpha = 0.58;
    ctx.fillRect(inset, inset, ratio.width - inset * 2, ratio.height - inset * 2);
    ctx.restore();
  }

  paintTexture(ratio, palette, inset);
}

function paintTemplateChrome(ratio, template, palette) {
  const pad = getLayoutPadding();
  ctx.save();
  ctx.strokeStyle = withAlpha(palette.accent, 0.72);
  ctx.fillStyle = palette.accent;
  ctx.lineWidth = Math.max(3, ratio.width * 0.004);

  if (template.accentShape === "corner") {
    ctx.beginPath();
    ctx.moveTo(pad, pad + 72);
    ctx.lineTo(pad, pad);
    ctx.lineTo(pad + 72, pad);
    ctx.stroke();
    ctx.fillStyle = palette.accent2;
    ctx.fillRect(ratio.width - pad - 72, ratio.height - pad - 10, 72, 10);
  }

  if (template.accentShape === "rule") {
    ctx.beginPath();
    ctx.moveTo(pad, ratio.height * 0.22);
    ctx.lineTo(ratio.width - pad, ratio.height * 0.22);
    ctx.stroke();
    ctx.fillStyle = palette.accent2;
    ctx.beginPath();
    ctx.arc(ratio.width / 2, ratio.height * 0.22, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  if (template.accentShape === "stamp") {
    ctx.fillStyle = withAlpha(palette.accent, 0.13);
    roundRect(ratio.width - pad - 142, pad, 142, 48, 8);
    ctx.fill();
    ctx.fillStyle = palette.accent;
    ctx.font = "800 24px 'PingFang SC','Microsoft YaHei',sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("KEEP", ratio.width - pad - 71, pad + 25);
  }

  if (template.accentShape === "circle") {
    ctx.fillStyle = withAlpha(palette.accent, 0.1);
    ctx.beginPath();
    ctx.arc(ratio.width - pad, pad + 40, 82, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = withAlpha(palette.accent2, 0.55);
    ctx.beginPath();
    ctx.arc(pad + 28, ratio.height - pad - 26, 34, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (template.accentShape === "minimal") {
    ctx.fillStyle = palette.text;
    ctx.fillRect(pad, pad, 54, 7);
    ctx.fillStyle = withAlpha(palette.accent, 0.18);
    ctx.fillRect(pad, ratio.height - pad - 24, ratio.width - pad * 2, 2);
  }

  if (["thinFrame", "qr", "postcard"].includes(template.accentShape)) {
    ctx.strokeStyle = withAlpha(palette.accent, 0.55);
    ctx.lineWidth = 3;
    ctx.setLineDash(template.accentShape === "postcard" ? [18, 12] : []);
    roundRect(pad * 0.72, pad * 0.72, ratio.width - pad * 1.44, ratio.height - pad * 1.44, 10);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (template.accentShape === "split") {
    ctx.fillStyle = withAlpha(palette.accent, 0.12);
    ctx.fillRect(ratio.width * 0.58, 52, ratio.width * 0.28, ratio.height - 104);
    ctx.fillStyle = palette.accent2;
    ctx.fillRect(pad, pad, 10, ratio.height - pad * 2);
  }

  if (["topBar", "report"].includes(template.accentShape)) {
    ctx.fillStyle = withAlpha(palette.accent, 0.16);
    ctx.fillRect(52, 52, ratio.width - 104, 58);
    ctx.fillStyle = palette.accent;
    ctx.fillRect(52, 104, ratio.width - 104, 6);
    ctx.fillStyle = palette.accent2;
    ctx.beginPath();
    ctx.arc(ratio.width - 96, 81, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  if (template.accentShape === "arrow") {
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(pad, ratio.height - pad);
    ctx.lineTo(ratio.width - pad - 32, ratio.height - pad);
    ctx.lineTo(ratio.width - pad - 64, ratio.height - pad - 28);
    ctx.moveTo(ratio.width - pad - 32, ratio.height - pad);
    ctx.lineTo(ratio.width - pad - 64, ratio.height - pad + 28);
    ctx.stroke();
  }

  if (template.accentShape === "heart") {
    ctx.fillStyle = withAlpha(palette.accent2, 0.2);
    ctx.beginPath();
    ctx.arc(ratio.width - pad - 32, pad + 20, 36, 0, Math.PI * 2);
    ctx.arc(ratio.width - pad - 78, pad + 20, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.accent2;
    ctx.beginPath();
    ctx.moveTo(ratio.width - pad - 100, pad + 40);
    ctx.lineTo(ratio.width - pad - 55, pad + 96);
    ctx.lineTo(ratio.width - pad - 10, pad + 40);
    ctx.closePath();
    ctx.fill();
  }

  if (template.accentShape === "luxury") {
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(64, 64, ratio.width - 128, ratio.height - 128);
    ctx.strokeStyle = withAlpha(palette.accent2, 0.5);
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(ratio.width - pad, ratio.height - pad);
    ctx.stroke();
  }

  if (template.accentShape === "signature") {
    ctx.strokeStyle = withAlpha(palette.accent, 0.64);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(pad, ratio.height - pad * 0.9);
    ctx.bezierCurveTo(pad + 120, ratio.height - pad * 1.35, ratio.width - pad - 160, ratio.height - pad * 0.5, ratio.width - pad, ratio.height - pad);
    ctx.stroke();
  }

  if (["neon", "pulse", "circuit"].includes(template.accentShape)) {
    ctx.strokeStyle = withAlpha(palette.accent, 0.8);
    ctx.lineWidth = 5;
    ctx.shadowColor = palette.accent;
    ctx.shadowBlur = 22;
    for (let i = 0; i < 4; i += 1) {
      const y = pad + i * 58;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(pad + 120, y);
      ctx.lineTo(pad + 146, y + 26);
      ctx.lineTo(ratio.width - pad, y + 26);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  if (["book", "grid"].includes(template.accentShape)) {
    ctx.strokeStyle = withAlpha(palette.accent, 0.32);
    ctx.lineWidth = 2;
    for (let x = pad; x < ratio.width - pad; x += 52) {
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, ratio.height - pad);
      ctx.stroke();
    }
    for (let y = pad; y < ratio.height - pad; y += 52) {
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(ratio.width - pad, y);
      ctx.stroke();
    }
  }

  if (template.accentShape === "badge") {
    ctx.fillStyle = palette.accent;
    roundRect(ratio.width / 2 - 92, pad, 184, 52, 8);
    ctx.fill();
    ctx.fillStyle = palette.paper;
    ctx.font = "800 24px 'PingFang SC','Microsoft YaHei',sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NOTE", ratio.width / 2, pad + 27);
  }

  if (["steam", "wave"].includes(template.accentShape)) {
    ctx.strokeStyle = withAlpha(palette.accent, 0.55);
    ctx.lineWidth = 5;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      const y = ratio.height - pad - i * 34;
      ctx.moveTo(pad, y);
      ctx.bezierCurveTo(pad + 130, y - 44, ratio.width - pad - 130, y + 44, ratio.width - pad, y);
      ctx.stroke();
    }
  }

  if (template.accentShape === "plate") {
    ctx.strokeStyle = withAlpha(palette.accent, 0.55);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(ratio.width - pad - 56, ratio.height - pad - 56, 82, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ratio.width - pad - 56, ratio.height - pad - 56, 48, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (template.accentShape === "route") {
    ctx.strokeStyle = withAlpha(palette.accent, 0.68);
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 14]);
    ctx.beginPath();
    ctx.moveTo(pad, ratio.height - pad);
    ctx.bezierCurveTo(ratio.width * 0.25, ratio.height * 0.62, ratio.width * 0.68, ratio.height * 0.38, ratio.width - pad, pad);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (["newspaper", "poster"].includes(template.accentShape)) {
    ctx.fillStyle = withAlpha(palette.accent, 0.18);
    ctx.fillRect(52, 52, ratio.width - 104, 76);
    ctx.fillStyle = withAlpha(palette.text, 0.12);
    for (let y = 156; y < ratio.height - 80; y += 34) {
      ctx.fillRect(70, y, ratio.width - 140, 8);
    }
  }

  if (template.accentShape === "seal") {
    ctx.strokeStyle = palette.accent2;
    ctx.lineWidth = 5;
    ctx.strokeRect(ratio.width - pad - 84, ratio.height - pad - 84, 68, 68);
    ctx.fillStyle = palette.accent2;
    ctx.font = "800 24px 'PingFang SC','Microsoft YaHei',sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("印", ratio.width - pad - 50, ratio.height - pad - 50);
  }

  if (["bubble", "petal", "paw"].includes(template.accentShape)) {
    ctx.fillStyle = withAlpha(palette.accent, 0.14);
    for (let i = 0; i < 9; i += 1) {
      const x = pad + pseudoRandom(i * 31) * (ratio.width - pad * 2);
      const y = pad + pseudoRandom(i * 43) * (ratio.height - pad * 2);
      ctx.beginPath();
      ctx.arc(x, y, 18 + pseudoRandom(i * 57) * 34, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (template.accentShape === "comic") {
    ctx.fillStyle = palette.accent2;
    ctx.beginPath();
    ctx.moveTo(ratio.width - pad - 40, pad);
    for (let i = 0; i < 14; i += 1) {
      const angle = (Math.PI * 2 * i) / 14;
      const radius = i % 2 ? 44 : 82;
      ctx.lineTo(ratio.width - pad - 40 + Math.cos(angle) * radius, pad + 76 + Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
  }

  if (template.accentShape === "leaf") {
    ctx.strokeStyle = withAlpha(palette.accent, 0.6);
    ctx.lineWidth = 4;
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      const x = ratio.width - pad - i * 42;
      const y = pad + i * 28;
      ctx.ellipse(x, y, 38, 16, -0.6, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (["burst", "launch", "coupon"].includes(template.accentShape)) {
    ctx.fillStyle = palette.accent2;
    ctx.fillRect(pad, pad, ratio.width - pad * 2, 12);
    ctx.fillRect(pad, ratio.height - pad - 12, ratio.width - pad * 2, 12);
    ctx.fillStyle = withAlpha(palette.accent, 0.2);
    ctx.beginPath();
    ctx.arc(ratio.width - pad, pad, 120, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function paintText(ratio, template, palette) {
  const pad = getLayoutPadding();
  const copy = state.text.trim() || "输入文案后，这里会实时生成图片。";
  const usableTop = state.ratio === "cover" ? pad * 0.8 : pad + 52;
  const usableBottom = ratio.height - pad - (state.showWatermark ? 48 : 12);
  const textBox = getTextBox(ratio, template, pad);
  const maxWidth = textBox.maxWidth;
  const maxTextHeight = Math.max(80, usableBottom - usableTop);
  const fit = fitText(copy, maxWidth, maxTextHeight, template.weight);
  const fontSize = fit.fontSize;
  const lineHeight = fontSize * state.lineHeight;
  const lines = fit.lines;
  const textHeight = lines.length * lineHeight;
  let startY = clamp((ratio.height * state.textY) / 100, usableTop, usableBottom - textHeight);

  if (state.ratio === "cover") {
    startY = clamp(startY + 8, usableTop + 8, usableBottom - textHeight);
  }

  ctx.save();
  ctx.fillStyle = palette.text;
  ctx.font = `${template.weight} ${fontSize}px 'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif`;
  ctx.textAlign = template.align;
  ctx.textBaseline = "top";

  const x = textBox.x;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineHeight);
  });

  ctx.restore();
}

function paintTexture(ratio, palette, inset) {
  if (state.texture === "clean") return;

  ctx.save();
  ctx.beginPath();
  roundRect(inset, inset, ratio.width - inset * 2, ratio.height - inset * 2, 18);
  ctx.clip();

  if (state.texture === "paper") {
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 1800; i += 1) {
      const seedX = pseudoRandom(i * 17 + ratio.width);
      const seedY = pseudoRandom(i * 31 + ratio.height);
      const seedSize = pseudoRandom(i * 47 + ratio.width + ratio.height);
      const x = seedX * ratio.width;
      const y = seedY * ratio.height;
      const size = seedSize * 1.8 + 0.4;
      ctx.fillStyle = i % 2 ? "#000000" : "#ffffff";
      ctx.fillRect(x, y, size, size);
    }
  }

  if (state.texture === "linen") {
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = palette.text;
    ctx.lineWidth = 1;
    for (let x = inset; x < ratio.width - inset; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, inset);
      ctx.lineTo(x + 22, ratio.height - inset);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.06;
    for (let y = inset; y < ratio.height - inset; y += 12) {
      ctx.beginPath();
      ctx.moveTo(inset, y);
      ctx.lineTo(ratio.width - inset, y + 8);
      ctx.stroke();
    }
  }

  if (state.texture === "grain") {
    for (let i = 0; i < 3200; i += 1) {
      const x = pseudoRandom(i * 19 + ratio.height) * ratio.width;
      const y = pseudoRandom(i * 23 + ratio.width) * ratio.height;
      const alpha = pseudoRandom(i * 29) * 0.12;
      ctx.fillStyle = `rgba(30, 36, 32, ${alpha})`;
      ctx.fillRect(x, y, 1.2, 1.2);
    }
    const glow = ctx.createRadialGradient(ratio.width * 0.72, ratio.height * 0.18, 0, ratio.width * 0.72, ratio.height * 0.18, ratio.width * 0.58);
    glow.addColorStop(0, withAlpha(palette.accent, 0.12));
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(inset, inset, ratio.width - inset * 2, ratio.height - inset * 2);
  }

  if (state.texture === "silk") {
    const sheen = ctx.createLinearGradient(inset, inset, ratio.width - inset, ratio.height - inset);
    sheen.addColorStop(0, "rgba(255,255,255,0.38)");
    sheen.addColorStop(0.34, withAlpha(palette.accent, 0.08));
    sheen.addColorStop(0.68, "rgba(255,255,255,0.16)");
    sheen.addColorStop(1, withAlpha(palette.accent2, 0.1));
    ctx.fillStyle = sheen;
    ctx.fillRect(inset, inset, ratio.width - inset * 2, ratio.height - inset * 2);

    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    for (let x = -ratio.width; x < ratio.width * 1.4; x += 72) {
      ctx.beginPath();
      ctx.moveTo(x, ratio.height - inset);
      ctx.bezierCurveTo(x + 120, ratio.height * 0.6, x + 240, ratio.height * 0.38, x + 360, inset);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function paintWatermark(ratio, palette) {
  if (!state.showWatermark || !state.watermark.trim()) return;

  const position = getWatermarkPosition(ratio);
  const size = state.watermarkSize;
  const lineOffset = Math.round(size * 1.3);
  const lineLength = Math.round(size * 1.62);
  ctx.save();
  ctx.fillStyle = palette.muted;
  ctx.globalAlpha = 0.86;
  ctx.font = `700 ${size}px 'PingFang SC','Microsoft YaHei',sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText(state.watermark.trim(), position.x, position.y);

  ctx.strokeStyle = withAlpha(palette.accent, 0.55);
  ctx.lineWidth = Math.max(2, Math.round(size * 0.12));
  ctx.beginPath();
  ctx.moveTo(position.x, position.y - lineOffset);
  ctx.lineTo(position.x + lineLength, position.y - lineOffset);
  ctx.stroke();
  ctx.restore();
}

function paintUploadedBackground(ratio, opacity) {
  const image = state.backgroundImage;
  const scale = Math.max(ratio.width / image.width, ratio.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = (ratio.width - width) / 2;
  const y = (ratio.height - height) / 2;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.filter = state.backgroundBlur > 0 ? `blur(${state.backgroundBlur}px)` : "none";
  ctx.drawImage(image, x, y, width, height);
  ctx.filter = "none";
  ctx.globalAlpha = 1;

  const gradient = ctx.createLinearGradient(0, 0, ratio.width, ratio.height);
  gradient.addColorStop(0, "rgba(255,255,255,0.18)");
  gradient.addColorStop(0.52, "rgba(255,255,255,0.04)");
  gradient.addColorStop(1, "rgba(0,0,0,0.08)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ratio.width, ratio.height);
  ctx.restore();
}

function handleBackgroundUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.addEventListener("load", () => {
      state.backgroundImage = image;
      state.backgroundName = file.name;
      drawPoster();
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function updateWatermarkFromPointer(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  state.watermarkX = clamp(Math.round(x), 4, 96);
  state.watermarkY = clamp(Math.round(y), 4, 96);
  elements.watermarkX.value = state.watermarkX;
  elements.watermarkY.value = state.watermarkY;
  drawPoster();
}

function updateTextFromPointer(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  state.textX = clamp(Math.round(x), 4, 96);
  state.textY = clamp(Math.round(y), 8, 86);
  elements.textX.value = state.textX;
  elements.textY.value = state.textY;
  drawPoster();
}

function getWatermarkPosition(ratio) {
  const margin = getLayoutPadding() * 0.45;
  const x = (ratio.width * state.watermarkX) / 100;
  const y = (ratio.height * state.watermarkY) / 100;
  const topInset = margin + state.watermarkSize * 1.45;
  return {
    x: clamp(x, margin, ratio.width - margin),
    y: clamp(y, topInset, ratio.height - margin * 0.5),
  };
}

function getTextBox(ratio, template, pad) {
  const rawX = (ratio.width * state.textX) / 100;
  const baseWidth = ratio.width - pad * 2;

  if (template.align === "center") {
    const maxWidth = Math.min(baseWidth, ratio.width * (state.ratio === "cover" ? 0.7 : 0.62));
    return {
      x: clamp(rawX, pad + maxWidth / 2, ratio.width - pad - maxWidth / 2),
      maxWidth,
    };
  }

  const minWidth = Math.min(baseWidth * 0.55, state.ratio === "cover" ? 320 : 430);
  const x = clamp(rawX, pad, ratio.width - pad - minWidth);
  return {
    x,
    maxWidth: ratio.width - x - pad,
  };
}

function getDefaultTextPosition(templateKey) {
  const template = templates[templateKey];
  if (template?.align === "center") return { x: 50, y: state.ratio === "cover" ? 30 : 42 };
  return { x: state.ratio === "cover" ? 8 : 16, y: state.ratio === "cover" ? 28 : 44 };
}

function getAdaptiveFontSize(text, maxWidth) {
  const minSize = Math.max(30, state.ratio === "cover" ? 30 : 44);
  let size = state.fontSize;
  const compactText = text.replace(/\s+/g, "");
  if (compactText.length > 70) size -= 12;
  if (compactText.length > 120) size -= 10;
  if (state.ratio === "cover") size = Math.min(size, 58);
  return Math.max(minSize, Math.min(size, maxWidth / 5.2));
}

function fitText(text, maxWidth, maxTextHeight, weight) {
  const minSize = state.ratio === "cover" ? 28 : 34;
  let fontSize = getAdaptiveFontSize(text, maxWidth);
  let lines = wrapText(text, maxWidth, fontSize, weight);

  while (fontSize > minSize && lines.length * fontSize * state.lineHeight > maxTextHeight) {
    fontSize -= 2;
    lines = wrapText(text, maxWidth, fontSize, weight);
  }

  return { fontSize, lines };
}

function wrapText(text, maxWidth, fontSize, weight) {
  ctx.font = `${weight} ${fontSize}px 'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif`;
  const sourceLines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const lines = [];

  sourceLines.forEach((source) => {
    let current = "";
    Array.from(source).forEach((char) => {
      const test = current + char;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = char;
      } else {
        current = test;
      }
    });
    if (current) lines.push(current);
  });

  return lines.slice(0, state.ratio === "cover" ? 4 : 9);
}

function getLayoutPadding() {
  if (state.ratio === "cover") return Math.min(70, Math.max(44, Math.round(state.padding * 0.46)));
  return state.padding;
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function withAlpha(hex, alpha) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function pseudoRandom(seed) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function downloadImage() {
  drawPoster();
  const ratio = ratios[state.ratio];
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.download = `wechat-text-poster-${ratio.width}x${ratio.height}-${date}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

init();
