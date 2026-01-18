"use client";

import { useState, useEffect } from "react";

interface Results {
  itemName: string;
  lifeHours: number;
  workDays: number;
  workWeeks: number;
  mornings: number;
  trueHourlyRate: number;
}

export default function LifeForceCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputType, setInputType] = useState<"salary" | "hourly">("salary");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme from system preference or sessionStorage
  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    sessionStorage.setItem("theme", newTheme);
  };

  // Form values
  const [salary, setSalary] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [workHours, setWorkHours] = useState("40");
  const [commuteHours, setCommuteHours] = useState("0");
  const [prepHours, setPrepHours] = useState("0");
  const [afterHours, setAfterHours] = useState("0");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  // Results
  const [results, setResults] = useState<Results | null>(null);

  const toggleInputType = (type: "salary" | "hourly") => {
    setInputType(type);
  };

  const goToStep = (stepNum: number) => {
    setCurrentStep(stepNum);
  };

  const validateAndContinue = () => {
    if (inputType === "salary" && !salary.trim()) {
      alert("Please enter your annual salary.");
      return;
    }
    if (inputType === "hourly" && !hourlyRate.trim()) {
      alert("Please enter your hourly rate.");
      return;
    }
    goToStep(2);
  };

  const calculateTrueHourlyRate = () => {
    const work = parseFloat(workHours) || 40;
    const commute = parseFloat(commuteHours) || 0;
    const prep = parseFloat(prepHours) || 0;
    const after = parseFloat(afterHours) || 0;

    const totalWeeklyHours = work + commute + prep + after;
    const annualLifeHours = totalWeeklyHours * 52;

    let annualTakeHome: number;

    if (inputType === "salary") {
      const sal = parseFloat(salary) || 0;
      const tax = parseFloat(taxRate) || 0;
      annualTakeHome = sal * (1 - tax / 100);
    } else {
      const rate = parseFloat(hourlyRate) || 0;
      annualTakeHome = rate * work * 52;
    }

    const trueHourlyRate = annualTakeHome / annualLifeHours;

    return {
      trueHourlyRate,
      totalWeeklyHours,
      workHours: work,
    };
  };

  const calculateAndShow = () => {
    const name = itemName || "this item";
    const price = parseFloat(itemPrice) || 0;

    const { trueHourlyRate, totalWeeklyHours } = calculateTrueHourlyRate();

    if (trueHourlyRate <= 0 || price <= 0) {
      alert("Please fill in all required fields with valid numbers.");
      return;
    }

    const lifeHours = price / trueHourlyRate;
    const avgDayLength = totalWeeklyHours / 5;
    const workDays = lifeHours / avgDayLength;
    const workWeeks = lifeHours / totalWeeklyHours;
    const mornings = Math.ceil(lifeHours / avgDayLength);

    setResults({
      itemName: name,
      lifeHours,
      workDays,
      workWeeks,
      mornings,
      trueHourlyRate,
    });

    goToStep(3);
  };

  const resetCalculator = () => {
    setItemName("");
    setItemPrice("");
    goToStep(1);
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
        <span className="icon-sun">&#9728;</span>
        <span className="icon-moon">&#9790;</span>
      </button>

      <div className="container">
        <header>
        <h1>Life Force Calculator</h1>
        <p className="tagline">What does that purchase really cost?</p>
      </header>

      <div className="step-indicator">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`step-dot ${
              currentStep === step
                ? "active"
                : currentStep > step
                ? "completed"
                : ""
            }`}
          />
        ))}
      </div>

      {/* Step 1: Work Details */}
      <div className={`step ${currentStep === 1 ? "active" : ""}`}>
        <div className="card">
          <h2>Your Work Reality</h2>

          <div className="toggle-container">
            <button
              className={`toggle-btn ${inputType === "salary" ? "active" : ""}`}
              onClick={() => toggleInputType("salary")}
            >
              Annual Salary
            </button>
            <button
              className={`toggle-btn ${inputType === "hourly" ? "active" : ""}`}
              onClick={() => toggleInputType("hourly")}
            >
              Hourly Rate
            </button>
          </div>

          <div className={`salary-fields ${inputType === "salary" ? "active" : ""}`}>
            <div className="form-group">
              <label htmlFor="salary">Annual Salary (gross)</label>
              <input
                type="number"
                id="salary"
                placeholder="Enter your gross annual salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taxRate">
                Estimated Tax Rate <span className="label-hint">%</span>
              </label>
              <input
                type="number"
                id="taxRate"
                placeholder="30"
                min="0"
                max="100"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
          </div>

          <div className={`hourly-fields ${inputType === "hourly" ? "active" : ""}`}>
            <div className="form-group">
              <label htmlFor="hourlyRate">Hourly Rate (take-home)</label>
              <input
                type="number"
                id="hourlyRate"
                placeholder="25"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
          </div>

          <h2>Time Your Job Consumes</h2>

          <div className="form-group">
            <label htmlFor="workHours">Hours at work per week</label>
            <input
              type="number"
              id="workHours"
              placeholder="40"
              value={workHours}
              onChange={(e) => setWorkHours(e.target.value)}
            />
          </div>

          <div className="input-row">
            <div className="form-group">
              <label htmlFor="commuteHours">
                Commute <span className="label-hint">hrs/week</span>
              </label>
              <input
                type="number"
                id="commuteHours"
                placeholder="5"
                value={commuteHours}
                onChange={(e) => setCommuteHours(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prepHours">
                Getting Ready <span className="label-hint">hrs/week</span>
              </label>
              <input
                type="number"
                id="prepHours"
                placeholder="5"
                value={prepHours}
                onChange={(e) => setPrepHours(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="afterHours">
              After-hours work{" "}
              <span className="label-hint">emails, calls, travel per week</span>
            </label>
            <input
              type="number"
              id="afterHours"
              placeholder="2"
              value={afterHours}
              onChange={(e) => setAfterHours(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={validateAndContinue}>
            Continue
          </button>
        </div>
      </div>

      {/* Step 2: Item Details */}
      <div className={`step ${currentStep === 2 ? "active" : ""}`}>
        <div className="card">
          <h2>What are you considering?</h2>

          <div className="form-group">
            <label htmlFor="itemName">Item or purchase</label>
            <input
              type="text"
              id="itemName"
              placeholder="New headphones"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemPrice">Price</label>
            <input
              type="number"
              id="itemPrice"
              placeholder="299"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={calculateAndShow}>
            Calculate Life Cost
          </button>
          <button className="btn btn-secondary" onClick={() => goToStep(1)}>
            Back
          </button>
        </div>
      </div>

      {/* Step 3: Results */}
      <div className={`step ${currentStep === 3 ? "active" : ""}`}>
        <div className="card result-card">
          <p className="result-intro">
            To purchase <span className="item-name">{results?.itemName}</span>
          </p>
          <div className="life-hours">{results?.lifeHours.toFixed(1)}</div>
          <div className="life-hours-label">hours of your life</div>

          <div className="breakdown">
            <h3>That&apos;s equivalent to</h3>
            <div className="breakdown-item">
              <span>Work days</span>
              <span className="breakdown-value">
                {results?.workDays.toFixed(1)}
              </span>
            </div>
            <div className="breakdown-item">
              <span>Full work weeks</span>
              <span className="breakdown-value">
                {results?.workWeeks.toFixed(2)}
              </span>
            </div>
            <div className="breakdown-item">
              <span>Early mornings waking up</span>
              <span className="breakdown-value">{results?.mornings}</span>
            </div>
          </div>

          <div className="true-rate">
            <div className="true-rate-label">Your true hourly rate</div>
            <div className="true-rate-value">
              ${results?.trueHourlyRate.toFixed(2)}/hr
            </div>
          </div>

          <p className="quote">&ldquo;Every purchase is a trade. Time for things.&rdquo;</p>
        </div>

        <button className="btn btn-primary" onClick={resetCalculator}>
          Calculate Another
        </button>
        <button className="btn btn-secondary" onClick={() => goToStep(2)}>
          Change Item
        </button>
      </div>
    </div>
    </>
  );
}
