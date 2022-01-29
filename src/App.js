/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CurrencyInput from "./CurrencyInput";
import Loader from "./Loader";

const BASE_URL =
  "http://data.fixer.io/api/latest?access_key=57a423c25ad080ccd2feef7ba6d6198b";

const App = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [rates, setRates] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}`).then((response) => {
      setRates(response.data.rates);
    });
  }, []);
  function initialRate() {
    handleAmount1Change(1);
  }

  useEffect(() => {
    if (rates) {
      initialRate();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {!loaded ? (
        <Loader />
      ) : (
        <>
          <div className="exchange">
            <p>
              <i class="fa fa-money"></i>
            </p>
            <h1>Exchange Rate</h1>
          </div>
          <div className="currency-converter">
            <h1>Currency Converter</h1>
            <img src="/exchange-rate.svg" />
          </div>
          <div className="input-wrapper">
            <p className="input-header">
              Check Live foreign Currency Exchange rate
            </p>
            <CurrencyInput
              onAmountChange={handleAmount1Change}
              onCurrencyChange={handleCurrency1Change}
              currencies={Object.keys(rates)}
              amount={amount1}
              currency={currency1}
              title="Currency"
            />
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 17"
                aria-hidden="true"
                class="miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <CurrencyInput
              onAmountChange={handleAmount2Change}
              onCurrencyChange={handleCurrency2Change}
              currencies={Object.keys(rates)}
              amount={amount2}
              currency={currency2}
              title="Currency"
            />
          </div>
          <div className="name">
            <span>Built with ❤️ by</span>
            <a href="https://github.com/mykelmatics" target="_blank">
              Onafusi Micheal
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
