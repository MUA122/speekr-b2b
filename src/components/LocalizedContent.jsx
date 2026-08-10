import { useLayoutEffect } from "react";
import { translateUiValue } from "../utils/arabicTranslations.js";

const TRANSLATED_ATTRIBUTES = ["aria-label", "alt", "placeholder", "title"];
const SKIPPED_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA"]);

function translateTextNode(node, locale) {
  if (!node?.parentElement || SKIPPED_TAGS.has(node.parentElement.tagName)) return;
  if (node.parentElement.closest("[data-no-translate='true']")) return;

  const translated = translateUiValue(node.nodeValue, locale);
  if (translated !== node.nodeValue) node.nodeValue = translated;
}

function translateElement(element, locale) {
  if (!(element instanceof Element) || element.closest("[data-no-translate='true']")) return;

  for (const attribute of TRANSLATED_ATTRIBUTES) {
    if (!element.hasAttribute(attribute)) continue;
    const current = element.getAttribute(attribute);
    const translated = translateUiValue(current, locale);
    if (translated !== current) element.setAttribute(attribute, translated);
  }
}

function translateTree(root, locale) {
  if (!root) return;

  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, locale);
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE) translateElement(root, locale);

  const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let textNode = textWalker.nextNode();
  while (textNode) {
    translateTextNode(textNode, locale);
    textNode = textWalker.nextNode();
  }

  const elementWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let element = elementWalker.nextNode();
  while (element) {
    translateElement(element, locale);
    element = elementWalker.nextNode();
  }
}

/**
 * Localizes legacy visual components whose copy is embedded in their mock UI.
 * Native Arabic pages (including the blog) pass through untouched because the
 * dictionary only translates known English source strings.
 */
export default function LocalizedContent({ locale }) {
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (!root) return undefined;

    translateTree(root, locale);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target, locale);
          continue;
        }

        mutation.addedNodes.forEach((node) => translateTree(node, locale));
      }
    });

    observer.observe(root, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [locale]);

  return null;
}
