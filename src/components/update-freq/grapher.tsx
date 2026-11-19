import { useEffect, useMemo, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, } from "chart.js";
import type { ChartOptions, ScriptableContext } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
    CategoryScale,
    LinearScale,
    Tooltip,
    MatrixController,
    MatrixElement
);

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const DAY_ABBREVIATIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BUCKETS_PER_DAY = 48;
const TOTAL_BUCKETS = DAYS.length * BUCKETS_PER_DAY;

export type EventRecord = {
    timestamp: number;
    type: string;
    version?: string;
};

type EventFrequencyHeatmapProps = {
    events: EventRecord[];
    type: string;
    startDate?: Date;
    endDate?: Date;
};


const ChartContainer = styled.div`
  width: 100%;
  min-width: 0;
  background: var(--card-background-dark);
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const ChartScrollContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

const ScrollHint = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  color: var(--text-secondary-dark);
  font-size: 12px;

  @media (min-width: 761px) {
    display: none;
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 760px;
  height: 420px;

  @media (max-width: 600px) {
    height: 340px;
  }
`;

const Title = styled.h2`
  color: var(--text-dark);
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px;
`;

const Subtitle = styled.div`
  color: var(--text-secondary-dark);
  font-size: 13px;
  margin-top: -14px;
  margin-bottom: 20px;
`;

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 12px;
  color: var(--text-secondary-dark);
  font-size: 11px;
`;

const LegendCell = styled.div<{ $intensity: number }>`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: ${({ $intensity }) =>
        $intensity === 0
            ? "rgba(255, 255, 255, 0.035)"
            : `rgba(212, 212, 212, ${0.12 + $intensity * 0.78})`};
  border: 1px solid rgba(160, 160, 160, 0.15);
