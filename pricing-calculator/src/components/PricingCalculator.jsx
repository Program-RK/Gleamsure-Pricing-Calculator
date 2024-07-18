import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Slider from "@radix-ui/react-slider";

const AnimatedValue = ({ value }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      key={value}
    >
      ${value.toFixed(2)}
    </motion.span>
  );
};

const PricingCalculator = () => {
  const [hours, setHours] = useState(3);
  const [chemicals, setChemicals] = useState(7.5);
  const [miles, setMiles] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [mileageRate, setMileageRate] = useState(0.58);
  const [overheadRate, setOverheadRate] = useState(20);
  const [profitMargin, setProfitMargin] = useState(30);
  const [equipmentCost, setEquipmentCost] = useState(4.5);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const laborCost = hours * hourlyRate;
    const mileageCost = miles * mileageRate;
    const baseCost = equipmentCost + chemicals + laborCost + mileageCost;
    const overhead = baseCost * (overheadRate / 100);
    const profit = (baseCost + overhead) * (profitMargin / 100);
    setTotalPrice(baseCost + overhead + profit);
  }, [
    hours,
    chemicals,
    miles,
    hourlyRate,
    mileageRate,
    overheadRate,
    profitMargin,
    equipmentCost,
  ]);

  const SliderComponent = ({ label, value, setValue, min, max, step }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label}: {value}
      </label>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        onValueChange={(newValue) => setValue(newValue[0])}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className="bg-gray-600 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  );

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Advanced Job Pricing Calculator
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="hours" className="block text-sm font-medium mb-1">
            Job Duration (hours)
          </label>
          <input
            id="hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="chemicals" className="block text-sm font-medium mb-1">
            Chemical Cost ($)
          </label>
          <input
            id="chemicals"
            type="number"
            value={chemicals}
            onChange={(e) => setChemicals(Number(e.target.value))}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="miles" className="block text-sm font-medium mb-1">
            Travel Distance (miles)
          </label>
          <input
            id="miles"
            type="number"
            value={miles}
            onChange={(e) => setMiles(Number(e.target.value))}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md"
          />
        </div>
        <SliderComponent
          label="Hourly Rate ($)"
          value={hourlyRate}
          setValue={setHourlyRate}
          min={15}
          max={50}
          step={1}
        />
        <SliderComponent
          label="Mileage Rate ($/mile)"
          value={mileageRate}
          setValue={setMileageRate}
          min={0.3}
          max={1}
          step={0.01}
        />
        <SliderComponent
          label="Overhead Rate (%)"
          value={overheadRate}
          setValue={setOverheadRate}
          min={10}
          max={40}
          step={1}
        />
        <SliderComponent
          label="Profit Margin (%)"
          value={profitMargin}
          setValue={setProfitMargin}
          min={10}
          max={50}
          step={1}
        />
        <SliderComponent
          label="Equipment Cost ($)"
          value={equipmentCost}
          setValue={setEquipmentCost}
          min={0}
          max={20}
          step={0.5}
        />
        <div className="text-2xl font-bold mt-6 text-center text-green-400">
          Total Price: <AnimatedValue value={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
