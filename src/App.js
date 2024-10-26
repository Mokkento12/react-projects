import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState("");
  const [toPrice, setToPrice] = React.useState("");

  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const convertPrices = (value, from, to) => {
    const result = (value / rates[from]) * rates[to];
    return result.toFixed(2);
  };

  const onChangeFromPrice = (value) => {
    setFromPrice(value);
    setToPrice(convertPrices(value, fromCurrency, toCurrency));
  };

  const onChangeToPrice = (value) => {
    setToPrice(value);
    setFromPrice(convertPrices(value, toCurrency, fromCurrency));
  };

  const handleFocus = (setter) => (e) => {
    if (e.target.value === "0") {
      setter(""); // Убираем "0" при фокусе
    }
  };

  const handleBlur = (setter) => (e) => {
    if (e.target.value === "") {
      setter("0"); // Возвращаем "0" при потере фокуса, если поле пустое
    }
  };

  const handleCurrencyChange = (setter, currency, value, otherCurrency) => {
    setter(currency);
    const newValue = convertPrices(value, currency, otherCurrency);
    if (setter === setFromCurrency) {
      setToPrice(newValue);
    } else {
      setFromPrice(newValue);
    }
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(currency) =>
          handleCurrencyChange(setFromCurrency, currency, fromPrice, toCurrency)
        }
        onChangeValue={onChangeFromPrice}
        onFocus={handleFocus(setFromPrice)}
        onBlur={handleBlur(setFromPrice)}
        placeholder="0"
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(currency) =>
          handleCurrencyChange(setToCurrency, currency, toPrice, fromCurrency)
        }
        onChangeValue={onChangeToPrice}
        onFocus={handleFocus(setToPrice)}
        onBlur={handleBlur(setToPrice)}
        placeholder="0"
      />
    </div>
  );
}

export default App;
