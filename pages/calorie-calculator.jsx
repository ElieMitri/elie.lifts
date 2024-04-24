import styles from "../styles/Calorie-calculator.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function calorieCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [openModal, setOpenModal] = useState();
  const [bmr, setBmr] = useState();
  const [clicked, setClicked] = useState(false);
  const [pushError, setPushError] = useState();
  const [result1, setResult1] = useState(bmr * 1.2);
  const [result2, setResult2] = useState(bmr * 1.375);
  const [result3, setResult3] = useState(bmr * 1.55);
  const [result4, setResult4] = useState(bmr * 1.725);
  const [result5, setResult5] = useState(bmr * 1.9);
  const [results, setResults] = useState(bmr * 1.9);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setSelectedActivityLevel(event.target.value);
    console.log(event.target.value);
  };

  function getBmrWeight(e) {
    setWeight(e.target.value);
  }

  function getBmrHeight(e) {
    setHeight(e.target.value);
  }

  function getBmrAge(e) {
    setAge(e.target.value);
  }

  function getBmrGender(e) {
    setGender(e.target.value);
  }

  function calculate() {
    if (selectedActivityLevel === "Sedentary") {
      setResults(result1);
      setClicked(true);
    }
    if (selectedActivityLevel === "Lightly Active") {
      setResults(result2);
      setClicked(true);
    }
    if (selectedActivityLevel === "Moderately Active") {
      setResults(result3);
      setClicked(true);
    }
    if (selectedActivityLevel === "Very Active") {
      setResults(result4);
      setClicked(true);
    }
    if (selectedActivityLevel === "Extra Active") {
      setResults(result5);
      setClicked(true);
    }
    if (selectedActivityLevel === "") {
      setResults("");
      setClicked(false);
      setPushError("Please enter all fields!");
    }

    if (gender === "male") {
      const result = 10 * weight + 6.25 * height - 5 * age + 5;
      setResult1(Math.floor(result * 1.2));
      setResult2(Math.floor(result * 1.375));
      setResult3(Math.floor(result * 1.55));
      setResult4(Math.floor(result * 1.725));
      setResult5(Math.floor(result * 1.9));
      setBmr(Math.floor(result));
    } else {
      const result = 10 * weight + 6.25 * height - 5 * age - 161;
      setResult1(Math.floor(result * 1.2));
      setResult2(Math.floor(result * 1.375));
      setResult3(Math.floor(result * 1.55));
      setResult4(Math.floor(result * 1.725));
      setResult5(Math.floor(result * 1.9));
      setBmr(Math.floor(result));
    }
    console.log(clicked);
    console.log(weight);
    console.log(height);
    console.log(age);
    console.log(gender);
  }

  useEffect(() => {
    console.log(weight);
  }, []);

  return (
    <>
      <section className={styles.calorieCalculator}>
        <IoArrowBack
          className="calorieCalculatorBack"
          onClick={() => {
            router.push("/");
          }}
        />
        <h1 className={styles.calorieCalculatorTitle}>Calorie Calculator</h1>
        <input
          type="number"
          placeholder="Weight(kg)"
          onChange={getBmrWeight}
          className={styles.calorieCalculatorInput}
        />
        <input
          type="number"
          placeholder="Height(Cm)"
          onChange={getBmrHeight}
          className={styles.calorieCalculatorInput}
        />
        <input
          type="number"
          placeholder="Age(Year)"
          onChange={getBmrAge}
          min="1"
          max="100"
          className={styles.calorieCalculatorAge}
        />
        <input
          type="text"
          placeholder="Gender"
          onChange={getBmrGender}
          className={styles.calorieCalculatorInput}
        />
        <select
          className="activity-level-select"
          value={selectedActivityLevel}
          onChange={handleActivityLevelChange}
        >
          <option value="">Select...</option>
          <option value="Sedentary">Sedentary (little or no exercise)</option>
          <option value="Lightly Active">
            Lightly Active (light exercise / sports 1-3 days a week)
          </option>
          <option value="Moderately Active">
            Moderately Active (moderate exercise / sports 3-5 days a week)
          </option>
          <option value="Very Active">
            Very Active (hard exercise / sports 6-7 days a week)
          </option>
          <option value="Extra Active">
            Extra Active (very hard exercise / sports & physical job or 2x
            training)
          </option>
        </select>
        <button onClick={calculate} className={styles.calorieCalculatorButton}>
          Calculate
        </button>
        {clicked ? (
          <div className={styles.calorieCalculatorResults}>
            <div className={styles.calorieCalculatorResult}>
              <span className="blue">{results}</span> kcal
            </div>
          </div>
        ) : (
          <h1 className={styles.error}>{pushError}</h1>
        )}
      </section>
    </>
  );
}
