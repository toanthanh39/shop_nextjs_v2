"use client";
import { useCallback, useState } from "react";

interface RangeDoubleSliderProps {
	min: number;
	max: number;
	step?: number;
	initialMinValue?: number;
	initialMaxValue?: number;
	onChange?: (values: { min: number; max: number }) => void;
}

const RangeDoubleSlider: React.FC<RangeDoubleSliderProps> = ({
	min,
	max,
	step = 1,
	initialMinValue,
	initialMaxValue,
	onChange,
}) => {
	const [minValue, setMinValue] = useState<number>(initialMinValue ?? min);
	const [maxValue, setMaxValue] = useState<number>(initialMaxValue ?? max);

	// Ensure minValue is never greater than maxValue and vice versa
	const handleMinChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = Math.min(Number(e.target.value), maxValue);
			setMinValue(value);
			onChange?.({ min: value, max: maxValue });
		},
		[maxValue, onChange]
	);

	const handleMaxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = Math.max(Number(e.target.value), minValue);
			setMaxValue(value);
			onChange?.({ min: minValue, max: value });
		},
		[minValue, onChange]
	);

	// Update range track fill between handles
	// We'll use CSS variables to style the background between min and max

	const range = max - min;

	const minPercent = ((minValue - min) / range) * 100;
	const maxPercent = ((maxValue - min) / range) * 100;

	return (
		<>
			<style>{`
        .range-slider {
          position: relative;
          width: 100%;
          height: 40px;
        }

        .slider-track {
          position: absolute;
          height: 6px;
          border-radius: 3px;
          background: #ddd;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          z-index: 1;
        }

        .slider-range {
          position: absolute;
          height: 6px;
          border-radius: 3px;
          // background: linear-gradient(90deg, #8b5cf6, #06b6d4);
           background: #d72229;


          
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          left: ${minPercent}%;
          width: ${maxPercent - minPercent}%;
          transition: left 0.15s ease-in-out, width 0.15s ease-in-out;
        }

        input[type="range"] {
          position: absolute;
          width: 100%;
          height: 40px;
          pointer-events: none;
          -webkit-appearance: none;
          background: none;
          margin: 0;
          padding: 0;
          z-index: 3;
          top: 0;
          left: 0;
        }

        input[type="range"]::-webkit-slider-thumb {
          pointer-events: auto;
          position: relative;
          z-index: 4;
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          border: 2px solid #fff;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 0 3px rgba(139, 92, 246, 0.7);
          margin-top: -9px;
        }
        input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          position: relative;
          z-index: 4;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          border: 2px solid #fff;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 0 3px rgba(139, 92, 246, 0.7);
        }

        input[type="range"]:focus::-webkit-slider-thumb {
          box-shadow: 0 0 6px 3px #8b5cf6;
          outline: none;
        }
        input[type="range"]:focus::-moz-range-thumb {
          box-shadow: 0 0 6px 3px #8b5cf6;
          outline: none;
        }
      `}</style>
			<div
				className="range-slider"
				aria-label="Range double slider"
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={`${minValue} to ${maxValue}`}>
				<div className="slider-track" />
				<div className="slider-range" />
				{/* Two overlapping range inputs */}
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={minValue}
					onChange={handleMinChange}
					style={{ zIndex: minValue > max - 100 ? 5 : 3 }}
					aria-label="Minimum value"
				/>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={maxValue}
					onChange={handleMaxChange}
					aria-label="Maximum value"
				/>
			</div>
		</>
	);
};

export default RangeDoubleSlider;