`;

function getDateFromTimestamp(timestamp: number): Date {
    return new Date(
        timestamp < 10_000_000_000 ? timestamp * 1000 : timestamp
    );
}

function formatTime(hour: number, minute: number): string {
    return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
}

function getHeatmapColor(value: number, max: number): string {
    if (value === 0 || max === 0) {
        return "rgba(255, 255, 255, 0.035)";
    }

    const intensity = value / max;
    const alpha = 0.12 + intensity * 0.78;

    return `rgba(212, 212, 212, ${alpha})`;
}

function formatDate(date?: Date): string {
    if (!date) return "";

    return date.toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export default function EventFrequencyChart({
    events,
    type,
    startDate,
    endDate,
}: EventFrequencyHeatmapProps) {
    const frequency = useMemo(() => {
        const counts = new Array<number>(TOTAL_BUCKETS).fill(0);

        const startTimestamp = startDate?.getTime();
        const endTimestamp = endDate?.getTime();

        for (const event of events) {
            if (event.type !== type) continue;

            const timestamp =
                event.timestamp < 10_000_000_000
                    ? event.timestamp * 1000
                    : event.timestamp;

            if (
                startTimestamp !== undefined &&
                timestamp < startTimestamp
            ) {
                continue;
            }

            if (
                endTimestamp !== undefined &&
                timestamp > endTimestamp
            ) {
                continue;
            }

            const date = getDateFromTimestamp(timestamp);

            if (Number.isNaN(date.getTime())) continue;

            const dayIndex = (date.getDay() + 6) % 7;

            const bucket =
                date.getHours() * 2 +
                (date.getMinutes() >= 30 ? 1 : 0);

            counts[dayIndex * BUCKETS_PER_DAY + bucket]++;
        }

        return counts;
    }, [events, type, startDate, endDate]);

    const maxFrequency = useMemo(
        () => Math.max(...frequency, 0),
        [frequency]
    );

    const totalEvents = useMemo(
        () => frequency.reduce((sum, count) => sum + count, 0),
        [frequency]
    );

    const dateRange =
        startDate && endDate
            ? `${formatDate(startDate)} → ${formatDate(endDate)}`
            : undefined;

    const data = useMemo(
        () => ({
            datasets: [
                {
                    label: type,
                    data: Array.from({ length: TOTAL_BUCKETS }, (_, index) => ({
                        x: index % BUCKETS_PER_DAY,
                        y: Math.floor(index / BUCKETS_PER_DAY),
                        v: frequency[index],
                    })),
                    backgroundColor: (context: ScriptableContext<"matrix">) => {
                        const point = context.raw as { x: number; y: number; v: number } | undefined;
                        return getHeatmapColor(point?.v ?? 0, maxFrequency);
                    },
                    borderColor: "rgba(160, 160, 160, 0.12)",
                    borderWidth: 1,
                    borderRadius: 2,
                    width: ({ chart }: { chart: ChartJS }) =>
                        Math.max(1, chart.chartArea
                            ? chart.chartArea.width / BUCKETS_PER_DAY - 2
                            : 8),
                    height: ({ chart }: { chart: ChartJS }) =>
                        Math.max(1, chart.chartArea
                            ? chart.chartArea.height / DAYS.length - 3
                            : 20),
                },
            ],
        }),
        [frequency, maxFrequency, type]
    );

    const options = useMemo<ChartOptions<"matrix">>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "#1E1E1E",
                    borderColor: "#2E2E2E",
                    borderWidth: 1,
                    titleColor: "#F5F5F5",
                    bodyColor: "#D4D4D4",
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        title: (items) => {
                            const point = items[0]?.raw as
                                | { x: number; y: number; v: number }
                                | undefined;

                            if (!point) return "";

                            const startMinutes = point.x * 30;
                            const endMinutes = startMinutes + 30;

                            const startTime = formatTime(
                                Math.floor(startMinutes / 60),
                                startMinutes % 60
                            );

                            const endTime = formatTime(
                                Math.floor(endMinutes / 60) % 24,
                                endMinutes % 60
                            );

                            return `${DAYS[point.y]} ${startTime}–${endTime}`;
                        },
                        label: (item) => {
                            const point = item.raw as { v: number };
                            return `${point.v} ${point.v === 1 ? "update" : "updates"}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    type: "linear",
                    min: -0.5,
                    max: BUCKETS_PER_DAY - 0.5,
                    offset: false,
                    grid: {
                        display: false,
                    },
                    border: {
                        color: "#2E2E2E",
                    },
                    ticks: {
                        stepSize: 12,
                        color: "#A0A0A0",
                        callback: (value) => {
                            const bucket = Number(value);
                            if (bucket < 0 || bucket >= BUCKETS_PER_DAY) return "";

                            return formatTime(bucket / 2, 0);
                        },
                        font: {
                            size: 10,
                        },
                    },
                    title: {
                        display: true,
                        text: "Time of day (In your local time)",
                        color: "#A0A0A0",
                    },
                },
                y: {
                    type: "linear",
                    min: -0.5,
                    max: DAYS.length - 0.5,
                    reverse: true,
                    offset: false,
                    grid: {
                        display: false,
                    },
                    border: {
                        display: false,
                    },
                    ticks: {
                        stepSize: 1,
                        color: "#A0A0A0",
                        callback: (value) =>
                            DAY_ABBREVIATIONS[Number(value)] ?? "",
                        font: {
                            size: 11,
                        },
                    },
                },
            },
        }),
        []
    );

    const hottestBucket = useMemo(() => {
        if (maxFrequency === 0) return -1;

        return frequency.indexOf(maxFrequency);
    }, [frequency, maxFrequency]);

    const hottestTimeSlot =
        hottestBucket === -1
            ? -1
            : hottestBucket % BUCKETS_PER_DAY;

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;

        if (!container || hottestTimeSlot === -1) return;

        const chartWidth = container.scrollWidth;
        const viewportWidth = container.clientWidth;

        const targetX =
            (hottestTimeSlot + 0.5) / BUCKETS_PER_DAY * chartWidth;

        container.scrollTo({
            left: Math.max(0, targetX - viewportWidth / 2),
            behavior: "smooth",
        });
    }, [hottestTimeSlot]);


    return (
        <ChartContainer>
            <Title>Update Timing for {type}</Title>

            {dateRange && <Subtitle>{dateRange}</Subtitle>}

            {totalEvents === 0 ? (
                <div
                    role="status"
                    style={{
                        minHeight: 180,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                        color: "var(--text-secondary-dark)",
                        textAlign: "center",
                    }}
                >
                    <strong>No updates found</strong>
                    <span>
                        No {type} updates occurred during this period.
                    </span>
                </div>
            ) : (
                <>
                    <ChartScrollContainer ref={scrollContainerRef}>
                        <ChartWrapper>
                            <Chart type="matrix" data={data} options={options} />
                        </ChartWrapper>
                    </ChartScrollContainer>

                    <ScrollHint>
                        Swipe to explore <span aria-hidden="true">→</span>
                    </ScrollHint>

                    <LegendContainer>
                        <span>Less</span>
                        {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
                            <LegendCell
                                key={intensity}
                                $intensity={intensity}
                            />
                        ))}
                        <span>More</span>
                        <span style={{ marginLeft: 8 }}>
                            Peak: {maxFrequency}
                        </span>
                    </LegendContainer>
                </>
            )}
        </ChartContainer>
    );
}