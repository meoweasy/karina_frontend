import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import { GeoComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { ScatterChart } from "echarts/charts";

// Объявление типов для GeoJSON
interface GeoJSONFeature {
  type: "Feature";
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: "Polygon" | "Point" | "MultiPolygon" | "MultiPoint";
    coordinates: any;
  };
}

interface GeoJSON {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

echarts.use([GeoComponent, CanvasRenderer, ScatterChart]);

interface Quote {
  id: number;
  city: string;
}

interface MapChartProps {
  quotes: Quote[];
}

const MapChart: React.FC<MapChartProps> = ({ quotes }) => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("map")!);

    fetch("/russia.geojson")
      .then((res) => res.json())
      .then((russiaMap: GeoJSON) => {
        // Регистрация карты России
        echarts.registerMap("russia", russiaMap);

        const cityCoordinates: Record<string, [number, number]> = {
          Москва: [55.7522, 37.6156],
          Ульяновск: [54.3282, 48.3866],
          Самара: [53.2001, 50.15],
        };

        // Группируем цитаты по городам
        const groupedQuotes = quotes.reduce<Record<string, number>>(
          (acc, quote) => {
            if (quote.city in cityCoordinates) {
              acc[quote.city] = (acc[quote.city] || 0) + 1;
            }
            return acc;
          },
          {}
        );

        // Маппинг городов с количеством цитирований
        const quoteSeries = Object.entries(groupedQuotes).map(
          ([city, count]) => ({
            name: city,
            value: [...cityCoordinates[city]].reverse(), // [lon, lat] — перевернуты для правильной гео-позиции
            count,
          })
        );

        const option = {
          tooltip: {
            trigger: "item",
            formatter: (params: any) =>
              `${params.name}: ${params.data?.count || 0} цитат`,
          },
          geo: {
            map: "russia",
            roam: true,
            zoom: 3,
            center: [100.3282, 66.3866],
            itemStyle: {
              areaColor: "#d1e4f2",
              borderColor: "#aaa",
              borderWidth: 0.5,
            },
            emphasis: {
              itemStyle: {
                areaColor: "#a5c8f4",
              },
            },
          },
          series: [
            {
              type: "scatter",
              coordinateSystem: "geo",
              data: quoteSeries.map(({ name, value, count }) => ({
                name,
                value,
                count,
                label: {
                  show: true,
                  formatter: (params: any) => {
                    return [
                      `{city|${params.name}}`, // Название города сверху
                      `{circle|${count}}`, // Круг с количеством цитирований
                    ].join("\n"); // Разделяем на два блока
                  },
                  rich: {
                    city: {
                      fontSize: 12,
                      color: "#333",
                      align: "center",
                      verticalAlign: "top",
                      padding: [0, 0, 10, 0]
                    },
                    circle: {
                      fontSize: 14,
                      color: "#fff",
                      borderRadius: "50%", // Это гарантирует круг
                      width: 20, // Ширина круга
                      height: 20, // Высота круга
                      lineHeight: 40, // Выравнивание текста по вертикали
                      align: "center",
                      verticalAlign: "top",
                    },
                  },
                },
                symbol: "circle", // Прямо указываем тип символа
                symbolSize: 30, // Размер круга
                itemStyle: {
                  color: "#FF6347", // Цвет маркера
                  borderColor: "#fff", // Белая обводка
                  borderWidth: 2, // Толщина обводки
                  shadowBlur: 10, // Тень для круга
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                },
              })),
            },
          ],
        };

        // Устанавливаем опции на график
        chart.setOption(option);
      });
  }, [quotes]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default MapChart;



