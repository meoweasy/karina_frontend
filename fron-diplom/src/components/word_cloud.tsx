import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export interface Word {
  text: string;
  value: number;
}

interface WordCloudProps {
  words: Word[];
}

const WordCloud = ({ words }: WordCloudProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); 
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }

    // Обработчик изменения размера
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    if (!words || words.length === 0 || containerSize.width === 0 || containerSize.height === 0) return;

    const formattedWords = words.map((word) => ({
      text: word.text,
      size: word.value,
    }));

    const layout = cloud()
      .size([containerSize.width, containerSize.height])
      .words(formattedWords)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .fontSize((d) => d.size ?? 10)
      .on("end", () => {
        setTimeout(() => draw(formattedWords), 100); 
      });

    layout.start();

    // Функция для рисования облака слов
    function draw(words: cloud.Word[]) {
      console.log("Words after layout:", words);

      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      svg
        .attr("width", containerSize.width)
        .attr("height", containerSize.height)
        .append("g")
        .attr("transform", `translate(${containerSize.width / 2}, ${containerSize.height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text ?? "");
    }
  }, [words, containerSize]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "85%" }}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>
    </div>
  );
};

export default WordCloud;