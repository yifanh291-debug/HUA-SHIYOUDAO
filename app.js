const canvas = document.querySelector("#posterCanvas");
const ctx = canvas.getContext("2d");

const templates = {
  note: {
    name: "清醒便签",
    thumb: ["#f8f2de", "#1f2a25"],
    accentShape: "corner",
    align: "left",
    weight: 800,
  },
  quote: {
    name: "主编金句",
    thumb: ["#f6f7f4", "#d9604c"],
    accentShape: "rule",
    align: "center",
    weight: 700,
  },
  memo: {
    name: "运营备忘",
    thumb: ["#173d30", "#f6fff8"],
    accentShape: "stamp",
    align: "left",
    weight: 800,
  },
  calm: {
    name: "松弛日签",
    thumb: ["#e5f2ec", "#16835f"],
    accentShape: "circle",
    align: "center",
    weight: 700,
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
  renderTemplateButtons();
  renderPaletteButtons();
  bindEvents();
  drawPoster();
}

function renderTemplateButtons() {
  elements.templateGrid.innerHTML = "";
  Object.entries(templates).forEach(([key, template]) => {
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
