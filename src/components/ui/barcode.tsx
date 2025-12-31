"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
  format?: "CODE128" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN13" | "EAN8";
  width?: number;
  height?: number;
  displayValue?: boolean;
  fontSize?: number;
  textMargin?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  className?: string;
}

export function Barcode({
  value,
  format = "CODE128",
  width = 2,
  height = 60,
  displayValue = false,
  fontSize = 14,
  textMargin = 2,
  background = "#ffffff",
  lineColor = "#000000",
  margin = 0,
  className,
}: BarcodeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      try {
        JsBarcode(svgRef.current, value, {
          format,
          width,
          height,
          displayValue,
          fontSize,
          textMargin,
          background,
          lineColor,
          margin,
        });
      } catch (error) {
        console.error("Barcode generation error:", error);
      }
    }
  }, [value, format, width, height, displayValue, fontSize, textMargin, background, lineColor, margin]);

  return <svg ref={svgRef} className={className} />;
}

