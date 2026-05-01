const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'frontend/src');
const DEST_DIR = path.join(__dirname, 'frontend-react/src');

function extractBlock(content, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function extractScriptParts(script) {
  const imports = [];
  const lines = script.split('\n');
  let componentName = 'MyComponent';
  
  lines.forEach(line => {
    if (line.trim().startsWith('import')) {
      let importLine = line.replace(/\.vue/g, '.jsx');
      imports.push(importLine);
    }
    const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
    if (nameMatch) componentName = nameMatch[1].replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  });

  return { imports: imports.join('\n'), componentName };
}

function transformTemplate(template) {
  let jsx = template;
  
  // Remove template tags entirely
  jsx = jsx.replace(/<template[^>]*>/g, '<>');
  jsx = jsx.replace(/<\/template>/g, '</>');
  
  // Basic attributes - be careful with word boundaries
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  
  // Events - use a safer regex for attributes
  jsx = jsx.replace(/@([a-zA-Z-]+)(\.[a-zA-Z]+)?="([^"]+)"/g, (match, event, mod, fn) => {
    const reactEvent = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    let prevent = mod === '.prevent' ? 'e.preventDefault(); ' : '';
    let stop = mod === '.stop' ? 'e.stopPropagation(); ' : '';
    return `${reactEvent}={(e) => { ${prevent}${stop}${fn}(e); }}`;
  });
  
  // Event with no quotes e.g. @click.stop
  jsx = jsx.replace(/@click\.stop\b/g, 'onClick={(e) => e.stopPropagation()}');
  
  // Bindings - handle :class properly
  // Replace :class with a placeholder first to avoid interference
  jsx = jsx.replace(/:class="([^"]+)"/g, (match, p1) => {
    // If it's an object { up: activeIndex === index }, convert to template literal or just a data attribute for now
    if (p1.trim().startsWith('{')) {
       return `data-vue-class-object={JSON.stringify(${p1})}`;
    }
    if (p1.trim().startsWith('[')) {
       return `data-vue-class-array={JSON.stringify(${p1})}`;
    }
    return `className={${p1}}`;
  });

  // Handle other bindings
  jsx = jsx.replace(/:([a-zA-Z-]+)="([^"]+)"/g, '$1={$2}');
  
  // HTML Comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
  // Mustache
  jsx = jsx.replace(/\{\{(.*?)\}\}/g, '{$1}');
  
  // Directives - USE NON-OVERLAPPING REPLACEMENTS
  jsx = jsx.replace(/\bv-else-if="([^"]+)"/g, 'DATA_V_ELSE_IF="{$1}"');
  jsx = jsx.replace(/\bv-if="([^"]+)"/g, 'DATA_V_IF="{$1}"');
  jsx = jsx.replace(/\bv-else\b/g, 'DATA_V_ELSE="true"');
  jsx = jsx.replace(/\bv-for="([^"]+)"/g, 'DATA_V_FOR="{$1}"');
  jsx = jsx.replace(/\bv-model="([^"]+)"/g, 'value={$1} onChange={(e) => set$1(e.target.value)}');

  // Convert temporary markers back to final data attributes
  jsx = jsx.replace(/DATA_V_ELSE_IF/g, 'data-v-else-if');
  jsx = jsx.replace(/DATA_V_IF/g, 'data-v-if');
  jsx = jsx.replace(/DATA_V_ELSE/g, 'data-v-else');
  jsx = jsx.replace(/DATA_V_FOR/g, 'data-v-for');
  
  // Self closing tags - VERY SURGICAL to avoid breaking arrow functions
  // Match tags that are definitely NOT closed: <img ... > where there is no / before >
  // Use a negative lookahead to avoid matching tags that already have a /
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  
  // Unclosed style inline
  jsx = jsx.replace(/style="([^"]+)"/g, 'data-style="$1"');

  // Fix the @ symbol in imports if they are still there
  jsx = jsx.replace(/src={require\('@\/assets\/(.*?)'\)}/g, 'src={"/assets/$1"}');
  
  return jsx;
}

function processVueFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let template = extractBlock(content, 'template');
  const script = extractBlock(content, 'script');
  const style = extractBlock(content, 'style');

  const { imports, componentName } = extractScriptParts(script);
  const jsxTemplate = transformTemplate(template);

  const relativePath = path.relative(SRC_DIR, filePath);
  const destPath = path.join(DEST_DIR, relativePath.replace('.vue', '.jsx'));
  const destCssPath = path.join(DEST_DIR, relativePath.replace('.vue', '.css'));

  const componentCode = `
import React, { useState, useEffect } from 'react';
${imports}
import './${path.basename(destCssPath)}';

export default function ${componentName}() {
  // TODO: Convert Vue data(), methods, and mounted() manually
  
  return (
    <>
      ${jsxTemplate}
    </>
  );
}
  `;

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, componentCode);
  fs.writeFileSync(destCssPath, style || '');
}

const getAllFiles = function(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      if (file.endsWith('.vue')) {
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    }
  })
  return arrayOfFiles
}

const vueFiles = getAllFiles(SRC_DIR);
vueFiles.forEach(processVueFile);
console.log('Done converting', vueFiles.length, 'files.');
