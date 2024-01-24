import styles from "../styles/Calorie-calculator.module.css";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function calorieCalculator() {
  const router = useRouter();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [activityLevel, setActivityLevel] = useState();
  const [bmr, setBmr] = useState();
  const [result1, setResult1] = useState(bmr * 1.2);
  const [result2, setResult2] = useState(bmr * 1.375);
  const [result3, setResult3] = useState(bmr * 1.55);
  const [result4, setResult4] = useState(bmr * 1.725);
  const [result5, setResult5] = useState(bmr * 1.9);

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
  }

  return (
    <>
      <section className={styles.calorieCalculator}>
        <input type="text" placeholder="Weight(kg)" onChange={getBmrWeight} />
        <input type="text" placeholder="Height(Cm)" onChange={getBmrHeight} />
        <input
          type="number"
          placeholder="Age(Year)"
          onChange={getBmrAge}
          min="1"
          max="100"
        />
        <input type="text" placeholder="Gender" onChange={getBmrGender} />
        <button onClick={calculate}>Calculate</button>
        <div>Sedentary (little or no exercise): {result1}</div>
        <div>
          Lightly Active (light exercise / sports 1-3 days a week): {result2}
        </div>
        <div>
          Moderately Active(moderate exercise / sports 3-5 days a week):{" "}
          {result3}
        </div>
        <div>
          Very Active(hard exercise / sports 6-7 days a week): {result4}
        </div>
        <div>
          Extra Active(very hard exercise / sports & physical
          job or 2x training): {result5}
        </div>
      </section>
    </>
  );
}
